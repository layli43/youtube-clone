import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LogOutIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { StudioSidebarHeader } from "./studio-sidebar-header";

export const StudioSidebar = () => {
  return (
    <Sidebar className="pt-16 z-40" collapsible="icon">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarMenu>
            <StudioSidebarHeader />
            <SidebarMenuButton tooltip="Exit Studio" asChild>
              <Link href="/studio">
                <VideoIcon className="size-5" />
                <span className="text-sm">Content</span>
              </Link>
            </SidebarMenuButton>
            <SidebarSeparator />
            <SidebarMenuButton tooltip="Exit Studio" asChild>
              <Link href="/">
                <LogOutIcon className="size-5" />
                <span className="text-sm">Exit Studio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
