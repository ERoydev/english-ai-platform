import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ClassifiedWordsInterface {
    A1: string[],
    A2: string[],
    B1: string[],
    B2: string[],
    C1: string[],
    C2: string[],
}

const initialClassifiedWords = {
    A1: [],
    A2: [],
    B1: [],
    B2: [],
    C1: [],
    C2: [],
}


export default function TinyBarChart({
    classifiedWords,
}: {
    classifiedWords: ClassifiedWordsInterface
}) {
    const [data, setData] = useState<ClassifiedWordsInterface>(initialClassifiedWords);

    const transformData = () => {
        // Transform classifiedWords into a format suitable for recharts
        const preparedData = Object.keys(classifiedWords).map((level: string) => ({
            name: level,
            'words count': classifiedWords[level].length,
          }));

        setData(preparedData)
    }

    useEffect(() => {
        transformData();
    }, [classifiedWords])

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 'dataMax + 10']}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="words count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
}

