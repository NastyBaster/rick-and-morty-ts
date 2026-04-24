export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  image: string;
  location: {
    name: string;
  };
}

export interface APIResponse {
  info: {
    next: string | null;
    pages: number;
  };
  results: Character[]
}