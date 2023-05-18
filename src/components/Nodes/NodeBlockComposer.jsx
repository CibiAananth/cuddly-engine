/** @format */

// external dependencies
import { Box, Flex, Text } from '@mantine/core';

// utils
import { DATA_TRANSFER_TYPE } from '@/constants/nodes';

export default function NodeBlockComposer({ icon: Icon, title, identifier }) {
  function dragHandler(event) {
    event.dataTransfer.setData(DATA_TRANSFER_TYPE, identifier);
    event.dataTransfer.effectAllowed = 'move';
  }

  return (
    <Box
      onDragStart={dragHandler}
      draggable
      sx={theme => ({
        width: 100,
        backgroundColor: theme.colors.gray[0],
        border: `1px solid ${theme.colors.violet[8]}`,
        textAlign: 'center',
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        cursor: 'grab',
        userSelect: 'none',
        transition: 'background-color 200ms ease',
        '&:hover': {
          backgroundColor: theme.colors.violet[0],
        },
      })}
    >
      <Flex justify="center" align="center" direction="column" wrap="wrap">
        <Icon size={20} />
        <Text fz="md">{title}</Text>
      </Flex>
    </Box>
  );
}
