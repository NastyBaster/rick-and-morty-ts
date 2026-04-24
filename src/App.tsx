import { useState, useEffect } from "react";
import type { Character, APIResponse } from "./types/character";
import "./index.css";
import Card from "./components/Card/Card";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(
    "https://rickandmortyapi.com/api/character/?page=1",
  );

  const fetchCharacters = async () => {
    if (!nextPageUrl) return;

    try {
      const res = await fetch(nextPageUrl);
      const data: APIResponse = await res.json();
      setCharacters((prev) => [...prev, ...data.results]);
      setNextPageUrl(data.info.next);
    } catch (error) {
      console.error("Loading error:", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Characters</h2>
      <div className="row g-4">
        {" "}
        {characters.map((char) => (
          <Card key={char.id} data={char} />
        ))}
      </div>

      {nextPageUrl && (
        <div className="text-center mt-5">
          <button
            className="btn btn-outline-dark rounded-pill px-5"
            onClick={fetchCharacters}
          >
            Load more characters
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
