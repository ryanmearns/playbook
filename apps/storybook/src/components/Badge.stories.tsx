import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@playbook/ui";

const meta: Meta<typeof Badge> = {
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (arg) => <Badge {...arg}>Complete</Badge>,
};
