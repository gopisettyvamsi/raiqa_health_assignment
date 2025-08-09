import React from "react";

interface ListProps {
  values: number[];
  onToggleSort: () => void;
  currentOrder: "asc" | "desc";
  onClear: () => void;
}

const ListView: React.FC<ListProps> = ({
  values,
  onToggleSort,
  currentOrder,
  onClear,
}) => {
  const highestValue = values.length ? Math.max(...values) : null;
  const lowestValue = values.length ? Math.min(...values) : null;

  return (
    <section className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Your Numbers</h2>

        <div className="flex gap-2">
          <button
            onClick={onToggleSort}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Sort {currentOrder === "asc" ? "↑" : "↓"}
          </button>

          {values.length > 0 && (
            <button
              onClick={onClear}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      {values.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg">No entries yet</p>
          <p className="text-sm">Use the counter to add some numbers</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {values.map((val, idx) => {
            let colorClasses = "bg-gray-100 text-gray-800";

            if (val === highestValue && val === lowestValue && values.length === 1) {
              colorClasses = "bg-yellow-200 text-yellow-800 ring-2 ring-yellow-400";
            } else if (val === highestValue) {
              colorClasses = "bg-green-200 text-green-800 ring-2 ring-green-400";
            } else if (val === lowestValue) {
              colorClasses = "bg-red-200 text-red-800 ring-2 ring-red-400";
            }

            return (
              <div
                key={idx}
                className={`${colorClasses} font-semibold py-3 px-4 rounded-lg text-center transition-transform duration-200 hover:scale-105`}
              >
                {val}
              </div>
            );
          })}
        </div>
      )}
      {values.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-600">
          <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded mr-2">
            Max: {highestValue}
          </span>
          <span className="inline-block bg-red-200 text-red-800 px-2 py-1 rounded">
            Min: {lowestValue}
          </span>
        </div>
      )}
    </section>
  );
};

export default ListView;
