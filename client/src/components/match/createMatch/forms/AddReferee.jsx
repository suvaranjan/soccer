import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

const AddReferee = ({
  referees,
  selectedReferees,
  setSelectedReferees,
  formikProps,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddReferee = (referee) => {
    const newSelectedReferees = [...selectedReferees, referee];
    setSelectedReferees(newSelectedReferees);
    formikProps.setFieldValue(
      "referees",
      newSelectedReferees.map((ref) => ref._id)
    );
    const totalRefFee = newSelectedReferees.reduce(
      (acc, ref) => acc + ref.fee,
      0
    );
    formikProps.setFieldValue("fees.refFee", totalRefFee);
  };

  const handleRemoveReferee = (referee) => {
    const newSelectedReferees = selectedReferees.filter(
      (ref) => ref._id !== referee._id
    );
    setSelectedReferees(newSelectedReferees);
    formikProps.setFieldValue(
      "referees",
      newSelectedReferees.map((ref) => ref._id)
    );
    const totalRefFee = newSelectedReferees.reduce(
      (acc, ref) => acc + ref.fee,
      0
    );
    formikProps.setFieldValue("fees.refFee", totalRefFee);
  };

  return (
    <Box
      flex={1}
      mb={8}
      p={2}
      bg="rgba(255, 255, 255, 0.1)"
      color="#FAFAFA"
      borderRadius="md"
      mr={{ base: "0", md: "10px" }}
    >
      <Box className="childBoxHeading">
        <Text fontWeight="600" fontSize="1.5rem">
          REFEREE INFORMATION
        </Text>
      </Box>

      <Box maxH="380px" overflowY="auto" className="custom-scrollbar">
        <FormControl mb={4}>
          <Input
            placeholder="Search for referee"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FormControl>

        <Stack spacing={4}>
          {referees
            .filter((referee) =>
              referee.user.userName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((referee) => {
              const isSelected = selectedReferees.some(
                (selectedRef) => selectedRef._id === referee._id
              );
              return (
                <Box
                  key={referee.user._id}
                  p={4}
                  bg="#f0f0f0"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" gap={2} alignItems="center">
                    <Avatar src={referee.avatar} />
                    <Text color="#000" fontSize="1rem" fontWeight="600">
                      {referee.user.userName}
                    </Text>
                  </Box>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleAddReferee(referee)}
                    isDisabled={isSelected}
                  >
                    {isSelected ? "Added" : "Add"}
                  </Button>
                </Box>
              );
            })}
        </Stack>
      </Box>

      {selectedReferees.length > 0 && (
        <Box mt={4} maxH="380px" overflowY="auto" className="custom-scrollbar">
          <Text fontWeight="600" fontSize="1.2rem">
            Selected Referees
          </Text>
          <Stack spacing={4} mt={2}>
            {selectedReferees.map((referee) => (
              <Box
                key={referee.user._id}
                p={2}
                bg="#f0f0f0"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" gap={2} alignItems="center">
                  <Avatar src={referee.avatar} />
                  <Text color="#000" fontSize="1rem" fontWeight="600">
                    {referee.user.userName}
                  </Text>
                </Box>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRemoveReferee(referee)}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default AddReferee;
