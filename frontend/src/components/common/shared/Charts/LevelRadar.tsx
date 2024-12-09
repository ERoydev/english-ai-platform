import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const levelMapping: { [key: string]: number } = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6,
};

const reverseLevelMapping: { [key: number]: string } = Object.entries(levelMapping).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as { [key: number]: string }
);

const transformData = (parameters: { [key: string]: string[][] }) => {
  return Object.entries(parameters).map(([key, levels]) => {
    const numericValues = levels.flat().map((level) => levelMapping[level] || 0);
    const averageScore =
      numericValues.reduce((acc, val) => acc + val, 0) / numericValues.length;

    const roundedScore = Math.round(averageScore);
    const cefrLevel = reverseLevelMapping[roundedScore] || "Unknown";

    return {
      subject: `${key} (${cefrLevel})`,
      value: roundedScore,
    };
  });
};

interface LevelRadarProps {
  parameters: { [key: string]: string[][] };
}

export default function LevelRadar({ parameters }: LevelRadarProps) {
  const radarData = transformData(parameters);
  const [outerRadius, setOuterRadius] = useState(() => {
    // Initialize based on current window size
    const width = window.innerWidth;
    if (width < 600) return 30;
    if (width < 1024) return 40;
    return 50;
  });

  useEffect(() => {
    const updateOuterRadius = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setOuterRadius(30);
      } else if (width < 1024) {
        setOuterRadius(40);
      } else {
        setOuterRadius(50);
      }
    };

    window.addEventListener("resize", updateOuterRadius);
    return () => window.removeEventListener("resize", updateOuterRadius);
  }, []);

  return (
    <div className={`w-full h-80 mx-auto aspect-square border-2 border-gray-200 rounded-xl`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius={`${outerRadius}%`} data={radarData}>
          <PolarGrid stroke="#ccc" strokeWidth={1} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fontSize: 12,
              fill: "#666",
            }}
          />
          <Radar
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Legend content={() => null} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
