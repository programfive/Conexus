import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: {
    name?: string | null;
    image?: string | null;
  }[];
  max?: number;
}

export function AvatarGroup({
  avatars,
  max = 4,
  className,
  ...props
}: AvatarGroupProps) {
  const showMax = max ? avatars.slice(0, max) : avatars;
  const remaining = max ? avatars.length - max : 0;

  return (
    <div
      className={cn("relative flex h-8 items-center", className)}
      style={{ width: `${showMax.length * 20 + 8}px` }}
      {...props}
    >
      {showMax.map((avatar, i) => (
        <Avatar
          key={i}
          className={cn(
            "absolute ring-2 ring-background",
            "h-8 w-8",
            "transition-transform hover:translate-x-1"
          )}
          style={{ left: `${i * 20}px` }}
        >
          <AvatarImage src={avatar.image ?? ""} alt={avatar.name ?? ""} />
          <AvatarFallback className="bg-gray-300">
            <Icons.user className="h-6 w-6 text-white" />
          </AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && (
        <Avatar
          className="absolute h-8 w-8 ring-2 ring-background"
          style={{ left: `${showMax.length * 20}px` }}
        >
          <AvatarFallback>+{remaining}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
