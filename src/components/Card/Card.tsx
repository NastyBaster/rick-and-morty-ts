import type { Character } from "../../types/character";
import styles from "./Card.module.scss";

interface CardProps {
  data: Character;
}

const Card = ({ data }: CardProps) => {
  const isAlive = data.status === "Alive";
  const isDead = data.status === "Dead";
  const dotColor = isAlive
    ? "text-success"
    : isDead
      ? "text-danger"
      : "text-secondary";
  const badgeColor = isAlive
    ? "bg-success"
    : isDead
      ? "bg-danger"
      : "bg-secondary";

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <div className={`card h-100 shadow-sm rounded-4 ${styles.card}`}>
        <div className={styles.imgWrapper}>
          <img
            src={data.image}
            className="card-img-top"
            alt={data.name}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            loading="lazy"
          />
          <div
            className={`position-absolute top-0 end-0 m-2 badge ${badgeColor}`}
          >
            {data.status}
          </div>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold mb-1 text-truncate">{data.name}</h5>
          <div className="mt-3">
            <span className={dotColor}>●</span> {data.status} - {data.species}
          </div>
          <div className="mt-auto pt-2 border-top">
            <p className="text-muted small mb-0">Last known location:</p>
            <p className="small mb-0">{data.location.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
