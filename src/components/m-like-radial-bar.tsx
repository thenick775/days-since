import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useMantineTheme } from '@mantine/core';

export const MantineLikeRadialBar = ({
  data,
  innerRadius,
}: {
  data: { name: string; value: number; color: string }[];
  innerRadius: string;
}) => {
  const theme = useMantineTheme();

  const chartData = data.map((d) => {
    const [clr, shade] = d.color.split('.');
    return {
      ...d,
      fill: theme.colors[clr]?.[Number(shade)] ?? d.color,
    };
  });

  return (
    <ResponsiveContainer id="pico" width="100%" height="100%">
      <RadialBarChart
        data={chartData}
        dataKey="value"
        innerRadius={innerRadius}
        outerRadius="100%"
        barCategoryGap={1}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar
          background
          dataKey="value"
          isAnimationActive={false}
          cornerRadius="50%"
          stackId={'fuck'}
          label={{
            position: 'insideStart',
            fill: 'black',
            dataKey: 'name',
          }}
        />

        <Tooltip
          labelFormatter={(idx) => data[idx].name}
          formatter={(v, _, derp) => {
            // console.log('v/name', v, name, derp);

            return `${derp.payload.name}: ${Number(v).toFixed(2)} %`;
          }}
          contentStyle={{
            border: 'none',
            borderRadius: 4,
            background: theme.white,
            boxShadow: theme.shadows.sm,
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
