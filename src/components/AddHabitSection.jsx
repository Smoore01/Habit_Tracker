import { useState } from "react";


const AddHabitSection = ({ onAddHabit }) => {
  const [habitName, setHabitName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!habitName || !habitName.trim()) return;

    onAddHabit(habitName.trim());
    setHabitName("");
  };

  return (
    <section className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-6 sm:p-8 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Add a New Habit
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4"
      >
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Enter habit name..."
          className="flex-1 px-4 sm:px-5 py-3 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-base sm:text-lg"
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-linear-to-br from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 text-base sm:text-lg"
        >
          Add Habit
        </button>
      </form>
    </section>
  );
};

export default AddHabitSection;
