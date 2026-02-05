import { SidebarProvider } from "@/components/ui/sidebar";

import { StudioNavbar } from "../components/studio-navbar";

import { StudioSidebar } from "../components/studio-sidebar";
interface StudioLayoutProps {
  children: React.ReactNode;
}

//Tailwind css use a just in time compiler mechanism that generates styles on-demand based on source code
//It scans files and builds only what project actually use.
export const StudioLayout = ({ children }: StudioLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <StudioNavbar />
        {/* padding-top 4*/}
        <div className="flex min-h-screen pt-[4rem]">
          <StudioSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
