import React, { useState } from "react";
import {
  Box,
  Text,
  Avatar,
  Input,
  Select,
  FormLabel,
  Flex,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { imageUpload } from "../../../../helper/imageUpload";
import useLoginUser from "../../../../hooks/useLoginUser";
import { updateManagerPlayer } from "../../../../api/api";
import toast from "react-hot-toast";
import { checkFileType } from "../../../../helper/fileCheck";

const BasicInfoForm = ({ initialValues, toggle, setPlayer }) => {
  const { loginUser } = useLoginUser();
  const [playerAvatar, setPlayerAvatar] = useState(initialValues.avatar);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    dateOfBirth: Yup.date().required("Required"),
    age: Yup.number().required("Required").positive().integer(),
    gender: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    preferredWing: Yup.string().required("Required"),
    yearsPlaying: Yup.number().required("Required").positive().integer(),
    hoursPerWeek: Yup.number().required("Required").positive().integer(),
  });

  const sanitizedInitialValues = {
    fullName: initialValues.fullName || "",
    dateOfBirth: formatDate(initialValues.dateOfBirth),
    age: initialValues.age || "",
    gender: initialValues.gender || "",
    phone: initialValues.phone || "",
    avatar: initialValues.avatar || "https://bit.ly/broken-link",
    preferredWing: initialValues.preferredWing || "",
    yearsPlaying: initialValues.yearsPlaying || "",
    hoursPerWeek: initialValues.hoursPerWeek || "",
  };

  const handleAvatar = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Show the selected image as a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPlayerAvatar(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpdate = async (values) => {
    let toastId = toast.loading("Updating...");
    let newAvatar = playerAvatar;

    // Image Upload Logic (if a new file is selected)
    if (file) {
      try {
        if (!checkFileType(file, "image-upload")) {
          toast.error("Please select a JPG or PNG image!", { id: toastId });
          return;
        }

        setSubmitting(true);

        // Update the toast message dynamically as the upload progresses
        newAvatar = await imageUpload(file, (percentCompleted) => {
          toast.loading(`Uploading ${percentCompleted}%`, {
            id: toastId,
          });
        });

        if (!newAvatar) {
          toast.error("Error uploading image", { id: toastId });
          return;
        }

        setPlayerAvatar(newAvatar);
      } catch (error) {
        console.log(error);
        toast.error("Error uploading image", { id: toastId });
        return;
      } finally {
        setSubmitting(false);
      }
    }

    try {
      setSubmitting(true);

      toast.loading(`Saving..`, {
        id: toastId,
      });

      const res = updateManagerPlayer(
        loginUser.token,
        initialValues._id,
        values
      );

      setPlayer((prev) => ({ ...prev, ...values, avatar: newAvatar }));
      toggle();

      toast.success("Player Updated", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Error creating player", { id: toastId });
    } finally {
      setSubmitting(true);
    }
  };

  return (
    <Box flex={1}>
      <Formik
        initialValues={sanitizedInitialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const updatedData = {
            ...values,
            avatar: playerAvatar,
          };
          handleUpdate(updatedData);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Box
              p="1rem"
              borderRadius="10px"
              bg="rgba(255, 255, 255, 0.1)"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
              backdropFilter="blur(10px)"
              maxHeight="465px"
              overflowY="auto"
              className="custom-scrollbar"
              mb={{ base: ".5rem", md: 0 }}
            >
              <Box
                className="childBoxHeading"
                fontWeight="600"
                fontSize="1rem"
                position="relative"
                p="10px 20px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text color="#FAFAFA">BASIC INFORMATION</Text>
                <Box
                  cursor="pointer"
                  bg="rgba(255, 255, 255, 0.6)"
                  color="#000"
                  p="5px 10px"
                  borderRadius="md"
                  fontSize="1.1rem"
                  onClick={toggle}
                >
                  <i className="fa-solid fa-xmark"></i>
                </Box>
              </Box>

              <FormControl
                isInvalid={errors.fullName && touched.fullName}
                className="childBox"
                mt="1rem"
              >
                <Text mb="1rem" fontWeight="600">
                  PLAYER NAME
                </Text>
                <Input
                  name="fullName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                />
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              </FormControl>

              <FormControl className="childBox" mt="1rem">
                <Text mb="1rem" fontWeight="600">
                  AVATAR
                </Text>
                <FormLabel htmlFor="team-avatar" mb=".5rem">
                  <Avatar
                    size="md"
                    src={playerAvatar}
                    mt=".5rem"
                    cursor="pointer"
                  />
                  <Input
                    id="team-avatar"
                    type="file"
                    onChange={handleAvatar}
                    display="none"
                  />
                </FormLabel>
              </FormControl>

              <FormControl
                isInvalid={errors.age && touched.age}
                className="childBox"
                mt="1rem"
              >
                <Text mb="1rem" fontWeight="600">
                  Age
                </Text>
                <Input
                  name="age"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                />
                <FormErrorMessage>{errors.age}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.dateOfBirth && touched.dateOfBirth}
                className="childBox"
                mt="1rem"
              >
                <Text mb="1rem" fontWeight="600">
                  DOB
                </Text>
                <Input
                  type="date"
                  name="dateOfBirth"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateOfBirth}
                />
                <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.gender && touched.gender}
                className="childBox"
                mt="1rem"
              >
                <Text mb="1rem" fontWeight="600">
                  Gender
                </Text>
                <Select
                  name="gender"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.phone && touched.phone}
                className="childBox"
                mt="1rem"
              >
                <Text mb="1rem" fontWeight="600">
                  Phone
                </Text>
                <Input
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.preferredWing && touched.preferredWing}
                className="childBox"
                mt="1rem"
              >
                <Text mb="1rem" fontWeight="600">
                  Preferred Wing
                </Text>
                <Select
                  name="preferredWing"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.preferredWing}
                >
                  <option value="">Select Wing</option>
                  <option value="LW">LW</option>
                  <option value="RW">RW</option>
                </Select>
                <FormErrorMessage>{errors.preferredWing}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.yearsPlaying && touched.yearsPlaying}
                className="childBox"
                mt="1rem"
              >
                <Text mb="1rem" fontWeight="600">
                  Years of Playing
                </Text>
                <Input
                  name="yearsPlaying"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.yearsPlaying}
                />
                <FormErrorMessage>{errors.yearsPlaying}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.hoursPerWeek && touched.hoursPerWeek}
                className="childBox"
                mt="1rem"
              >
                <Text mb="1rem" fontWeight="600">
                  Hours of Playing per Week
                </Text>
                <Input
                  name="hoursPerWeek"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.hoursPerWeek}
                />
                <FormErrorMessage>{errors.hoursPerWeek}</FormErrorMessage>
              </FormControl>

              <Flex align="center" justify="center" mt="1rem">
                <Button
                  type="submit"
                  colorScheme="teal"
                  isDisabled={submitting}
                >
                  Save
                </Button>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default BasicInfoForm;
