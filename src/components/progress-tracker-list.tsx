import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  ScrollArea,
  Title,
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
import { TbPlus, TbArrowLeft, TbX } from 'react-icons/tb';

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

  const deleteTracker = (id: string) =>
    setTrackers((prevState) =>
      prevState.filter((tracker) => tracker.id !== id)
    );

  const activeTracker = trackers.find(
    (tracker) => tracker.id === activeTrackerId
  );

  return (
    <AppShell header={{ height: 60 }}>
      <AppShellHeader p="sm" withBorder>
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
          <ScrollArea
            style={{
              height: 'calc(100dvh - var(--mantine-header-height, 0px) - 60px)',
            }}
            px="md"
            pb="lg"
            scrollbarSize={8}
            scrollbars="y"
          >
            <Grid gutter="lg" pt={'sm'}>
              {trackers.map((tracker) => (
                <Grid.Col key={tracker.id} span={{ base: 12, sm: 6, md: 4 }}>
                  <Card shadow="md" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="xs">
                      <Text fw={500}>{tracker.title}</Text>

                      <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="red"
                        aria-label="Delete tracker"
                        onClick={() => deleteTracker(tracker.id)}
                      >
                        <TbX size={18} />
                      </ActionIcon>
                    </Group>

                    <Text size="sm" c="dimmed" ta="left">
                      Started:{' '}
                      {new Date(tracker.startedAt).toLocaleDateString()}
                    </Text>

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
          </ScrollArea>
        )}

        {!activeTrackerId && !opened && (
          <ActionIcon
            aria-label="Add tracker"
            variant="filled"
            pos="absolute"
            size="xl"
            style={{
              bottom: 24,
              right: 8,
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
