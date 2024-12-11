import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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
const data = Object.keys(classifiedWords).map((level) => ({
  name: level,
  value: totalWords > 0 ? Math.round((classifiedWords[level].length / totalWords) * 100) : 0, // Calculate percentage
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA80FF', '#FF8080'];

export default function VocabularyChart() {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ index }) => `${data[index].name}: ${data[index].value}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
