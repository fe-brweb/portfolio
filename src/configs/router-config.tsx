import { AppHeaderProps } from "@/components/AppHeader";
import { AppPageTitleProps } from "@/components/AppPageTitle";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import {
  RiArchiveStackLine,
  RiBrushAiLine,
  RiChat1Line,
  RiFileUserLine,
  RiHome9Line,
  RiMailSendLine,
} from "react-icons/ri";

export interface RouteConfig {
  title: string;
  path: string;
  icon?: React.ReactNode;
  visibleTitle: boolean;
  headerProps?: AppHeaderProps;
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
    },
    pageTitleProps: {
      className: "text-white",
    },
  },
  {
    title: "career",
    icon: <LuBriefcaseBusiness />,
    path: "/career",
    visibleTitle: true,
  },
  {
    title: "comment",
    icon: <RiChat1Line />,
    path: "/comment",
    visibleTitle: true,
  },
  {
    title: "art",
    icon: <RiBrushAiLine />,
    path: "/art",
    visibleTitle: true,
  },
  {
    title: "contact",
    icon: <RiMailSendLine />,
    path: "/contact",
    visibleTitle: false,
    headerProps: {
      variant: "transparent",
      className: "bg-primary",
    },
  },
];
