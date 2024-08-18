import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Avatar,
  Text,
  Flex,
  Textarea,
  Image,
  Box,
  IconButton,
  Code,
} from "@chakra-ui/react";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import galleryImage from "../../Images/gallery.png";
import { DeleteIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageUpload } from "../../helper/imageUpload";
import toast from "react-hot-toast";
import useLoginUser from "../../hooks/useLoginUser";
import { createPost } from "../../api/api";

// Validation schema
const validationSchema = Yup.object({
  content: Yup.string().required("Content is required"),
  media: Yup.array().of(
    Yup.object().shape({
      url: Yup.string().required("Media URL is required"),
      mediaType: Yup.string().required("Media type is required"),
    })
  ),
});

// MediaSlider component for displaying selected media
const MediaSlider = ({ mediaItems, onRemove }) => {
  const sliderHeight = "200px"; // Set fixed height for slider
  const sliderWidth = "100%"; // Set width to 100% of the container

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box maxW="100%" maxH={sliderHeight} overflow="hidden">
      <Slider {...settings}>
        {mediaItems.map((mediaItem, index) => (
          <Box
            key={index}
            position="relative"
            width={sliderWidth}
            height={sliderHeight}
            overflow="hidden"
          >
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Remove media"
              position="absolute"
              top="10px"
              right="10px"
              colorScheme="red"
              onClick={() => onRemove(index)}
              zIndex="1"
            />
            {mediaItem.mediaType === "image" ? (
              <Image
                src={mediaItem.url}
                alt={`media-${index}`}
                objectFit="cover"
                width="100%"
                height="100%"
                borderRadius="md"
              />
            ) : (
              <Box
                as="video"
                controls
                objectFit="cover"
                width="100%"
                height="100%"
                borderRadius="md"
              >
                <source src={mediaItem.url} type="video/mp4" />
                Your browser does not support the video tag.
              </Box>
            )}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default function CreatePostModal({
  isOpen,
  onClose,
  user,
  onPostCreated,
}) {
  const initialValues = {
    content: "",
    media: [],
  };

  const [selectedMedia, setSelectedMedia] = useState([]);
  const { loginUser } = useLoginUser();

  const handleMediaUpload = (event) => {
    const files = event.target.files;
    const mediaArray = Array.from(files).map((file) => {
      const url = URL.createObjectURL(file);
      const mediaType = file.type.startsWith("image/") ? "image" : "video";
      return { url, mediaType, file }; // Include the actual file
    });
    setSelectedMedia([...selectedMedia, ...mediaArray]);
  };

  const handleMediaRemove = (index) => {
    const updatedMedia = selectedMedia.filter((_, i) => i !== index);
    setSelectedMedia(updatedMedia);
  };

  const handleSubmit = async (values) => {
    try {
      const toastId = toast.loading("Uploading media...");

      const uploadedMedia = await Promise.all(
        selectedMedia.map(async (media) => {
          const uploadFunction = imageUpload;
          const uploadUrl = await uploadFunction(media.file, (progress) => {
            toast.loading(`Uploading media: ${progress}%`, { id: toastId });
          }); // Upload each file and get the URL
          return { url: uploadUrl, mediaType: media.mediaType };
        })
      );

      const postData = {
        ...values,
        media: uploadedMedia,
      };

      try {
        toast.loading("Creating Post ..", { id: toastId });
        await createPost(loginUser.token, postData);

        toast.success("Post created !!", { id: toastId });
      } catch (error) {
        console.log(error);
        toast.error("Error creating post", { id: toastId });
      } finally {
        if (onPostCreated) onPostCreated();
      }

      onClose();
    } catch (error) {
      console.error("Error uploading media", error);
      toast.error("Error creating post", { id: toastId });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex mb={2} align="center" gap={3}>
              <Avatar size="sm" src={user.avatar} />
              <Text fontSize="1rem" fontWeight="500">
                {user.userName}
              </Text>
            </Flex>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
                  <Field name="content">
                    {({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="What's on your mind?"
                        mb={2}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="content"
                    component="div"
                    style={{ color: "red", marginBottom: "10px" }}
                  />

                  <Flex
                    align="center"
                    justify="space-between"
                    p={2}
                    borderWidth={1}
                    mb={3}
                    borderRadius="md"
                  >
                    <Text fontSize=".8rem" fontWeight="500" ml={2}>
                      Add to your post
                    </Text>
                    <Flex align="center" cursor="pointer">
                      <label
                        htmlFor="media-upload"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <Image src={galleryImage} w="30px" />
                        <Text fontSize=".8rem" fontWeight="500">
                          Photos/Videos
                        </Text>
                      </label>
                      <input
                        id="media-upload"
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleMediaUpload}
                        style={{ display: "none" }}
                      />
                    </Flex>
                  </Flex>

                  {selectedMedia.length > 0 && (
                    <Box mb={3}>
                      <MediaSlider
                        mediaItems={selectedMedia}
                        onRemove={handleMediaRemove}
                      />
                      <Code colorScheme="green" mt={1} fontSize=".8rem">
                        Slide to view selected images/videos
                      </Code>
                    </Box>
                  )}

                  <Button type="submit" w="100%" colorScheme="blue" size="sm">
                    Post
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
