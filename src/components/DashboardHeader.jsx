import { Dumbbell, BookOpen, Briefcase, Moon,  Hand } from "lucide-react";


const DashboardHeader = ({ userName }) => {
  return (
    <div className="p-8 bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4">
        Welcome back{userName ? `, ${userName}` : ""}!
      </h2>

      <p className="text-lg text-blue-100 mb-6">
        Track your habits and stay consistent.
      </p>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Hand className="w-9 h-9 text-yellow-300" />
          <span className="text-sm text-blue-100">Pray</span>
        </div>

        <div className="flex items-center gap-2">
          <Dumbbell className="w-9 h-9 text-green-300" />
          <span className="text-sm text-blue-100">Train</span>
        </div>

        <div className="flex items-center gap-2">
          <BookOpen className="w-9 h-9 text-purple-300" />
          <span className="text-sm text-blue-100">Study</span>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase className="w-9 h-9 text-red-300" />
          <span className="text-sm text-blue-100">Work</span>
        </div>

        <div className="flex items-center gap-2">
          <Moon className="w-9 h-9 text-indigo-300" />
          <span className="text-sm text-blue-100">Sleep</span>
        </div>

      
      </div>
    </div>
  );
};

export default DashboardHeader;
