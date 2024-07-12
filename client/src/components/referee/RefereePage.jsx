import React, { useEffect, useState } from "react";
import useLoginUser from "../../hooks/useLoginUser";
import { useParams } from "react-router-dom";
import { getRefereeProfile } from "../../api/api";
import { Avatar, Box, Center, Spinner, Text } from "@chakra-ui/react";
import RenderProfile from "../profile/RenderProfile";
import Header from "../header/Header";

function RefereePage() {
  const { loginUser } = useLoginUser();
  const { refId } = useParams();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    fetchRefProfile();
  }, []);

  const fetchRefProfile = async () => {
    setLoading(true);
    try {
      const res = await getRefereeProfile(loginUser.token, refId);
      setProfileData(res.data);
    } catch (error) {
      if (error?.response?.data?.error === "token-error") {
        localStorage.removeItem("loginUser");
        navigate("/login");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column" color="#FAFAFA">
      <Header heading="Referee Profile" />

      <Box
        w="95vw"
        minH="100vh"
        margin="1rem auto"
        background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
        borderRadius="md"
        p="1rem"
      >
        {!loading && (
          <>
            <Box
              bg="rgba(255, 255, 255, 0.2)"
              p="1rem"
              borderRadius="md"
              mb=".5rem"
              position="relative"
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar size="lg" src={profileData.avatar} />
                <Box>
                  <Text fontSize="1.2rem" fontWeight="600">
                    {profileData.userName}
                  </Text>
                  <Text
                    bgColor="#38A169"
                    textTransform="uppercase"
                    p={1}
                    borderRadius="md"
                    fontSize=".8rem"
                    // border="2px solid red"
                    display="inline-block"
                  >
                    {profileData.role}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              bg="rgba(255, 255, 255, 0.2)"
              p="1rem"
              borderRadius="md"
              fontSize="1rem"
              mb=".5rem"
              position="relative"
            >
              <Text fontSize="1.2rem" fontWeight="bold" mb={2}>
                Basic Information
              </Text>
              <Text fontWeight="600">
                Name:{" "}
                <Text as="span" fontWeight="normal">
                  {profileData.fullName}
                </Text>
              </Text>
              <Text fontWeight="600">
                Age:{" "}
                <Text as="span" fontWeight="normal">
                  {profileData.age}
                </Text>
              </Text>
              <Text fontWeight="600">
                Date of Birth:{" "}
                <Text as="span" fontWeight="normal">
                  {profileData.dateOfBirth}
                </Text>
              </Text>
              <Text fontWeight="600">
                Gender:{" "}
                <Text as="span" fontWeight="normal">
                  {profileData.gender}
                </Text>
              </Text>
              <Text fontWeight="600">
                Email:{" "}
                <Text as="span" fontWeight="normal">
                  {profileData.email}
                </Text>
              </Text>
              <Text fontWeight="600">
                Phone:{" "}
                <Text as="span" fontWeight="normal">
                  {profileData.phone}
                </Text>
              </Text>
              <Text fontWeight="600">
                Address:{" "}
                <Text as="span" fontWeight="normal">
                  {profileData.address}
                </Text>
              </Text>
              <Text fontWeight="600">
                Occupation:{" "}
                <Text as="span" fontWeight="normal">
                  {profileData.occupation}
                </Text>
              </Text>
            </Box>
          </>
        )}
        {loading && (
          <Center>
            <Spinner size="lg" mt="1rem" />
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default RefereePage;
