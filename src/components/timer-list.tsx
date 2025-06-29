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
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { TbPlus, TbArrowLeft } from 'react-icons/tb';

import { CreateTimerModal } from './create-timer-modal.tsx';
import { TimeSince } from './time-since.tsx';

const STORAGE_KEY = 'time-origin-derp-derp';

type Timer = {
  id: string;
  title: string;
  startedAt: string;
};

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
  const [timers, setTimers] = useLocalStorage<Timer[]>({
    key: STORAGE_KEY,
    defaultValue: [],
    getInitialValueInEffect: false,
  });
  const [activeTracker, setActiveTracker] = useState<Timer | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  console.log('vancise ', timers, setTimers);

  return (
    <AppShell
      pt="md"
      header={{ height: 60 }}
      styles={{
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
              {timers.map((tracker) => (
                <Grid.Col key={tracker.id} span={{ base: 12, sm: 6, md: 4 }}>
                  <Card shadow="md" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="xs">
                      <Text fw={500}>{tracker.title}</Text>
                      <Text size="sm" c="dimmed">
                        Started:{' '}
                        {new Date(tracker.startedAt).toLocaleDateString()}
                      </Text>
                    </Group>
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
            onClick={open}
          >
            <TbPlus size={25} />
          </ActionIcon>
        )}
        <CreateTimerModal
          opened={opened}
          close={close}
          onSubmit={(values) => {
            console.log('vancise onSubmit');
            setTimers((prevState) => [
              ...prevState,
              {
                id: nanoid(),
                title: values.timerName,
                startedAt: values.originDateTime.toISOString(),
              },
            ]);
          }}
        />
      </AppShellMain>
    </AppShell>
  );
}
