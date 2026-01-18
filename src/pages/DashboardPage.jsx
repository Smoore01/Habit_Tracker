import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import AddHabitSection from "../components/AddHabitSection";
import HabitCard from "../components/HabitCard";
import CalendarSection from "../components/CalendarSection";
import { useAuth } from "../context/AuthContext";
import api from "../Utils/api";
import HabitChart from "../components/HabitChart";


const DashboardPage = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD HABITS ON MOUNT ---------------- */
  useEffect(() => {
    const loadHabits = async () => {
      try {
        setLoading(true);
        const res = await api.get("/habits");
        setHabits(res.data);
      } catch (error) {
        console.error("Failed to load habits:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHabits();
  }, []);

  /* ---------------- ADD HABIT ---------------- */
  const handleAddHabit = async (habitName) => {
    try {
      console.log("1. Selected date:", selectedDate);
      console.log("2. Selected date string:", selectedDate.toDateString());
      
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      console.log("Sending date string:", dateString);
      
      const res = await api.post("/habits", {
        name: habitName,
        date: dateString,
      });
  
      console.log("3. Backend response:", res.data);
      console.log("3b. Raw date from backend:", res.data.date); // ADD THIS LINE HERE
      console.log("4. Response date:", new Date(res.data.date).toDateString());
      
      setHabits((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Failed to add habit:", error);
    }
  };
  /* ---------------- MARK HABIT DONE ---------------- */
  const handleMarkDone = (habitId) => {
    setHabits((prev) =>
      prev.map((habit) =>
        (habit._id || habit.id) === habitId
          ? { ...habit, completed: true, streak: habit.streak + 1 }
          : habit
      )
    );
  };
  

  /* ---------------- DELETE HABIT ---------------- */
  const handleDelete = async (habitId) => {
    try {
      await api.delete(`/habits/${habitId}`);

      setHabits((prev) =>
        prev.filter((habit) => habit._id !== habitId)
      );
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  const habitsForSelectedDate = habits.filter(
    (h) =>
      new Date(h.date).toDateString() ===
      selectedDate.toDateString()
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-200 to-blue-100">
     <main className="px-4 py-6 space-y-6 md:px-6 md:ml-64  overflow-x-hidden">

        <div className="h-14 md:h-0" />

        <DashboardHeader userName={user?.name || "Guest"} />

        <div className="bg-white shadow-md rounded-lg p-4">
          <CalendarSection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <AddHabitSection onAddHabit={handleAddHabit} />
        </div>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">
            Habits for {selectedDate.toDateString()}
          </h3>

          {loading ? (
            <div className="text-gray-500 text-center py-6">
              Loading habits...
            </div>
          ) : habitsForSelectedDate.length === 0 ? (
            <div className="bg-white border rounded-lg p-6 text-center text-gray-600 shadow-md">
              No habits yet — add one above for this date.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {habitsForSelectedDate.map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  onMarkDone={handleMarkDone}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

        <div className="bg-white shadow-md rounded-lg p-4">
        <HabitChart habits={habits} />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
