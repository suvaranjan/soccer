import { Box, Image, Text } from "@chakra-ui/react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../../hooks/useLoginUser";

function Setting() {
  const navigate = useNavigate();
  const { loginUser } = useLoginUser();
  return (
    <Box
      minH="100vh"
      color="#000"
      // backgroundImage="url('https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D')"
      // backgroundSize="cover"
      // backgroundPosition="center"
    >
      <Header heading="Setting" />
      <Box
        width="85vw"
        margin="auto"
        p="1rem"
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        mt="2rem"
        gap="1rem"
        // border="2px solid yellow"
        borderRadius="md"
        bg="rgba(255, 255, 255, 0.1)"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
      >
        <Box
          display={{ base: "block", md: "flex" }}
          flex={{ base: "1", md: "0 0 60%" }}
          flexDir="column"
          borderRadius="md"
          gap="1rem"
        >
          <Box
            display={{ base: "block", md: "block", lg: "flex" }}
            w="100%"
            gap={2}
            mb={{ base: "1rem", md: 0 }}
          >
            <Box
              minH="250px"
              w="100%"
              //   p={1}
              border="2px solid #FAFAFA"
              borderRadius="md"
              //   bg="rgba(255, 255, 255, 0.2)"
              mb={{ base: "1rem", md: 0 }}
              backdropFilter="blur(10px)"
              bg="url('https://res.cloudinary.com/suvaranjan/image/upload/v1717570389/chhose-team_g4azpn.jpg')"
              backgroundSize="cover"
              backgroundPosition="center"
              className="box-hover-effect"
            >
              <Text
                textAlign="center"
                fontSize="1.2rem"
                fontWeight="700"
                p={1}
                bg="rgba(255, 255, 255, 10)"
              >
                My Teams
              </Text>
            </Box>
            <Box
              minH="250px"
              w="100%"
              border="2px solid #FAFAFA"
              borderRadius="md"
              bg="url('https://res.cloudinary.com/suvaranjan/image/upload/v1717842357/pexels-pixabay-262524-min_aag2kq.jpg')"
              backgroundSize="cover"
              backgroundPosition="center"
              backdropFilter="blur(10px)"
              className="box-hover-effect"
            >
              <Text
                textAlign="center"
                fontSize="1.2rem"
                fontWeight="700"
                p={1}
                bg="rgba(255, 255, 255, 10)"
              >
                My Players
              </Text>
            </Box>
          </Box>
          <Box display={{ base: "block", md: "flex" }} flexDir="column">
            <Box
              display={{ base: "block", md: "flex" }}
              w="100%"
              gap={2}
              mb={{ base: "1rem", md: "1rem" }}
            >
              <Box
                minH="130px"
                w="100%"
                border="2px solid #FAFAFA"
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.2)"
                backdropFilter="blur(10px)"
                mb={{ base: "1rem", md: 0 }}
                p={2}
                className="box-hover-effect"
              >
                <Box
                  bg="rgba(255, 255, 255, .9)"
                  h="100%"
                  p={4}
                  borderRadius="md"
                >
                  <Box display="flex" justifyContent="space-between">
                    <Text fontWeight="700" fontSize="1.3rem">
                      Set
                    </Text>
                    <i className="fa-solid fa-bell reminder-icon"></i>
                  </Box>
                  <Text fontWeight="700" fontSize="2rem">
                    Reminder
                  </Text>
                </Box>
              </Box>
              <Box
                minH="130px"
                w="100%"
                p={1}
                border="2px solid #FAFAFA"
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.2)"
                backdropFilter="blur(10px)"
                className="box-hover-effect"
              >
                <Box
                  bg="rgba(255, 255, 255, .9)"
                  h="100%"
                  p={4}
                  borderRadius="md"
                >
                  <Box display="flex" justifyContent="space-between">
                    <Text fontWeight="700" fontSize="1.3rem">
                      Your
                    </Text>

                    <i className="fa-solid fa-chart-simple reminder-icon"></i>
                  </Box>
                  <Text fontWeight="700" fontSize="2rem">
                    Sponsers
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              display={{ base: "block", md: "flex" }}
              w="100%"
              gap={2}
              mb={{ base: "1rem", md: 0 }}
            >
              <Box
                minH="130px"
                w="100%"
                p={1}
                border="2px solid #FAFAFA"
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.2)"
                backdropFilter="blur(10px)"
                className="box-hover-effect"
                onClick={() => navigate("/profile")}
              >
                <Box
                  bg="rgba(255, 255, 255, .9)"
                  h="100%"
                  p={4}
                  borderRadius="md"
                >
                  <Box display="flex" justifyContent="space-between">
                    <Text fontWeight="700" fontSize="1.3rem">
                      Your
                    </Text>

                    <i className="fa-solid fa-user reminder-icon"></i>
                  </Box>
                  <Text fontWeight="700" fontSize="2rem">
                    Profile
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          border="2px solid #FAFAFA"
          flex={{ base: "1", md: "0 0 39%" }}
          borderRadius="md"
          background="linear-gradient(90deg, rgba(255,50,37,0.6) 0%, rgba(46,149,171,0.6) 65%, rgba(14,233,246,0.6) 100%)"

          //   className="box-hover-effect"
        >
          <Image
            src="https://res.cloudinary.com/suvaranjan/image/upload/v1717651774/dashboard-player_nbsjew.png"
            height="500"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Setting;
