import './App.css';

import { MantineProvider } from '@mantine/core';

import { ProgressTrackerList } from './components/progress-tracker-list.tsx';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export const App = () => (
  <MantineProvider defaultColorScheme="dark">
    <ProgressTrackerList />
  </MantineProvider>
);
