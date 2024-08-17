const Post = require('../models/Post/Post');
const Media = require('../models/Post/Media');
const User = require('../models/User');
const Player = require('../models/Player');
const TeamManager = require('../models/TeamManager');
const Referee = require('../models/Referee');
const Comment = require('../models/Post/Comment');

const createPost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { content, media } = req.body;

        // Validate input data
        if (!content || !Array.isArray(media)) {
            return res.status(400).json({ msg: 'Content and media are required' });
        }

        // Check if all media items are valid
        for (const mediaItem of media) {
            const { url, mediaType } = mediaItem;
            if (!url || !['image', 'video'].includes(mediaType)) {
                return res.status(400).json({ msg: 'Invalid media item' });
            }
        }

        // Create media documents
        const mediaIds = await Promise.all(media.map(async (mediaItem) => {
            const newMedia = new Media({
                url: mediaItem.url,
                mediaType: mediaItem.mediaType,
                // post: null,  // Placeholder, will be updated with the post ID
            });
            await newMedia.save();
            return newMedia._id;
        }));

        // Create a new post
        const newPost = new Post({
            user: userId,
            content,
            media: mediaIds,
            likes: [],
            comments: [],
            shares: [],
        });

        // Save the new post
        await newPost.save();

        // Update media documents with the post ID
        await Media.updateMany(
            { _id: { $in: mediaIds } },
            { $set: { post: newPost._id } }
        );

        // Send success response
        res.status(201).json({ msg: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getPosts = async (req, res) => {
    const { page = 1, limit = 4 } = req.query; // Default to 4 posts per page

    try {
        // Fetch posts with user and media
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('user', 'userName role') // Populate user with userName and role
            .populate('media');

        // Collect all user IDs
        const userIds = posts.map(post => post.user?._id).filter(id => id);

        // Fetch avatars for each user based on their role
        const usersWithAvatars = await Promise.all(userIds.map(async (userId) => {
            const post = posts.find(post => post.user._id.equals(userId));
            if (!post) return { user: { _id: userId }, avatar: "https://bit.ly/broken-link" };

            const { role } = post.user;

            switch (role) {
                case 'player':
                    const player = await Player.findOne({ user: userId }).select('avatar');
                    return { user: { _id: userId }, avatar: player ? player.avatar : "https://bit.ly/broken-link" };
                case 'team-manager':
                    const teamManager = await TeamManager.findOne({ user: userId }).select('avatar');
                    return { user: { _id: userId }, avatar: teamManager ? teamManager.avatar : "https://bit.ly/broken-link" };
                case 'referee':
                    const referee = await Referee.findOne({ user: userId }).select('avatar');
                    return { user: { _id: userId }, avatar: referee ? referee.avatar : "https://bit.ly/broken-link" };
                default:
                    return { user: { _id: userId }, avatar: "https://bit.ly/broken-link" };
            }
        }));

        // Create a map of user IDs to avatars
        const avatarMap = new Map(usersWithAvatars.map(({ user, avatar }) => [user._id.toString(), avatar]));

        // Update posts with avatars
        const updatedPosts = posts.map(post => {
            const avatar = avatarMap.get(post.user._id.toString()) || "https://bit.ly/broken-link";
            return {
                ...post.toObject(),
                user: {
                    ...post.user.toObject(),
                    avatar
                }
            };
        });

        res.json(updatedPosts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const addLikeToPost = async (req, res) => {
    const { postId } = req.params; // Assuming the post ID is passed as a route parameter
    const userId = req.user._id; // Assuming the user ID is available in req.user

    try {
        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Add the user's ID to the likes array if not already liked
        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            await post.save();
            return res.status(200).json(post); // Return the updated post
        } else {
            return res.status(200).json({ msg: 'Post already liked' }); // Inform the user the post is already liked
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


const removeLikeFromPost = async (req, res) => {
    const { postId } = req.params; // Assuming the post ID is passed as a route parameter
    const userId = req.user._id; // Assuming the user ID is available in req.user

    try {
        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if the user has liked the post
        if (post.likes.includes(userId)) {
            // Remove the user's ID from the likes array
            post.likes = post.likes.filter(like => like.toString() !== userId.toString());
            await post.save();
            return res.status(200).json(post); // Return the updated post
        } else {
            return res.status(200).json({ msg: 'Like not found' }); // Inform the user the like was not found
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getCommentsOfPost = async (req, res) => {
    const { postId } = req.params; // Assuming the post ID is passed as a route parameter
    const { page = 1, limit = 4 } = req.query; // Default to 4 comments per page

    try {
        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Fetch comments for the post with pagination
        const comments = await Comment.find({ post: postId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('user', 'userName role');

        // Collect all user IDs
        const userIds = comments.map(comment => comment.user?._id).filter(id => id);

        // Fetch avatars for each user based on their role
        const usersWithAvatars = await Promise.all(userIds.map(async (userId) => {
            const comment = comments.find(comment => comment.user._id.equals(userId));
            if (!comment) return { user: { _id: userId }, avatar: "https://bit.ly/broken-link" };

            const { role } = comment.user;

            switch (role) {
                case 'player':
                    const player = await Player.findOne({ user: userId }).select('avatar');
                    return { user: { _id: userId }, avatar: player ? player.avatar : "https://bit.ly/broken-link" };
                case 'team-manager':
                    const teamManager = await TeamManager.findOne({ user: userId }).select('avatar');
                    return { user: { _id: userId }, avatar: teamManager ? teamManager.avatar : "https://bit.ly/broken-link" };
                case 'referee':
                    const referee = await Referee.findOne({ user: userId }).select('avatar');
                    return { user: { _id: userId }, avatar: referee ? referee.avatar : "https://bit.ly/broken-link" };
                default:
                    return { user: { _id: userId }, avatar: "https://bit.ly/broken-link" };
            }
        }));

        // Create a map of user IDs to avatars
        const avatarMap = new Map(usersWithAvatars.map(({ user, avatar }) => [user._id.toString(), avatar]));

        // Update comments with avatars
        const updatedComments = comments.map(comment => {
            const avatar = avatarMap.get(comment.user._id.toString()) || "https://bit.ly/broken-link";
            return {
                ...comment.toObject(),
                user: {
                    ...comment.user.toObject(),
                    avatar
                }
            };
        });

        res.json(updatedComments);
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const addCommentToPost = async (req, res) => {
    const { postId } = req.params; // Assuming the post ID is passed as a route parameter
    const userId = req.user._id; // Assuming the user ID is available in req.user
    const { comment } = req.body; // Assuming the comment text is passed in the request body

    try {
        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Create a new comment
        const newComment = new Comment({
            user: userId,
            post: postId,
            comment,
        });

        // Save the comment
        await newComment.save();

        // Add the comment's ID to the post's comments array
        post.comments.push(newComment._id);
        await post.save();

        // Populate the comment's user field before sending the response
        await newComment.populate('user', 'userName role');

        // Send success response with the new comment
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment to post:', error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getSinglePostById = async (req, res) => {
    const { postId } = req.params;

    try {
        // Fetch the post by ID and populate user and media
        const post = await Post.findById(postId)
            .populate('user', 'userName role') // Populate user with userName and role
            .populate('media');

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Fetch avatar based on user role
        let avatar = "https://bit.ly/broken-link"; // Default avatar

        if (post.user && post.user._id) {
            const { _id, role } = post.user;

            switch (role) {
                case 'player':
                    const player = await Player.findOne({ user: _id }).select('avatar');
                    avatar = player ? player.avatar : avatar;
                    break;
                case 'team-manager':
                    const teamManager = await TeamManager.findOne({ user: _id }).select('avatar');
                    avatar = teamManager ? teamManager.avatar : avatar;
                    break;
                case 'referee':
                    const referee = await Referee.findOne({ user: _id }).select('avatar');
                    avatar = referee ? referee.avatar : avatar;
                    break;
            }
        }

        // Create the post object with the avatar
        const updatedPost = {
            ...post.toObject(),
            user: {
                ...post.user.toObject(),
                avatar
            }
        };

        res.json(updatedPost);
    } catch (error) {
        console.error('Error fetching post:', error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


module.exports = {
    createPost, getPosts, addLikeToPost, removeLikeFromPost, getCommentsOfPost, addCommentToPost, getSinglePostById
};
