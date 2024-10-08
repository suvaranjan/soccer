import { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { validateSignup } from "./validate";
import useStore from "../../zustand/store";
import axios from "axios";
import { baseUrl } from "../../api/api";
import bgImage from "../../Images/main-bg.jpeg";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { myRole } = useStore((state) => state);
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formValues = { email, password, userName };
    const validationErrors = validateSignup(formValues);

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/register`, {
        email,
        password,
        userName,
        role: myRole,
      });
      toast({
        title: "Registration Successfull",
        // description: "Something went wrong",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
        containerStyle: {
          fontSize: "1rem",
        },
      });
      navigate("/login");
    } catch (error) {
      console.log("Registration failed:", error.message);
      toast({
        title: "Registration Failed",
        description: error.response?.data?.msg || "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
        containerStyle: {
          fontSize: "1rem",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      backgroundImage={bgImage}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        w="100%"
        boxShadow="lg"
        display="flex"
        minH="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          id="formBox"
          p={{ base: "1rem", md: "1rem", lg: "2rem" }}
          width={{ base: "90vw", md: "80vw", lg: "40vw" }}
          borderRadius="md"
          boxShadow="lg"
          maxW="500px"
          bg="rgba(173, 216, 230, 0.2)"
          backdropFilter="blur(3px)"
        >
          <Box color="#FAFAFA">
            <Heading fontSize="1.5rem" textAlign="center">
              Register
            </Heading>
            <Box mt={4} fontSize=".8rem" textAlign="center">
              <Text display="inline" mr={1}>
                Have an account?
              </Text>
              <Button
                onClick={() => navigate("/login")}
                colorScheme="green"
                size="xs"
              >
                Login
              </Button>
            </Box>
          </Box>
          <Box mt={8} as="form" onSubmit={handleRegister}>
            <Box
              bg="#C6F6D5"
              p="8px"
              borderRadius="md"
              mb={3}
              fontSize=".8rem"
              fontWeight="500"
            >
              Role Selected :
              <Text
                display="inline"
                ml={1}
                fontWeight="700"
                color="#2F855A"
                textTransform="uppercase"
              >
                {myRole}
              </Text>
            </Box>
            <FormControl isInvalid={errors.userName}>
              <Input
                type="text"
                placeholder="Username"
                maxW="500px"
                bg="#FAFAFA"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <FormErrorMessage>{errors.userName}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email} mt={4}>
              <Input
                type="email"
                placeholder="Email"
                maxW="500px"
                bg="#FAFAFA"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} mt={4}>
              <Input
                type="password"
                placeholder="Password"
                maxW="500px"
                bg="#FAFAFA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              mt="1rem"
              w="100%"
              colorScheme="teal"
              background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
              _hover={{
                background:
                  "linear-gradient(90deg, rgba(205,0,0,1) 0%, rgba(36,129,151,1) 65%, rgba(4,213,226,1) 100%)",
              }}
              borderRadius="none"
              isLoading={loading}
            >
              Signup
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
