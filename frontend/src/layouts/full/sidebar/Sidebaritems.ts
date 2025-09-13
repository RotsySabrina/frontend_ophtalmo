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
        name: "Accueil",
        icon: "solar:home-2-outline",
        id: uniqueId(),
        url: "/ui/accueil",
        isPro: false,
      },
      {
        name: "Statistique",
        icon: "solar:chart-square-outline",
        id: uniqueId(),
        url: "/ui/stats",
        isPro: false,
      },
      // {
      //   name: "Patient",
      //   icon: "solar:user-heart-outline",
      //   id: uniqueId(),
      //   url: "/ui/patient",
      //   isPro: false,
      // },
      // {
      //   name: "Rendez-vous",
      //   icon: "solar:calendar-outline",
      //   id: uniqueId(),
      //   url: "/ui/rendez_Vous",
      //   isPro: false,
      // },
      // {
      //   name: "Form",
      //   icon: "solar:password-minimalistic-outline",
      //   id: uniqueId(),
      //   url: "/ui/form",
      //   isPro: false,
      // },
      // {
      //   name: "Alert",
      //   icon: "solar:airbuds-case-charge-outline",
      //   id: uniqueId(),
      //   url: "/ui/alert",
      //   isPro: false,
      // },
    ],
  },
];

export default SidebarContent;