import React, { useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Header from "../../header/Header";
import BasicInfo from "./forms/BasicInfo";
import PlayerStrengths from "./forms/PlayerStrengths";
import { initialValues } from "./formik/initialValues";
import { validation } from "./formik/validation";
import { imageUpload } from "../../../helper/imageUpload";
import { createPlayer } from "../../../api/api";
import useLoginUser from "../../../hooks/useLoginUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddPlayer() {
  const { loginUser } = useLoginUser();
  const [myAvatar, setMyAvatar] = useState("https://bit.ly/broken-link");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      await imageUpload(file, setMyAvatar, setUploading);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values) => {
    let myValues = { ...values, avatar: myAvatar };

    try {
      // console.log(myValues);

      const res = createPlayer(loginUser.token, myValues);
      toast.promise(res, {
        loading: `Adding Player..`,
        success: (res) => {
          navigate(`/player/${res.data.playerId}`);
          return "New Player Created";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box minH="100vh" color="#FAFAFA">
      <Header heading="ADD NEW PLAYER" />
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Box display="flex" flexDir="column" mt="2rem" gap=".5rem" p="1rem">
              <Box display={{ base: "block", md: "flex" }} gap=".5rem">
                <BasicInfo
                  myAvatar={myAvatar}
                  handleFileChange={handleFileChange}
                  formik={{
                    values,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                  }}
                />
                <PlayerStrengths
                  formik={{
                    values,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                  }}
                />
              </Box>
              <Flex align="center" w="100%" justify="center" mt="1rem">
                <button type="submit" className="btn-grad">
                  Create New Player
                </button>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default AddPlayer;
