const HabitCard = ({ habit, onMarkDone, onDelete }) => {
  if (!habit) return null;

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-semibold text-gray-800">
        {habit.name}
      </h4>

      <p className="text-sm text-gray-500 mt-1">
        Streak: {habit.streak} days
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onMarkDone(habit._id || habit.id)}
          disabled={habit.completed}
          className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {habit.completed ? "Done" : "Mark Done"}
        </button>

        <button
          onClick={() => onDelete(habit._id || habit.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
