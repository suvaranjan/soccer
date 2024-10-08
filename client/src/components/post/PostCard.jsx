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
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useLoginUser from "../../hooks/useLoginUser";

// PostCard component
function PostCard({ post, toggleLike, commentBtnClick, shareBtnClick }) {
  const { loginUser } = useLoginUser();

  // Slick settings for slider
  const settings = {
    dots: true,
    infinite: post.media.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Helper to format like count
  const formatLikeCount = (count) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
  };

  return (
    <Card maxW="md" mb={4}>
      <CardHeader pb={0}>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={post.user.userName} src={post.user.avatar} />
            <Box>
              <Heading size="sm">{post.user.userName}</Heading>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<i className="fa-solid fa-ellipsis-vertical"></i>}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontSize=".9rem">{post.content}</Text>
      </CardBody>
      {post.media.length === 1 ? (
        // Directly render the single media item without using Slider
        <Box>
          {post.media[0].mediaType === "image" ? (
            <Image
              objectFit="cover"
              src={post.media[0].url}
              alt={`media-0`}
              maxH="400px"
              mx="auto"
            />
          ) : (
            <Box as="video" controls maxH="400px" mx="auto">
              <source src={post.media[0].url} type="video/mp4" />
              Your browser does not support the video tag.
            </Box>
          )}
        </Box>
      ) : (
        <Slider {...settings}>
          {post.media.map((mediaItem, index) => (
            <Box key={index}>
              {mediaItem.mediaType === "image" ? (
                <Image
                  objectFit="cover"
                  src={mediaItem.url}
                  alt={`media-${index}`}
                  maxH="400px"
                  mx="auto"
                />
              ) : (
                <Box as="video" controls maxH="400px" mx="auto">
                  <source src={mediaItem.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </Box>
              )}
            </Box>
          ))}
        </Slider>
      )}
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "70px",
          },
        }}
      >
        <Button
          flex="1"
          variant="ghost"
          leftIcon={
            post.likes.includes(loginUser.userId) ? (
              <i
                className="fa-solid fa-thumbs-up"
                style={{ color: "#3182ce" }}
              ></i>
            ) : (
              <i className="fa-regular fa-thumbs-up"></i>
            )
          }
          onClick={() => toggleLike(post._id)}
        >
          {formatLikeCount(post.likes.length) > 0
            ? formatLikeCount(post.likes.length)
            : null}{" "}
          Like
        </Button>
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<i className="fa-regular fa-comment"></i>}
          onClick={() => commentBtnClick(post._id)}
        >
          Comment
        </Button>
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<i className="fa-solid fa-share"></i>}
          onClick={() => shareBtnClick(post._id)}
        >
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
