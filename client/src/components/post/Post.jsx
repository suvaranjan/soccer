import React from "react";
import { Box, Container } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import Header from "../header/Header";
import PostCard from "./PostCard";
import { posts } from "./postsData";

function Post() {
  return (
    <Box minH="100vh" width="100%">
      <Header heading="Posts" />
      <Box
        className="post-container"
        maxW="450px"
        m="1rem auto"
        borderRadius="md"
        // border="2px solid red"
        bg="#EDF2F7"
        p={2}
      >
        <PostHeader />
        {posts.map((p, i) => (
          <PostCard post={p} key={i} />
        ))}
      </Box>
    </Box>
  );
}

export default Post;
