import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../../hooks/useLoginUser";
import teamsBtn from "../../Images/teams-btn.png";
import playersBtn from "../../Images/players-btn.png";
import postsBtn from "../../Images/posts-btn.png";
import fieldBtn from "../../Images/fields-btn.png";
import refBtn from "../../Images/refs-btn.png";
import search from "../../Images/search.png";

function DFooter() {
  const navigate = useNavigate();
  const { loginUser } = useLoginUser();

  // console.log(loginUser);

  const handleTeamsClick = () => {
    if (loginUser.role === "team-manager") {
      navigate("/my-teams");
    } else {
      navigate("/all-teams");
    }
  };

  const handlePlayersClick = () => {
    if (loginUser.role === "team-manager") {
      navigate("/my-players");
    } else {
      navigate("/all-players");
    }
  };

  return (
    <Box w="100%">
      <Flex
        gap={{ base: 3, md: 3, lg: 1 }}
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        p={2}
        bg="rgba(173, 216, 230, 0.3)"
        backdropFilter="blur(5px)"
        borderRadius="md"
      >
        <Image src={search} height="40px" onClick={() => navigate("/search")} />
        <Box display="flex">
          <Image src={teamsBtn} height="40px" onClick={handleTeamsClick} />
          <Image src={playersBtn} height="40px" onClick={handlePlayersClick} />
          <Image
            src={postsBtn}
            height="40px"
            // onClick={() => navigate("/posts")}
          />
        </Box>
        <Box display="flex">
          <Box
            className="btn-grad-match"
            onClick={() => navigate("/all-matches")}
            display="flex"
            gap={1}
            cursor="pointer"
          >
            <i
              className="fa-solid fa-football"
              style={{ fontSize: "1rem" }}
            ></i>
            <Text>Matches</Text>
          </Box>
          <Image
            src={fieldBtn}
            height="40px"
            onClick={() => navigate("/fields")}
          />
        </Box>

        <Image src={refBtn} height="40px" />
      </Flex>
    </Box>
  );
}

export default DFooter;
