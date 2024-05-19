import SummaryApi from "../common";

// const uploadImages = async (imageFiles) => {
//   console.log({ imageFiles });
//   const urls = [];

//   for (const imageFile of imageFiles) {
//     const formData = new FormData();
//     formData.append("image", imageFile);
//     console.log(imageFile);

//     try {
//       const response = await fetch(SummaryApi.ImageUpload.url, {
//         method: SummaryApi.ImageUpload.method,
//         body: formData,
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         urls.push(responseData.url);
//       } else {
//         console.error("Failed to upload image:", await response.text());
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   }

//   return urls;
// };

// export default uploadImages;

const imageUpload = async (formDataImg) => {
  console.log({ formDataImg });
  try {
    const response = await fetch(SummaryApi.ImageUpload.url, {
      method: SummaryApi.ImageUpload.method,
      body: formDataImg,
    });

    if (response.ok) {
      const imgResponse = await response.json();
      return imgResponse.url;
    } else {
      console.error("Failed to upload image");
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default imageUpload;
