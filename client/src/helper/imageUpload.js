import axios from 'axios';
import toast from 'react-hot-toast';
// const imageUploadUrl = "http://149.28.150.230:3000/upload";
// const serverUrl = "http://149.28.150.230:3000";

const imageUploadUrl = "https://api.cloudinary.com/v1_1/suvaranjan/image/upload";
// const serverUrl = import.meta.env.VITE_SERVER_URL;

export const imageUpload = async (file, setImage, setUpload) => {
    if (!file) {
        toast.error("Please Select an Image!");
        return;
    }

    if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
    ) {
        toast.error("Please Select a JPG or PNG Image!");
        return;
    }

    try {
        setUpload(true)
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "suvaranjan");

        const res = axios.post(
            imageUploadUrl,
            data
        );

        toast.promise(res, {
            loading: `Uploading..`,
            success: (res) => {
                setImage(res.data.url.toString())
                console.log("Image Uploaded", res.data.url.toString());
                return "Image Uploaded";
            },
            error: (e) => {
                console.error(e);
                return "An error occurred";
            },
        });
    } catch (error) {
        console.log(error);
        toast.error("Error uploading image");
    } finally {
        setUpload(false);
    }
};

// export const imageUpload = async (file, setImage, setUpload) => {
//     if (!file) {
//         toast.error("Please Select an Image!");
//         return;
//     }

//     if (
//         file.type !== "image/jpeg" &&
//         file.type !== "image/png" &&
//         file.type !== "image/jpg"
//     ) {
//         toast.error("Please Select a JPG or PNG Image!");
//         return;
//     }

//     try {
//         setUpload(true);
//         const data = new FormData();
//         data.append("image", file);

//         const res = axios.post(
//             imageUploadUrl,
//             data,
//             {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             }
//         );

//         toast.promise(res, {
//             loading: `Uploading..`,
//             success: (res) => {
//                 // setImage(res.data.file);
//                 setImage(`${serverUrl}/${res.data.file}`);
//                 console.log("Image Uploaded", res.data.file);
//                 return "Image Uploaded";
//             },
//             error: (e) => {
//                 console.error(e);
//                 return "An error occurred";
//             },
//         });
//     } catch (error) {
//         console.log(error);
//         toast.error("Error uploading image");
//     } finally {
//         setUpload(false);
//     }
// };