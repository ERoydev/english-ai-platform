import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

// Map levels to numeric values
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

// Transform the parameters into radar chart data
const transformData = (parameters: { [key: string]: string[][] }) => {
    return Object.entries(parameters).map(([key, levels]) => {
      // Flatten the nested levels and map to numeric values
      const numericValues = levels.flat().map((level) => levelMapping[level] || 0);
      // Calculate the average score
      const averageScore =
        numericValues.reduce((acc, val) => acc + val, 0) / numericValues.length;
  
      // Round the average score and find the corresponding level
      const roundedScore = Math.round(averageScore);
      const cefrLevel = reverseLevelMapping[roundedScore] || "Unknown";
  
      return {
        subject: `${key} (${cefrLevel})`, // Include CEFR level in the subject
        value: roundedScore, // Average score
      };
    });
  };

interface LevelRadarProps {
  parameters: { [key: string]: string[][] };
}

export default function LevelRadar({ parameters }: LevelRadarProps) {
  // Transform the data for the radar chart
  const radarData = transformData(parameters);

  return (
    <div className="border-2 rounded-xl border-gray-300 my-10">
        <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend content={() => null} /> {/* Custom legend with no content */}
        </RadarChart>
        </ResponsiveContainer>
    </div>
  );
}
