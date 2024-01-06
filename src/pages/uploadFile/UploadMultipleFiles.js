import { useState } from "react";
import axios from "axios";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../context/authContext";
import { useAuthContext } from "../../context/authContext";

const UploadMultipleFiles = () => {
  const [filesList, setFilesList] = useState();
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [message, setMessage] = useState();
  const [imageURL, setImageURL] = useState();
  const axiosWithInterceptors = useAxiosInterceptors();
  const { updatedProfilePhoto, setUpdatedProfilePhoto } = useAuthContext();
  // const [uploadType, setUpload] = useState('multiple')
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location)
  // console.log(location.state)
  const sizeInMB = location?.state?.size;
  const FILE_SIZE_LIMIT = sizeInMB * 1024 * 1024; // 5MB
  const allowedExtensions = location?.state?.types;
  const fileCode = location?.state?.code;
  const id = location?.state?.id;

  const handleUpload = async (e) => {
    e.preventDefault();

    let urlArray = [];
    let photoCode;
    // check if user selected at least one file
    if (!filesList.length) {
      setMessage("no file selected");
      return;
    }

    // check if any file exceeded the size limit
    let filesAboveSizeLimit = [];
    for (let i = 0; i < filesList.length; i++) {
      if (filesList[i].size > FILE_SIZE_LIMIT) {
        filesAboveSizeLimit.push(filesList[i].name);
      }
    }
    if (filesAboveSizeLimit.length) {
      let fileNames = filesAboveSizeLimit.toString();
      setMessage(`${fileNames} is(are) above the ${sizeInMB} MB size limit`);
      return;
    }

    // check if the file extension is allowed
    let indexOfExt;
    let fileName;
    let fileExt;
    let FilesNotAllowed = [];
    for (let i = 0; i < filesList.length; i++) {
      // get file name
      fileName = filesList[i].name;

      // get index of file extension
      indexOfExt = fileName.lastIndexOf(".");

      // get file extension and convert to lower case
      fileExt = fileName.slice(indexOfExt).toLowerCase();

      if (!allowedExtensions.includes(fileExt)) {
        FilesNotAllowed.push(filesList[i].name);
      }
    }
    if (FilesNotAllowed.length) {
      let fileNames = FilesNotAllowed.toString();
      setMessage(`${fileNames} is(are) not allowed`);
      return;
    }


    
    if (fileCode === 'profilephoto') {
      await photoUpdate("profilephotos", 0, urlArray)

    }
    else if (fileCode === 'hotelphoto') {
      await photoUpdate("hotelphotos", 0, urlArray)

    } else if (fileCode === 'roomphoto') {
      
        for (let i = 0; i < 6; i++) {
          await photoUpdate("roomphotos", i, urlArray)
        }

    } else {
        for (let i = 0; i < filesList.length; i++) {
          await photoUpdate("miscphotos", i, urlArray)
        }

    }

    console.log('urlArray: ', urlArray)

    try {
      const resp = await axiosWithInterceptors.post(
        baseURL + "api/v1/auth/upload",
        { urlArray, fileCode, id },
        {
          withCredentials: true,
        }
      );

      console.log("below 2 ");

      // setUpdatedProfilePhoto(photoURL);
      //onUploadProgress: (ProgressEvent) => { console.log(ProgressEvent.progress * 100) }

      // console.log(resp.data)
    } catch (err) {
      console.log(err);
    }
  };

  

  const photoUpdate = async (folderName, index, URLArray) => {
    // generate signature
    let photoURL;
    let timestamp;
    let signature;

    try {
      const resp = await axiosWithInterceptors.post(
        baseURL + "api/v1/auth/generatesignature",
        { folder: folderName },
        {
          withCredentials: true,
        }
      );

      timestamp = resp.data.timestamp;
      signature = resp.data.signature;
    } catch (err) {
      console.log(err);
    }


    // populate FormData

    const fd = new FormData();

    fd.append("file", filesList[index]);
    fd.append("timestamp", timestamp);
    fd.append("signature", signature);
    fd.append("api_key", process.env.REACT_APP_API_KEY);
    fd.append("folder", folderName);

    // upload pictures

    
    setMessage("Uploading...");
    setProgress((prev) => {
      return { ...prev, started: true };
    });

    console.log("above 1 ");

    try {
      // https://api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload
      let cloudName = process.env.REACT_APP_CLOUD_NAME;
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      console.log("above 2 ");

      const res = await axios.post(api, fd, {
        onUploadProgress: (ProgressEvent) => {
          setProgress((prev) => {
            return { ...prev, pc: ProgressEvent.progress * 100 };
          });
        },
      });

      console.log("below 1 ");

      const { secure_url } = res.data;
      URLArray.push(secure_url)
      // photoURL = secure_url;
      // console.log("photoURL: ", photoURL);
      setMessage(`Upload successful, ${index + 1} ${index === 1 ? 'file' : 'files'} uploaded`);
    } catch (err) {
      setMessage("upload failed");
      console.log(err);
    }


    // send photo urls to backend
  }

  return (
    <div>
      <h3>Upload your files here</h3>
      <form onSubmit={handleUpload}>
        <label>Choose files to upload</label>
        <br />
        {location?.state?.number === "multiple" ? (
          <input
            type="file"
            onChange={(e) => {
              setFilesList(e.target.files);
            }}
            multiple
            style={{ marginTop: "5px" }}
          />
        ) : (
          <input
            type="file"
            onChange={(e) => {
              setFilesList(e.target.files);
            }}
            style={{ marginTop: "5px" }}
          />
        )}

        <br />
        <button style={{ marginTop: "5px" }}>Upload Files</button>
      </form>
      {progress.started && (
        <progress max={"100"} value={progress.pc}></progress>
      )}
      {message && <span>{message}</span>}
      <br />
      <span
        className="uploadFMulSpan"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(-1)}
      >
        Return to previous page
      </span>
    </div>
  );
};

export default UploadMultipleFiles;
