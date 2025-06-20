import { useState } from "react";
import axios from "axios";

export const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteItem = async (url: string, p0: { headers: { Authorization: string; 'Content-Type': string } }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("accessToken");

    try {
      await axios.delete(url, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Nomaʼlum xatolik yuz berdi");
      }
    } finally {
      setLoading(false);
    }
  };

  return { deleteItem, loading, error, success };
};
