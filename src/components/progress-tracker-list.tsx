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
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { TbPlus, TbArrowLeft } from 'react-icons/tb';

import { CreateTrackerModal } from './create-tracker-modal.tsx';
import { ProgressTracker } from './progress-tracker.tsx';
import {
  useProgressTrackers,
  type Tracker,
} from '../hooks/use-progress.trackers.ts';

export const ProgressTrackerList = () => {
  const [trackers, setTrackers] = useProgressTrackers({
    id: nanoid(),
    title: 'First Visit',
    startedAt: dayjs().toISOString(),
  });
  const [activeTrackerId, setActiveTrackerId] = useState<Tracker['id'] | null>(
    null
  );
  const [opened, { open, close }] = useDisclosure(false);

  const updateDateString = (id: string, dateString: string) =>
    setTrackers((prevState) => {
      const tracker = prevState.find((tracker) => tracker.id === id);

      if (!tracker) return prevState;

      const newTracker: Tracker = { ...tracker, startedAt: dateString };

      return [...prevState.filter((tracker) => tracker.id !== id), newTracker];
    });

  const activeTracker = trackers.find(
    (tracker) => tracker.id === activeTrackerId
  );

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
            {activeTrackerId && (
              <ActionIcon
                aria-label="Back"
                variant="outline"
                onClick={() => setActiveTrackerId(null)}
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
          <ProgressTracker
            tracker={activeTracker}
            updateIsoDateString={updateDateString}
          />
        ) : (
          <Container fluid size="lg" mt="md" w="100%">
            <Grid>
              {trackers.map((tracker) => (
                <Grid.Col key={tracker.id} span={{ base: 12, sm: 6, md: 4 }}>
                  <Card shadow="md" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="xs">
                      <Text fw={500}>{tracker.title}</Text>
                      <Text size="md" c="dimmed">
                        Started:{' '}
                        {new Date(tracker.startedAt).toLocaleDateString()}
                      </Text>
                    </Group>
                    <Button
                      mt="md"
                      fullWidth
                      variant="light"
                      onClick={() => setActiveTrackerId(tracker.id)}
                    >
                      View Progress
                    </Button>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        )}
        {!activeTrackerId && !opened && (
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
        <CreateTrackerModal
          opened={opened}
          close={close}
          onSubmit={(values) =>
            setTrackers((prevState) => [
              ...prevState,
              {
                id: nanoid(),
                title: values.trackerName,
                startedAt: values.originDateTime.toISOString(),
              },
            ])
          }
        />
      </AppShellMain>
    </AppShell>
  );
};
