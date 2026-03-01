import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "../css/HourlyForecast.css";

export const HourlyForecast = ({ hourlyData }) => {
  const [visiblePoints, setVisiblePoints] = useState(
    window.innerWidth <= 768 ? 3 : 8,
  );

  useEffect(() => {
    const handleResize = () => {
      setVisiblePoints(window.innerWidth <= 768 ? 3 : 8);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleData = hourlyData.slice(0, visiblePoints);

  return (
    <div className="hourlyForecast">
       <div className="chart-wrapper">
        <LineChart width={visibleData.length * 80} height={320} data={visibleData} margin={{ top: 20, right: 20,  bottom: 20 }}>
          <CartesianGrid stroke="#d9d9d9" vertical={true} horizontal={true}/>

          <XAxis dataKey="time" orientation="top" />
          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="var(--accent)"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </div>
      </div>
  );
};
