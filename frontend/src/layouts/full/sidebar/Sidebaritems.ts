export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  isPro?: boolean
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
  isPro?: boolean
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    // heading: "Utilities",
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/",
        isPro: false,
      },
      {
        name: "Patient",
        icon: "solar:bedside-table-3-linear",
        id: uniqueId(),
        url: "/ui/patient",
        isPro: false,
      },
      {
        name: "Rendez-vous",
        icon: "solar:text-circle-outline",
        id: uniqueId(),
        url: "/ui/rendez_Vous",
        isPro: false,
      },
      {
        name: "Form",
        icon: "solar:password-minimalistic-outline",
        id: uniqueId(),
        url: "/ui/form",
        isPro: false,
      },
      {
        name: "Alert",
        icon: "solar:airbuds-case-charge-outline",
        id: uniqueId(),
        url: "/ui/alert",
        isPro: false,
      },
    ],
  },
  {
    heading: "Auth",
    children: [
      {
        name: "Login",
        icon: "solar:login-2-linear",
        id: uniqueId(),
        url: "/auth/login",
        isPro: false,

      },
      {
        name: "Register",
        icon: "solar:shield-user-outline",
        id: uniqueId(),
        url: "/auth/register",
        isPro: false,
      },
    ],
  },
];

export default SidebarContent;