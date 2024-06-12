import type { Meta, StoryObj } from "@storybook/react";
import Option from "../../components/common/Option";

const meta = {
  title: "common/Option",
  component: Option,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Option>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
  args: {
    selected: true,
    children: "On",
  },
};
export const Off: Story = {
  args: {
    selected: false,
    children: "Off",
  },
};
