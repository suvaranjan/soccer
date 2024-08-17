import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Text,
  Box,
  Button,
  IconButton,
} from "@chakra-ui/react";
import toast from "react-hot-toast";

function ShareModal({ isOpen, onClose, postId }) {
  const url = `${window.location.origin}/posts/${postId}`;
  const title = "Check out this post!";
  const text = "I found this post interesting, take a look!";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard");
    });
  };

  const handleInstagramShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url,
        })
        .catch((error) => {
          toast.error("Sharing failed.");
        });
    } else {
      toast.error("Instagram sharing is not supported on this device.");
    }
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Share</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody mb="1rem">
          <Box>
            <Text mb={2} fontSize="md" fontWeight="500" color="#4A5568">
              Share This Post
            </Text>
            <Box display="flex" justifyContent="space-between" mb={4}>
              <Button
                leftIcon={<i className="fa-brands fa-whatsapp"></i>}
                colorScheme="whatsapp"
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      `${text} ${url}`
                    )}`,
                    "_blank"
                  )
                }
              >
                WhatsApp
              </Button>
              <Button
                leftIcon={<i className="fa-brands fa-facebook"></i>}
                colorScheme="facebook"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${url}`
                  )
                }
              >
                Facebook
              </Button>
              <Button
                leftIcon={<i className="fa-brands fa-instagram"></i>}
                colorScheme="pink"
                onClick={handleInstagramShare}
              >
                Instagram
              </Button>
            </Box>
            <Box
              bg="#2D3748"
              p={2}
              borderRadius="md"
              color="#FAFAFA"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize=".7rem">{url}</Text>
              <IconButton
                icon={<i className="fa-solid fa-copy"></i>}
                size="xs"
                onClick={handleCopyLink}
                aria-label="Copy link"
              />
            </Box>
          </Box>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ShareModal;
