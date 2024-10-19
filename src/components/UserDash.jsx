"use client";
import React, { useState } from "react";
import { Heart, Code, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const UserDash = () => {
  // Dummy data for demonstration
  const developerData = {
    likes: 350,
    codeUsedCount: 125,
    uploadStreak: 12, // Days
  };

  // Sample upload streak data for the last 4 weeks of the month
  const weeklyStreakData = [
    { week: "Week 1", uploads: 8 },
    { week: "Week 2", uploads: 10 },
    { week: "Week 3", uploads: 7 },
    { week: "Week 4", uploads: 12 },
  ];

  const [isHoveredLikes, setIsHoveredLikes] = useState(false);
  const [isHoveredCode, setIsHoveredCode] = useState(false);
  const [isHoveredStreak, setIsHoveredStreak] = useState(false);

  // Function to get the color based on the number of uploads
  const getBarColor = (uploads) => {
    const maxUploads = Math.max(...weeklyStreakData.map((d) => d.uploads)); // Get maximum uploads for scaling

    // Determine the color based on the uploads
    let greenIntensity;

    if (uploads === 0) {
      return "rgba(0, 255, 0, 0.2)"; // Very faint green for 0 uploads
    } else if (uploads <= maxUploads / 3) {
      greenIntensity = 100; // Faint green
    } else if (uploads <= (2 * maxUploads) / 3) {
      greenIntensity = 200; // Medium green
    } else {
      greenIntensity = 255; // Full vibrant green
    }

    return `rgba(0, ${greenIntensity}, 0, 1)`; // RGB format for green
  };

  // Custom tick component for YAxis
  const CustomYAxisTick = ({ x, y, payload }) => {
    return (
      <text x={x} y={y} fill="black" textAnchor="end" dominantBaseline="middle">
        {payload.value}
      </text>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 font-sans">
      <div className="mx-auto space-y-8 max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Developer Profile Dashboard
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Likes Card */}
          <div className="overflow-hidden transition-all duration-300 bg-white border rounded-lg shadow-lg hover:shadow-xl w-full max-w-xs">
            <div className="flex items-center p-4 bg-gray-50">
              <Heart
                size={24}
                className={`text-rose-400 transition-transform duration-300 ${
                  isHoveredLikes ? "scale-110" : ""
                } hover:scale-150`}
              />
              <h2 className="ml-2 text-xl font-semibold text-gray-800">
                Total Likes
              </h2>
            </div>
            <div
              className="p-4"
              onMouseEnter={() => setIsHoveredLikes(true)}
              onMouseLeave={() => setIsHoveredLikes(false)}
            >
              <p className="text-2xl font-bold text-gray-900">
                {developerData.likes}
              </p>
              <p className="mt-2 text-sm text-rose-600">
                People appreciate your work!
              </p>
            </div>
          </div>

          {/* Code Usage Card */}
          <div className="overflow-hidden transition-all duration-300 bg-white border rounded-lg shadow-lg hover:shadow-xl w-full max-w-xs">
            <div className="flex items-center p-4 bg-gray-50">
              <Code
                size={24}
                className={`text-sky-500 transition-transform duration-300 ${
                  isHoveredCode ? "animate-bounce" : ""
                } hover:scale-150`}
              />
              <h2 className="ml-2 text-xl font-semibold text-gray-800">
                Code Used
              </h2>
            </div>
            <div
              className="p-4"
              onMouseEnter={() => setIsHoveredCode(true)}
              onMouseLeave={() => setIsHoveredCode(false)}
            >
              <p className="text-2xl font-bold text-gray-900">
                {developerData.codeUsedCount} times
              </p>
              <p className="mt-2 text-sm text-sky-600">
                Your code is making an impact!
              </p>
            </div>
          </div>

          {/* Upload Streak Card */}
          <div className="overflow-hidden transition-all duration-300 bg-white border rounded-lg shadow-lg hover:shadow-xl w-full max-w-xs">
            <div className="flex items-center p-4 bg-gray-50">
              <Calendar
                size={24}
                className={`text-fuchsia-400 transition-transform duration-300 ${
                  isHoveredStreak ? "scale-110" : ""
                } hover:scale-150`}
              />
              <h2 className="ml-2 text-xl font-semibold text-gray-800">
                Upload Streak
              </h2>
            </div>
            <div
              className="p-4"
              onMouseEnter={() => setIsHoveredStreak(true)}
              onMouseLeave={() => setIsHoveredStreak(false)}
            >
              <p className="text-2xl font-bold text-gray-900">
                {developerData.uploadStreak} days
              </p>
              <p className="mt-2 text-sm text-fuchsia-600">
                Consistency is key! Keep it up!
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Upload Streak Graph */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Upload Streak (Last 4 Weeks)
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%" className="text-black">
              <BarChart
                data={weeklyStreakData}
                layout="vertical" // Set layout to vertical for horizontal bars
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="week" type="category" tick={<CustomYAxisTick />} />
                <Tooltip />
                <Bar dataKey="uploads" radius={[10, 10, 0, 0]}>
                  {weeklyStreakData.map((entry) => (
                    <Cell key={entry.week} fill={getBarColor(entry.uploads)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDash;
