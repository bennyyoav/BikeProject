import React, {  useState } from "react";
import "./FileUpload.css"
const BACK_SERVER = "localhost";
export function FileUploader()
{
    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')
    const [displayDefaultPicture,setDisplayDefaultPicture] = useState(true);
    //let buffer = fs.readFileSync("C:/Users/benny/Desktop/images/users/userAvatar.jpg");
    //let blob = new Blob([buffer]);
    //cconsole.log(blob);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data)
        fetch(`http://${BACK_SERVER}/users/getUserImage`, {
          method: 'POST',
          body: formData,
          }).then((response)=>{
              response.json().then((response)=>{console.log("response=",response.file);})
              if (response) setStatus(response.statusText);
          })
  }

  const handleFileChange = (e) => {
    let img;
    try {
       img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0]
      }
      setImage(img)
      setDisplayDefaultPicture(false);
      
    } catch (error) {
      img = {
        preview: '',
        data: ''
      }
      setImage(img)
       
      setDisplayDefaultPicture(true);
    }
  }

    return (
        <div className='App'>
          <br></br>
        <div id='uploadImageText'>Upload Image</div>
        {displayDefaultPicture===false && image.preview && <img id = 'userImage'  alt='UserImage'
         src={image.preview} width='128' height='72'/>}
        {displayDefaultPicture && <img id = 'userImage'  alt='UserImage'
          src="https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png" width='128' height='72'/>}
        
        <form onSubmit={handleSubmit} name="foo">
            <input type='file' name='file' onChange={handleFileChange}></input>
            <button type='submit'>Submit</button>
        </form>
        {status && <h4>{status}</h4>}
        </div>
    )
    // else
    // return (
    //   <div className='App'>
    //   <br></br>
    // <div id='uploadImageText'>Upload Image</div>
    // { <img id = 'userImage'  alt='UserImage'
    //  src="https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png" width='128' height='72'  />}
    
    // <form onSubmit={handleSubmit} name="foo">
    //     <input type='file' name='file' onChange={handleFileChange}></input>
    //     <button type='submit'>Submit</button>
    // </form>
    // {status && <h4>{status}</h4>}
    // </div>
    // )

}

