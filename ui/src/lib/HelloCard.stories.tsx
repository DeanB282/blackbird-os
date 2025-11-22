import type { Meta, StoryObj } from '@storybook/react';
import { HelloCard } from './HelloCard';

const meta: Meta<typeof HelloCard> = {
  title: 'Blackbird UI/HelloCard',
  component: HelloCard,
};

export default meta;

type Story = StoryObj<typeof HelloCard>;

export const Default: Story = {
  args: {},
};
