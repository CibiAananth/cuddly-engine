/** @format */

// external dependencies
import { Box, Flex, Text } from '@mantine/core';

// utils
import { DATA_TRANSFER_MIME_TYPE } from '@/constants/utils';

export default function NodeBlockComposer({ icon: Icon, title, identifier }) {
  /**
   *
   * @param {object} event
   * @description
   * Handles the drag event and sets the data transfer mime type and node type as data.
   */
  function dragHandler(event) {
    event.dataTransfer.setData(DATA_TRANSFER_MIME_TYPE, identifier);
    event.dataTransfer.effectAllowed = 'copy';
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
