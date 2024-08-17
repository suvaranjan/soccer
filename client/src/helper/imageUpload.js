import axios from 'axios';

// For development (Cloudinary)
const uploadUrl = "https://api.cloudinary.com/v1_1/suvaranjan/upload";

// For deployment
// const uploadUrl = import.meta.env.VITE_UPLOAD_URL;
// const serverUrl = import.meta.env.VITE_SERVER_URL;

// For Development - Image/Vedio Upload (local server)
export const imageUpload = async (file, setProgress) => {
    try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "suvaranjan");

        const res = await axios.post(uploadUrl, data, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted); // Update the progress state
            },
        });

        const uploadedUrl = res.data.url.toString();

        console.log(uploadedUrl);

        return uploadedUrl;

    } catch (error) {
        console.log(error);
        return null;
    }
};



// For deployments - Image/Video upload logic (remote server)

// export const imageUpload = async (file, setProgress) => {

//     try {
//         const data = new FormData();
//         data.append("file", file);

//         const res = await axios.post(uploadUrl, data, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//             onUploadProgress: (progressEvent) => {
//                 // Calculate progress percentage
//                 const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 setProgress(percentCompleted); // Update the progress state
//             },
//         });

//         console.log("Image Uploaded", res.data.file);
//         return `${serverUrl}/${res.data.file}`; // Adjust this based on your server response

//     } catch (error) {
//         console.error("Error uploading image:", error);
//         return null; // Return null or handle the error as needed
//     }
// };

