import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const HabitChart = ({ habits = [] }) => {
    const data = habits.reduce((acc, habit) => {
      const date = new Date(habit.date).toLocaleDateString();
  
      const existing = acc.find((d) => d.date === date);
  
      if (existing) {
        existing.total += 1;
        if (habit.completed) existing.completed += 1;
      } else {
        acc.push({
          date,
          total: 1,
          completed: habit.completed ? 1 : 0,
        });
      }
  
      return acc;
    }, []);
  
    if (!data.length) {
      return <p className="text-gray-500 mt-4">No habit data yet</p>;
    }
  
    return (
      <div className="w-full h-[300px] mt-6 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Habit Progress</h3>
  
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="total" fill="#93c5fd" radius={4} />
            <Bar dataKey="completed" fill="#2563eb" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default HabitChart;
  