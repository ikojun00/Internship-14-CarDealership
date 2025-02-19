import CarCard from "./CarCard";

const CarList = ({ cars, onDelete, isRegistrationExpiringSoon }) => {
  return (
    <div className="cars-grid">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onDelete={onDelete}
          isExpiringSoon={isRegistrationExpiringSoon(car.registrationExpiry)}
        />
      ))}
    </div>
  );
};

export default CarList;
