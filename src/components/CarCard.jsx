import Close from "../assets/Close";

const CarCard = ({ car, onDelete, isExpiringSoon }) => {
  return (
    <div className={`car-card ${isExpiringSoon ? "expiring-soon" : ""}`}>
      <button className="delete-button" onClick={() => onDelete(car.id)}>
        <Close />
      </button>
      <h3>
        {car.brand} {car.model}
      </h3>
      <p>Tip auta: {car.type}</p>
      <p>Godina proizvodnje: {car.year}</p>
      <p>
        Registracija istječe:{" "}
        {new Date(car.registrationExpiry).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CarCard;
