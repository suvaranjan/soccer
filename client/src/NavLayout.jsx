import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
// import Header from "./Header";
import { Box } from "@chakra-ui/react";
import useLoginUser from "./hooks/useLoginUser";
import { useEffect } from "react";
import bgImage from "./Images/main-bg.jpeg";

export default function NavLayout() {
  const { loginUser } = useLoginUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUser) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Box
        w="100%"
        backgroundImage={bgImage}
        backgroundSize="cover"
        backgroundPosition="center"
        pb="2rem"
      >
        <Toaster
          toastOptions={{
            style: {
              fontSize: "1.1rem",
            },
          }}
        />
        {/* <Header /> */}
        <Outlet />
      </Box>
    </>
  );
}
