import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  IconButton,
} from "@chakra-ui/react";

// PostCardSkeleton component
function PostCardSkeleton() {
  return (
    <Card maxW="md" mb={4}>
      <CardHeader pb={0}>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <SkeletonCircle size="10" />
            <Box>
              <SkeletonText noOfLines={1} width="100px" skeletonHeight="5" />
            </Box>
          </Flex>
          <Skeleton>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<i className="fa-solid fa-ellipsis-vertical"></i>}
            />
          </Skeleton>
        </Flex>
      </CardHeader>
      <CardBody>
        <SkeletonText noOfLines={3} spacing="4" />
      </CardBody>
      <Box>
        <Skeleton height="400px" />
      </Box>
    </Card>
  );
}

export default PostCardSkeleton;
