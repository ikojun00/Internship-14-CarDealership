import { useState } from "react";
import Close from "./assets/Close";
import Plus from "./assets/Plus";

function App() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    id: "",
    brand: "",
    model: "",
    type: "",
    year: "",
    registrationExpiry: "",
  });
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    const newErrors = {};
    if (!newCar.brand) newErrors.brand = "Potrebno je unijeti marku auta";
    if (!newCar.model) newErrors.model = "Potrebno je unijeti model auta";
    if (!newCar.type) newErrors.type = "Potrebno je odabrati tip auta";
    if (!newCar.year) newErrors.year = "Potrebno je unijeti godinu proizvodnje";
    if (!newCar.registrationExpiry)
      newErrors.registrationExpiry =
        "Potrebno je unijeti datum isteka registracije";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

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

    setNewCar({
      id: "",
      brand: "",
      model: "",
      type: "",
      year: "",
      registrationExpiry: "",
    });
    setErrors({});
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
        <div className="form-section">
          <h2>Dodaj novo auto</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Brend"
                  value={newCar.brand}
                  onChange={(e) =>
                    setNewCar((prev) => ({ ...prev, brand: e.target.value }))
                  }
                  className={errors.brand ? "error" : ""}
                />
                {errors.brand && (
                  <span className="error-message">{errors.brand}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Model"
                  value={newCar.model}
                  onChange={(e) =>
                    setNewCar((prev) => ({ ...prev, model: e.target.value }))
                  }
                  className={errors.model ? "error" : ""}
                />
                {errors.model && (
                  <span className="error-message">{errors.model}</span>
                )}
              </div>

              <div className="form-group">
                <select
                  value={newCar.type}
                  onChange={(e) =>
                    setNewCar((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className={errors.type ? "error" : ""}
                >
                  <option value="">Izaberi tip auta</option>
                  {carTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <span className="error-message">{errors.type}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="number"
                  min={1900}
                  placeholder="Godina proizvodnje"
                  value={newCar.year}
                  onChange={(e) =>
                    setNewCar((prev) => ({ ...prev, year: e.target.value }))
                  }
                  className={errors.year ? "error" : ""}
                />
                {errors.year && (
                  <span className="error-message">{errors.year}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="date"
                  placeholder="Istek registracije"
                  value={newCar.registrationExpiry}
                  onChange={(e) =>
                    setNewCar((prev) => ({
                      ...prev,
                      registrationExpiry: e.target.value,
                    }))
                  }
                  className={errors.registrationExpiry ? "error" : ""}
                />
                {errors.registrationExpiry && (
                  <span className="error-message">
                    {errors.registrationExpiry}
                  </span>
                )}
              </div>
            </div>

            <button type="submit" className="submit-button">
              Dodaj <Plus />
            </button>
          </form>
        </div>

        <div className="filter-section">
          <h2>Pretraži automobile</h2>
          <form onSubmit={handleFilter} className="filter-form">
            <div className="filter-inputs">
              <input
                type="text"
                placeholder="Pretraži po marki"
                value={filterCriteria.brand}
                onChange={(e) =>
                  setFilterCriteria((prev) => ({
                    ...prev,
                    brand: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="Pretraži po modelu"
                value={filterCriteria.model}
                onChange={(e) =>
                  setFilterCriteria((prev) => ({
                    ...prev,
                    model: e.target.value,
                  }))
                }
              />
            </div>
            <div className="filter-buttons">
              <button type="submit" className="filter-button">
                Filtriraj
              </button>
              {isFiltering && (
                <button
                  type="button"
                  onClick={clearFilter}
                  className="clear-filter-button"
                >
                  Očisti filter
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="cars-grid">
        {displayedCars.map((car) => (
          <div
            key={car.id}
            className={`car-card ${
              isRegistrationExpiringSoon(car.registrationExpiry)
                ? "expiring-soon"
                : ""
            }`}
          >
            <button
              className="delete-button"
              onClick={() => handleDelete(car.id)}
            >
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
        ))}
      </div>
    </div>
  );
}

export default App;
