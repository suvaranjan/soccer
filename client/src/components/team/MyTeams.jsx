import {
  Box,
  Center,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Header from "./../header/Header";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import { teams } from "./teams";
import { useEffect, useState } from "react";
import useLoginUser from "../../hooks/useLoginUser";
import toast from "react-hot-toast";
import { getManagerTeams } from "../../api/api";
import { useNavigate } from "react-router-dom";

function MyTeams() {
  const { loginUser } = useLoginUser();
  const [selectedTeam, setSelectedTeam] = useState({});
  const [fetchingTeams, setFetchingTeams] = useState(true);
  const [myTeams, setMyTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyTeam();
  }, []);

  const fetchMyTeam = async () => {
    setFetchingTeams(true);
    try {
      const res = await getManagerTeams(loginUser.token);
      console.log(res.data);
      setMyTeams(res.data.teams);
      setSelectedTeam(res.data.teams[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingTeams(false);
    }
  };

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  return (
    <Box
      backgroundImage="url('https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D')"
      minH="100vh"
      backgroundSize="cover"
      backgroundPosition="center"
      color="#FAFAFA"
      pb="3rem"
    >
      <Header heading="MY TEAMS" />
      <Box
        width="85vw"
        margin="0 auto"
        padding="1rem"
        bg="rgba(255, 255, 255, 0.1)"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
        mt={3}
        borderRadius="md"
      >
        <Box borderRadius="md" display="flex" flexDir="column" minH="80vh">
          {!fetchingTeams && myTeams.length > 0 && (
            <>
              <Box
                // border="2px solid green"
                display="grid"
                gridTemplateColumns={{
                  base: "1fr",
                  lg: "repeat(3, minmax(300px, 1fr))",
                }}
                justifyContent="center"
                gap="0.5rem"
                mb="1rem"
              >
                <Box
                  display="flex"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                  p="1rem"
                  gap="1rem"
                  // bg="rgba(255, 255, 255, 0.3)"
                  background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
                  borderRadius="md"
                >
                  <TeamInfo team={selectedTeam} />
                </Box>
                <Box>
                  {Object.keys(selectedTeam).length > 0 && (
                    <SelectedTeamComp team={selectedTeam} />
                  )}
                </Box>
                <Box
                  // bg="rgba(255, 255, 255, 0.3)"
                  background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
                  borderRadius="md"
                  display="flex"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                  p="1rem"
                >
                  <Box
                    fontSize="1rem"
                    fontWeight="700"
                    display="flex"
                    flexDir="column"
                    fontStyle="italic"
                    textDecor="underline"
                  >
                    <Link>
                      STATISTICS <ExternalLinkIcon />
                    </Link>
                    <Link href={`/team/${selectedTeam._id}`}>
                      VIEW & EDIT TEAM <ExternalLinkIcon />
                    </Link>
                    <Link>
                      RECORDS <ExternalLinkIcon />
                    </Link>
                  </Box>
                  <Box>
                    <Image
                      src="https://res.cloudinary.com/suvaranjan/image/upload/v1717864522/trophy_kxcpmw.png"
                      height="150px"
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                gap="2"
                overflowX="auto"
                className="custom-scrollbar"
                pb={3}
                mb={3}
              >
                {myTeams.map((t, i) => {
                  return (
                    <TeamCard
                      team={t}
                      key={i}
                      handleSelectTeam={handleSelectTeam}
                    />
                  );
                })}
              </Box>{" "}
              <Box
                display="flex"
                gap={2}
                p={2}
                alignItems="center"
                justifyContent="space-between"
                flexDir={{
                  base: "column",
                  lg: "row",
                }}
              >
                <Box flex={1}>
                  <InputGroup mr={2}>
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon color="#FAFAFA" />
                    </InputLeftElement>
                    <Input
                      type="tel"
                      backgroundColor="rgba(255, 255, 255, 0.2)"
                    />
                  </InputGroup>
                </Box>
                <Box display="flex" gap={2}>
                  <button className="btn-grad">Sale This Team</button>
                  <button className="btn-grad">Rent This Team</button>
                </Box>
              </Box>
            </>
          )}
          {fetchingTeams && (
            <Center flex={1}>
              <Spinner size="xl" />
            </Center>
          )}
          {!fetchingTeams && !myTeams.length > 0 && (
            <Center flex={1} bg="rgba(255, 255, 255, 0.1)" borderRadius="md">
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="1rem" fontWeight="600" mb={2}>
                  Looks like, You have No Teams.
                </Text>
                <Image
                  src="https://res.cloudinary.com/suvaranjan/image/upload/v1717653049/Add_teams_xeo9ut.png"
                  cursor="pointer"
                  onClick={() => navigate("/create-team")}
                />
              </Box>
            </Center>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MyTeams;

function TeamCard({ team, handleSelectTeam }) {
  return (
    <Box
      minW="250px"
      height="160px"
      //   p={1}
      border="2px solid #FAFAFA"
      borderRadius="md"
      //   bg="rgba(255, 255, 255, 0.2)"
      mb={{ base: "1rem", md: 0 }}
      backdropFilter="blur(10px)"
      bg={`url(${team.avatar})`}
      backgroundSize="cover"
      backgroundPosition="center"
      className="box-hover-effect"
      onClick={() => handleSelectTeam(team)}
    >
      <Text
        textAlign="center"
        fontSize="1.2rem"
        fontWeight="700"
        p={1}
        bg="rgba(255, 255, 255, 10)"
        color="#000"
      >
        {team.name}
      </Text>
    </Box>
  );
}

function TeamInfo({ team }) {
  return (
    <>
      <Box display="flex" gap={2} alignItems="center">
        <Image
          src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605347/Gold_bizhbs.png"
          height="30px"
        />
        <Text fontSize="1.2rem" fontWeight="600">
          {team.zgold}
        </Text>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Image
          src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605364/Diamond_ihmgtt.png"
          height="35px"
        />
        <Text fontSize="1.2rem" fontWeight="600">
          {team.diamond}
        </Text>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Text fontSize="1.2rem" fontWeight="600">
          {team.wins}
        </Text>
        <Text fontSize="1.2rem" fontWeight="600">
          wins
        </Text>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Text fontSize="1.2rem" fontWeight="600">
          {team.matches}
        </Text>
        <Text fontSize="1.2rem" fontWeight="600">
          Matches
        </Text>
      </Box>
    </>
  );
}

const SelectedTeamComp = ({ team }) => {
  return (
    <Box
      minH="250px"
      w="100%"
      //   p={1}
      border="2px solid #FAFAFA"
      borderRadius="md"
      //   bg="rgba(255, 255, 255, 0.2)"
      mb={{ base: "1rem", md: 0 }}
      backdropFilter="blur(10px)"
      bg={`url(${team.avatar})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Text
        textAlign="center"
        fontSize="1.2rem"
        fontWeight="700"
        p={1}
        bg="rgba(255, 255, 255, 10)"
        color="#000"
      >
        {team.name}
      </Text>
    </Box>
  );
};
