import { trpc } from "@/trpc/client";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";

interface UseSubscriptionProps {
  userId: string;
  isSubscribed: boolean;
  fromVideoId?: string;
}

export const useSubscription = ({
  userId,
  isSubscribed,
  fromVideoId,
}: UseSubscriptionProps) => {
  const clerk = useClerk();
  const utils = trpc.useUtils();

  const subscribe = trpc.subscriptions.create.useMutation({
    onSuccess: () => {
      toast.success("Subscribed");
      // Don't need to refresh
      utils.videos.getManySubscriptions.invalidate();
      if (fromVideoId) {
        utils.videos.getOne.invalidate({ id: fromVideoId });
        utils.users.getOne.invalidate({ id: userId });
      }
    },
    onError: (error) => {
      toast.error("Something went wrong");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  const unsubscribe = trpc.subscriptions.delete.useMutation({
    onSuccess: () => {
      toast.success("Unsubscribed");
      utils.videos.getManySubscriptions.invalidate();
      if (fromVideoId) {
        // Validate user so the user profile info can change immediately
        utils.videos.getOne.invalidate({ id: fromVideoId });
        utils.users.getOne.invalidate({ id: userId });
      }
    },
    onError: (error) => {
      toast.error("Something went wrong");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  const isPending = subscribe.isPending || unsubscribe.isPending;
  const onClick = () => {
    if (isSubscribed) {
      unsubscribe.mutate({ userId });
    } else {
      subscribe.mutate({ userId });
    }
  };

  return {
    isPending,
    onClick,
  };
};
