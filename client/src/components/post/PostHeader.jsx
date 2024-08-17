import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import galleryImage from "../../Images/gallery.png";

function PostHeader({ isOpen, onOpen, onClose, user }) {
  return (
    <Box w="100%" borderRadius="md" mb={2}>
      <Box bg="#FAFAFA" p={2} borderRadius="md" borderWidth={1}>
        <Box display="flex" w="100%" alignItems="center" gap={2}>
          <Avatar name="Dan Abrahmov" src={user.avatar} />
          <Text
            bg="#CBD5E0"
            borderRadius="md"
            p={2}
            w="100%"
            fontSize="1rem"
            cursor="pointer"
            onClick={onOpen}
          >
            What's on your mind, {user.userName} ?
          </Text>
        </Box>
        <Divider border="1px solid #E2E8F0" mb={2} mt={2} />
        <Flex justify="space-between">
          <Flex align="center" cursor="pointer">
            <Image src={galleryImage} w="30px" />
            <Text fontSize=".8rem" fontWeight="500" onClick={onOpen}>
              Photos/Vedios
            </Text>
          </Flex>
          <Button colorScheme="facebook" size="sm" onClick={onOpen}>
            Create Post
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default PostHeader;
