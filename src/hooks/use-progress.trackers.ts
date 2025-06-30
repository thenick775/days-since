import { useLocalStorage } from '@mantine/hooks';

const STORAGE_KEY = 'progress-trackers';

export type Tracker = {
  id: string;
  title: string;
  startedAt: string;
};

export const useProgressTrackers = (defaultTracker: Tracker) =>
  useLocalStorage<Tracker[]>({
    key: STORAGE_KEY,
    defaultValue: [defaultTracker],
    getInitialValueInEffect: false,
  });
