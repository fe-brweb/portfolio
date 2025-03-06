import AppLayout from "@/components/AppLayout";
import AppWheelNav from "@/components/ui/AppWheelNav";
import BaseAlertDialog from "@/components/ui/BaseAlertDialog";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <AppSmoothScroll> */}
      <div className="flex w-full flex-col">
        <AppLayout>{children}</AppLayout>
        <AppWheelNav />
      </div>
      {/* </AppSmoothScroll> */}
      <BaseAlertDialog />
    </>
  );
}
