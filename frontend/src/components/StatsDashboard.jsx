// src/components/StatsDashboard.jsx
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

function StatsDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  if (!stats)
    return (
      <p className="text-center text-gray-500 mt-50">Aún no hay noticias analizadas.</p>
    );

  const data = [
    { name: "Reales", value: stats.real },
    { name: "Falsas", value: stats.fake },
  ];

  return (
   <div className="max-w-xl mx-auto bg-gray-900 p-10 rounded-xl shadow-lg text-white mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Estadísticas</h2>

      <div className="flex justify-center">
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <p className="mt-4 text-center text-gray-300">
        Total de noticias analizadas: <strong>{stats.total_news}</strong>
      </p>
    </div>
  );
}

export default StatsDashboard;
