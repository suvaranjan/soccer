import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import { imageUpload } from "../../helper/imageUpload";
import toast from "react-hot-toast";
import useLoginUser from "../../hooks/useLoginUser";
import {
  updateManagerBasicInfo,
  updatePlayerBasicInfo,
  updatePlayerStrength,
  updateRefereeBasicInfo,
  updateRefereeFee,
  updateUserProfile,
} from "../../api/api";
import useStore from "../../zustand/store";
import { checkFileType } from "../../helper/fileCheck";

export function FirstCardForm({ data, toggleFirstCard }) {
  const [userName, setUserName] = useState(data.userName || "");
  const [avatar, setAvatar] = useState(data.avatar || "");
  const [submitting, setSubmitting] = useState(false);
  const { loginUser } = useLoginUser();
  const { profileData, setProfileData, headerData, setHeaderData } = useStore(
    (state) => state
  );
  const [file, setFile] = useState(null);

  const handleSave = async () => {
    // Check if any changes were made
    if (userName === data.userName && !file) {
      toggleFirstCard();
      console.log("No changes made");
      return;
    }

    if (userName === "") {
      toast.error("Please fill the required fields");
      return;
    }

    let toastId = toast.loading("Saving..."); // Initialize with a single loading toast
    let newAvatar = avatar;

    // Image Upload Logic (if a new file is selected)
    if (file) {
      try {
        if (!checkFileType(file, "image-upload")) {
          toast.error("Please select a JPG or PNG image!", { id: toastId });
          return;
        }

        setSubmitting(true);

        newAvatar = await imageUpload(file, (percentCompleted) => {
          toast.loading(`Uploading ${percentCompleted}%`, {
            id: toastId,
          });
        });

        if (!newAvatar) {
          toast.error("Error uploading image", { id: toastId });
          return;
        }

        setAvatar(newAvatar);
      } catch (error) {
        toast.error("Error uploading image", { id: toastId });
        return;
      } finally {
        setSubmitting(false);
      }
    }

    // Saving Updated Data with the latest avatar URL
    try {
      setSubmitting(true);

      toast.loading(`Saving..`, {
        id: toastId,
      });

      await updateUserProfile(loginUser.token, {
        userName,
        avatar: newAvatar, // Use the updated avatar URL
      });

      const updatedProfile = {
        ...profileData,
        userName,
        avatar: newAvatar,
      };

      const updatedHeader = {
        ...headerData,
        userName,
        avatar: newAvatar,
      };

      setProfileData(updatedProfile);
      setHeaderData(updatedHeader);
      toggleFirstCard();

      toast.success("Profile Updated", { id: toastId });
    } catch (error) {
      toast.error("Error updating profile", { id: toastId });
    } finally {
      setSubmitting(true);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Show the selected image as a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Box
      bg="rgba(255, 255, 255, 0.2)"
      p="1rem"
      borderRadius="md"
      mb=".5rem"
      position="relative"
    >
      <FormControl isRequired mt={4} mb={2}>
        <FormLabel>Avatar</FormLabel>
        <Box display="flex" alignItems="center" gap={2}>
          <label htmlFor="avatar-upload">
            <Avatar size="lg" src={avatar} mt=".5rem" cursor="pointer" />
            <Input
              id="avatar-upload"
              type="file"
              onChange={handleFileChange}
              display="none"
            />
          </label>
        </Box>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>User Name</FormLabel>
        <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
      </FormControl>

      <Button
        mt={4}
        colorScheme="teal"
        onClick={handleSave}
        isDisabled={submitting}
      >
        Save
      </Button>
      <Box
        position="absolute"
        top="10px"
        right="20px"
        zIndex="1"
        cursor="pointer"
        bg="rgba(255, 255, 255, 0.6)"
        color="#000"
        p="5px 10px"
        borderRadius="md"
        fontSize=".9rem"
        onClick={toggleFirstCard}
      >
        <i className="fa-solid fa-xmark"></i>
      </Box>
    </Box>
  );
}

export function PlayerStrengthForm({ data, togglePlayerStrength }) {
  const { loginUser } = useLoginUser();
  const [strengths, setStrengths] = useState(
    data.selfRating || {
      striker: 0,
      winger: 0,
      midfielder: 0,
      wingDefender: 0,
      centralBack: 0,
    }
  );
  const { profileData, setProfileData } = useStore((state) => state);

  const handleSave = () => {
    if (Object.values(strengths).some((value) => value === 0)) {
      return toast.error("Please fill in all fields.");
    }

    try {
      const res = updatePlayerStrength(loginUser.token, {
        striker: strengths.striker,
        winger: strengths.striker,
        midfielder: strengths.midfielder,
        wingDefender: strengths.wingDefender,
        centralBack: strengths.centralBack,
      });

      toast.promise(res, {
        loading: `Updating Profile...`,
        success: (res) => {
          const updatedProfile = {
            ...profileData,
            selfRating: strengths,
          };
          setProfileData(updatedProfile);
          togglePlayerStrength();
          return "Profile Updated";
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
      bg="rgba(255, 255, 255, 0.2)"
      p="1rem"
      borderRadius="md"
      mb=".5rem"
      position="relative"
    >
      <Text fontSize="1.2rem" fontWeight="bold" mb={2}>
        Update Player Strength
      </Text>
      {Object.keys(strengths).map((key) => (
        <FormControl key={key} mt={4}>
          <FormLabel>
            {key.charAt(0).toUpperCase() + key.slice(1)}
            {` :  ${strengths[key]}`}
          </FormLabel>
          <Slider
            value={strengths[key]}
            onChange={(value) => setStrengths({ ...strengths, [key]: value })}
            min={0}
            max={100}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
      ))}
      <Button mt={4} colorScheme="teal" onClick={handleSave}>
        Save
      </Button>
      <Box
        position="absolute"
        top="15px"
        right="25px"
        zIndex="1"
        cursor="pointer"
        bg="rgba(255, 255, 255, 0.6)"
        color="#000"
        p="5px 10px"
        borderRadius="md"
        fontSize="1rem"
        onClick={togglePlayerStrength}
      >
        <i className="fa-solid fa-xmark"></i>
      </Box>
    </Box>
  );
}

export function BasicInfoForm({ data, toggleBasicInfo }) {
  const [fullName, setFullName] = useState(data.fullName || "");
  const [age, setAge] = useState(data.age || "");
  const [dateOfBirth, setDateOfBirth] = useState(data.dob || "");
  const [gender, setGender] = useState(data.gender || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [address, setAddress] = useState(data.address || "");
  const [occupation, setOccupation] = useState(data.occupation || "");
  const { loginUser } = useLoginUser();
  const { profileData, setProfileData } = useStore((state) => state);

  const handleSave = () => {
    if (
      !fullName ||
      !age ||
      !dateOfBirth ||
      !gender ||
      !phone ||
      !address ||
      !occupation
    ) {
      return toast.error("Please fill in all fields.");
    }

    let myFunc;

    if (loginUser.role === "player") {
      myFunc = updatePlayerBasicInfo;
    } else if (loginUser.role === "team-manager") {
      myFunc = updateManagerBasicInfo;
    } else {
      myFunc = updateRefereeBasicInfo;
    }

    try {
      const res = myFunc(loginUser.token, {
        fullName,
        age,
        dateOfBirth,
        gender,
        phone,
        address,
        occupation,
      });

      toast.promise(res, {
        loading: `Updating Profile...`,
        success: (res) => {
          const updatedProfile = {
            ...profileData,
            fullName,
            age,
            dateOfBirth,
            gender,
            phone,
            address,
            occupation,
          };
          setProfileData(updatedProfile);
          toggleBasicInfo();
          return "Profile Updated";
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
      bg="rgba(255, 255, 255, 0.2)"
      p="1rem"
      borderRadius="md"
      mb=".5rem"
      position="relative"
    >
      <Text fontSize="1.2rem" fontWeight="bold" mb={4}>
        Update Basic Information
      </Text>
      <FormControl isRequired>
        <FormLabel>Full Name</FormLabel>
        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Age</FormLabel>
        <Input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Gender</FormLabel>
        <Input value={gender} onChange={(e) => setGender(e.target.value)} />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Phone</FormLabel>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Occupation</FormLabel>
        <Input
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Address</FormLabel>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleSave}>
        Save
      </Button>
      <Box
        position="absolute"
        top="15px"
        right="25px"
        zIndex="1"
        cursor="pointer"
        bg="rgba(255, 255, 255, 0.6)"
        color="#000"
        p="5px 10px"
        borderRadius="md"
        fontSize="1rem"
        onClick={toggleBasicInfo}
      >
        <i className="fa-solid fa-xmark"></i>
      </Box>
    </Box>
  );
}
export function RefFeeForm({ data, toggleRefFee }) {
  const [fee, setFee] = useState(data.fee || 0);

  const { loginUser } = useLoginUser();
  const { profileData, setProfileData } = useStore((state) => state);

  const handleSave = () => {
    if (!fee) {
      return toast.error("Please fill in all fields.");
    }

    try {
      const res = updateRefereeFee(loginUser.token, { fee });

      toast.promise(res, {
        loading: `Updating Profile...`,
        success: (res) => {
          const updatedProfile = {
            ...profileData,
            fee,
          };
          setProfileData(updatedProfile);
          toggleRefFee();
          return "Profile Updated";
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
      bg="rgba(255, 255, 255, 0.2)"
      p="1rem"
      borderRadius="md"
      mb=".5rem"
      position="relative"
    >
      <Text fontSize="1.2rem" fontWeight="bold" mb={4}>
        Update Referee Fee
      </Text>
      <FormControl isRequired mt={4}>
        <FormLabel>Fee</FormLabel>
        <Input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleSave}>
        Save
      </Button>
      <Box
        position="absolute"
        top="15px"
        right="25px"
        zIndex="1"
        cursor="pointer"
        bg="rgba(255, 255, 255, 0.6)"
        color="#000"
        p="5px 10px"
        borderRadius="md"
        fontSize="1rem"
        onClick={toggleRefFee}
      >
        <i className="fa-solid fa-xmark"></i>
      </Box>
    </Box>
  );
}
