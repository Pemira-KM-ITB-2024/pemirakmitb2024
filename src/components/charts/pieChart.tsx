import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Legend,
} from "recharts";
import { header } from "~/styles/fonts";

const PieCount = ({ data }: { data: { name: string; value: number, real: number }[] }) => {
  const COLORS = ["#3997b1", "#d2391a", "#046977", "#eda537"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList
            dataKey="value"
            position="inside"
            fontSize={16}
            fontVariant="small-caps"
            fontFamily="Oxygen"
            fontWeight={400}
            formatter={(value: string) => `${value}%`}
          />
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend
          verticalAlign="top"
          height={50}
          iconSize={12}
          iconType="circle"
          wrapperStyle={{
            bottom: 0,
            transform: "translateY(110%) translateX(-50%)",
            fontSize: 16,
            width: "80%",
            left: "50%",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex items-center gap-4 rounded-md border border-red-5 bg-cream p-2 font-mono text-base text-red-4 shadow-md">
        <p className={`${header.className}`}>{payload[0]?.payload?.name}</p>
        <p>{`${payload[0]?.payload?.real ?? ""}`}</p>
      </div>
    );
  }

  return null;
};

export default PieCount;
