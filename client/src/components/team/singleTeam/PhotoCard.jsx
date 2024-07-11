import React from "react";
import { Box, Image } from "@chakra-ui/react";

const PhotoCard = ({ photo }) => {
  return (
    <Box
      w="100%"
      h="200px"
      overflow="hidden"
      borderRadius="md"
      boxShadow="md"
      bg="gray.200"
    >
      <Image src={photo} alt="Team Photo" objectFit="cover" w="100%" h="100%" />
    </Box>
  );
};

export default PhotoCard;
