import { Box, Center, Text } from '@mantine/core';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import duration from 'dayjs/plugin/duration';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { RadialBarChart } from './radial-bar-chart.tsx';
import { useAnimatedRings } from '../hooks/use-animated-rings.ts';

dayjs.extend(duration);
dayjs.extend(isLeapYear);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);

type TimeSinceProps = {
  dateString: string;
};

type Elapsed = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const formatElapsed = ({ years, days, hours, minutes, seconds }: Elapsed) => {
  const parts: string[] = [];

  if (years) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (days) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  if (hours) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  if (minutes) parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);

  parts.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);

  return parts.join(', ');
};

export const TimeSince = ({ dateString }: TimeSinceProps) => {
  const originDate = dayjs(dateString);
  const { animatedRings, elapsed } = useAnimatedRings(originDate);

  return (
    <Box h="100%">
      <Box
        style={{
          position: 'relative',
          height: 'clamp(100px, 100vw, 400px)',
          maxHeight: 'fit-content',
        }}
      >
        <RadialBarChart data={animatedRings} innerRadius="30%" />
        <Center
          pos="absolute"
          inset={0}
          style={{
            pointerEvents: 'none',
            width: 'fit-content',
            margin: 'auto',
            maxWidth: '30%',
            maxHeight: '30%',
          }}
        >
          <Text fw={700} size="md" ta="center">
            Progress
          </Text>
        </Center>
      </Box>
      <Text fw={700} size="lg" ta="center" mt="sm">
        {formatElapsed(elapsed)}
      </Text>
    </Box>
  );
};
