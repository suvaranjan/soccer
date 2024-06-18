import {
  Box,
  Button,
  Center,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  Link,
} from "@chakra-ui/react";
import Header from "./../header/Header";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
// import { players } from "./players";
import { getMyPlayers } from "../../api/api";
import useLoginUser from "../../hooks/useLoginUser";
import { useNavigate } from "react-router-dom";

function MyPlayers() {
  const { loginUser } = useLoginUser();
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [fetchingPlayers, setFetchingPlayers] = useState(true);
  const [myPlayers, setMyPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyPlayers();
  }, []);

  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const fetchMyPlayers = async () => {
    setFetchingPlayers(true);
    try {
      const res = await getMyPlayers(loginUser.token);
      console.log(res.data);
      setMyPlayers(res.data);
      setSelectedPlayer(res.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingPlayers(false);
    }
  };

  return (
    <Box
      minH="100vh"
      color="#FAFAFA"
      // backgroundImage="url('https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D')"
      // backgroundSize="cover"
      // backgroundPosition="center"
    >
      <Header heading="MY PLAYERS" />
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
          {!fetchingPlayers && myPlayers.length > 0 && (
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
                  <PlayerInfo player={selectedPlayer} />
                </Box>
                <Box>
                  {Object.keys(selectedPlayer).length > 0 && (
                    <SelectedPlayerComp player={selectedPlayer} />
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
                    <Link href={`/player/${selectedPlayer._id}`}>
                      VIEW & EDIT PLAYER <ExternalLinkIcon />
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
                {myPlayers.map((p, i) => {
                  return (
                    <PlayerCard
                      player={p}
                      key={i}
                      handleSelectPlayer={handleSelectPlayer}
                    />
                  );
                })}
              </Box>
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
                  <button className="btn-grad">Sale This Player</button>
                  <button className="btn-grad">Rent This player</button>
                </Box>
              </Box>
            </>
          )}
          {fetchingPlayers && (
            <Center flex={1}>
              <Spinner size="xl" />
            </Center>
          )}
          {!fetchingPlayers && !myPlayers.length > 0 && (
            <Center flex={1} bg="rgba(255, 255, 255, 0.1)" borderRadius="md">
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="1rem" fontWeight="600" mb={2}>
                  Looks like, You have No Players.
                </Text>
                <Image
                  src="https://res.cloudinary.com/suvaranjan/image/upload/v1717652910/Add_players_a_raumyb.png"
                  cursor="pointer"
                  onClick={() => navigate("/add-player")}
                />
              </Box>
            </Center>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MyPlayers;

function PlayerCard({ player, handleSelectPlayer }) {
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
      bg={`url(${player.avatar})`}
      backgroundSize="cover"
      backgroundPosition="center"
      className="box-hover-effect"
      onClick={() => handleSelectPlayer(player)}
    >
      <Text
        textAlign="center"
        fontSize="1.2rem"
        fontWeight="700"
        p={1}
        bg="rgba(255, 255, 255, 10)"
        color="#000"
      >
        {player.fullName}
      </Text>
    </Box>
  );
}

function PlayerInfo({ player }) {
  return (
    <>
      <Box display="flex" gap={2} alignItems="center">
        <Image
          src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605347/Gold_bizhbs.png"
          height="30px"
        />
        <Text fontSize="1.2rem" fontWeight="600">
          {player.zGold}
        </Text>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Image
          src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605364/Diamond_ihmgtt.png"
          height="35px"
        />
        <Text fontSize="1.2rem" fontWeight="600">
          {player.diamond}
        </Text>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Text fontSize="1.2rem" fontWeight="600">
          {player.alreadyInATeam ? player.team.name : "Not In a Team"}
        </Text>
        {/* <Text fontSize="1.2rem" fontWeight="600">
          TeamName
        </Text> */}
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Text fontSize="1.2rem" fontWeight="600">
          {player.matches}
        </Text>
        <Text fontSize="1.2rem" fontWeight="600">
          Matches
        </Text>
      </Box>
    </>
  );
}

const SelectedPlayerComp = ({ player }) => {
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
      bg={`url(${player.avatar})`}
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
        {player.fullName}
      </Text>
    </Box>
  );
};
