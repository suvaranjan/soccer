// AddPlayer.js
import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Header from "../../header/Header";
import BasicInfo from "./BasicInfo";
import PlayerStrengths from "./PlayerStrengths";
import TotalValue from "./TotalValue";
import { initialValues } from "./newPlayerInitialValues";
import { validationSchema } from "./validationSchema";
import { imageUpload } from "../../../helper/imageUpload";
import { createPlayer, getBalance } from "../../../api/api";
import useLoginUser from "../../../hooks/useLoginUser";
import { getBalanceCheckMessage } from "../../../logics/balanceLogic";
import toast from "react-hot-toast";

function AddPlayer() {
  const { loginUser } = useLoginUser();
  const [myAvatar, setMyAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  const requiredBalance = {
    zgold: 1500,
    diamond: 2,
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleSubmit = (values) => {
    let myValues = values;
    if (myAvatar) {
      myValues = { ...values, avatar: myAvatar };
    }

    if (balance) {
      const balanceCheckMessage = getBalanceCheckMessage(
        balance,
        requiredBalance
      );
      if (balanceCheckMessage) {
        return toast.error(balanceCheckMessage);
      } else {
        AddNewPlayer(loginUser.token, myValues);
      }
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      await imageUpload(file, setMyAvatar, setUploading);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const res = await getBalance(loginUser.token, {
        userRole: loginUser.role,
      });
      setBalance(res.data.balance);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const AddNewPlayer = async (token, values) => {
    try {
      const res = createPlayer(token, values);

      toast.promise(res, {
        loading: `Adding Player..`,
        success: (res) => {
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
    <Box
      minH="100vh"
      color="#FAFAFA"
      // backgroundImage="url('https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D')"
      // backgroundPosition="center"
      // backgroundSize="cover"
    >
      <Header heading="ADD NEW PLAYER" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
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
                gap=".5rem"
              >
                <BasicInfo
                  myAvatar={myAvatar}
                  handleFileChange={handleFileChange}
                  selectWing={values.selectWing}
                />
                <PlayerStrengths />
              </Box>
              <Box
                flex={{ base: "1", md: "0 0 30%" }}
                borderRadius="10px"
                bg="rgba(255, 255, 255, 0.1)"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                backdropFilter="blur(10px)"
                p="1rem"
              >
                <TotalValue
                  balance={balance}
                  requiredBalance={requiredBalance}
                  loading={loading}
                />

                <Flex align="center" w="100%" justify="center">
                  <button className="btn-grad" type="submit">
                    Create New Player
                  </button>
                </Flex>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default AddPlayer;
