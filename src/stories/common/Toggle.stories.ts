import type { Meta, StoryObj } from "@storybook/react";
import Toggle from "../../components/common/Toggle";

const meta = {
  title: "common/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
  args: {
    selected: true,
    onClick: () => {},
  },
};
export const Off: Story = {
  args: {
    selected: false,
    onClick: () => {},
  },
};
export const WithLabel: Story = {
  args: {
    selected: true,
    label: "Label",
    onClick: () => {},
  },
};
