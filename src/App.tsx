import './App.css';
import { TimeProgressRadial } from './components/radial-chart';

import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

function App() {
  return (
    <>
      <MantineProvider defaultColorScheme="auto">
        <TimeProgressRadial />
      </MantineProvider>
    </>
  );
}

export default App;
