import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Box,
  Grid,
  useBreakpointValue,
  useDisclosure,
  Spinner,
  Flex,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Header from "../header/Header";
import PostCard from "./PostCard";
import PostHeader from "./PostHeader";
import useLoginUser from "../../hooks/useLoginUser";
import toast from "react-hot-toast";
import {
  addLikeToPost,
  getPosts,
  getUser,
  removeLikeFromPost,
} from "../../api/api";
import CreatePostModal from "./CreatePostModal";
import PostHeaderSkeleton from "./skeleton/PostHeaderSkeleton";
import PostCardSkeleton from "./skeleton/PostCardSkeleton";
import { useNavigate } from "react-router-dom";
import likeSoundFile from "../../helper/like-sound.mp3";
import Comment from "./Comment";
import { dummyPosts } from "./postsData";
import ShareModal from "./ShareModal";

const Post = () => {
  const {
    isOpen: isCreatePostOpen,
    onOpen: onCreatePostOpen,
    onClose: onCreatePostClose,
  } = useDisclosure();

  const {
    isOpen: isCommentOpen,
    onOpen: onCommentOpen,
    onClose: onCommentClose,
  } = useDisclosure();

  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onClose: onShareClose,
  } = useDisclosure();

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { loginUser } = useLoginUser();
  const navigate = useNavigate();
  const loader = useRef(null);

  const likeSound = useRef(new Audio(likeSoundFile));

  useEffect(() => {
    fetchUser();
    fetchPosts(1);
  }, []);

  useEffect(() => {
    if (loader.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            !postsLoading &&
            hasMore &&
            !isFetching
          ) {
            setPage((prevPage) => {
              const newPage = prevPage + 1;
              fetchPosts(newPage);
              return newPage;
            });
          }
        },
        { threshold: 1 }
      );
      observer.observe(loader.current);
      return () => observer.disconnect();
    }
  }, [postsLoading, hasMore, isFetching]);

  const fetchUser = async () => {
    setUserLoading(true);
    try {
      const res = await getUser(loginUser.token);
      setUser(res.data);
    } catch (error) {
      handleFetchError(error);
    } finally {
      setUserLoading(false);
    }
  };

  const fetchPosts = async (pageNum) => {
    setPostsLoading(true);
    setIsFetching(true);
    try {
      const res = await getPosts(loginUser.token, pageNum);
      console.log(res.data);

      if (res.data.length < 4) {
        setHasMore(false);
      }

      const uniquePosts = [
        ...new Map(
          posts.concat(res.data).map((post) => [post._id, post])
        ).values(),
      ];
      setPosts(uniquePosts);
    } catch (error) {
      toast.error("Failed to load posts");
    } finally {
      setPostsLoading(false);
      setIsFetching(false);
    }
  };

  const handleFetchError = (error) => {
    console.log(error);
    if (error?.response?.data?.error === "token-error") {
      localStorage.removeItem("loginUser");
      navigate("/login");
    }
    if (error?.response?.data?.msg === "User not found") {
      toast.error("User not found");
      localStorage.removeItem("loginUser");
      navigate("/login");
    } else {
      toast.error("An unexpected error occurred");
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const res = await addLikeToPost(loginUser.token, postId);
      likeSound.current.play();
      toast.success("Like Added");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveLikePost = async (postId) => {
    try {
      const res = await removeLikeFromPost(loginUser.token, postId);
      toast.success("Like Removed");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        const isLiked = post.likes.includes(loginUser.userId);
        if (isLiked) {
          handleRemoveLikePost(postId);
          post.likes = post.likes.filter((id) => id !== loginUser.userId);
        } else {
          handleLikePost(postId);
          post.likes.push(loginUser.userId);
        }
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const commentBtnClick = (postId) => {
    setSelectedPostId(postId);
    onCommentOpen();
  };

  const shareBtnClick = (postId) => {
    setSelectedPostId(postId);
    onShareOpen();
  };

  const onPostCreated = () => {
    setPage(1);
    setPosts([]);
    fetchPosts(1);
  };

  return (
    <Box>
      <Header heading="Posts" />
      <Grid
        templateRows="auto 1fr"
        templateColumns="1fr"
        height="87vh"
        overflowY="hidden"
      >
        <Box
          as="header"
          bg="blue.600"
          color="white"
          p={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          boxShadow="md"
        >
          {!isDesktop && <HamburgerIcon boxSize={6} />}
          {isDesktop && <Box>Logo</Box>}
          <Box>Menu Items</Box>
        </Box>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 2fr 1fr" }}
          flex={1}
          overflow="hidden"
        >
          {isDesktop && (
            <Box bg="gray.200" p={4} boxShadow="md" h="full">
              {/* Sidebar Content */}
            </Box>
          )}
          <Box
            bg="white"
            p={4}
            boxShadow="md"
            h="full"
            overflowY="auto"
            overflowX="hidden"
          >
            <Box maxW="md" margin="0 auto">
              {userLoading && <PostHeaderSkeleton />}
              {!userLoading && user && (
                <PostHeader
                  isOpen={isCreatePostOpen}
                  onOpen={onCreatePostOpen}
                  onClose={onCreatePostClose}
                  user={user}
                />
              )}
              {posts.length === 0 && !postsLoading && (
                <Text textAlign="center" mt="1rem" fontSize="md">
                  No posts available
                </Text>
              )}
              {posts.map((post) => (
                <PostCard
                  post={post}
                  key={post._id}
                  toggleLike={toggleLike}
                  commentBtnClick={commentBtnClick}
                  shareBtnClick={shareBtnClick}
                />
              ))}
              {postsLoading && <PostCardSkeleton />}
              {isFetching && <Spinner size="lg" />}
              <div ref={loader} />
            </Box>
          </Box>
          {isDesktop && (
            <Box bg="gray.100" p={4} boxShadow="md" h="full">
              {/* Sponsor Content */}
            </Box>
          )}
        </Grid>
      </Grid>
      {!userLoading && user && (
        <CreatePostModal
          isOpen={isCreatePostOpen}
          onOpen={onCreatePostOpen}
          onClose={onCreatePostClose}
          user={user}
          onPostCreated={onPostCreated}
        />
      )}
      {!postsLoading && (
        <Comment
          isOpen={isCommentOpen}
          onOpen={onCommentOpen}
          onClose={onCommentClose}
          postId={selectedPostId}
        />
      )}
      {!postsLoading && (
        <ShareModal
          isOpen={isShareOpen}
          onOpen={onShareOpen}
          onClose={onShareClose}
          postId={selectedPostId}
        />
      )}
    </Box>
  );
};

export default Post;
