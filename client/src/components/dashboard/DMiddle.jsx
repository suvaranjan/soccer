import { Box, Grid, Image } from "@chakra-ui/react";
import NewsCard from "./NewsCard";

function DMiddle() {
  return (
    <Box w="100%" display="flex" flexDir="column">
      <NewsCard />
      <Grid templateColumns="repeat(3, 1fr)" gap={1}>
        <Image src="https://res.cloudinary.com/suvaranjan/image/upload/v1717650120/Create_Match_ufk4iv.png" />
        <Image
          src="https://res.cloudinary.com/suvaranjan/image/upload/v1717650105/Create_League_puo46n.png"
          mr={1}
        />
        <Image src="https://res.cloudinary.com/suvaranjan/image/upload/v1717650105/Create_League_puo46n.png" />
      </Grid>
    </Box>
  );
}

export default DMiddle;
