import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Image,
  Text,
  SimpleGrid,
  Button,
  useToast,
} from "@chakra-ui/react";
import useStore from "../../zustand/store";
import axios from "axios";
import baseUrl from "../../hooks/baseUrl";
import { useNavigate } from "react-router-dom";

const ChooseRole = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { myEmail, myPassword, myUserName } = useStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!myEmail || !myPassword || !myUserName) {
      navigate("/register");
    }
  }, []);

  const handleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async () => {
    if (selectedRole == null) {
      return toast.error("Select a role");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/register`, {
        email: myEmail,
        password: myPassword,
        userName: myUserName,
        role: selectedRole,
      });
      toast({
        title: res.data.msg,
        // description: res,
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top",
        containerStyle: {
          fontSize: "1rem",
        },
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response.data.msg,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
        containerStyle: {
          fontSize: "1rem",
        },
      });
      console.log("Registration failed:", error.message);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      backgroundImage="url('https://res.cloudinary.com/suvaranjan/image/upload/v1717559612/stadium-1_th5hkh.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      py="4rem"
    >
      <Box
        bg="rgba(173, 216, 230, 0.05)"
        backdropFilter="blur(2px)"
        width="80vw"
        margin="0 auto"
      >
        <Heading
          fontSize="4xl"
          textAlign="start"
          mb="20px"
          p={2}
          pl={5}
          color="#FAFAFA"
          background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
        >
          YOU ARE A ....
        </Heading>

        <Flex
          direction="column"
          align="center"
          justify="center"
          py="4rem"
          borderRadius="md"
          p={2}
        >
          <Flex justifyContent="space-between" width="100%">
            <Image
              src="https://res.cloudinary.com/suvaranjan/image/upload/v1717559772/Player-holding-ball_ojex9e.png"
              height="500px"
              className="player-role-model"
            />
            <SimpleGrid columns={[1, 2, 3]} spacing="20px" margin="0 auto">
              <RoleBox
                role="player"
                imageUrl="https://res.cloudinary.com/suvaranjan/image/upload/v1717570715/sven-kucinic-Z0KjmjxUsKs-unsplash-min_uakdwc.jpg"
                handleSelect={handleSelect}
                selected={selectedRole === "player"}
              />
              <RoleBox
                role="team-manager"
                imageUrl="https://res.cloudinary.com/suvaranjan/image/upload/v1717570389/chhose-team_g4azpn.jpg"
                handleSelect={handleSelect}
                selected={selectedRole === "team-manager"}
              />
              <RoleBox
                role="referee"
                imageUrl="https://res.cloudinary.com/suvaranjan/image/upload/v1717571552/gene-gallin-ruNiMsdI5IQ-unsplash-min_vvxw84.jpg"
                handleSelect={handleSelect}
                selected={selectedRole === "referee"}
              />
              <RoleBox
                role="coach"
                imageUrl="https://res.cloudinary.com/suvaranjan/image/upload/v1717584940/alliance-football-club-dHXegHI3Jlc-unsplash-min_axhypx.jpg"
                handleSelect={handleSelect}
                selected={selectedRole === "coach"}
              />
              <RoleBox
                role="fan"
                imageUrl="https://res.cloudinary.com/suvaranjan/image/upload/v1717572095/joshua-hanson-8JRhpMIu13c-unsplash-min_1_zrtuwz.jpg"
                handleSelect={handleSelect}
                selected={selectedRole === "fan"}
              />
              <RoleBox
                role="team-manager"
                imageUrl="https://res.cloudinary.com/suvaranjan/image/upload/v1717570389/chhose-team_g4azpn.jpg"
                handleSelect={handleSelect}
                selected={selectedRole === "team-manager"}
              />
            </SimpleGrid>
          </Flex>

          <Flex justifyContent="flex-end" width="100%">
            <Button
              onClick={handleSubmit}
              mt="1rem"
              w="300px"
              colorScheme="teal"
              background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
              _hover={{
                background:
                  "linear-gradient(90deg, rgba(205,0,0,1) 0%, rgba(36,129,151,1) 65%, rgba(4,213,226,1) 100%)",
              }}
              borderRadius="none"
              isLoading={loading}
            >
              Continue
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

const RoleBox = ({ role, imageUrl, handleSelect, selected }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box
      onClick={() => handleSelect(role)}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      width="200px"
      height="240px"
      mb={{ base: "1rem", md: "2rem" }}
      borderRadius="md"
      overflow="hidden"
      position="relative"
      cursor="pointer"
      transition="border 0.3s"
      boxShadow={selected ? "0px 0px 20px 0px rgba(0,0,0,0.5)" : "none"}
      border={selected ? "4px solid green" : "4px solid white"}
      _before={{
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        background: isHovered || selected ? "rgba(0,0,0,0.5)" : "transparent",
        borderRadius: "inherit",
        opacity: isHovered || selected ? 1 : 0,
        transition: "opacity 0.2s",
      }}
    >
      <Image
        src={imageUrl}
        alt={role}
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition="center"
      />

      <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontSize="xl"
        color="white"
        zIndex="1"
        opacity={isHovered || selected ? 1 : 0}
        pointerEvents="none"
        textAlign="center"
        fontWeight="500"
        textTransform="uppercase"
      >
        {role === "team-manager" ? "TEAM MANAGER" : role}
      </Text>
    </Box>
  );
};

export default ChooseRole;
