import React from "react";

interface CounterProps {
  onSubmitCount: (value: number) => void;
  value: number;
  setValue: (newValue: number) => void;
}

const Counter: React.FC<CounterProps> = ({ onSubmitCount, value, setValue }) => {
  const increase = () => setValue(value + 1);

  const decrease = () => {
    if (value > 0) setValue(value - 1);
  };

  const submitValue = () => {
    if (value > 0) {
      onSubmitCount(value);
      setValue(0);
    }
  };

  return (
    <section className="bg-white shadow rounded-lg p-6 mb-6">
      <header className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Item Counter</h2>
      </header>

      <div className="flex justify-center mb-6">
        <span className="text-4xl font-extrabold text-indigo-600 bg-indigo-50 px-8 py-4 rounded-lg border border-indigo-200">
          {value}
        </span>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={decrease}
          disabled={value === 0}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 min-w-12 text-xl disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          −
        </button>
        <button
          onClick={increase}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 min-w-12 text-xl"
        >
          +
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={submitValue}
          disabled={value === 0}
          className={`font-bold py-3 px-8 rounded-lg transition-colors duration-200 ${
            value > 0
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Add to List
        </button>
      </div>
    </section>
  );
};

export default Counter;
