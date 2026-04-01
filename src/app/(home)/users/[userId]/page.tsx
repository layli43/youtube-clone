import { DEFAULT_LIMIT } from "@/constants";
import { UserVideosSection } from "@/modules/users/ui/sections/user-videos-section";
import { UserView } from "@/modules/users/ui/views/user-view";
import { HydrateClient, trpc } from "@/trpc/server";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;

  void trpc.users.getOne.prefetch({ id: userId });
  void trpc.videos.getMany.prefetch({ userId: userId, limit: DEFAULT_LIMIT });

  return (
    <HydrateClient>
      <UserView userId={userId} />
      <UserVideosSection userId={userId} />
    </HydrateClient>
  );
};

export default Page;
