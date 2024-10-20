"use client";
import React, { useState, useEffect } from "react";
import { Heart, Code, Calendar } from "lucide-react";
import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // States for hover effects
  const [isHoveredLikes, setIsHoveredLikes] = useState(false);
  const [isHoveredCode, setIsHoveredCode] = useState(false);
  const [isHoveredStreak, setIsHoveredStreak] = useState(false);

  // Sample upload streak data
  const weeklyStreakData = [
    { week: "Week 1", uploads: 8 },
    { week: "Week 2", uploads: 10 },
    { week: "Week 3", uploads: 7 },
    { week: "Week 4", uploads: 12 },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await fetch(
            `/api/user-profile?email=${session.user.email}`
          );
          if (!response.ok) throw new Error("Failed to fetch user data");
          const data = await response.json();
          setUserData({
            likes: data.likes || 0,
            codeUsedCount: data.codeUsedCount || 100,
            uploadStreak: data.uploadStreak || 100,
            name: session.user.name || "Anonymous User",
            profession: data.profession || "Developer",
            img: session.user.image || "/default-avatar.png",
            bio: data.bio || "No bio available.",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData({
            likes: 0,
            codeUsedCount: 0,
            uploadStreak: 0,
            name: session.user.name || "Anonymous User",
            profession: "Developer",
            img: session.user.image || "/default-avatar.png",
            bio: "No bio available.",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session, status]);

  const getBarColor = (uploads) => {
    const maxUploads = Math.max(...weeklyStreakData.map((d) => d.uploads));
    let greenIntensity;

    if (uploads === 0) {
      return "rgba(0, 255, 0, 0.2)";
    } else if (uploads <= maxUploads / 3) {
      greenIntensity = 100;
    } else if (uploads <= (2 * maxUploads) / 3) {
      greenIntensity = 200;
    } else {
      greenIntensity = 255;
    }

    return `rgba(0, ${greenIntensity}, 0, 1)`;
  };

  const CustomYAxisTick = ({ x, y, payload }) => {
    return (
      <text x={x} y={y} fill="black" textAnchor="end" dominantBaseline="middle">
        {payload.value}
      </text>
    );
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">
            Please sign in to view your dashboard
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 font-sans bg-gray-100 md:p-8">
      <div className="flex flex-col mx-auto space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8 max-w-7xl">
        {/* User Info Section */}
        <div className="w-full p-4 bg-white border rounded-lg shadow-lg lg:w-1/3 md:p-8 userData">
          <div className="flex flex-col items-center space-y-4">
            {/* User Image */}
            <div className="relative w-24 h-24 overflow-hidden border-4 border-gray-300 rounded-full md:w-32 md:h-32 blob-animation">
              <img
                src={userData?.img}
                alt={userData?.name}
                className="object-cover w-full h-full"
              />
            </div>

            {/* User Name and Profession */}
            <h2 className="text-2xl font-bold text-center text-gray-800 md:text-3xl">
              {userData?.name}
            </h2>
            <p className="text-base text-center text-gray-600 md:text-lg">
              {userData?.profession}
            </p>

            {/* User Bio */}
            <div className="w-full mt-4">
              <h3 className="mt-5 text-lg font-semibold text-gray-800">
                About:
              </h3>
              <p className="mt-6 text-sm text-justify text-gray-700 md:text-base">
                {userData?.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex-1 overflow-y-auto">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 md:text-4xl">
            Profile Dashboard
          </h1>

          <div className="grid grid-cols-1 gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Likes Card */}
            <div className="w-full overflow-hidden transition-all duration-300 bg-white border rounded-lg shadow-lg hover:shadow-xl">
              <div className="flex items-center p-4 bg-gray-50">
                <Heart
                  size={24}
                  className={`text-rose-400 transition-transform duration-300 ${
                    isHoveredLikes ? "scale-110" : ""
                  } hover:scale-150`}
                />
                <h2 className="ml-2 text-lg font-semibold text-gray-800 md:text-xl">
                  Total Likes
                </h2>
              </div>
              <div
                className="p-4"
                onMouseEnter={() => setIsHoveredLikes(true)}
                onMouseLeave={() => setIsHoveredLikes(false)}
              >
                <p className="text-xl font-bold text-gray-900 md:text-2xl">
                  {userData?.likes}
                </p>
                <p className="mt-2 text-xs md:text-sm text-rose-600">
                  People appreciate your work!
                </p>
              </div>
            </div>

            {/* Code Usage Card */}
            <div className="w-full overflow-hidden transition-all duration-300 bg-white border rounded-lg shadow-lg hover:shadow-xl">
              <div className="flex items-center p-4 bg-gray-50">
                <Code
                  size={24}
                  className={`text-sky-500 transition-transform duration-300 ${
                    isHoveredCode ? "animate-bounce" : ""
                  } hover:scale-150`}
                />
                <h2 className="ml-2 text-lg font-semibold text-gray-800 md:text-xl">
                  Code Used
                </h2>
              </div>
              <div
                className="p-4"
                onMouseEnter={() => setIsHoveredCode(true)}
                onMouseLeave={() => setIsHoveredCode(false)}
              >
                <p className="text-xl font-bold text-gray-900 md:text-2xl">
                  {userData?.codeUsedCount} times
                </p>
                <p className="mt-2 text-xs md:text-sm text-sky-600">
                  Your code is making an impact!
                </p>
              </div>
            </div>

            {/* Upload Streak Card */}
            <div className="w-full overflow-hidden transition-all duration-300 bg-white border rounded-lg shadow-lg hover:shadow-xl">
              <div className="flex items-center p-4 bg-gray-50">
                <Calendar
                  size={24}
                  className={`text-fuchsia-400 transition-transform duration-300 ${
                    isHoveredStreak ? "scale-110" : ""
                  } hover:scale-150`}
                />
                <h2 className="ml-2 text-lg font-semibold text-gray-800 md:text-xl">
                  Upload Streak
                </h2>
              </div>
              <div
                className="p-4"
                onMouseEnter={() => setIsHoveredStreak(true)}
                onMouseLeave={() => setIsHoveredStreak(false)}
              >
                <p className="text-xl font-bold text-gray-900 md:text-2xl">
                  {userData?.uploadStreak} days
                </p>
                <p className="mt-2 text-xs md:text-sm text-fuchsia-600">
                  Consistency is key! Keep it up!
                </p>
              </div>
            </div>
          </div>

          {/* Weekly Upload Streak Graph */}
          <div className="mt-8 md:mt-12">
            <h2 className="mb-4 text-xl font-semibold text-center text-gray-800 md:text-2xl">
              Upload Streak (Last 4 Weeks)
            </h2>
            <div className="w-full h-48 md:h-64">
              <ResponsiveContainer
                width="100%"
                height="100%"
                className="text-black"
              >
                <BarChart
                  data={weeklyStreakData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="week"
                    type="category"
                    tick={<CustomYAxisTick />}
                  />
                  <Tooltip />
                  <Bar dataKey="uploads" radius={[10, 10, 0, 0]}>
                    {weeklyStreakData.map((entry) => (
                      <Cell
                        key={entry.week}
                        fill={getBarColor(entry.uploads)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blob-animation {
          animation: blob 5s infinite alternate;
        }

        @keyframes blob {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default UserDash;
