import { useEffect, useState } from "react";

export type Lang = "en" | "ro" | "ru";
export type LocaleBlock = { title: string; selected_text?: string };
export type WithI18n = { en?: LocaleBlock; ro?: LocaleBlock; ru?: LocaleBlock };
export type ImgObj = { image?: string; images?: string };

export type TubItem = WithI18n &
  ImgObj & {
    heaters: Array<Record<string, string>>;
    sizes: Array<Record<string, string>>;
    insert_colour?: Array<Record<string, string>>;
    covers?: Array<Record<string, string>>;
    wood_decorations?: Array<Record<string, string>>;
    price: string | number;
  };
export type TubMap = Record<string, TubItem>;

export type CatalogItem = WithI18n &
  ImgObj & { price?: string | number; multiple?: string };
export type CatalogMap = Record<string, CatalogItem>;

export const safeNum = (v: string | number | undefined | null) => {
  if (v === undefined || v === null) return 0;
  const n = typeof v === "number" ? v : parseFloat(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};

export const imgPath = (p?: string) =>
  p ? (p.startsWith("/") ? `/images${p}` : `/images/${p}`) : "";
export const byLang = (lang: Lang, item?: WithI18n) =>
  (item?.[lang] as LocaleBlock) || (item?.en as LocaleBlock);
export const mapWithPrice = (arr: Array<Record<string, string>> | undefined) =>
  (arr || []).map((obj) => {
    const key = Object.keys(obj)[0];
    return { key, addPrice: safeNum((obj as any)[key]) } as {
      key: string;
      addPrice: number;
    };
  });

export function useCatalogs() {
  const [lang, setLang] = useState<Lang>("en");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [tubs, setTubs] = useState<TubMap>({});
  const [heaters, setHeaters] = useState<CatalogMap>({});
  const [sizes, setSizes] = useState<CatalogMap>({});
  const [insertColors, setInsertColors] = useState<CatalogMap>({});
  const [woodDecor, setWoodDecor] = useState<CatalogMap>({});
  const [covers, setCovers] = useState<CatalogMap>({});
  const [spaSystems, setSpaSystems] = useState<CatalogMap>({});
  const [ledLights, setLedLights] = useState<CatalogMap>({});
  const [filters, setFilters] = useState<CatalogMap>({});
  const [otherAcc, setOtherAcc] = useState<CatalogMap>({});
  const [standardPack, setStandardPack] = useState<CatalogMap>({});

  const loadJson = async (
    key: string,
    path: string,
    setter: (v: any) => void
  ) => {
    try {
      const res = await fetch(`/data/${path}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setter(json);
    } catch (e: any) {
      setErrors((s) => ({
        ...s,
        [key]: e?.message || `Failed to load ${path}`,
      }));
    }
  };

  useEffect(() => {
    loadJson("tubs", "tubs.json", setTubs);
    loadJson("heaters", "heaters.json", setHeaters);
    loadJson("sizes", "sizes.json", setSizes);
    loadJson("insert_colors", "insert_colors.json", setInsertColors);
    loadJson("wood_decorations", "wood_decoration.json", setWoodDecor);
    loadJson("covers", "covers.json", setCovers);
    loadJson("spa_systems", "spa_systems.json", setSpaSystems);
    loadJson("led_lights", "led_lights.json", setLedLights);
    loadJson("filters", "filters.json", setFilters);
    loadJson("other_accessories", "other_accessories.json", setOtherAcc);
    loadJson("standard_package", "standard_package.json", setStandardPack);
  }, []);

  return {
    lang,
    setLang,
    errors,
    tubs,
    heaters,
    sizes,
    insertColors,
    woodDecor,
    covers,
    spaSystems,
    ledLights,
    filters,
    otherAcc,
    standardPack,
  } as const;
}
