import type { Meta, StoryObj } from "@storybook/react";
import IPhoneDemo from "../../components/common/IPhoneDemo";

const meta = {
  title: "common/IPhoneDemo",
  component: IPhoneDemo,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof IPhoneDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const demo: Story = {
  args: {},
};
