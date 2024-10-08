import {
  Avatar,
  Box,
  Flex,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../zustand/store";
import goldImage from "../../../Images/gold.png";
import dimondImage from "../../../Images/dimond.png";

function PlayerHeader({ headerData }) {
  const navigate = useNavigate();
  const { notificationCount } = useStore((state) => state);

  return (
    <Box
      color="#FAFAFA"
      fontWeight="500"
      p={2}
      borderRadius="md"
      //   bg="rgba(0, 0, 0, 0.1)"
      //   backdropFilter="blur(2px)"
    >
      <Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Avatar
              size="md"
              name={headerData.userName}
              src={headerData.avatar}
              borderRadius="md"
              onClick={() => navigate("/profile")}
              cursor="pointer"
            />
          </Box>
          <Box display="flex" gap="1.5rem">
            <Box display="flex" flexDir="column" gap={2}>
              <Box fontSize="1.2rem">{headerData.userName}</Box>
              <Box display="flex" gap={2}>
                <Box fontSize="2rem" fontWeight="600" color="rgb(255,234,122)">
                  <Text
                    border="2px solid rgb(255,234,122)"
                    p={1}
                    borderRadius="md"
                    display="inline"
                  >
                    {headerData.level}
                  </Text>
                </Box>
                <Flex flexDir="column" gap={1} fontSize="1.1rem">
                  <Box display="flex">
                    <Image src={goldImage} h="25px" />
                    <Text>{headerData.zGold}</Text>
                  </Box>
                  <Box display="flex">
                    <Image src={dimondImage} h="30px" />
                    <Text>{headerData.diamond}</Text>
                  </Box>
                </Flex>
              </Box>
            </Box>

            <List display="flex" gap="1rem" pt="1rem">
              <ListItem>
                <i
                  className="fa-solid fa-gear icon"
                  onClick={() => navigate("/setting")}
                ></i>
              </ListItem>
              <ListItem position="relative">
                <i
                  className="fa-solid fa-bell icon"
                  onClick={() => navigate("/notifications")}
                ></i>
                {notificationCount > 0 && (
                  <Box
                    position="absolute"
                    top="-10px"
                    right="-10px"
                    backgroundColor="red"
                    color="white"
                    borderRadius="50%"
                    width="20px"
                    height="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="0.75rem"
                    fontWeight="bold"
                  >
                    {notificationCount}
                  </Box>
                )}
              </ListItem>
              <ListItem>
                <i className="fa-solid fa-user-group icon"></i>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PlayerHeader;
