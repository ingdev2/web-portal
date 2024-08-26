import { Badge } from "antd";
import { MenuItem } from "./types/menu_item_type";

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  badgeCount?: number
): MenuItem {
  return {
    key,
    children,
    label,
    icon: badgeCount ? (
      <Badge
        count={badgeCount}
        offset={[-37, 7]}
        style={{
          justifyContent: "center",
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
          paddingTop: "3.1px",
        }}
      >
        {icon}
      </Badge>
    ) : (
      icon
    ),
  } as MenuItem;
}
