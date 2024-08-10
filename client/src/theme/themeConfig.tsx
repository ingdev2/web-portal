import { type ThemeConfig } from "antd";

const themeConfig: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: "#015E90",
    colorText: "#070707",
  },
  components: {
    Layout: {
      siderBg: "#013B5A",
    },
    Menu: {
      itemActiveBg: "#013B5A",
      itemBg: "#013B5A",
      itemColor: "#F7F7F7",
      itemHoverBg: "#017DC0",
      itemHoverColor: "#F7F7F7",
      itemSelectedColor: "#00B5E8",
      itemSelectedBg: "#EFF7F8",
      colorBgElevated: "#013B5A",
    },
    Descriptions: {
      labelBg: "#015E9017",
    },
  },
};

export default themeConfig;
