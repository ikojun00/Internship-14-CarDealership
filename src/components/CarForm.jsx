import { useState } from "react";
import Plus from "../assets/Plus";

const CarForm = ({ onSubmit, carTypes }) => {
  const [newCar, setNewCar] = useState({
    id: "",
    brand: "",
    model: "",
    type: "",
    year: "",
    registrationExpiry: "",
  });
  const [errors, setErrors] = useState({});

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

    onSubmit(newCar);
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

  return (
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
              <span className="error-message">{errors.registrationExpiry}</span>
            )}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Dodaj <Plus />
        </button>
      </form>
    </div>
  );
};

export default CarForm;
