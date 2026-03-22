import { DEFAULT_LIMIT } from "@/constants";
import { SubscriptionsView } from "@/modules/home/ui/views/subscriptions-view";
import { HydrateClient, trpc } from "@/trpc/server";
export const dynamic = "force-dynamic";
//Server side faster than client side
//1. Request param
const Page = async () => {
  void trpc.videos.getManySubscriptions.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <SubscriptionsView />
    </HydrateClient>
  );
};

export default Page;
