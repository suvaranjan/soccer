import React from "react";
import {
  Box,
  Image,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import passingImage from "../../../../Images/passing.png";
import shootingImage from "../../../../Images/shooting.png";
import defendImage from "../../../../Images/defend.png";
import catchImage from "../../../../Images/catch.png";
import speedImage from "../../../../Images/speed.png";

function PlayerStrengths({ formik }) {
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
        background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
        p="0.5rem"
        borderRadius="10px"
      >
        <Text fontWeight="600" fontSize="1.5rem">
          PLAYER STRENGTH
        </Text>
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

      <Box className="childBox" mt="1rem" bg="rgba(255, 255, 255, 0.3)">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          <PlayerStrength label="Striker" name="striker" formik={formik} />
          <PlayerStrength label="Winger" name="wing" formik={formik} />
          <PlayerStrength
            label="Midfielder"
            name="midfielder"
            formik={formik}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          <PlayerStrength
            label="Wing Defender"
            name="defender"
            formik={formik}
          />
          <PlayerStrength
            label="Central Back"
            name="centerBack"
            formik={formik}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default PlayerStrengths;

function PlayerStrength({ label, name, formik }) {
  return (
    <Box mt="1rem" width="100%">
      <Text fontWeight="600" fontSize="1rem" mb="0.5rem">
        {label}
      </Text>
      <Slider
        name={name}
        value={formik.values[name]}
        onChange={(value) => formik.setFieldValue(name, value)}
        min={0}
        max={100}
        colorScheme="teal"
      >
        <SliderTrack bg="rgba(255,255,255,0.4)">
          <SliderFilledTrack bg="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)" />
        </SliderTrack>
        <SliderThumb boxSize={6} color="#000" fontWeight="600">
          {formik.values[name]}
        </SliderThumb>
      </Slider>
    </Box>
  );
}