import {
  Box,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Avatar,
  Code,
  Button,
  Image,
} from "@chakra-ui/react";

export default function PlayersSection({
  players,
  onMenuClick,
  toggleInvite,
  toggleAdd,
  isLoginUserIsManager,
}) {
  return (
    <Box
      // fontSize="1.3rem"
      p="1rem"
      flex={{ base: "1", md: "0 0 60%" }}
      bg="rgba(255, 255, 255, 0.1)"
      borderRadius="10px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
    >
      <Box
        className="childBoxHeading"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p="0 20px"
      >
        <Text fontWeight="600" fontSize="1rem" p="20px 0">
          TEAM PLAYERS
        </Text>
        {isLoginUserIsManager && (
          <Box display="flex" gap={2}>
            <Image
              src="https://res.cloudinary.com/suvaranjan/image/upload/v1717733456/Add_players_gk3la2.png"
              w="120px"
              onClick={toggleAdd}
            />
            <button className="btn-grad-2" onClick={toggleInvite}>
              Invite Players
            </button>
          </Box>
        )}
      </Box>

      <Box
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="10px"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
        maxHeight="380px"
        minH="380"
        overflowY="scroll"
        overflowX="hidden"
        p={2}
        mt={2}
        className="custom-scrollbar"
      >
        <Grid
          templateColumns="repeat(auto-fill, minmax(130px, 1fr))"
          gap={4}
          justifyItems="center"
        >
          {players.map((player, i) => (
            <PlayerCard
              key={i}
              player={player}
              role="Role"
              onMenuClick={onMenuClick}
              showMenu={isLoginUserIsManager}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

const PlayerCard = ({ player, role, onMenuClick, showMenu }) => {
  return (
    <Box
      position="relative"
      borderRadius="md"
      backgroundColor="rgba(255, 255, 255, 0.2)"
      height="150px"
      w="120px"
      display="flex"
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={2}
        gap={2}
      >
        <Avatar src={player.avatar} />
        <Code colorScheme="green">{role}</Code>
      </Box>
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        p="0.4rem"
        textAlign="center"
        display="flex"
        flexDirection="column"
        fontWeight="500"
        backgroundColor="rgba(255, 255, 255, 0.2)"
        backdropFilter="blur(10px)"
        borderBottomRadius="md"
      >
        <Text color="#000" fontSize=".8rem" mb={1}>
          {player.fullName ? player.fullName : player.user.userName}
        </Text>
      </Box>
      {showMenu && (
        <Box
          position="absolute"
          top="5px"
          right="10px"
          zIndex="1"
          cursor="pointer"
        >
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<i className="fa-solid fa-ellipsis-vertical"></i>}
              size="xs"
              colorScheme="#000"
              variant="link"
            />
            <MenuList backdropFilter="blur(10px)" color="#000" fontSize=".9rem">
              <MenuItem onClick={() => onMenuClick("captain", name)}>
                Assign as Captain
              </MenuItem>
              <MenuItem onClick={() => onMenuClick("viceCaptain", name)}>
                Assign as Vice Captain
              </MenuItem>
              <MenuItem onClick={() => onMenuClick("contract", name)}>
                Assign a Contract
              </MenuItem>
              <MenuItem onClick={() => onMenuClick("remove", name)}>
                Remove Player
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  );
};
