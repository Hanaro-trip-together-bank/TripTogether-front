import type { Meta, StoryObj } from "@storybook/react";
import Select2 from "../../components/common/Select2";

const meta = {
  title: "common/Select2",
  component: Select2,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Select2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-96",
    options: ["1", "2", "3", "4"],
    onSelect: () => {},
  },
};
export const Custom: Story = {
  args: {
    className: "w-96 font-bold bg-red-300",
    options: ["1", "2", "3", "4"],
    onSelect: () => {},
  },
};
