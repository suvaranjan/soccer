import { Box, Code, Image, Text, Divider, Heading } from "@chakra-ui/react";
import TrophyImage from "../../../Images/league/Trophy.png";

export default function Awards() {
  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      gap="1rem"
      textAlign="center"
    >
      <Heading size="lg" fontStyle="italic">
        Awards
      </Heading>
      <Box height="250px">
        <Image
          src={TrophyImage}
          alt="Trophy"
          width="100%"
          height="100%"
          objectFit="cover"
          objectPosition="center"
        />
      </Box>
    </Box>
  );
}
