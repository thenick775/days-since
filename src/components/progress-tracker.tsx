import { Container, Title } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import dayjs from 'dayjs';

import { TimeSince } from './time-since.tsx';

import type { Tracker } from '../hooks/use-progress.trackers.ts';

export const ProgressTracker = ({ tracker }: { tracker: Tracker }) => (
  <Container
    fluid
    m={1}
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Title order={3}>{tracker.title}</Title>
    <TimeSince dateString={tracker.startedAt} />
    <DateTimePicker
      withSeconds
      label="Start datetime"
      placeholder="Start datetime"
      valueFormat="MMM DD YYYY hh:mm:ss A"
      value={dayjs(tracker.startedAt).toDate()}
      style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}
      mt="md"
      w="100%"
    />
  </Container>
);
