"use client";

import axios from "axios";
import "./table.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function TableFileUpload() {
  const token = useSelector((state) => state?.auth?.token);
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/upload/files",
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setFiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getFiles();
    }
  }, [token]);

  const handleCopy = (event) => {
    const fileUrl = event.target.innerText;
    navigator.clipboard.writeText(fileUrl);
  };

  console.log(files);

  return (
    <div className="table-file-upload">
      <table>
        <thead>
          <tr>
            <th>Preview</th>
            <th>Nom du fichier</th>
            <th>Lien du fichier</th>
          </tr>
        </thead>
        <tbody>
          {files &&
            files.map((file, idx) => (
              <tr key={idx} style={{ verticalAlign: "center" }}>
                <td>
                  <Image
                    src={file.url}
                    width={500}
                    height={500}
                    alt="preview"
                    quality={70}
                  />
                </td>
                <td>{file.name}</td>
                <td>
                  <button onClick={handleCopy}>{file.url}</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
