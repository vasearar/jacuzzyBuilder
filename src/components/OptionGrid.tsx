import React from "react";
import type { CatalogMap } from "../hooks/useCatalogs";
import type { Lang } from "../hooks/useCatalogs";
import { OptionCard } from "./OptionCard";

export type GridEntry = { key: string; addPrice?: number } | string;

type Props = {
  heading: string;
  hint?: string;
  list: GridEntry[];
  catalog?: CatalogMap;
  lang: Lang;
  single?: boolean;
  selectedSingle?: string | null;
  onSelectSingle?: (k: string) => void;
  selectedMulti?: Record<string, number>;
  onToggleMulti?: (k: string, qty: number) => void;
  priceMode: "perTub" | "catalog" | "free";
  variant?: "main" | "sub";
};

export const OptionGrid: React.FC<Props> = ({
  heading,
  hint,
  list,
  catalog,
  lang,
  single,
  selectedSingle,
  onSelectSingle,
  selectedMulti,
  onToggleMulti,
  priceMode,
  variant = "main",
}) => {
  const selectedSet = selectedMulti || {};
  const headerClass =
    variant === "sub"
      ? "rounded-[3px] text-white text-center font-medium text-[20px] bg-[#B0A695] py-1"
      : "p-[5px] rounded-[3px] text-[22px] font-medium text-center text-white bg-[#6C5F5B]";

  return (
    <section className="mb-10">
      <h3 className={headerClass}>{heading}</h3>
      {hint && <p className="text-sm opacity-70 mt-1 text-center">{hint}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
        {list.map((entry) => {
          const key = typeof entry === "string" ? entry : entry.key;
          const perTubPrice =
            typeof entry === "string" ? undefined : entry.addPrice;
          const selected = single
            ? selectedSingle === key
            : selectedSet[key] > 0;
          const catItem = catalog?.[key];
          const maxQty = catItem?.multiple
            ? Math.max(1, parseInt(String(catItem.multiple), 10))
            : 0;
          const qty = selectedSet[key] || 0;

          let price: number | undefined;
          if (priceMode === "perTub")
            price = typeof perTubPrice === "number" ? perTubPrice : 0;
          else if (priceMode === "catalog")
            price =
              typeof catItem?.price !== "undefined"
                ? Number(catItem!.price)
                : 0;
          else price = 0;

          return (
            <OptionCard
              key={key}
              k={key}
              catalog={catalog}
              lang={lang}
              selected={!!selected}
              price={price}
              onClick={() => {
                if (single) onSelectSingle && onSelectSingle(key);
                else
                  onToggleMulti &&
                    onToggleMulti(key, qty > 0 ? 0 : maxQty > 0 ? 1 : 1);
              }}
              qty={qty > 0 ? qty : 1}
              maxQty={!single ? maxQty : 0}
              onQtyChange={(n) => onToggleMulti && onToggleMulti(key, n)}
            />
          );
        })}
      </div>
    </section>
  );
};
