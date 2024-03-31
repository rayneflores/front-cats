import { useEffect, useState } from "react";
import { Cat } from "../types/types";
import { API_URL } from "../auth/Constants";
import { useAuth } from "../auth/AuthProvider";

export default function Dashboard() {
  const [cats, setCats] = useState<any[]>([]);
  const auth = useAuth();

  useEffect(() => {
    getAllCats();
  }, []);

  async function getAllCats() {
    try {
      const response = await fetch(`${API_URL}/cats`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        setCats(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {cats.map((cat) => (
        <div key={cat.id}>{cat.name}</div>
      ))}
    </div>
  )
}
