import type { Meta, StoryObj } from "@storybook/react";
import { HStack } from "../../components/common/Stack";
import XButton from "../../components/common/Xbutton";
import Arrow from "../../components/common/Arrow";
import Title from "../../components/common/Title";

const meta = {
  title: "common/Etc.",
  component: HStack,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof HStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _XButton: Story = {
  args: {
    children: [XButton({})],
  },
};

export const _Arrow: Story = {
  args: {
    children: [
      Arrow({ direction: "up" }),
      Arrow({ direction: "down" }),
      Arrow({ direction: "right" }),
      Arrow({ direction: "left" }),
    ],
  },
};

export const _Title: Story = {
  args: {
    rotated: true,
    className: "w-96 border",
    children: [Title({ children: "Title" })],
  },
};
