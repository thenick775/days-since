import { useLocalStorage } from '@mantine/hooks';

const STORAGE_KEY = 'progress-trackers';

export type Timer = {
  id: string;
  title: string;
  startedAt: string;
};

export const useProgressTrackers = () =>
  useLocalStorage<Timer[]>({
    key: STORAGE_KEY,
    defaultValue: [],
    getInitialValueInEffect: false,
  });
