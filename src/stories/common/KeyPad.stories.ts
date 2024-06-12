import type { Meta, StoryObj } from "@storybook/react";
import Keypad from "../../components/common/Modals/Keypad";
const meta = {
  title: "common/KeyPad",
  component: Keypad,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Keypad>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Type1: Story = {
  args: {
    type: 1,
    onAppend: () => {},
    onAdd: () => {},
    onClear: () => {},
    onRemove: () => {},
    onDone: () => {},
  },
};
export const Type2: Story = {
  args: {
    type: 2,
    onAppend: () => {},
    onAdd: () => {},
    onClear: () => {},
    onRemove: () => {},
    onDone: () => {},
  },
};
