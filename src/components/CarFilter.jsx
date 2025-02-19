const CarFilter = ({
  filterCriteria,
  setFilterCriteria,
  onFilter,
  isFiltering,
  onClearFilter,
}) => {
  return (
    <div className="filter-section">
      <h2>Pretraži automobile</h2>
      <form onSubmit={onFilter} className="filter-form">
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
        <div className="filter-buttons">
          <button type="submit" className="filter-button">
            Filtriraj
          </button>
          {isFiltering && (
            <button
              type="button"
              onClick={onClearFilter}
              className="clear-filter-button"
            >
              Očisti filter
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CarFilter;
