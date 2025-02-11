import { routerConfig } from "@/configs/router-config";
import { usePathname } from "next/navigation";

export const useRouterConfig = () => {
  const pathname = usePathname();
  const config = routerConfig.find((config) => config.path === pathname);

  return config;
};
