import { Cell, Legend, Pie, PieChart } from "recharts";

const PieChartCard = ({ pieData }) => {
  const COLORS = ["#CF4517", "#facc15", "#7c2d12", "#d97706", "#92400e"];
  return (
    <div className="bg-white p-6 rounded-xl shadow col-span-1 text-center flex flex-col justify-center items-center">
      <h3 className="mb-4 font-semibold">System Overview</h3>
      <PieChart width={250} height={250}>
        <Pie data={pieData} dataKey="value">
          {pieData.map((_, i) => (<Cell key={i} fill={COLORS[i]} />))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartCard;