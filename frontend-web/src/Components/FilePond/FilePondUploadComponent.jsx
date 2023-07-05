import React, { useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "./filePond.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import {
  makeDeleteRequest,
  makeUploadRequest,
} from "../Cloudinary/CloudinaryHelper";
import { useApp } from "../../Context/app-context";
import { v4 as uuidv4 } from "uuid";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginImageCrop,
  FilePondPluginFileValidateType
);

export function FilePondComponent(props) {
  const logic = props.setpublicIdOfFileToBeUploaded;
  const deleteLogic = props.deleteLogic;
  const doYouWantCustomPublicId = props.doYouWantCustomPublicId;
  const { currentUser } = useApp();
  // eslint-disable-next-line no-unused-vars
  const files = props.files;

  const publicIdLogic =  () => {
        return `${currentUser.email} ${uuidv4()}`;
      }

  //   useEffect(() => {
  //     if(colorMode==='dark'){
  //       document.getElementById("filePondDiv").classList.add(`dark`);
  //     }else{
  //       document.getElementById("filePondDiv").classList.remove(`dark`);
  //     }
  //   }, [colorMode]);

  const revert = (token, successCallback, errorCallback) => {
    makeDeleteRequest(
      {
        token,
        successCallback,
        errorCallback,
      },
      deleteLogic
    );
  };

  const process = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    const abortRequest = makeUploadRequest(
      {
        file,
        fieldName,
        successCallback: load,
        errorCallback: error,
        progressCallback: progress,
      },
      logic,
      doYouWantCustomPublicId,
      publicIdLogic
    );

    return {
      abort: () => {
        abortRequest();
        abort();
      },
    };
  };


  return (
    <div id="filePondDiv">
      <FilePond
        acceptedFileTypes={props.acceptedFileType}
        files={props.files}
        onupdatefiles={props.setFiles}
        allowFileTypeValidation={true}
        instantUpload={true}
        dropValidation={true}
        name="file"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        allowMultiple={props.allowMultiple}
        server={{ process, revert }}
        credits={false}
      />
    </div>
  );
}
