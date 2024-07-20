import {
  Box,
  Center,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  Button,
  Flex,
  SimpleGrid,
  Code,
} from "@chakra-ui/react";
import Header from "./../header/Header";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import useLoginUser from "../../hooks/useLoginUser";
import { getManagerTeams, setAsDefaultTeam } from "../../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function MyTeams() {
  const { loginUser } = useLoginUser();
  const [fetchingTeams, setFetchingTeams] = useState(true);
  const [myTeams, setMyTeams] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [defaultTeamId, setDefaultTeamId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyTeam();
  }, []);

  const fetchMyTeam = async () => {
    setFetchingTeams(true);
    try {
      const res = await getManagerTeams(loginUser.token);
      setDefaultTeamId(res.data.defaultTeam);
      setMyTeams(res.data.teams);
      setSelectedTeam(res.data.teams[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingTeams(false);
    }
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  const filteredTeams = myTeams.filter((team) =>
    team.name.toLowerCase().includes(searchKeyword)
  );

  const makeDefaultTeam = async (teamId) => {
    try {
      const res = setAsDefaultTeam(loginUser.token, teamId);

      toast.promise(res, {
        loading: `Making Default Team..`,
        success: (res) => {
          setDefaultTeamId(teamId);
          return "Success";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
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
        width="95vw"
        margin="0 auto"
        padding="1rem"
        bg="rgba(255, 255, 255, 0.1)"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
        mt={3}
        borderRadius="md"
        minH="80vh"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <InputGroup width="100%">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="#FAFAFA" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search teams"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              onChange={handleSearch}
            />
          </InputGroup>
        </Box>
        <Box bg="rgba(255, 255, 255, 0.1)" p={2} borderRadius="md">
          {!fetchingTeams && filteredTeams.length > 0 && (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing="1rem"
              width="100%"
              justifyItems="center"
              mb="2rem"
            >
              {filteredTeams.map((team) => (
                <TeamCard
                  key={team._id}
                  team={team}
                  defaultTeamId={defaultTeamId}
                  makeDefaultTeam={makeDefaultTeam}
                />
              ))}
            </SimpleGrid>
          )}

          {fetchingTeams && (
            <Center flex={1} minH="70vh">
              <Spinner size="xl" />
            </Center>
          )}

          {!fetchingTeams && filteredTeams.length === 0 && (
            <Center
              flex={1}
              bg="rgba(255, 255, 255, 0.1)"
              borderRadius="md"
              minH="70vh"
            >
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

function TeamCard({ team, defaultTeamId, makeDefaultTeam }) {
  const navigate = useNavigate();

  return (
    <Box
      minW="300px"
      height="400px"
      border="2px solid #FAFAFA"
      borderRadius="md"
      mb={{ base: "1rem", md: 0 }}
      backdropFilter="blur(10px)"
      overflow="hidden"
      cursor="pointer"
      display="flex"
      flexDir="column"
      onClick={(e) => {
        navigate(`/team/${team._id}`);
      }}
    >
      <Box
        flex={3}
        bg={`url(${team.avatar})`}
        backgroundSize="cover"
        backgroundPosition="center"
      />
      <Box
        flex={2}
        bg="white"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        borderTop="2px solid #FAFAFA"
      >
        <Box color="#000">
          {(defaultTeamId === null || defaultTeamId !== team._id) && (
            <Button
              size="xs"
              colorScheme="green"
              variant="outline"
              onClick={() => makeDefaultTeam(team._id)}
            >
              Set As Default
            </Button>
          )}
          {defaultTeamId === team._id && (
            <Code colorScheme="green">Default Team</Code>
          )}
          <Text fontSize="1.2rem" fontWeight="700">
            {team.name}
          </Text>
          <Text fontSize="1rem" fontWeight="600">
            {team.wins} Wins
          </Text>
          <Text fontSize="1rem" fontWeight="600">
            {team.matches} Matches
          </Text>
        </Box>
        <Box
          mt={2}
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <Flex gap={1}>
            <Button
              size="xs"
              colorScheme="teal"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                // Handle Statistics click
              }}
            >
              Statistics <ExternalLinkIcon mx="2px" />
            </Button>

            <Button
              size="xs"
              colorScheme="teal"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                // Handle Records click
              }}
            >
              Records <ExternalLinkIcon mx="2px" />
            </Button>
          </Flex>
          <Flex justify="space-between">
            <Flex gap={1}>
              <Button
                size="sm"
                colorScheme="red"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle Sale click
                }}
              >
                Sale
              </Button>
              <Button
                size="sm"
                colorScheme="cyan"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle Rent click
                }}
              >
                Rent
              </Button>
            </Flex>

            <Button
              size="sm"
              colorScheme="green"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/team/${team._id}`);
              }}
            >
              View <ExternalLinkIcon mx="2px" />
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
