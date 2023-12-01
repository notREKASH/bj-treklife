"use client";

import "./fileUpload.scss";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function FileUploadPage() {
  const [fileUrl, setFileUrl] = useState(null);
  const token = useSelector((state) => state?.auth?.token);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://localhost:5000/api/upload",
      formData,
      {
        headers: {
          "auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      setFileUrl(response.data.fileUrl);
      toast.success("File uploaded successfully");
    } else {
      toast.error("File upload failed");
    }
  };

  return (
    <div className="uploading-file">
      <h1>File upload</h1>
      <div className="uploading-file__input">
        <div>
          <p>Max file size: 1MB</p>
          <p>Accepted file types: .avif, .png</p>
        </div>
        <input
          type="file"
          name="file"
          accept=".avif,.png"
          onChange={handleFileUpload}
        />
      </div>
      <div className="uploading-file__preview">
        {fileUrl && (
          <Image
            src={fileUrl}
            width={500}
            height={500}
            quality={100}
            alt="Image de preview"
          />
        )}
      </div>
    </div>
  );
}

export default FileUploadPage;
