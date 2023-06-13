import axios from "axios";
import { cloudname } from "./CloudinaryConfig";
import { v4 as uuidv4 } from "uuid";
import { useApp } from "../../Context/app-context";

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudname}`;

const getFileType = (file) => {
  if (
    file.type === "image/jpg" ||
    file.type === "image/png" ||
    file.type === "image/webp" ||
    file.type === "image/jpeg"
  ) {
    console.log("IMAGE");
    return "image";
  } else {
    return "pdf";
  }
};

const unInterceptedAxiosRequest = axios.create();
delete unInterceptedAxiosRequest.defaults.headers.common["Authorization"];

export const makeUploadRequest = async (
  { file, fieldName, progressCallback, successCallback, errorCallback },
  logic,
  doYouWantCustomPublicId,
  publicIdLogic
) => {
  // const signatureResponse = await axios.get(
  //   `${process.env.REACT_APP_API_ENDPOINT}/user/getCloudinarySignature`
  // );
  try {
    const url = `${baseUrl}/auto/upload`;
    const formData = new FormData();
    formData.append(fieldName, file);
    if (getFileType(file) === "image") {
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_PRESET_IMAGE
      );
    } else {
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET_PDF);
    }
    if (doYouWantCustomPublicId) {
      formData.append("public_id", `${publicIdLogic()}`);
    }
    // formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    // formData.append("signature", signatureResponse.data.signature);
    // formData.append("timestamp", signatureResponse.data.timestamp);

    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        progressCallback(total, loaded);
      },
    };

    const response = await unInterceptedAxiosRequest.post(
      url,
      formData,
      config
    );

    const { delete_token: deleteToken } = response.data;
    console.log(response.data);
    logic(response.data);
    successCallback(deleteToken);
  } catch (error) {
    errorCallback(error.message);
    console.log(error);
  }
};

export const makeDeleteRequest = async (
  { token, successCallback, errorCallback },
  deleteLogic
) => {
  try {
    const url = `${baseUrl}/delete_by_token`;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      token: token,
    };

    await unInterceptedAxiosRequest.post(url, data, config);

    deleteLogic(token);
    successCallback();
  } catch (error) {
    errorCallback(error.message);
  }
};
