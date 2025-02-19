import { useState } from "react";
import CarForm from "./components/CarForm";
import CarFilter from "./components/CarFilter";
import CarList from "./components/CarList";

function App() {
  const [cars, setCars] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    brand: "",
    model: "",
  });
  const [filteredCars, setFilteredCars] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const carTypes = [
    "Sedan",
    "SUV",
    "Hatchback",
    "Kupe",
    "Crossover",
    "Minivan",
    "Karavan",
  ];

  const handleSubmit = (newCar) => {
    if (cars.length >= 10) {
      alert("Maksimalan broj automobila je 10!");
      return;
    }

    setCars((prevCars) => [
      ...prevCars,
      {
        ...newCar,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const handleDelete = (id) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
  };

  const sortCars = (carsToSort) => {
    return carsToSort.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      if (a.brand !== b.brand) return a.brand.localeCompare(b.brand);
      return a.model.localeCompare(b.model);
    });
  };

  const isRegistrationExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const monthDiff = (expiry - today) / (1000 * 60 * 60 * 24 * 30);
    return monthDiff <= 1;
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const filtered = cars.filter((car) => {
      const brandMatch = car.brand
        .toLowerCase()
        .includes(filterCriteria.brand.toLowerCase());
      const modelMatch = car.model
        .toLowerCase()
        .includes(filterCriteria.model.toLowerCase());

      if (filterCriteria.brand && filterCriteria.model)
        return brandMatch && modelMatch;
      else if (filterCriteria.brand) return brandMatch;
      else if (filterCriteria.model) return modelMatch;

      return true;
    });

    setFilteredCars(filtered);
    setIsFiltering(true);
  };

  const clearFilter = () => {
    setFilterCriteria({ brand: "", model: "" });
    setIsFiltering(false);
  };

  const displayedCars = sortCars(isFiltering ? filteredCars : cars);

  return (
    <div className="container">
      <div className="sections">
        <CarForm onSubmit={handleSubmit} carTypes={carTypes} />
        <CarFilter
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          onFilter={handleFilter}
          isFiltering={isFiltering}
          onClearFilter={clearFilter}
        />
      </div>
      <CarList
        cars={displayedCars}
        onDelete={handleDelete}
        isRegistrationExpiringSoon={isRegistrationExpiringSoon}
      />
    </div>
  );
}

export default App;
