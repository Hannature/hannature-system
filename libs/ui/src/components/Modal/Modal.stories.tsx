import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal.js';
import { Button } from '../Button/Button.js';

const meta: Meta<typeof Modal> = {
  title: 'Atoms/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Demo: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Validate today's session"
          description="Marking this complete unlocks tomorrow's content."
        >
          <Button onPress={() => setOpen(false)}>Confirm</Button>
        </Modal>
      </>
    );
  },
};
