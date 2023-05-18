/** @format */

import { memo, useState } from 'react';

// external dependencies
import { Text, Flex, Textarea, Button, Space } from '@mantine/core';
import { MessengerLogo } from '@phosphor-icons/react';

// utils
import { useNodeStore } from '@/hooks/useStore';

// relative imports
import NodeComposer from './NodeComposer';
import NodeBlockComposer from './NodeBlockComposer';

export const MESSAGE_NODE_IDENTIFIER = 'messageNode';

export const MessageNodeSettings = ({ nodeId }) => {
  const node = useNodeStore(state => state.nodes.find(n => n.id === nodeId));
  const updateNode = useNodeStore(state => state.updateNode);
  const clearSelectedNode = useNodeStore(state => state.clearNodeSelection);

  const [message, setMessage] = useState(node?.data?.message || '');
  const handleChange = e => setMessage(e.target.value);

  const handleSave = () => {
    updateNode(nodeId, { data: { ...node.data, message } });
    clearSelectedNode(nodeId);
  };

  return (
    <>
      <Flex direction="column" justify="center" align="start">
        <Space h="sm" />
        <Textarea
          value={message}
          onChange={handleChange}
          placeholder="Your message"
          autosize
          minRows={2}
          sx={{ width: '100%' }}
        />
        <Space h="sm" />
        <Button variant="outline" onClick={handleSave}>
          Save
        </Button>
      </Flex>
    </>
  );
};

export const MessageNodeBlock = () => (
  <NodeBlockComposer
    identifier={MESSAGE_NODE_IDENTIFIER}
    icon={MessengerLogo}
    title="Message"
  />
);

const MessageNode = memo(({ data }) => {
  const Title = () => (
    <Flex align="center" gap={2}>
      <MessengerLogo size={10} />
      <Text fw={600} fz={8}>
        Send Message
      </Text>
    </Flex>
  );

  const Content = () => (
    <Text
      fz={8}
      mt={3}
      sx={{
        textAlign: 'center',
      }}
    >
      {data.message}
    </Text>
  );

  return (
    <NodeComposer
      titleRenderer={() => <Title />}
      contentRenderer={() => <Content />}
    />
  );
});

MessageNode.displayName = 'MessageNode';

export default MessageNode;
