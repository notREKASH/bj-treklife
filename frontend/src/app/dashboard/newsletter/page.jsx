"use client";

import { useEffect, useState } from "react";
import "./newsletter.scss";
import axios from "axios";
import { toast } from "react-toastify";

export default function Newsletter() {
  const [newsletter, setNewsletter] = useState([]);

  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const getNewsletter = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsLetter`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setNewsletter(res.data);
    } catch (err) {
      const errors = err.response.data;
      toast.error(`${errors}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    getNewsletter();
  }, []);

  const handleDeleteSubscriber = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsLetter/${id}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      getNewsletter();
    } catch (err) {
      const errors = err.response.data;
      toast.error(`${errors}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className="newsletter">
        <h2>Liste des abonnées</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom / Prénom</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsletter.map((subscriber) => (
              <tr key={subscriber._id}>
                <td>{subscriber._id}</td>
                <td>
                  {subscriber.firstName} {subscriber.lastName}
                </td>
                <td>
                  <a
                    href={`mailto:${subscriber.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {subscriber.email}
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteSubscriber(subscriber._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
