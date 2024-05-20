import "../src/index.css";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "secondary",
      values: [
        {
          name: "gray",
          value: "#dddddd",
        },
        {
          name: "white",
          value: "#ffffff",
        },
        {
          name: "black",
          value: "#000000",
        },
        {
          name: "secondary",
          value: "#353a4e",
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
