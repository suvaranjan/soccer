import { Box, Grid, Image } from "@chakra-ui/react";
import NewsCard from "./NewsCard";
import { useNavigate } from "react-router-dom";
import createMatchBtn from "../../Images/create-match-btn.png";
import createLeagueBtn from "../../Images/create-league-btn.png";
import createChallangeBtn from "../../Images/create-challange-btn.png";

function DMiddle() {
  const navigate = useNavigate();
  return (
    <Box w="100%" display="flex" flexDir="column">
      <NewsCard />
      <Grid templateColumns="repeat(3, 1fr)" gap={1} mt={2}>
        <Image
          src={createMatchBtn}
          onClick={() => navigate("/create-match")}
          borderRadius="md"
        />
        <Image
          src={createLeagueBtn}
          mr={1}
          onClick={() => navigate("/create-league")}
        />
        <Image src={createChallangeBtn} borderRightRadius="10px" />
      </Grid>
    </Box>
  );
}

export default DMiddle;
