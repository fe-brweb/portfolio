import { AppHeaderProps } from "@/components/AppHeader";
import { AppPageTitleProps } from "@/components/AppPageTitle";
import { LuBookMarked, LuBriefcaseBusiness } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import {
  RiArchiveStackLine,
  RiBrushAiLine,
  RiChat1Line,
  RiFileUserLine,
  RiHome9Line,
  RiMailSendLine,
  RiNotionLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

export interface RouteConfig {
  title: string;
  path: string;
  icon?: React.ReactNode;
  visibleTitle?: boolean;
  headerProps?: AppHeaderProps;
  external?: boolean;
  pageTitleProps?: AppPageTitleProps;
}

export const routerConfig: RouteConfig[] = [
  {
    title: "HOME",
    path: "/",
    icon: <RiHome9Line />,
    visibleTitle: false,
    headerProps: {
      variant: "transparent",
      className: "h-0",
    },
  },
  {
    title: "about",
    icon: <RiFileUserLine />,
    path: "/about",
    visibleTitle: true,
    pageTitleProps: {
      className: "bg-white",
    },
  },
  {
    title: "project",
    icon: <RiArchiveStackLine />,
    path: "/project",
    visibleTitle: true,
    headerProps: {
      variant: "transparent",
      className: "bg-primary",
    },
    pageTitleProps: {
      className: "bg-primary text-white",
    },
  },
  {
    title: "skill",
    icon: <FaCode />,
    path: "/skill",
    visibleTitle: true,
    headerProps: {
      variant: "transparent",
      className: "bg-primary",
    },
    pageTitleProps: {
      className: "bg-primary text-white",
    },
  },
  // {
  //   title: "career",
  //   icon: <LuBriefcaseBusiness />,
  //   path: "/career",
  //   visibleTitle: true,
  // },
  // {
  //   title: "comment",
  //   icon: <RiChat1Line />,
  //   path: "/comment",
  //   visibleTitle: true,
  // },
  // {
  //   title: "art",
  //   icon: <RiBrushAiLine />,
  //   path: "/art",
  //   visibleTitle: true,
  // },
  {
    title: "Dev Note",
    icon: <LuBookMarked />,
    path: "https://rockbell89.notion.site/DEV-NOTE-6ce692661c3f4b9e9cea49b31e4cdf8e?pvs=73",
    external: true,
  },
  {
    title: "Resume",
    icon: <RiNotionLine />,
    path: "https://rockbell89.notion.site/1752403b586880ee8673c5eb53bea052",
    external: true,
  },
  {
    title: "contact",
    icon: <RiMailSendLine />,
    path: "/contact",
    visibleTitle: true,
    headerProps: {
      variant: "transparent",
    },
    pageTitleProps: {
      className: "text-white block landscape:hidden",
    },
  },
];
