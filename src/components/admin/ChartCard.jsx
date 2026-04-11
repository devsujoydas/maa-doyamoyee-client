import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionReveal from "../SectionReveal";

const ChartCard = ({ title, data }) => (
  <SectionReveal>
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="mb-4 font-semibold">{title}</h3>
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#CF4517" radius={[6, 6, 0, 0]} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip /> 
        </BarChart>
      </ResponsiveContainer>
    </div>
  </SectionReveal>
);

export default ChartCard;