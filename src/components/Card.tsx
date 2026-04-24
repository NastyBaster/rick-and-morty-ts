import type { Character } from "../types/character";

interface CardProps {
  data: Character;
}

const Card = ({ data }: CardProps) => {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-12 mb-4"></div>
      <div className="card shadow-sm">
        <img src={data.image} className="card-img-top" alt={data.name} />
        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
          
        </div>
      </div>
    </>
  )
}
