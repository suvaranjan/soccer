import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Text,
  Avatar,
  Checkbox,
  Button,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import initialValues from "../formik/initialValues";
import validation from "../formik/validation";
import Header from "../../header/Header";
import { imageUpload } from "../../../helper/imageUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Awards from "./Awards";

function LeagueForm() {
  const [leaguePhoto, setLeaguePhoto] = useState("");
  const [uploading, setUploading] = useState(false);
  const [stage, setStage] = useState("");
  const [stageSelected, setStageSelected] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      await imageUpload(file, setLeaguePhoto, setUploading);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectStage = (value) => {
    setStage(value);
  };

  const proceedToForm = () => {
    if (stage) {
      setStageSelected(true);
    } else {
      toast.error("Please select a stage.");
    }
  };

  return (
    <Box minH="100vh" color="#FAFAFA" display="flex" flexDirection="column">
      <Header heading="CREATE LEAGUE" />

      {!stageSelected ? (
        <Flex
          height="80vh"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box
            bg="rgba(255, 255, 255, 0.2)"
            p="2rem"
            borderRadius="10px"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            backdropFilter="blur(10px)"
            textAlign="center"
          >
            <Text fontSize="2xl" mb="1rem" fontWeight="600">
              Select Stage
            </Text>
            <Select
              onChange={(e) => handleSelectStage(e.target.value)}
              mb="1rem"
            >
              <option value={null} style={{ color: "#000" }}>
                Select a stage
              </option>
              <option value="Round Robin" style={{ color: "#000" }}>
                Round Robin
              </option>
              <option value="Round Robin + Knock Out" style={{ color: "#000" }}>
                Round Robin + Knock Out
              </option>
              <option value="Knock-out Rounds" style={{ color: "#000" }}>
                Knock-out Rounds
              </option>
            </Select>
            <Button onClick={proceedToForm} colorScheme="blue">
              Proceed
            </Button>
          </Box>
        </Flex>
      ) : (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={handleFormSubmit}
          >
            {({ values, errors, touched }) => (
              <Form>
                <Box
                  display="flex"
                  flexDir={{ base: "column", md: "row" }}
                  mt="2rem"
                  gap=".5rem"
                  p="1rem"
                >
                  <Box
                    display={{ base: "block", md: "flex" }}
                    flex={{ base: "1", md: "0 0 70%" }}
                  >
                    <Box
                      mr={{ base: 0, md: 2 }}
                      mb={{ base: 2, md: 0 }}
                      bg="rgba(255, 255, 255, 0.1)"
                      p="1rem"
                      flex="1"
                      borderRadius="10px"
                      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                      backdropFilter="blur(10px)"
                      maxHeight="465px"
                      overflowY="auto"
                      className="custom-scrollbar"
                    >
                      <Box className="childBox">
                        <Text mb="1rem" fontWeight="600">
                          LEAGUE NAME
                        </Text>
                        <Field name="name">
                          {({ field }) => <Input {...field} id="name" />}
                        </Field>
                        {errors.name && touched.name ? (
                          <Box className="error-box">{errors.name}</Box>
                        ) : null}
                      </Box>
                      <Box className="childBox">
                        <Text mb="1rem" fontWeight="600">
                          LEAGUE PHOTO
                        </Text>
                        <label htmlFor="photo-upload">
                          <Avatar
                            size="md"
                            src={leaguePhoto}
                            mt=".5rem"
                            cursor="pointer"
                          />
                          <Input
                            id="photo-upload"
                            type="file"
                            onChange={handleFileChange}
                            display="none"
                          />
                        </label>
                        {errors.photo && touched.photo ? (
                          <Box className="error-box">{errors.photo}</Box>
                        ) : null}
                      </Box>
                      <Box className="childBox">
                        <Text mb="1rem" fontWeight="600">
                          ADD DESCRIPTION
                        </Text>
                        <Field name="description">
                          {({ field }) => <Input {...field} id="description" />}
                        </Field>
                        {errors.description && touched.description ? (
                          <Box className="error-box">{errors.description}</Box>
                        ) : null}
                      </Box>
                    </Box>

                    <Box
                      bg="rgba(255, 255, 255, 0.1)"
                      p="1rem"
                      flex="1"
                      borderRadius="10px"
                      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                      backdropFilter="blur(10px)"
                      maxHeight="465px"
                      overflowY="auto"
                      className="custom-scrollbar"
                    >
                      <Box className="childBox">
                        <Text mb="1rem" fontWeight="600">
                          DATE
                        </Text>
                        <Field name="date">
                          {({ field }) => (
                            <Input {...field} type="date" id="date" />
                          )}
                        </Field>
                        {errors.date && touched.date ? (
                          <Box className="error-box">{errors.date}</Box>
                        ) : null}
                      </Box>
                      <Box className="childBox">
                        <Text mb="1rem" fontWeight="600">
                          TIME
                        </Text>
                        <Field name="time">
                          {({ field }) => (
                            <Input {...field} type="time" id="time" />
                          )}
                        </Field>
                        {errors.time && touched.time ? (
                          <Box className="error-box">{errors.time}</Box>
                        ) : null}
                      </Box>
                      <Box className="childBox">
                        <Text mb="1rem" fontWeight="600">
                          VENUE
                        </Text>
                        <Field name="venue">
                          {({ field }) => <Input {...field} id="venue" />}
                        </Field>
                        {errors.venue && touched.venue ? (
                          <Box className="error-box">{errors.venue}</Box>
                        ) : null}
                      </Box>
                      <Box className="childBox">
                        <Text mb="1rem" fontWeight="600">
                          MAX TEAMS
                        </Text>
                        <Field name="maxTeams">
                          {({ field }) => (
                            <Input {...field} id="maxTeams" type="number" />
                          )}
                        </Field>
                        {errors.maxTeams && touched.maxTeams ? (
                          <Box className="error-box">{errors.maxTeams}</Box>
                        ) : null}
                      </Box>
                      <Box className="childBox">
                        <Text mb="1rem" fontWeight="600">
                          DIAMOND LEVEL
                        </Text>
                        <Field name="diamondLevel">
                          {({ field }) => (
                            <Input {...field} id="diamondLevel" type="number" />
                          )}
                        </Field>
                        {errors.diamondLevel && touched.diamondLevel ? (
                          <Box className="error-box">{errors.diamondLevel}</Box>
                        ) : null}
                      </Box>
                      <Box className="childBox">
                        <Text mb="1rem" fontWeight="600">
                          ZGOLD LEVEL
                        </Text>
                        <Field name="zgoldLevel">
                          {({ field }) => (
                            <Input {...field} id="zgoldLevel" type="number" />
                          )}
                        </Field>
                        {errors.zgoldLevel && touched.zgoldLevel ? (
                          <Box className="error-box">{errors.zgoldLevel}</Box>
                        ) : null}
                      </Box>
                      <Box className="childBox">
                        <Text mb="1rem" fontWeight="600">
                          DEPOSIT
                        </Text>
                        <Field name="deposit">
                          {({ field }) => (
                            <Input {...field} id="deposit" type="number" />
                          )}
                        </Field>
                        {errors.deposit && touched.deposit ? (
                          <Box className="error-box">{errors.deposit}</Box>
                        ) : null}
                      </Box>
                      <Box className="childBox">
                        <Field name="public">
                          {({ field }) => (
                            <Checkbox
                              {...field}
                              id="public"
                              isChecked={field.value}
                            >
                              PUBLIC
                            </Checkbox>
                          )}
                        </Field>
                        {errors.public && touched.public ? (
                          <Box className="error-box">{errors.public}</Box>
                        ) : null}
                      </Box>
                      <Box className="childBox">
                        <Field name="private">
                          {({ field }) => (
                            <Checkbox
                              {...field}
                              id="private"
                              isChecked={field.value}
                            >
                              PRIVATE
                            </Checkbox>
                          )}
                        </Field>
                        {errors.private && touched.private ? (
                          <Box className="error-box">{errors.private}</Box>
                        ) : null}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    flex={{ base: "1", md: "0 0 29%" }}
                    background="linear-gradient(90deg, rgba(255,50,37,0.6) 0%, rgba(46,149,171,0.6) 65%, rgba(14,233,246,0.6) 100%)"
                    borderRadius="10px"
                    boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                    backdropFilter="blur(10px)"
                    p="1rem"
                  >
                    <Awards />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center" mt="2rem">
                  <Button colorScheme="blue" type="submit">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Box>
  );
}

export default LeagueForm;
