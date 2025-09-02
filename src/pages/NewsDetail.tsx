"use client";

import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type LangKey = "ro" | "ru" | "en";
type NewsItemLang = {
  title: string;
  text: string;
  tag: string;
  data: string;
  image: string;
};
type NewsJson = Record<
  string,
  { ro: NewsItemLang; ru: NewsItemLang; en: NewsItemLang }
>;

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation(undefined, { keyPrefix: "newsDetail" });
  const lang = (i18n.language?.split("-")[0] ?? "en") as LangKey;

  const [raw, setRaw] = useState<NewsJson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/data/news.json");
        const json = (await res.json()) as NewsJson;
        if (mounted) setRaw(json);
      } catch (e) {
        console.error("Failed to load news.json", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const item = useMemo(() => {
    if (!raw || !id) return null;
    const record = raw[id];
    if (!record) return null;
    // prefer current lang; fallback to EN
    return (record as any)[lang] ?? record.en;
  }, [raw, id, lang]);

  if (loading) {
    return (
      <section className="grid grid-cols-full w-full min-h-[60vh] place-items-center">
        <div className="text-[#3F3F40]">{t("loading") ?? "Loading…"}</div>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="grid grid-cols-full w-full min-h-[60vh] place-items-center">
        <div className="text-center">
          <p className="mb-4">
            {t("notFound") ?? "This news item was not found."}
          </p>
          <Link to="/news" className="text-[#145EEC] underline">
            {t("backToNews") ?? "← Back to all news"}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="grid grid-cols-full w-full">
      <div className="col-span-full container mx-auto mt-32">
        <Link to="/news" className="text-[#145EEC] hover:underline">
          {t("backToNews") ?? "← Back to all news"}
        </Link>

        <img
          className="w-full h-80 md:h-[420px] object-cover rounded-2xl small-shadow mt-4"
          src={item.image}
          alt={item.title}
          loading="eager"
        />

        <div className="mt-6 flex items-center gap-2">
          <span className="text-sm text-[#3F3F40]">{item.data} •</span>
          <span className="text-xs rounded-full border border-[#BEDBFF] text-[#145EEC] py-1 px-3">
            {item.tag}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl mt-3">{item.title}</h1>

        <div className="mt-4 text-[#3F3F40] leading-7 whitespace-pre-line">
          {item.text}
        </div>
      </div>
    </article>
  );
};

export default NewsDetail;
