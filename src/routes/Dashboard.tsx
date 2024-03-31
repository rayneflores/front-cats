import { useEffect, useState } from "react";
import { Cat } from "../types/types";
import { API_URL } from "../auth/Constants";
import { useAuth } from "../auth/AuthProvider";

export default function Dashboard() {
  const [cats, setCats] = useState<any[]>([]);
  const [breeds, setBreeds] = useState<any[]>([]);
  const auth = useAuth();

  useEffect(() => {
    getAllCats();
    getAllBreeds();
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

  async function getAllBreeds() {
    try {
      const breedResponse = await fetch(`${API_URL}/breeds`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });
      if (breedResponse.status === 200) {
        const breedsJson = await breedResponse.json();
        setBreeds(breedsJson);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <form>
        <input type="text" placeholder="Cat Name" />
        <select>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.name}>
              {breed.name}
            </option>
          ))}
        </select>
      </form>
      {cats.map((cat) => (
        <div key={cat.id}>{cat.name}</div>
      ))}
    </div>
  );
}
