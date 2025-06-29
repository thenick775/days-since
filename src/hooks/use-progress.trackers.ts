import { useLocalStorage } from '@mantine/hooks';

const STORAGE_KEY = 'progress-trackers';

export type Tracker = {
  id: string;
  title: string;
  startedAt: string;
};

export const useProgressTrackers = () =>
  useLocalStorage<Tracker[]>({
    key: STORAGE_KEY,
    defaultValue: [],
    getInitialValueInEffect: false,
  });
