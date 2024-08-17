import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Select,
  Text,
  Flex,
  Image,
  Textarea,
} from "@chakra-ui/react";
import initialValues from "./initialValues";
import validationSchema from "./validate";
import { imageUpload } from "../../../helper/imageUpload";

function FieldForm({
  handleSubmit,
  toggle,
  fieldImage,
  setFieldImage,
  setFile,
}) {
  const [uploading, setUploading] = useState(false);

  const handleFieldImage = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Show the selected image as a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFieldImage(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Box minH="100vh">
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        mt="1rem"
        mx="auto"
        p="2rem"
        borderRadius="md"
        boxShadow="md"
        backdropFilter="blur(10px)"
        color="#FAFAFA"
        maxWidth="600px"
      >
        <Box
          className="childBoxHeading"
          background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
          p="0.5rem"
          borderRadius="10px"
          justifyContent="space-between"
          fontSize="1rem"
          display="flex"
        >
          <Text fontWeight="600" fontSize="1.5rem" ml={2}>
            Add Field Form
          </Text>
          <Box
            cursor="pointer"
            bg="rgba(255, 255, 255, 0.6)"
            color="#000"
            p="7px 10px"
            borderRadius="md"
            fontSize=".9rem"
            onClick={toggle}
            mr={2}
          >
            <i className="fa-solid fa-xmark"></i>
          </Box>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
        >
          {({ isSubmitting, errors, touched, setFieldValue }) => (
            <Form>
              <FormControl
                mb="1rem"
                isInvalid={!!(errors.name && touched.name)}
              >
                <FormLabel htmlFor="name">Field Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  bg="white"
                  color="black"
                  onChange={(e) => setFieldValue("name", e.target.value)}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb="1rem"
                isInvalid={!!(errors.location && touched.location)}
              >
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input
                  id="location"
                  name="location"
                  bg="white"
                  color="black"
                  onChange={(e) => setFieldValue("location", e.target.value)}
                />
                <FormErrorMessage>{errors.location}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb="1rem"
                isInvalid={!!(errors.postalCode && touched.postalCode)}
              >
                <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                <Input
                  id="postalCode"
                  name="postalCode"
                  bg="white"
                  color="black"
                  onChange={(e) => setFieldValue("postalCode", e.target.value)}
                />
                <FormErrorMessage>{errors.postalCode}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb="1rem"
                isInvalid={!!(errors.gate && touched.gate)}
              >
                <FormLabel htmlFor="gate">Field Gate</FormLabel>
                <Input
                  id="gate"
                  name="gate"
                  bg="white"
                  color="black"
                  onChange={(e) => setFieldValue("gate", e.target.value)}
                />
                <FormErrorMessage>{errors.gate}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb="1rem"
                isInvalid={!!(errors.photo && touched.photo)}
              >
                <FormLabel htmlFor="photo">Photo</FormLabel>
                {fieldImage !== "" && (
                  <Button
                    size="sm"
                    colorScheme="cyan"
                    onClick={() => setFieldImage("")}
                  >
                    Change photo
                  </Button>
                )}
                {fieldImage === "" && (
                  <Input
                    type="file"
                    onChange={handleFieldImage}
                    id="photo"
                    name="photo"
                    bg="white"
                    color="black"
                  />
                )}
              </FormControl>
              {fieldImage !== "" && (
                <Image src={fieldImage} maxW="350px" borderRadius="md" mb={2} />
              )}

              <FormControl
                mb="1rem"
                isInvalid={!!(errors.link && touched.link)}
              >
                <FormLabel htmlFor="link">Link</FormLabel>
                <Input
                  id="link"
                  name="link"
                  bg="white"
                  color="black"
                  onChange={(e) => setFieldValue("link", e.target.value)}
                />
                <FormErrorMessage>{errors.link}</FormErrorMessage>
              </FormControl>

              <FormControl mb="1rem" isInvalid={!!(errors.fee && touched.fee)}>
                <FormLabel htmlFor="fee">Field Fee</FormLabel>
                <Input
                  id="fee"
                  name="fee"
                  type="number"
                  bg="white"
                  color="black"
                  onChange={(e) => setFieldValue("fee", e.target.value)}
                />
                <FormErrorMessage>{errors.fee}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb="1rem"
                isInvalid={!!(errors.shower && touched.shower)}
              >
                <FormLabel htmlFor="shower">Shower</FormLabel>
                <Select
                  id="shower"
                  name="shower"
                  bg="white"
                  color="black"
                  onChange={(e) => setFieldValue("shower", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
                <FormErrorMessage>{errors.shower}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb="1rem"
                isInvalid={!!(errors.toilet && touched.toilet)}
              >
                <FormLabel htmlFor="toilet">Toilet</FormLabel>
                <Select
                  id="toilet"
                  name="toilet"
                  bg="white"
                  color="black"
                  onChange={(e) => setFieldValue("toilet", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
                <FormErrorMessage>{errors.toilet}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb="1rem"
                isInvalid={
                  !!(errors.childrenPlayground && touched.childrenPlayground)
                }
              >
                <FormLabel htmlFor="childrenPlayground">
                  Children Playground
                </FormLabel>
                <Select
                  id="childrenPlayground"
                  name="childrenPlayground"
                  bg="white"
                  color="black"
                  onChange={(e) =>
                    setFieldValue("childrenPlayground", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
                <FormErrorMessage>{errors.childrenPlayground}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb="1rem"
                isInvalid={
                  !!(errors.foodCourtNearby && touched.foodCourtNearby)
                }
              >
                <FormLabel htmlFor="foodCourtNearby">
                  Food Court Nearby
                </FormLabel>
                <Select
                  id="foodCourtNearby"
                  name="foodCourtNearby"
                  bg="white"
                  color="black"
                  onChange={(e) =>
                    setFieldValue("foodCourtNearby", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
                <FormErrorMessage>{errors.foodCourtNearby}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb="1rem"
                isInvalid={
                  !!(errors.whereToEatAndDrink && touched.whereToEatAndDrink)
                }
              >
                <FormLabel htmlFor="whereToEatAndDrink">
                  Where to Eat and Drink
                </FormLabel>
                <Textarea
                  id="whereToEatAndDrink"
                  name="whereToEatAndDrink"
                  bg="white"
                  color="black"
                  onChange={(e) =>
                    setFieldValue("whereToEatAndDrink", e.target.value)
                  }
                />
                <FormErrorMessage>{errors.whereToEatAndDrink}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb="1rem"
                isInvalid={!!(errors.deposit && touched.deposit)}
              >
                <FormLabel htmlFor="deposit">Field Deposit</FormLabel>
                <Input
                  id="deposit"
                  name="deposit"
                  type="number"
                  bg="white"
                  color="black"
                  onChange={(e) => setFieldValue("deposit", e.target.value)}
                />
                <FormErrorMessage>{errors.deposit}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb="1rem"
                isInvalid={
                  !!(errors.instructionOrNote && touched.instructionOrNote)
                }
              >
                <FormLabel htmlFor="instructionOrNote">
                  Instruction or Note
                </FormLabel>
                <Textarea
                  id="instructionOrNote"
                  name="instructionOrNote"
                  bg="white"
                  color="black"
                  onChange={(e) =>
                    setFieldValue("instructionOrNote", e.target.value)
                  }
                />
                <FormErrorMessage>{errors.instructionOrNote}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                mt="1rem"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default FieldForm;
