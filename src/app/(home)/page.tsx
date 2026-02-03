import { HomeView } from "@/modules/home/ui/views/home-views";
import { HydrateClient, trpc } from "@/trpc/server";
//Server side faster than client side
//1. Request param
interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}
const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;
  void trpc.categories.getMany.prefetch();
  return (
    <HydrateClient>
      <HomeView categoryId={categoryId || ""} />
    </HydrateClient>
  );
};

export default Page;
