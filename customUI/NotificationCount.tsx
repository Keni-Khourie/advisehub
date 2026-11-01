import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  isLoading: boolean;
  isError: boolean;
  unreadCount: number | undefined;
}

const NotificationCount = ({ isError, isLoading, unreadCount }: Props) => {
  const countStyles = cn(
    "bg-red-300 flex justify-center items-center rounded-full font-semibold text-white text-center h-5 w-5 text-sm p-2"
  );
  return (
    <div>
      {isError && (
        <p className={countStyles}>-</p>
      )}

      {isLoading && unreadCount === undefined && (
        <div className={countStyles}>
          <Skeleton className="h-3 w-3 rounded-full" />
        </div>
      )}

      {unreadCount !== undefined && !isError && (
        <p className={countStyles}>
          {unreadCount}
        </p>
      )}
    </div>
  );
};

export default NotificationCount;
