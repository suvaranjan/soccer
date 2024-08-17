import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  Box,
  Text,
  VStack,
  Input,
  HStack,
  IconButton,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { addCommentToPost, getCommentsOfPost } from "../../api/api";
import useLoginUser from "../../hooks/useLoginUser";
import toast from "react-hot-toast";

function Comment({ isOpen, onClose, postId }) {
  const { loginUser } = useLoginUser();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false); // Initialize as false
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset state when drawer opens
      setComments([]);
      setPage(1);
      setHasMore(true);
      setCommentsLoading(true);
      fetchComments(1);
    } else {
      // Reset state when drawer closes
      setComments([]);
      setPage(1);
      setHasMore(true);
      setCommentsLoading(false);
    }
  }, [isOpen, postId]);

  const fetchComments = async (pageNum) => {
    setIsFetching(true);
    try {
      const res = await getCommentsOfPost(loginUser.token, postId, pageNum);
      const fetchedComments = res.data;

      if (fetchedComments.length < 3) {
        // Adjust based on your limit
        setHasMore(false);
      }

      setComments((prevComments) => [...prevComments, ...fetchedComments]);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setCommentsLoading(false);
      setIsFetching(false);
    }
  };

  const handleSendComment = async () => {
    if (!newComment.trim()) return; // Avoid sending empty comments

    try {
      await addCommentToPost(loginUser.token, postId, newComment);
      setNewComment("");
      toast.success("Comment Added");
      // Fetch the latest comments after adding a new one
      setComments([]);
      fetchComments(1);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreComments = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      fetchComments(newPage);
      return newPage;
    });
  };

  // Determine if we should show "No Comments Found"
  const isEmptyComments = !commentsLoading && comments.length === 0;

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent h="80vh">
        <DrawerCloseButton />
        <DrawerHeader>Comments</DrawerHeader>

        <DrawerBody>
          {commentsLoading ? (
            <VStack spacing={4} align="stretch">
              <Spinner size="lg" />
            </VStack>
          ) : isEmptyComments ? (
            <Text fontSize="md">No Comments Found</Text>
          ) : (
            <VStack spacing={4} align="stretch">
              {comments.map((comment, index) => (
                <HStack key={index} align="flex-start" mb={1}>
                  <Avatar
                    src={comment.user.avatar}
                    name={comment.user.userName}
                    size="sm"
                  />
                  <Box>
                    <Text fontWeight="500" fontSize="sm">
                      {comment.user.userName}
                    </Text>
                    <Text fontSize="xs" color="gray.600" mb={1}>
                      {formatDistanceToNow(new Date(comment.createdAt))} ago
                    </Text>
                    <Text fontSize="sm">{comment.comment}</Text>
                  </Box>
                </HStack>
              ))}
              {hasMore && (
                <Button
                  onClick={loadMoreComments}
                  isLoading={isFetching}
                  alignSelf="start"
                  colorScheme="cyan"
                  size="xs"
                >
                  Load more comments...
                </Button>
              )}
            </VStack>
          )}
        </DrawerBody>

        <DrawerFooter>
          <HStack w="100%">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <IconButton
              icon={<ArrowUpIcon />}
              colorScheme="blue"
              onClick={handleSendComment}
              isDisabled={newComment.length < 1}
            />
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Comment;
