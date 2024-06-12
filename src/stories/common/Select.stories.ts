import type { Meta, StoryObj } from "@storybook/react";
import Select from "../../components/common/Select";

const meta = {
  title: "common/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ["1", "2", "3", "4"],
    onSelect: () => {},
  },
};
export const Custom: Story = {
  args: {
    className: "font-bold bg-red-300",
    options: ["1", "2", "3", "4"],
    onSelect: () => {},
  },
};
