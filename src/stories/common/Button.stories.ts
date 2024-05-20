import type { Meta, StoryObj } from "@storybook/react";
import Button from "../../components/common/Button";

const meta = {
  title: "common/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
  },
};
export const Gray: Story = {
  args: {
    gray: true,
    children: "Gray",
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled(unclickable)",
  },
};
export const FullyRounded: Story = {
  args: {
    fullyRounded: true,
    children: "FullyRounded",
  },
};
export const Custom: Story = {
  args: {
    className: "bg-secondary px-48 rounded-none",
    onClick: () => alert("Custom action"),
    children: "Custom",
  },
};
