import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";
export const dynamic = "force-dynamic";
//Server side faster than client side
//1. Request param
const Page = async () => {
  void trpc.videos.getManyTrending.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <SubscribedView />
    </HydrateClient>
  );
};

export default Page;
