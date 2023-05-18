/** @format */

// external dependencies
import { Handle, Position } from 'reactflow';
import { Text, Container, Flex } from '@mantine/core';

// utils
import { useValidatorFn } from '@/hooks/useValidator';

export default function NodeComposer({ titleRenderer, contentRenderer }) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        isValidConnection={useValidatorFn()}
      />
      <Container
        draggable
        sx={theme => ({
          width: 200,
          height: 50,
          padding: 0,
          border: `1px solid ${theme.colors.gray[4]}`,
          borderRadius: theme.radius.xs,
        })}
      >
        <Flex
          px={3}
          h={20}
          align="center"
          gap={2}
          sx={theme => ({
            backgroundColor: theme.colors.violet[2],
          })}
        >
          {titleRenderer()}
        </Flex>
        <Text
          fz={8}
          mt={3}
          sx={{
            textAlign: 'center',
          }}
        >
          {contentRenderer()}
        </Text>
      </Container>
      <Handle
        type="source"
        position={Position.Right}
        id=""
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isValidConnection={useValidatorFn()}
      />
    </>
  );
}
