import './App.css';

import { MantineProvider } from '@mantine/core';

import { DaysSinceApp } from './components/timer-list.tsx';

import '@mantine/core/styles.css';

export const App = () => {
  return (
    <>
      <MantineProvider defaultColorScheme="auto">
        <DaysSinceApp />
      </MantineProvider>
    </>
  );
};
