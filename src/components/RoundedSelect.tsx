"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

type Option = { value: string; label: string };

interface Props {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}

export default function RoundedSelect({ value, onChange, options }: Props) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-[#5F9CFF]">
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden z-20 rounded-2xl border border-gray-200 bg-white shadow-lg">
          <Select.Viewport className="p-1">
            {options.map(({ value: v, label }) => (
              <Select.Item
                key={v}
                value={v}
                className="relative flex items-center px-3 py-2 rounded-md text-sm cursor-pointer focus:bg-blue-50 focus:outline-none"
              >
                <Select.ItemText>{label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
                  <Check className="w-4 h-4 text-blue-500" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
