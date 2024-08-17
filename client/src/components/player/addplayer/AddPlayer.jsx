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
import { checkFileType } from "../../../helper/fileCheck";

function AddPlayer() {
  const { loginUser } = useLoginUser();
  const [myAvatar, setMyAvatar] = useState("https://bit.ly/broken-link");
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Show the selected image as a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setMyAvatar(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (values) => {
    let toastId = toast.loading("Adding Player...");
    let newAvatar = myAvatar;

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

        console.log(newAvatar);

        if (!newAvatar) {
          toast.error("Error uploading image", { id: toastId });
          return;
        }

        setMyAvatar(newAvatar);
      } catch (error) {
        console.log(error);
        toast.error("Error uploading image", { id: toastId });
        return;
      } finally {
        setSubmitting(false);
      }
    }

    let myValues = { ...values, avatar: newAvatar };

    try {
      setSubmitting(true);

      toast.loading(`Saving..`, {
        id: toastId,
      });

      const res = await createPlayer(loginUser.token, myValues);
      toast.success("New Player Created", { id: toastId });
      navigate(`/player/${res.data.playerId}`);
    } catch (error) {
      console.log(error);
      toast.error("Error creating player", { id: toastId });
    } finally {
      setSubmitting(true);
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
