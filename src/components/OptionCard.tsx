import React from "react";
import type { Lang, LocaleBlock } from "../hooks/useCatalogs";
import { byLang, imgPath } from "../hooks/useCatalogs";
import type { CatalogMap } from "../hooks/useCatalogs";

type Props = {
  k: string;
  catalog?: CatalogMap;
  lang: Lang;
  selected?: boolean;
  titleOverride?: string;
  price?: number;
  onClick?: () => void;
  qty?: number;
  maxQty?: number;
  onQtyChange?: (n: number) => void;
};

export const OptionCard: React.FC<Props> = ({
  k,
  catalog,
  lang,
  selected,
  titleOverride,
  price,
  onClick,
  qty,
  maxQty,
  onQtyChange,
}) => {
  const c = catalog?.[k];
  const loc: LocaleBlock | undefined = titleOverride
    ? { title: titleOverride }
    : byLang(lang, c);
  const txt = loc?.title || k;
  const img = imgPath(c?.image || c?.images);

  // Wrapper gets ::before (hover thin stroke) and ::after (selected thick stroke)
  const strokeClasses = [
    "relative inline-block rounded-lg", // the owner of ::before/::after
    // HOVER: thin 3px inner stroke (doesn't affect layout)
    "before:content-[''] before:absolute before:inset-0 before:rounded-lg before:pointer-events-none",
    "before:shadow-[inset_0_0_0_3px_#00B163] before:opacity-0 group-hover:before:opacity-100",
    // SELECTED: thick 9px inner stroke (doesn't affect layout)
    selected
      ? "after:content-[''] after:absolute after:inset-0 after:rounded-lg after:pointer-events-none after:shadow-[inset_0_0_0_9px_#00B163]"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="col-span-1 select-none">
      <div className="cursor-pointer p-2 group" onClick={onClick} title={txt}>
        {img && (
          <span className={strokeClasses}>
            <img
              src={img}
              alt={txt}
              loading="lazy"
              className="block w-auto h-auto mx-auto rounded-lg"
            />
          </span>
        )}
        <p className="mt-2 text-sm text-center font-medium line-clamp-2">
          {txt}
        </p>
        {typeof price === "number" && (
          <p className="text-sm text-center font-medium">{price} €</p>
        )}
      </div>

      {typeof maxQty === "number" && maxQty > 0 && (
        <div className="mt-2 flex items-center justify-center">
          <input
            type="number"
            min={1}
            max={maxQty}
            value={Math.max(1, qty || 1)}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              onQtyChange &&
              onQtyChange(
                Math.min(
                  maxQty,
                  Math.max(1, parseInt(e.target.value || "1", 10))
                )
              )
            }
            className="w-16 rounded border px-2 py-1 text-sm text-center"
          />
        </div>
      )}
    </div>
  );
};
  