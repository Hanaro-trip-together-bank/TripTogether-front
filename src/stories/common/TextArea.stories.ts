import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "../../components/common/TextArea";

const meta = {
  title: "common/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
export const Border: Story = {
  args: { border: true },
};
export const Label: Story = {
  args: { border: true, label: "Label" },
};
export const largeRounded: Story = {
  args: { border: true, largeRounded: true, label: "Label" },
};
