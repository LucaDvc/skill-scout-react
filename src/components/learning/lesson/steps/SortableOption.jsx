import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, Card, IconButton, Typography } from '@mui/material';

export default function SortableOption(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });

  const { option } = props;

  return (
    <Card
      sx={{
        maxWidth: 'md',
        marginY: 2,
        borderRadius: 1,
        boxShadow: 0.5,
        borderWidth: 0.1,
        borderColor: 'grey.300',
        borderStyle: 'solid',
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      ref={setNodeRef}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
        <IconButton
          {...listeners}
          {...attributes}
          disableRipple
          aria-label='option drag handle'
          sx={{
            '&:hover': {
              cursor: 'grab',
            },
          }}
        >
          <DragIndicatorIcon />
        </IconButton>

        <Typography variant='body1' flexGrow={1}>
          {option.text}
        </Typography>
      </Box>
    </Card>
  );
}
