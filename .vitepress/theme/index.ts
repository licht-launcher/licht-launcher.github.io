import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import DownloadTable from "./DownloadTable.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("DownloadTable", DownloadTable);
  },
} satisfies Theme;
