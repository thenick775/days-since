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
import { TbPlus, TbArrowLeft } from 'react-icons/tb';

import { TimeSince } from './time-since.tsx';

type Timer = {
  id: string;
  title: string;
  startedAt: string;
};

const mockTrackers: Timer[] = [
  { id: 'meditation', title: 'Meditation', startedAt: '2024-06-01T08:00:00Z' },
  { id: 'exercise', title: 'Exercise', startedAt: '2024-06-15T12:00:00Z' },
  { id: 'no-sugar', title: 'No Sugar', startedAt: '2024-06-20T09:30:00Z' },
];

const RadialChartView = ({ tracker }: { tracker: Timer }) => (
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
    <TimeSince />
  </Container>
);

export function DaysSinceApp() {
  const [activeTracker, setActiveTracker] = useState<Timer | null>(null);

  return (
    <AppShell
      mt="md"
      header={{ height: 60 }}
      styles={{
        root: { height: '100%' },
        main: {
          display: 'flex',
          flexDirection: 'column',
          height: `100%`,
          overflow: 'hidden',
        },
      }}
    >
      <AppShellHeader p="md" withBorder>
        <Grid align="center">
          <Grid.Col span={1.5}>
            {activeTracker && (
              <ActionIcon
                aria-label="Back"
                variant="outline"
                onClick={() => setActiveTracker(null)}
              >
                <TbArrowLeft size={16} />
              </ActionIcon>
            )}
          </Grid.Col>

          <Grid.Col span="auto">
            <Title order={2} ta="center">
              Days Since
            </Title>
          </Grid.Col>

          <Grid.Col span={1.5} />
        </Grid>
      </AppShellHeader>

      <AppShellMain>
        {activeTracker ? (
          <RadialChartView tracker={activeTracker} />
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
        {!activeTracker && (
          <ActionIcon
            aria-label="Add counter"
            variant="filled"
            pos="absolute"
            size="xl"
            style={{
              bottom: 24,
              right: 16,
              zIndex: 1000,
            }}
            onClick={() => {}}
          >
            <TbPlus size={25} />
          </ActionIcon>
        )}
      </AppShellMain>
    </AppShell>
  );
}
