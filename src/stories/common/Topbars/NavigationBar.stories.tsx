import type { Meta, StoryObj } from "@storybook/react";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";

const meta: Meta<typeof NavigationBar> = {
  title: "common/Topbars/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-iPhone">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "Default" },
};
