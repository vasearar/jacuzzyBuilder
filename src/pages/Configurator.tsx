import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Lang } from "../hooks/useCatalogs";
import {
  byLang,
  mapWithPrice,
  safeNum,
  useCatalogs,
} from "../hooks/useCatalogs";
import { OptionGrid } from "../components/OptionGrid";
import { StickySummary } from "../components/StickySummary";
import type { SelRow } from "../components/StickySummary.types";

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
  companyEmail: "orders@your-company.tld",
};

const Configurator: React.FC = () => {
  const { t, i18n } = useTranslation(undefined, { keyPrefix: "common" });
  const uiLang = (i18n.language || "en").split("-")[0] as Lang;

  const {
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
  } = useCatalogs();

  const [selTub, setSelTub] = useState<string | null>(null);
  const [selHeater, setSelHeater] = useState<string | null>(null);
  const [selSize, setSelSize] = useState<string | null>(null);
  const [selInsertColor, setSelInsertColor] = useState<string | null>(null);
  const [selWoodDecor, setSelWoodDecor] = useState<string | null>(null);

  const [selCovers, setSelCovers] = useState<Record<string, number>>({});
  const [selSpa, setSelSpa] = useState<Record<string, number>>({});
  const [selLED, setSelLED] = useState<Record<string, number>>({});
  const [selFilters, setSelFilters] = useState<Record<string, number>>({});
  const [selOther, setSelOther] = useState<Record<string, number>>({});

  const [selStandard, setSelStandard] = useState<Record<string, number>>({});
  React.useEffect(() => {
    const keys = Object.keys(standardPack);
    if (keys.length && Object.keys(selStandard).length === 0) {
      const all: Record<string, number> = {};
      keys.forEach((k) => (all[k] = 1));
      setSelStandard(all);
    }
  }, [standardPack]);

  const tub = selTub ? tubs[selTub] : null;
  const tubHeaterOpts = useMemo(() => mapWithPrice(tub?.heaters), [tub]);
  const tubSizeOpts = useMemo(() => mapWithPrice(tub?.sizes), [tub]);
  const tubInsertOpts = useMemo(() => mapWithPrice(tub?.insert_colour), [tub]);
  const tubCoverOpts = useMemo(() => mapWithPrice(tub?.covers), [tub]);
  const tubWoodOpts = useMemo(() => mapWithPrice(tub?.wood_decorations), [tub]);

  React.useEffect(() => {
    setSelHeater(null);
    setSelSize(null);
    setSelInsertColor(null);
    setSelWoodDecor(null);
    setSelCovers({});
    setSelSpa({});
    setSelLED({});
    setSelFilters({});
    setSelOther({});
  }, [selTub]);

  const toggleFrom =
    (setter: React.Dispatch<React.SetStateAction<Record<string, number>>>) =>
    (k: string, qty: number) =>
      setter((s: Record<string, number>) => {
        const next = { ...s };
        if (qty <= 0) delete next[k];
        else next[k] = qty;
        return next;
      });

  const total = useMemo(() => {
    if (!tub) return 0;
    let sum = safeNum(tub.price);
    const addFrom = (
      opts: Array<{ key: string; addPrice: number }> | undefined,
      chosen: string[] | Record<string, number>
    ) => {
      if (!opts) return 0;
      const map: Record<string, number> = {};
      for (const o of opts) map[o.key] = o.addPrice;
      if (Array.isArray(chosen))
        return chosen.reduce((a, k) => a + (map[k] || 0), 0);
      return Object.entries(chosen).reduce(
        (a, [k, q]) => a + (map[k] || 0) * q,
        0
      );
    };

    sum += addFrom(tubHeaterOpts, selHeater ? [selHeater] : []);
    sum += addFrom(tubSizeOpts, selSize ? [selSize] : []);
    sum += addFrom(tubInsertOpts, selInsertColor ? [selInsertColor] : []);
    sum += addFrom(tubWoodOpts, selWoodDecor ? [selWoodDecor] : []);
    sum += addFrom(tubCoverOpts, selCovers);

    const addFromCatalog = (
      cat: Record<string, { price?: string | number }>,
      chosen: Record<string, number>
    ) =>
      Object.entries(chosen).reduce(
        (acc, [k, q]) => acc + safeNum(cat[k]?.price) * q,
        0
      );

    sum += addFromCatalog(spaSystems, selSpa);
    sum += addFromCatalog(ledLights, selLED);
    sum += addFromCatalog(filters, selFilters);
    sum += addFromCatalog(otherAcc, selOther);

    return sum;
  }, [
    tub,
    tubHeaterOpts,
    tubSizeOpts,
    tubInsertOpts,
    tubWoodOpts,
    tubCoverOpts,
    selHeater,
    selSize,
    selInsertColor,
    selWoodDecor,
    selCovers,
    spaSystems,
    selSpa,
    ledLights,
    selLED,
    filters,
    selFilters,
    otherAcc,
    selOther,
  ]);

  const rows: SelRow[] = useMemo(() => {
    const r: SelRow[] = [];
    const pushSingle = (
      labelKey: string,
      key: string | null,
      catalog: any,
      opts?: Array<{ key: string; addPrice: number }>
    ) => {
      if (!key) return;
      const loc = byLang(uiLang, catalog[key]);
      const txt = loc?.selected_text || loc?.title || key;
      const price = opts
        ? opts.find((o) => o.key === key)?.addPrice
        : safeNum(catalog[key]?.price);
      r.push({ label: t(labelKey), text: txt, price });
    };
    const pushMulti = (
      labelKey: string,
      selected: Record<string, number>,
      catalog: any,
      perTub?: Array<{ key: string; addPrice: number }>
    ) =>
      Object.entries(selected).forEach(([k, q]) => {
        const loc = byLang(uiLang, catalog[k]);
        const txt = loc?.selected_text || loc?.title || k;
        const price = perTub
          ? perTub.find((o) => o.key === k)?.addPrice || 0
          : safeNum(catalog[k]?.price);
        r.push({ label: t(labelKey), text: txt, price, qty: q });
      });

    if (tub) {
      const loc = byLang(uiLang, tub);
      r.push({
        label: t("hot_tub_model"),
        text: loc?.selected_text || loc?.title || "",
      });
    }
    pushSingle("heater", selHeater, heaters, tubHeaterOpts);
    pushSingle("size", selSize, sizes, tubSizeOpts);
    pushSingle("insert_colour", selInsertColor, insertColors, tubInsertOpts);
    pushSingle("wood_decoration", selWoodDecor, woodDecor, tubWoodOpts);

    pushMulti("covers", selCovers, covers, tubCoverOpts);
    pushMulti("spa_systems", selSpa, spaSystems);
    pushMulti("led_lights", selLED, ledLights);
    pushMulti("filters", selFilters, filters);
    pushMulti("other_accessories", selOther, otherAcc);
    pushMulti("standard_package", selStandard, standardPack);

    return r;
  }, [
    tub,
    uiLang,
    t,
    selHeater,
    selSize,
    selInsertColor,
    selWoodDecor,
    selCovers,
    selSpa,
    selLED,
    selFilters,
    selOther,
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
    selStandard,
    tubHeaterOpts,
    tubSizeOpts,
    tubInsertOpts,
    tubWoodOpts,
    tubCoverOpts,
  ]);

  return (
    <div className="grid grid-cols-full min-h-screen">
      <div className="col-span-12">
        <h1 className="text-center mb-6 p-8 font-medium text-[40px]">
          {t("calculator_header")}
        </h1>
      </div>

      <div className="col-span-12 lg:col-span-8 w-full p-2 lg:p-6">
        <OptionGrid
          heading={t("hot_tub_model")}
          list={Object.keys(tubs)}
          catalog={tubs as any}
          lang={uiLang}
          single
          selectedSingle={selTub}
          onSelectSingle={setSelTub}
          priceMode="catalog"
          variant="main"
        />

        <OptionGrid
          heading={t("heater")}
          hint={!tub ? t("please_select_tub_first") : undefined}
          list={tub ? tubHeaterOpts : []}
          catalog={heaters}
          lang={uiLang}
          single
          selectedSingle={selHeater}
          onSelectSingle={setSelHeater}
          priceMode="perTub"
          variant="main"
        />

        <OptionGrid
          heading={t("size")}
          hint={!tub ? t("please_select_tub_first") : undefined}
          list={tub ? tubSizeOpts : []}
          catalog={sizes}
          lang={uiLang}
          single
          selectedSingle={selSize}
          onSelectSingle={setSelSize}
          priceMode="perTub"
          variant="main"
        />

        <OptionGrid
          heading={t("insert_colour")}
          hint={!tub ? t("please_select_tub_first") : undefined}
          list={tub ? tubInsertOpts : []}
          catalog={insertColors}
          lang={uiLang}
          single
          selectedSingle={selInsertColor}
          onSelectSingle={setSelInsertColor}
          priceMode="perTub"
          variant="main"
        />

        <OptionGrid
          heading={t("wood_decoration")}
          hint={!tub ? t("please_select_tub_first") : undefined}
          list={tub ? tubWoodOpts : []}
          catalog={woodDecor}
          lang={uiLang}
          single
          selectedSingle={selWoodDecor}
          onSelectSingle={setSelWoodDecor}
          priceMode="perTub"
          variant="main"
        />

        <OptionGrid
          heading={t("standard_package")}
          list={Object.keys(standardPack)}
          catalog={standardPack}
          lang={uiLang}
          selectedMulti={selStandard}
          onToggleMulti={toggleFrom(setSelStandard)}
          priceMode="free"
          variant="main"
        />

        <h2 className="w-full bg-[#6c5f5b] mb-4 text-white rounded-[3px] text-[22px] p-[5px] font-medium text-center">
          {t("other_accessories")}
        </h2>

        <OptionGrid
          heading={t("spa_systems")}
          list={Object.keys(spaSystems)}
          catalog={spaSystems}
          lang={uiLang}
          selectedMulti={selSpa}
          onToggleMulti={toggleFrom(setSelSpa)}
          priceMode="catalog"
          variant="sub"
        />

        <OptionGrid
          heading={t("led_lights")}
          list={Object.keys(ledLights)}
          catalog={ledLights}
          lang={uiLang}
          selectedMulti={selLED}
          onToggleMulti={toggleFrom(setSelLED)}
          priceMode="catalog"
          variant="sub"
        />

        <OptionGrid
          heading={t("covers")}
          hint={!tub ? t("please_select_tub_first") : undefined}
          list={tub ? tubCoverOpts : []}
          catalog={covers}
          lang={uiLang}
          selectedMulti={selCovers}
          onToggleMulti={toggleFrom(setSelCovers)}
          priceMode="perTub"
          variant="sub"
        />

        <OptionGrid
          heading={t("filters")}
          list={Object.keys(filters)}
          catalog={filters}
          lang={uiLang}
          selectedMulti={selFilters}
          onToggleMulti={toggleFrom(setSelFilters)}
          priceMode="catalog"
          variant="sub"
        />

        <OptionGrid
          heading={t("other_accessories")}
          list={Object.keys(otherAcc)}
          catalog={otherAcc}
          lang={uiLang}
          selectedMulti={selOther}
          onToggleMulti={toggleFrom(setSelOther)}
          priceMode="catalog"
          variant="sub"
        />
      </div>

      <StickySummary
        title={t("selected_package") || ""}
        rows={rows}
        total={total}
        emailConfig={EMAILJS}
        logoPath="/logo.png"
      />
    </div>
  );
};

export default Configurator;
