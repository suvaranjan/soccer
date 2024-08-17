import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";

function PostHeaderSkeleton() {
  return (
    <Box w="100%" borderRadius="md" mb={2}>
      <Box bg="#FAFAFA" p={2} borderRadius="md">
        <Box display="flex" w="100%" alignItems="center" gap={2}>
          <SkeletonCircle size="10" />
          <SkeletonText noOfLines={1} width="100%" skeletonHeight="6" />
        </Box>
        <Divider border="1px solid #E2E8F0" mb={2} mt={1} />
        <Flex justify="space-between" align="center">
          <Skeleton height="28px" width="90px" borderRadius="md" />
          <Skeleton height="32px" width="90px" borderRadius="md" />
        </Flex>
      </Box>
    </Box>
  );
}

export default PostHeaderSkeleton;
