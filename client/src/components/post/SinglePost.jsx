import React, { useEffect, useState, useRef } from "react";
import useLoginUser from "../../hooks/useLoginUser";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Spinner,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import {
  addLikeToPost,
  getSinglePostById,
  removeLikeFromPost,
} from "../../api/api";
import PostCard from "./PostCard";
import PostCardSkeleton from "./skeleton/PostCardSkeleton";
import Comment from "./Comment";
import likeSoundFile from "../../helper/like-sound.mp3";
import Header from "../header/Header";
import { ArrowBackIcon } from "@chakra-ui/icons";

function SinglePost() {
  const { loginUser } = useLoginUser();
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const {
    isOpen: isCommentOpen,
    onOpen: onCommentOpen,
    onClose: onCommentClose,
  } = useDisclosure();
  const navigate = useNavigate();

  const likeSound = useRef(new Audio(likeSoundFile));

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await getSinglePostById(loginUser.token, postId);
      console.log(res.data);
      setPost(res.data);
    } catch (error) {
      toast.error("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const res = await addLikeToPost(loginUser.token, postId);
      likeSound.current.play();
      toast.success("Like Added");
      setPost((prevPost) => ({
        ...prevPost,
        likes: [...prevPost.likes, loginUser.userId],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveLikePost = async (postId) => {
    try {
      const res = await removeLikeFromPost(loginUser.token, postId);
      toast.success("Like Removed");
      setPost((prevPost) => ({
        ...prevPost,
        likes: prevPost.likes.filter((id) => id !== loginUser.userId),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLike = () => {
    const isLiked = post.likes.includes(loginUser.userId);
    if (isLiked) {
      handleRemoveLikePost(post._id);
    } else {
      handleLikePost(post._id);
    }
  };

  const commentBtnClick = (postId) => {
    setSelectedPostId(postId);
    onCommentOpen();
  };

  return (
    <>
      <Box w="100%">
        <Header heading="Post" />
        <Box maxW="md" margin="1rem auto" minH="100vh">
          {post && !loading && (
            <>
              <Button
                mb={1}
                leftIcon={<ArrowBackIcon />}
                onClick={() => navigate("/posts")}
              >
                Posts
              </Button>
              <PostCard
                post={post}
                toggleLike={toggleLike}
                commentBtnClick={commentBtnClick}
              />
              <Comment
                isOpen={isCommentOpen}
                onOpen={onCommentOpen}
                onClose={onCommentClose}
                postId={selectedPostId}
              />
            </>
          )}
          {loading && <PostCardSkeleton />}
        </Box>
      </Box>
    </>
  );
}

export default SinglePost;
