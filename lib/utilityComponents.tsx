import { ErrorResponse } from "@/types/types";
import { ShieldAlert } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const queryErrorResponse = (err:any) => {
          const errorMessage =
            (err as ErrorResponse)?.data?.message ||
            (err as ErrorResponse)?.data?.detail ||
            "An unexpected error occurred.";
          console.error(err);
          return (
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />

              <p>{errorMessage}</p>
            </div>
          );
        }