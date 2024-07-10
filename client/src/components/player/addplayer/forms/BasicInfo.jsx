import React from "react";
import {
  Box,
  Text,
  Input,
  Avatar,
  Image,
  Flex,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import { ErrorMessage } from "formik";

const BasicInfo = ({ myAvatar, handleFileChange, formik }) => {
  return (
    <Box
      p="1rem"
      flex="1"
      borderRadius="10px"
      bg="rgba(255, 255, 255, 0.1)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      maxHeight="465px"
      overflowY="auto"
      className="custom-scrollbar"
      mb={{ base: ".5rem", md: 0 }}
    >
      <Box className="childBoxHeading">
        <Text fontWeight="600" fontSize="1.5rem">
          BASIC INFORMATION
        </Text>
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          PLAYER NAME
        </Text>
        <Input
          name="fullName"
          placeholder="Enter Player Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
        <ErrorMessage name="fullName" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          AVATAR
        </Text>
        <label htmlFor="avatar-upload">
          <Avatar size="md" src={myAvatar} mt=".5rem" cursor="pointer" />
          <Input
            id="avatar-upload"
            name="avatar"
            type="file"
            onChange={handleFileChange}
            display="none"
          />
        </label>
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Age
        </Text>
        <Input
          name="age"
          placeholder="Enter Player Age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
        />
        <ErrorMessage name="age" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          DOB
        </Text>
        <Input
          name="dateOfBirth"
          type="date"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage name="dateOfBirth" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Gender
        </Text>
        <Select
          name="gender"
          placeholder="Select Gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>
        <ErrorMessage name="gender" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Phone
        </Text>
        <Input
          name="phone"
          placeholder="Enter Phone Number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
        <ErrorMessage name="phone" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Years Of Playing
        </Text>
        <Input
          name="yearsPlaying"
          placeholder="Enter Years Of Playing"
          value={formik.values.yearsPlaying}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
        />
        <ErrorMessage name="yearsPlaying" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Hours Of Playing Per Week
        </Text>
        <Input
          name="hoursPerWeek"
          placeholder="Enter Hours Of Playing Per Week"
          value={formik.values.hoursPerWeek}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
        />
        <ErrorMessage name="hoursPerWeek" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Preferred Wing
        </Text>
        <RadioGroup
          name="preferredWing"
          value={formik.values.preferredWing}
          onChange={(value) => formik.setFieldValue("preferredWing", value)}
          onBlur={formik.handleBlur}
        >
          <Flex gap="3rem">
            <Box>
              <Radio value="LW">
                <Image src="https://res.cloudinary.com/suvaranjan/image/upload/v1717828085/Foot_Left_thrajd.png" />
              </Radio>
            </Box>
            <Box>
              <Radio value="RW">
                <Image src="https://res.cloudinary.com/suvaranjan/image/upload/v1717828561/Foot_Right_kg7lae.png" />
              </Radio>
            </Box>
          </Flex>
        </RadioGroup>
        <ErrorMessage name="preferredWing" component="div" className="error" />
      </Box>
    </Box>
  );
};

export default BasicInfo;
