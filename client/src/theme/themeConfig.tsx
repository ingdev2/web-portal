import { theme, type ThemeConfig } from "antd";

const themeConfig: ThemeConfig = {
  token: {
    fontSize: 13,
    colorPrimary: "#015E90",
  },
  components: {
    Layout: {
      siderBg: "#903301",
    },
    Menu: {
      itemActiveBg: "#013B5A",
      itemBg: "#013B5A",
      itemColor: "#F7F7F7",
      itemHoverBg: "#017DC0",
      itemHoverColor: "#F7F7F7",
      itemSelectedColor: "#017DC0",
      itemSelectedBg: "#DFEBF2",
    },
  },
};

export default themeConfig;
