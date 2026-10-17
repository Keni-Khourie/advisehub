"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction, forwardRef, useState } from "react";
type InclusiveInputElementProps = {

  className?: string;
  children?: React.ReactElement;
  onChange?: (value: string[]|undefined) => void
  value?: string[]|undefined;
 
} & React.InputHTMLAttributes<HTMLInputElement>;

type InputTagsProps = InclusiveInputElementProps & {
  value: string[]|undefined;
  onChange: Dispatch<SetStateAction<string[]>>;
};

export const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState<string>("");

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = value? new Set([...value, pendingDataPoint]): new Set([pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    return (
      <>
        <div className="flex items-center gap-x-2">
          <Input
            value={pendingDataPoint}
            onChange={(e) => setPendingDataPoint(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addPendingDataPoint();
              } 
            }}
            className="rounded-sm"
            {...props}
            ref={ref}
          />
          <Button
            type="button"
            className="border bg-ahGreen hover:bg-ahHoverGreen font-bold py-4 cursor-pointer rounded-full"
            onClick={addPendingDataPoint}
          >
            ADD
          </Button>
        </div>
        <div className="border rounded-md min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center bg-white">
          {value && value.map((item, idx) => (
            <Badge key={idx} variant="secondary">
              {item}
              <button
                type="button"
                className="w-3 ml-2"
                onClick={() => {
                  onChange(value.filter((i) => i !== item));
                }}
              >
                <XIcon className="w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </>
    );
  }
);

InputTags.displayName = "Input Tags"