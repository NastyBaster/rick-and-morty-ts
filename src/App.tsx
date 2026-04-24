import { useState, useEffect, useRef } from "react";
import type { Character, APIResponse } from "./types/character";
import "./index.css";
import Card from "./components/Card/Card";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(
    "https://rickandmortyapi.com/api/character/?page=1",
  );
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchCharacters = async () => {
    if (!nextPageUrl || isLoading) return;

    setIsLoading(true);

    try {
      await sleep(600);
      const res = await fetch(nextPageUrl);
      const data: APIResponse = await res.json();

      setCharacters((prev) => {
        const existingIds = new Set(prev.map((c) => c.id));
        const unique = data.results.filter((c) => !existingIds.has(c.id));
        return [...prev, ...unique];
      });

      setNextPageUrl(data.info.next);
    } catch (error) {
      console.error("Loading error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageUrl && !isLoading) {
          fetchCharacters();
        }
      },
      { threshold: 1.0 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [nextPageUrl, isLoading]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Characters</h2>
      <div className="row g-4">
        {" "}
        {characters.map((char) => (
          <Card key={char.id} data={char} />
        ))}
      </div>

      <div
        ref={loaderRef}
        style={{ height: "40px" }}
        className="d-flex justify-content-center align-items-center mt-4"
      >
        {isLoading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
