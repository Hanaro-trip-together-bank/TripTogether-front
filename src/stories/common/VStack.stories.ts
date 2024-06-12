import type { Meta, StoryObj } from "@storybook/react";
import { Spacer, VStack } from "../../components/common/Stack";
import Button from "../../components/common/Button";

const meta = {
  title: "common/VStack",
  component: VStack,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof VStack>;

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
    className: "h-96",
    rotated: false,
    children: [
      Button({ children: "1" }),
      Button({ children: "2" }),
      Spacer(),
      Button({ children: "4" }),
    ],
  },
};
