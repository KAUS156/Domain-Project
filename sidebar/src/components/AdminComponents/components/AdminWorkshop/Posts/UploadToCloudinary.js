export const UploadToCloudinary = async (image) => {

    if(image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "voting_system");
        data.append("clound_name", "deaymuawg");

        const res = await fetch("https://api.cloudinary.com/v1_1/deaymuawg/image/upload", {
            method : 'post',
            body : data,
        })

        const fileData = await res.json();

        console.log("File Data - ", fileData);

        return fileData.url;
    }
}