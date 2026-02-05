import { cva, VariantProps } from "class-variance-authority";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

// const buttonVariants = cva(
//   "font-semibold rounded-full transition", // 1. Base styles (always applied)
//   {
//     variants: {
//       variant: { // 2. Different "flavors"
//         primary: "bg-red-600 text-white hover:bg-red-700",
//         outline: "border border-gray-300 hover:bg-gray-100",
//       },
//       size: {
//         sm: "text-sm px-3 py-1",
//         md: "text-base px-4 py-2",
//       },
//     },
//     defaultVariants: { // 3. Fallback if no props are passed
//       variant: "primary",
//       size: "md",
//     },
//   }
// );
// Use cva define different variants for the components
const avatarVariants = cva("", {
  variants: {
    size: {
      default: "h-9 w-9",
      xs: "h-4 w-4",
      sm: "h-6 w-6",
      lg: "h-10 w-10",
      xl: "h-[160px] w-[160px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  imageUrl: string;
  name: string;
  className?: string;
  onClick?: () => void;
}

export const UserAvatar = ({
  imageUrl,
  name,
  className,
  onClick,
  size,
}: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(avatarVariants({ size, className }))}
      onClick={onClick}
    >
      <AvatarImage src={imageUrl} alt={name} />
    </Avatar>
  );
};
