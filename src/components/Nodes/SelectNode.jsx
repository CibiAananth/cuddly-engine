/** @format */

import { memo, useState } from 'react';

// external dependencies
import { Text, Flex, Button, Space, Select } from '@mantine/core';
import { Atom } from '@phosphor-icons/react';

// utils
import { useNodeStore } from '@/hooks/useStore';

// relative imports
import NodeComposer from './NodeComposer';
import NodeBlockComposer from './NodeBlockComposer';

// constants
export const SELECT_NODE_IDENTIFIER = 'selectNode';

export const SelectNodeSettings = ({ nodeId }) => {
  const node = useNodeStore(state => state.nodes.find(n => n.id === nodeId));
  const updateNode = useNodeStore(state => state.updateNode);
  const clearSelectedNode = useNodeStore(state => state.clearNodeSelection);

  const options = [
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'vue', label: 'Vue' },
  ];

  const [item, setSelected] = useState(node?.data?.item || {});
  const handleChange = e => {
    const selected = options.find(o => o.value === e);
    setSelected(selected);
  };
  const handleSave = () => {
    updateNode(nodeId, { data: { ...node.data, item } });
    clearSelectedNode(nodeId);
  };

  return (
    <>
      <Flex direction="column" justify="center" align="start">
        <Space h="sm" />
        <Select
          label="Your favorite framework/library"
          placeholder="Pick one"
          data={options}
          value={item.value}
          onChange={handleChange}
        />
        <Space h="sm" />
        <Button variant="outline" onClick={handleSave}>
          Save
        </Button>
      </Flex>
    </>
  );
};

export const SelectNodeBlock = () => (
  <NodeBlockComposer
    identifier={SELECT_NODE_IDENTIFIER}
    icon={Atom}
    title="Select"
  />
);

export const SelectNode = memo(({ data }) => (
  <NodeComposer
    titleRenderer={() => (
      <Flex align="center" gap={2}>
        <Atom size={10} />
        <Text fw={600} fz={8}>
          Framework
        </Text>
      </Flex>
    )}
    contentRenderer={() => (
      <Text
        fz={8}
        mt={3}
        sx={{
          textAlign: 'center',
        }}
      >
        {data.item?.label ?? "You haven't selected anything yet"}
      </Text>
    )}
  />
));

SelectNode.displayName = 'SelectNode';

export default SelectNode;
