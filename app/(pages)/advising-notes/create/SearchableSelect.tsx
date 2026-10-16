
"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Mango", value: "mango" },
  { label: "Pineapple", value: "pineapple" },
   { label: "Apple2", value: "apple2" },
  { label: "Banana2", value: "banana2" },
  { label: "Blueberry2", value: "blueberry2" },
  { label: "Grapes2", value: "grapes2" },
  { label: "Mango2", value: "mango2" },
  { label: "Pineapple2", value: "pineapple2" },
   { label: "Apple3", value: "apple3" },
  { label: "Banana3", value: "banana3" },
  { label: "Blueberry3", value: "blueberry3" },
  { label: "Grapes3", value: "grapes3" },
  { label: "Mango3", value: "mango3" },
  { label: "Pineapple3", value: "pineapple3"},
];

const SearchableSelect = () =>{
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(undefined);

  const selectedFruit = fruits.find(
    (fruit) => fruit.value === selectedValue
  );

  return (
   <Command className="bg-none w-full">
    <Popover open={open} >
        <PopoverTrigger>
            <CommandInput placeholder="Search students..." onKeyDown={()=>setOpen(true)} value={selectedValue}/>
        </PopoverTrigger>
        <PopoverContent className="  w-(--anchor-width)">
            <CommandList className="w-full">
            <CommandEmpty>Student not found.</CommandEmpty>

            <CommandGroup className="w-full ">
              {fruits.map((fruit) => (
                <CommandItem
                  key={fruit.value}
                  value={fruit.label}
                  className="w-full flex justify-between"
                  onSelect={() => {
                    setSelectedValue(
                      fruit.value === selectedValue
                        ? ""
                        : fruit.value
                    );
                    setOpen(false);
                  }}
                >
                  <p className="text-red-500">{fruit.label}</p>

                  <Check
                    className={cn(
                      "h-4 w-4",
                      selectedValue === fruit.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </PopoverContent>
    </Popover>
          

          
        </Command>
  );
}

export default SearchableSelect