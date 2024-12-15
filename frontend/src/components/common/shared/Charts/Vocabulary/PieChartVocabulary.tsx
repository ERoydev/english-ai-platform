import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import level from './cerflevels'; // Human-readable level descriptions

const classifiedWords = {
  A1: ['I', 'want', 'to', 'see', 'the', 'my', 'statistics', 'that', 'I', 'created', 'to', 'classify', 'it', 'so', 'see', 'what', 'is', 'returned', 'from', 'my'],
  A2: [],
  B1: [],
  B2: [],
  C1: [],
  C2: ['words,', "let's", 'backhand.'],
};

// Calculate total word count
const totalWords = Object.values(classifiedWords).reduce((acc, words) => acc + words.length, 0);

// Transform classifiedWords into percentages for PieChart
const data = Object.keys(classifiedWords).map((levelKey) => ({
  name: levelKey,
  value: totalWords > 0 ? Math.round((classifiedWords[levelKey].length / totalWords) * 100) : 0, // Calculate percentage
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA80FF', '#FF8080'];

export default function PieChartVocabulary() {
  return (
    <div
  className="border-window flex flex-col md:flex-row items-center justify-center md:justify-start h-[400px] max-lg:h-[500px]"
>
  {/* Responsive Container for Chart */}
  <ResponsiveContainer width="50%" height={300}>
    <div className="w-full md:w-1/2 max-md:h-[400px] h-[300px] mx-auto flex items-center justify-center">
      <PieChart width={200} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  </ResponsiveContainer>

  {/* Legend Section */}
  <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto max-md:mb-20 flex max-md:justify-center">
    <ul className='text-center flex flex-col gap-2'>
      {data.map((item, index) => (
        <li key={index} className="flex items-center gap-2 text-md max-2xl:text-xs">
          {/* Color indicator */}
          <span
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              backgroundColor: COLORS[index % COLORS.length],
              borderRadius: '50%', // Circle shape
            }}
          ></span>
          <span className="font-bold">{item.value}%</span>
          - {level[item.name] || 'Unknown Level'} ({item.name})
        </li>
      ))}
    </ul>
  </div>
</div>


  );
}
