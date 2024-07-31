// PlayerStrengths.jsx
import React from "react";
import { Box, Image, Text, Progress } from "@chakra-ui/react";
import passingImage from "../../../Images/passing.png";
import shootingImage from "../../../Images/shooting.png";
import defendImage from "../../../Images/defend.png";
import catchImage from "../../../Images/catch.png";
import speedImage from "../../../Images/speed.png";

const PlayerStrengths = ({ player, toggle, showToggle }) => {
  return (
    <Box
      p="1rem"
      flex="1"
      bg="rgba(255, 255, 255, 0.1)"
      borderRadius="10px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      maxHeight="465px"
      overflowY="auto"
      className="custom-scrollbar"
    >
      <Box
        className="childBoxHeading"
        fontWeight="600"
        fontSize="1rem"
        position="relative"
        p="10px 20px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text color="#FAFAFA">PLAYER STRENGTHS</Text>
        {showToggle && (
          <Box
            cursor="pointer"
            bg="rgba(255, 255, 255, 0.6)"
            color="#000"
            p="5px 10px"
            borderRadius="md"
            fontSize="1.1rem"
            onClick={toggle}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Box>
        )}
      </Box>
      <Box className="childBox" mt="1rem" bg="rgba(255, 255, 255, 0.1)">
        <Box display="flex" alignItems="center" mb="1rem">
          <Image src={shootingImage} />
          <Image src={speedImage} />
          <Image src={passingImage} />
        </Box>
        <Box display="flex" alignItems="center">
          <Image src={defendImage} />
          <Image src={catchImage} />
        </Box>
      </Box>
      <Box className="childBox mt-1rem">
        <PlayerStrength label="Striker" value={player.selfRating.striker} />
        <PlayerStrength label="Winger" value={player.selfRating.winger} />
        <PlayerStrength
          label="Midfielder"
          value={player.selfRating.midfielder}
        />
        <PlayerStrength
          label="Wing Defender"
          value={player.selfRating.wingDefender}
        />
        <PlayerStrength
          label="Central Back"
          value={player.selfRating.centralBack}
        />
      </Box>
    </Box>
  );
};

export default PlayerStrengths;

const PlayerStrength = ({ label, value }) => {
  return (
    <Box w="100%" mb={3}>
      <Text fontWeight="600" fontSize="1rem" mb="0.5rem">
        {label}
      </Text>
      <Progress colorScheme="teal" value={value} size="md" />
    </Box>
  );
};
