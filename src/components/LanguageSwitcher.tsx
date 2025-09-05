"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "ro", label: "Română" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const current = i18n.language?.split("-")[0] || "ro";

  const changeLang = async (code: string) => {
    await i18n.changeLanguage(code);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", code);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <Select.Root value={current} onValueChange={changeLang}>
      <Select.Trigger className="inline-flex items-center z-50 gap-2 px-4 py-3 rounded-2xl border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-[#5F9CFF]">
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden z-50 rounded-2xl border border-gray-200 bg-white shadow-lg">
          <Select.Viewport className="p-1">
            {LANGS.map(({ code, label }) => (
              <Select.Item
                key={code}
                value={code}
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
