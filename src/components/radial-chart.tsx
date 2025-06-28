import { Box, Center, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import dayOfYear from 'dayjs/plugin/dayOfYear';

import { MantineLikeRadialBar } from './m-like-radial-bar';
import { useAnimatedRings } from '../hooks/use-animated-rings';

dayjs.extend(duration);
dayjs.extend(isLeapYear);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);

const STORAGE_KEY = 'time-origin';

type Elapsed = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const formatElapsed = ({ days, hours, minutes, seconds }: Elapsed) => {
  const parts: string[] = [];

  if (days) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  if (hours) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  if (minutes) parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);

  parts.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);

  return parts.join(', ');
};

export const TimeProgressRadial = () => {
  const [origin] = useLocalStorage<string>({
    key: STORAGE_KEY,
    defaultValue: dayjs().toISOString(),
    getInitialValueInEffect: false,
  });
  const originDate = dayjs(origin);

  const { animatedRings, elapsed } = useAnimatedRings(originDate);

  return (
    <Box pos="relative" w="90dvw" h="90dvh">
      <MantineLikeRadialBar data={animatedRings} innerRadius="50%" />
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
        <Text fw={700} size="lg" ta="center">
          {formatElapsed(elapsed)}
        </Text>
      </Center>
    </Box>
  );
};
