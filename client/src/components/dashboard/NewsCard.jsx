import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getAllMatches } from "../../api/api";
import useLoginUser from "../../hooks/useLoginUser";
import useStore from "../../zustand/store";

const NewsCard = () => {
  const { loginUser } = useLoginUser();
  const navigate = useNavigate();
  const { matches, setMatches } = useStore();
  const [isLoading, setIsLoading] = useState(true); // Start with loading

  useEffect(() => {
    if (matches.length === 0) {
      fetchMatches();
    } else {
      setIsLoading(false);
    }
  }, [matches]);

  const fetchMatches = async () => {
    try {
      const res = await getAllMatches(loginUser.token, 1, 3);
      setMatches(res.data.matches);
    } catch (error) {
      if (error?.response?.data?.error === "token-error") {
        localStorage.removeItem("loginUser");
        navigate("/login");
      }

      if (error?.response?.data?.msg === "User not found") {
        toast.error("User not found");
        localStorage.removeItem("loginUser");
        navigate("/login");
      }
      // console.log("Error fetching matches:", error);
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const renderMessage = () => {
    if (isLoading) {
      return "Loading...";
    } else if (matches.length === 0) {
      return "No matches found";
    }
    return null;
  };

  return (
    <Box mt={{ base: 4, md: 0, lg: 0 }}>
      {isLoading || matches.length === 0 ? (
        <Box
          width="344px"
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          boxShadow="md"
          bg="gray.200"
        >
          <Text fontSize="lg" color="gray.500">
            {renderMessage()}
          </Text>
        </Box>
      ) : (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {matches.map((match) => (
            <SwiperSlide key={match._id}>
              <MatchCard match={match} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};

const MatchCard = ({ match }) => {
  const navigate = useNavigate();

  const navigateToMatch = (matchId) => {
    navigate(`/match/${matchId}`);
  };

  return (
    <Box
      width="344px"
      height="200px"
      position="relative"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      bgImage={`url(${match.photo})`}
      bgSize="cover"
      bgPosition="center"
      mb={4}
    >
      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        bg="rgba(0, 0, 0, 0.5)"
        color="white"
        p="4"
        textAlign="center"
      >
        <Text fontWeight="bold" fontSize="md">
          {new Date(match.date).toLocaleDateString()}{" "}
          {new Date(match.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Button
          mt={2}
          colorScheme="blue"
          onClick={() => navigateToMatch(match._id)}
          size="xs"
        >
          View Match
        </Button>
      </Box>
    </Box>
  );
};

export default NewsCard;
