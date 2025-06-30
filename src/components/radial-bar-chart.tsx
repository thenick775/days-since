import { useComputedColorScheme, useMantineTheme } from '@mantine/core';
import { isSafari } from 'react-device-detect';
import {
  RadialBarChart as ReRadialBarChart,
  RadialBar as ReRadialBar,
  PolarAngleAxis as RePolarAngleAxis,
  ResponsiveContainer as ReResponsiveContainer,
} from 'recharts';

type RadialBarChartProps = {
  data: { name: string; value: number; color: string }[];
  innerRadius: string;
};

export const RadialBarChart = ({ data, innerRadius }: RadialBarChartProps) => {
  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme();

  const chartData = data.map((data) => {
    const [clr, shade] = data.color.split('.');
    return {
      ...data,
      fill: theme.colors[clr]?.[Number(shade)] ?? data.color,
    };
  });

  const emptyBackground =
    computedColorScheme === 'dark'
      ? theme.colors.dark[6]
      : theme.colors.gray[1];

  return (
    <ReResponsiveContainer width="100%" height="100%">
      <ReRadialBarChart
        data={chartData}
        dataKey="value"
        innerRadius={innerRadius}
        outerRadius="100%"
        barCategoryGap={1}
        startAngle={90}
        endAngle={-270}
      >
        <RePolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <ReRadialBar
          background={{ fill: emptyBackground }}
          dataKey="value"
          isAnimationActive={false}
          cornerRadius="50%"
          label={{
            position: 'insideStart',
            fill: computedColorScheme === 'dark' ? theme.white : theme.black,
            dataKey: 'name',
            // issue in webkit, recharts text positioning is off center
            transform: isSafari ? 'translate(0 5)' : undefined,
          }}
        />
      </ReRadialBarChart>
    </ReResponsiveContainer>
  );
};
