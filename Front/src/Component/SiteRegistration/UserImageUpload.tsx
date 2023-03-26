import React, { useState } from "react";
import "./UserImageUpload.css";
import { FcApproval } from "react-icons/fc";

export const manAvatarURL =
  "https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png";
const womenAvatarUrl =
  "https://thumbs.dreamstime.com/b/hipster-girl-avatar-sunglasses-vector-illustration-design-145430747.jpg";

export let imageFormData: FormData = new FormData();
export function UserImageUpload(props: {
  imageFormDataSet: React.Dispatch<React.SetStateAction<FormData | undefined>>;
}) {
  const [imageUrl, setImageUrl] = useState(manAvatarURL);

  const [uploadImageStatus, setUploadImageStatus] =
    useState("Image not Loaded");
  const [gender, setGender] = useState("Male");

  function handleFileChange(
    e: any,
    imageFormDataSet: React.Dispatch<React.SetStateAction<FormData | undefined>>
  ) {
    console.log("at Handel file Change");
    try {
      imageFormData = new FormData();
      if (e.target.files[0] !== undefined) {
        imageFormData.append("file", e.target.files[0]);
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        imageFormData.append("file", imageUrl);
        console.log("image from data", imageUrl);

        setImageUrl(imageUrl);

        //setDisplayDefaultPicture(false);
        console.log(imageUrl);
        setUploadImageStatus("Image loaded successfully");
        return;
      } else {
        console.log("at else");
        setUploadImageStatus("Image not Loaded");
      }
    } catch (err) {
      console.log("at error" + err);
      setUploadImageStatus("uploaded image error");
    }
    //setDisplayDefaultPicture(true);
    if (gender === "Male") {
      setImageUrl(manAvatarURL);
    } else {
      setImageUrl(womenAvatarUrl);
    }
  }

  const onChangeRadioButton = (e: any) => {
    imageFormData = new FormData();
    setUploadImageStatus("Image not Loaded");
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

      {
        //@ts-ignore
        <img
          id="userImage"
          alt="UserImage"
          src={imageUrl}
          width="128"
          height="72"
        />
      }

      <form name="foo">
        <input
          type="file"
          id="userNameFile"
          name="file"
          onChange={(event) => {
            handleFileChange(event, props.imageFormDataSet);
          }}
        ></input>
      </form>
      {uploadImageStatus === "Image loaded successfully" && (
        <h4 id="uploadImageStatus" style={{ color: "green" }}>
          {uploadImageStatus} <FcApproval />
        </h4>
      )}
      {uploadImageStatus === "Image not Loaded" && (
        <h4 id="uploadImageStatus" style={{ color: "orange" }}>
          {uploadImageStatus}
        </h4>
      )}
      {uploadImageStatus === "uploaded image error" && (
        <h4 id="uploadImageStatus" style={{ color: "red" }}>
          {uploadImageStatus}
        </h4>
      )}
    </div>
  );
}

export default UserImageUpload;
