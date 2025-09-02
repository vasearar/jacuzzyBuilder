"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

type LangKey = "ro" | "ru" | "en";

type FileItemLang = {
  title: string;
  tag: string;
  file: string;
};

type FilesJson = Record<
  string,
  {
    ro: FileItemLang;
    ru: FileItemLang;
    en: FileItemLang;
  }
>;

type FileCard = FileItemLang & { id: string; idNum: number; idx: number };

type Option = { value: string; label: string };

function RoundedSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}) {
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

function getExtLabel(path: string): string {
  const clean = path.split("?")[0].split("#")[0];
  const ext = clean.includes(".")
    ? clean.substring(clean.lastIndexOf(".") + 1).toLowerCase()
    : "";
  const map: Record<string, string> = {
    pdf: "PDF",
    doc: "DOC",
    docx: "DOCX",
    xls: "XLS",
    xlsx: "XLSX",
    csv: "CSV",
    ppt: "PPT",
    pptx: "PPTX",
    txt: "TXT",
    rtf: "RTF",
    odt: "ODT",
    ods: "ODS",
    jpg: "JPG",
    jpeg: "JPG",
    png: "PNG",
    gif: "GIF",
    svg: "SVG",
    zip: "ZIP",
    rar: "RAR",
    "7z": "7Z",
    mp3: "MP3",
    wav: "WAV",
    mp4: "MP4",
    mov: "MOV",
    webm: "WEBM",
  };
  return map[ext] ?? (ext.toUpperCase() || "FILE");
}

function installLabel(lang: LangKey) {
  switch (lang) {
    case "ro":
      return "Descarcă";
    case "ru":
      return "Скачать";
    default:
      return "Download";
  }
}

const FilesPage = () => {
  const { t, i18n } = useTranslation(undefined, { keyPrefix: "filesPage" });
  const lang = (i18n.language?.split("-")[0] ?? "en") as LangKey;

  const [raw, setRaw] = useState<FilesJson | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("asc");
  const [visible, setVisible] = useState(6);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch("/data/files.json");
        const json = (await res.json()) as FilesJson;
        if (isMounted) setRaw(json);
      } catch (e) {
        console.error("Failed to load files.json", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setVisible(6);
  }, [lang]);

  const localizedFiles: FileCard[] = useMemo(() => {
    if (!raw) return [];
    return Object.entries(raw)
      .map(([id, item], idx) => {
        const content = (item as any)[lang] ?? item.en;
        return {
          id,
          idNum: Number(id),
          idx,
          ...content,
        };
      })
      .sort((a, b) => a.idNum - b.idNum);
  }, [raw, lang]);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    localizedFiles.forEach((n) => s.add(n.tag));
    return Array.from(s);
  }, [localizedFiles]);

  const filteredSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = localizedFiles.filter((n) => {
      const matchesTitle = q === "" || n.title.toLowerCase().includes(q);
      const matchesTag = tag === "all" || n.tag === tag;
      return matchesTitle && matchesTag;
    });
    return filtered.sort((a, b) =>
      sortOrder === "asc" ? a.idNum - b.idNum : b.idNum - a.idNum
    );
  }, [localizedFiles, search, tag, sortOrder]);

  const shown = filteredSorted.slice(0, visible);
  const hasMore = filteredSorted.length > visible;

  if (loading) {
    return (
      <section className="grid grid-cols-full w-full min-h-[60vh] place-items-center">
        <div className="text-[#3F3F40]">{t("loading")}</div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-full items-start w-full">
      <div className="col-span-full flex flex-col md:flex-row md:items-end md:justify-between mt-32 gap-4 md:gap-6 container mx-auto">
        <div className="flex flex-col">
          <h1 className="text-2xl">{t("header")}</h1>
          <h2 className="text-[#3F3F40]">{t("subHeader")}</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#BDBFC0] rounded-2xl px-4 py-2 bg-white/80 backdrop-blur w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#5F9CFF]"
          />

          <RoundedSelect
            value={tag}
            onChange={(v) => {
              setTag(v);
              setVisible(6);
            }}
            options={[
              { value: "all", label: t("all") },
              ...allTags.map((tg) => ({ value: tg, label: tg })),
            ]}
          />

          <RoundedSelect
            value={sortOrder}
            onChange={(v) => setSortOrder(v as "asc" | "desc")}
            options={[
              { value: "asc", label: t("fromOldToNew") },
              { value: "desc", label: t("fromNewToOld") },
            ]}
          />
        </div>
      </div>

      <div className="col-span-full container mx-auto">
        <div className="grid grid-cols-1 gap-4 mt-6">
          {shown.map((item) => {
            const type = getExtLabel(item.file);
            return (
              <div
                key={item.id}
                className="col-span-full flex items-center justify-between gap-4 p-4.5 rounded-2xl small-shadow bg-white"
              >
                <div className="flex flex-col justify-between">
                  <h2 className="text-sm text-[#3F3F40]">
                    {item.tag} • {type}
                  </h2>
                  <h1 className="leading-snug">{item.title}</h1>
                </div>

                <a
                  href={item.file}
                  download
                  className="text-[#f1f1f1] bg-[#5F9CFF] hover:opacity-90 px-4 py-3 rounded-2xl whitespace-nowrap"
                  aria-label={`${installLabel(lang)} ${item.title}`}
                >
                  {installLabel(lang)}
                </a>
              </div>
            );
          })}
        </div>

        {shown.length === 0 && (
          <div className="text-[#3F3F40] py-12 text-center">
            {t("noResults")}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisible((v) => v + 6)}
              className="mt-8 px-6 py-3 rounded-2xl cursor-pointer border border-[#BDBFC0] hover:border-[#5F9CFF] hover:text-[#145EEC] transition"
            >
              {t("showMore")}
            </button>
          </div>
        )}
      </div>

      <div className="col-span-full" />
    </section>
  );
};

export default FilesPage;
