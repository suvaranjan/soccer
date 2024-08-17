// Check the file type (for both image and video)
export const checkFileType = (file, uploadPreset) => {
    let allowedTypes;

    if (uploadPreset === "image-upload") {
        allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    } else if (uploadPreset === "video-upload") {
        allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
    } else {
        return false; // If the upload preset is neither "image-upload" nor "video-upload", return false
    }

    // Check if the file type is in the allowed list
    return allowedTypes.includes(file.type);
};
