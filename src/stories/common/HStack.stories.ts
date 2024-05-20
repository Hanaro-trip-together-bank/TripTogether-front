import type { Meta, StoryObj } from "@storybook/react";
import Button from "../../components/common/Button";
import { HStack, Spacer } from "../../components/common/Stack";

const meta = {
  title: "common/HStack",
  component: HStack,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof HStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      Button({ children: "1" }),
      Button({ children: "2" }),
      Button({ children: "3" }),
      Button({ children: "4" }),
    ],
  },
};
export const Rotated: Story = {
  args: {
    rotated: true,
    children: [
      Button({ children: "1" }),
      Button({ children: "2" }),
      Button({ children: "3" }),
      Button({ children: "4" }),
    ],
  },
};
export const WithSpacer: Story = {
  args: {
    className: "w-96",
    rotated: false,
    children: [
      Button({ children: "1" }),
      Button({ children: "2" }),
      Spacer(),
      Button({ children: "4" }),
    ],
  },
};
