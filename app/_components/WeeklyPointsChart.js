"use client";

import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Example weekly data
const data = [
  { week: "Week 1", points: 30 },
  { week: "Week 2", points: 45 },
  { week: "Week 3", points: 50 },
  { week: "Week 4", points: 35 },
  { week: "Week 5", points: 60 },
];

export default function WeeklyPointsChart({ rankingHistory, type, domain }) {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={rankingHistory}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="start_date" />
          {domain ? (
            <YAxis
              domain={[
                () => 1, // always force min = 1
                (dataMax) => Math.max(10, dataMax), // auto top, at least 10
              ]}
              reversed
            />
          ) : (
            <YAxis />
          )}
          <Tooltip />
          <Line type="linear" dataKey={type} stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
