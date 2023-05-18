/** @format */

import 'reactflow/dist/style.css';

// external dependencies
import { MantineProvider, AppShell, Grid } from '@mantine/core';
import { ReactFlowProvider } from 'reactflow';

// components
import Flow from '@/components/Flow';
import Sidebar from '@/components/Sidebar';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell padding="md">
        <Grid
          sx={() => ({
            height: 'calc(100vh - 10px)',
            overflow: 'hidden',
          })}
        >
          <ReactFlowProvider>
            <Grid.Col span={9}>
              <Flow />
            </Grid.Col>
            <Grid.Col span={3}>
              <Sidebar />
            </Grid.Col>
          </ReactFlowProvider>
        </Grid>
      </AppShell>
    </MantineProvider>
  );
}
