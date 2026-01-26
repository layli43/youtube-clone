import { SidebarProvider } from "@/components/ui/sidebar";

import { HomeNavbar } from "@/modules/home/ui/components/home-navbar";

import { HomeSidebar } from "../components/home-sidebar";
interface HomeLayoutProps {
  children: React.ReactNode;
}

//Tailwind css use a just in time compiler mechanism that generates styles on-demand based on source code
//It scans files and builds only what project actually use.
export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        {/* padding-top 4*/}
        <div className="flex min-h-screen pt-[4rem]">
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
