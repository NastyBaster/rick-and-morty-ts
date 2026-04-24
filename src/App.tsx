import { useState, useEffect } from 'react';
import type { Character, APIResponse } from './types/character';
import './App.css'
import Card from './components/Card/Card';

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(
    'https://rickandmortyapi.com/api/character/?page=1'
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
  },[]);

  return (
    <>
      <div className='container py-5'>
        {characters.map((char) => (
          <Card key={char.id} data={char} />
        ))}
      </div>
      {nextPageUrl && (
        <div className='text-center mt-4'>
          <button className='btn btn-primary' onClick={fetchCharacters}>
            Load more...
          </button>
        </div>
      )}
    </>
  );
};

export default App
