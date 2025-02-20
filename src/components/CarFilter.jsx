const CarFilter = ({
  filterCriteria,
  setFilterCriteria,
  isFiltering,
  onClearFilter,
}) => {
  return (
    <div className="filter-section">
      <h2>Pretraži automobile</h2>
      <div className="filter-inputs">
        <input
          type="text"
          placeholder="Pretraži po marki"
          value={filterCriteria.brand}
          onChange={(e) =>
            setFilterCriteria((prev) => ({ ...prev, brand: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Pretraži po modelu"
          value={filterCriteria.model}
          onChange={(e) =>
            setFilterCriteria((prev) => ({ ...prev, model: e.target.value }))
          }
        />
      </div>
      {isFiltering && (
        <button onClick={onClearFilter} className="clear-filter-button">
          Očisti filter
        </button>
      )}
    </div>
  );
};

export default CarFilter;
