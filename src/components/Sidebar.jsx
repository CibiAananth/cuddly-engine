/** @format */

import { memo } from 'react';

// external dependencies
import { useReactFlow } from 'reactflow';
import { Box, Button, Flex, Text, Space, ActionIcon } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';

// components
import { MessageNodeBlock } from '@/components/Nodes/MessageNode';
import { SelectNodeBlock } from '@/components/Nodes/SelectNode';
import { ArrowLeft } from '@phosphor-icons/react';

// utils
import { useNodeStore } from '@/hooks/useStore';

const NodesPanel = () => (
  <Flex direction="row" gap={4} wrap="wrap">
    <MessageNodeBlock />
    <SelectNodeBlock />
  </Flex>
);

const SettingsPanel = memo(({ selectedNode }) => {
  if (!selectedNode?.settingsRenderer) {
    return <Text fz="md">No settings available for the selected node</Text>;
  }

  const Renderer = selectedNode.settingsRenderer;
  return <Renderer nodeId={selectedNode.id} />;
});

SettingsPanel.displayName = 'SettingsPanel';

const Panel = () => {
  const selectedNode = useNodeStore(state => state.selectedNode);
  const clearNodeSelection = useNodeStore(state => state.clearNodeSelection);

  return (
    <Box p={0} sx={{ height: '94%' }}>
      {selectedNode ? (
        <>
          <ActionIcon
            variant="outline"
            onClick={() => clearNodeSelection(selectedNode.id)}
          >
            <ArrowLeft size={18} />
          </ActionIcon>
          <SettingsPanel selectedNode={selectedNode} />
        </>
      ) : (
        <NodesPanel />
      )}
    </Box>
  );
};

export default function Sidebar() {
  const reactFlowInstance = useReactFlow();

  function onSave() {
    notifications.clean();

    const nodes = reactFlowInstance.getNodes() || [];
    const edges = reactFlowInstance.getEdges() || [];

    if (!nodes.length) {
      return notifications.show({
        color: 'yellow',
        title: 'Oops!',
        message: 'Nothing to save yet 🤷‍♂️',
      });
    }

    if (edges.length !== nodes.length - 1) {
      return notifications.show({
        color: 'red',
        title: 'Unable to save',
        message: 'Target handle is missing in more than one Nodes 🤥',
      });
    }

    const fileContent = reactFlowInstance.toObject();
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(fileContent)], { type: 'text/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'flow.json';
    a.click();
  }

  return (
    <Box
      sx={theme => ({
        backgroundColor: theme.colors.gray[2],
        padding: theme.spacing.md,
        height: '100%',
      })}
    >
      <Notifications position="top-center" />
      <Panel />
      <Space h="md" />
      <Button sx={{ float: 'right' }} onClick={onSave}>
        Save Flow
      </Button>
    </Box>
  );
}
