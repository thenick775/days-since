import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Title,
  Container,
  Grid,
  Card,
  Group,
  Text,
  Button,
  ActionIcon,
} from '@mantine/core';
import { useState } from 'react';
import { TbPlus } from 'react-icons/tb';

import { TimeSince } from './time-since.tsx';

type Tracker = {
  id: string;
  title: string;
  startedAt: string;
};

const mockTrackers: Tracker[] = [
  { id: 'meditation', title: 'Meditation', startedAt: '2024-06-01T08:00:00Z' },
  { id: 'exercise', title: 'Exercise', startedAt: '2024-06-15T12:00:00Z' },
  { id: 'no-sugar', title: 'No Sugar', startedAt: '2024-06-20T09:30:00Z' },
];

const RadialChartView = ({
  tracker,
  onBack,
}: {
  tracker: Tracker;
  onBack: () => void;
}) => (
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
    <Button variant="light" mb="lg" onClick={onBack}>
      ← Back
    </Button>
    <Title order={2}>{tracker.title}</Title>
    <TimeSince />
  </Container>
);

export function DaysSinceApp() {
  const [activeTracker, setActiveTracker] = useState<Tracker | null>(null);

  return (
    <AppShell
      mt="md"
      header={{ height: 60 }}
      styles={{
        root: { height: '100vh' },
        main: {
          display: 'flex',
          flexDirection: 'column',
          height: `calc(100vh - 60px)`,
          overflow: 'hidden',
        },
      }}
    >
      <AppShellHeader p="md" withBorder>
        <Title order={3}>Days Since</Title>
      </AppShellHeader>

      <AppShellMain>
        {activeTracker ? (
          <RadialChartView
            tracker={activeTracker}
            onBack={() => setActiveTracker(null)}
          />
        ) : (
          <Container
            fluid
            size="lg"
            mt="md"
            style={{ overflowY: 'auto', flexGrow: 1 }}
          >
            <Grid>
              {mockTrackers.map((tracker) => (
                <Grid.Col key={tracker.id} span={{ base: 12, sm: 6, md: 4 }}>
                  <Card shadow="md" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="xs">
                      <Text fw={500}>{tracker.title}</Text>
                    </Group>
                    <Text size="sm" c="dimmed">
                      Started:{' '}
                      {new Date(tracker.startedAt).toLocaleDateString()}
                    </Text>
                    <Button
                      mt="md"
                      fullWidth
                      variant="light"
                      onClick={() => setActiveTracker(tracker)}
                    >
                      View Progress
                    </Button>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        )}
        <ActionIcon
          variant="filled"
          pos="absolute"
          size="xl"
          style={{
            bottom: 24,
            right: 16,
            zIndex: 1000,
          }}
        >
          <TbPlus size={25} />
        </ActionIcon>
      </AppShellMain>
    </AppShell>
  );
}
