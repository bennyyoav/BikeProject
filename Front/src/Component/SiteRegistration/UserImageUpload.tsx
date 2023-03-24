import React, { useState } from "react";
import "./UserImageUpload.css";

const BACK_SERVER = "localhost";
export const manAvatarURL =
  "https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png";
const womenAvatarUrl =
  "https://thumbs.dreamstime.com/b/hipster-girl-avatar-sunglasses-vector-illustration-design-145430747.jpg";

export function UserImageUpload() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [imageUrl, setImageUrl] = useState(manAvatarURL);

  const [uploadImageStatus, setUploadImageStatus] =
    useState("Image not Loaded");
  const [gender, setGender] = useState("Male");
  //const [displayDefaultPicture, setDisplayDefaultPicture] = useState(true);
  const [enableUploadPictureButton, setEnableUploadPictureButton] =
    useState(false);

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("file", image.data);
    fetch(`http://${BACK_SERVER}/users/getUserImage`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response.json().then((response) => {
          console.log("response=", response);
          let loadedImageRelativePath = `/../../${response.file
            .split("public\\")[1]
            .replaceAll("\\", "/")}`;

          console.log(loadedImageRelativePath);
          setImageUrl(`require(${loadedImageRelativePath})`);

          setUploadImageStatus("Image loaded successfully");
          setEnableUploadPictureButton(false);
        });
      })
      .catch((err) => {
        setImageUrl("");
        setUploadImageStatus("Malfunction in loading the image");
      });
  };

  const handleFileChange = (e: any) => {
    let img;
    try {
      img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };

      setImage(img);
      setImageUrl(img.preview);
      //setDisplayDefaultPicture(false);
      setUploadImageStatus(
        "A photo has been added, but has not yet been uploaded"
      );
      setEnableUploadPictureButton(true);
    } catch (error) {
      img = {
        preview: "",
        data: "",
      };
      setImage(img);
      setEnableUploadPictureButton(false);
      //setDisplayDefaultPicture(true);
      if (gender === "Male") {
        setImageUrl(manAvatarURL);
      } else {
        setImageUrl(womenAvatarUrl);
      }
      setUploadImageStatus("uploaded image error");
    }
  };

  const onChangeRadioButton = (e: any) => {
    if (gender === "Male") {
      setGender("Female");
      setImageUrl(womenAvatarUrl);
    } else {
      setGender("Male");
      setImageUrl(manAvatarURL);
    }
  };

  return (
    <div className="App">
      <br></br>
      <div id="GenderSelection">
        <label className="inputAtGenderSelection">
          <input
            id="MaleRadioButton"
            type="radio"
            value="Male"
            checked={gender === "Male"}
            onChange={onChangeRadioButton}
          ></input>
          Male
        </label>
        <label className="inputAtGenderSelection">
          <input
            id="FemaleRadioButton"
            type="radio"
            value="Female"
            checked={gender === "Female"}
            onChange={onChangeRadioButton}
          ></input>
          female
        </label>
      </div>
      <br></br>
      <div id="uploadImageText">Upload Image</div>
      {/* {displayDefaultPicture===false && image.preview && <img id = 'userImage'  alt='UserImage'
         src={image.preview} width='128' height='72' display='picture'/>} */}

      {
        //@ts-ignore
        <img
          id="userImage"
          alt="UserImage"
          src={imageUrl}
          // //@ts-ignore
          // real_source={"AAAA"}
          width="128"
          height="72"
        />
      }

      <form onSubmit={handleSubmit} name="foo">
        <input
          type="file"
          id="userNameFile"
          name="file"
          onChange={handleFileChange}
        ></input>
        {enableUploadPictureButton && <button type="submit">Submit</button>}
        {!enableUploadPictureButton && (
          <button type="submit" disabled>
            Submit
          </button>
        )}
      </form>
      {uploadImageStatus === "Image loaded successfully" && (
        <h4 id="uploadImageStatus" style={{ color: "green" }}>
          {uploadImageStatus}
        </h4>
      )}
      {(uploadImageStatus ===
        "A photo has been added, but has not yet been uploaded" ||
        uploadImageStatus === "Image not Loaded") && (
        <h4 id="uploadImageStatus" style={{ color: "orange" }}>
          {uploadImageStatus}
        </h4>
      )}
      {(uploadImageStatus === "uploaded image error" ||
        uploadImageStatus === "Malfunction in loading the image") && (
        <h4 id="uploadImageStatus" style={{ color: "red" }}>
          {uploadImageStatus}
        </h4>
      )}
    </div>
  );
}

export default UserImageUpload;
