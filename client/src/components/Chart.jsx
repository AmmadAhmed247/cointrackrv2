import React from 'react';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';

const MiniCryptoChart = ({ data, isUp }) => {
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  return (
    <ResponsiveContainer width="100%" height={60}>
      <AreaChart data={data}>
        <YAxis hide domain={[min - 10, max + 10]} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={isUp ? '#16c784' : '#ea3943'}
          fill={isUp ? 'rgba(22, 199, 132, 0.2)' : 'rgba(234, 57, 67, 0.2)'}
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MiniCryptoChart;
