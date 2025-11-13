import React, { useMemo, useState } from "react";
import type { SelRow } from "../components/StickySummary.types";
import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";
import Phone from "./Phone";

export type StickySummaryProps = {
  title: string; // pass a localized title yourself if desired
  rows: SelRow[];
  total: number;
  emailConfig?: {
    serviceId: string;
    templateId: string;
    publicKey: string;
    companyEmail: string;
  };
  logoPath?: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[\d+()\-.\s]{6,}$/;
const formatMoney = (n: number) => `${n} €`;

// We keep your keys exactly as in your JSON under "common": { ... }
// Example use: tt("ui.labels.email")
const useCommonDict = () => {
  const { t } = useTranslation("common");
  // Pull the WHOLE "common" object from the namespace file,
  // then look up our flat dotted keys inside it.
  const dict = t("common", { returnObjects: true }) as Record<string, string>;
  const tt = (key: string) => (dict && dict[key]) || key;
  return { tt };
};

const buildOrderText = (
  rows: SelRow[],
  total: number,
  tt: (k: string) => string
) => {
  const lines = rows.map((r) => {
    const qty = r.qty && r.qty > 1 ? ` x${r.qty}` : "";
    const price =
      typeof r.price === "number" && r.price > 0
        ? ` | ${formatMoney(r.price)}${r.qty && r.qty > 1 ? ` x${r.qty}` : ""}`
        : "";
    return `- ${r.label}: ${r.text}${qty}${price}`;
  });
  return `${lines.join("\n")}\n\n${tt("orderText.totalLabel")}: ${formatMoney(
    total
  )}`;
};

export const StickySummary: React.FC<StickySummaryProps> = ({
  title,
  rows,
  total,
  emailConfig,
  logoPath = "/logo.png",
}) => {
  const { tt } = useCommonDict();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState<"send" | "download" | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const isValid = emailRe.test(email) && phoneRe.test(phone);
  const orderText = useMemo(
    () => buildOrderText(rows, total, tt),
    [rows, total, tt]
  );

  const handleSend = async () => {
    setErr(null);
    setOk(null);
    if (!emailConfig) {
      setErr(tt("ui.messages.emailNotConfigured"));
      return;
    }
    if (!isValid) {
      setErr(tt("ui.messages.invalidEmailPhone"));
      return;
    }
    setBusy("send");
    try {
      const { send } = await import("@emailjs/browser");
      await send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          to_email: emailConfig.companyEmail,
          from_email: email,
          phone,
          notes,
          order_text: orderText,
          total_text: formatMoney(total),
        },
        { publicKey: emailConfig.publicKey }
      );
      setOk(tt("ui.messages.orderSent"));
    } catch (e: any) {
      setErr(e?.message || tt("ui.messages.sendFailed"));
    } finally {
      setBusy(null);
    }
  };

  const handleDownload = async () => {
    setErr(null);
    setOk(null);
    setBusy("download");
    try {
      const {
        Document,
        Packer,
        Paragraph,
        Table,
        TableRow,
        TableCell,
        TextRun,
        ImageRun,
        AlignmentType,
        WidthType,
      } = await import("docx");

      let logoRun = new TextRun("");

      try {
        const res = await fetch(logoPath, { cache: "no-store" });
        if (res.ok) {
          const buf = await res.arrayBuffer();
          logoRun = new ImageRun({
            data: buf,
            transformation: { width: 270, height: 217 },
            type: "png",
          });
        }
      } catch {}

      const headerRow = new TableRow({
        children: [
          tt("doc.table.item"),
          tt("doc.table.details"),
          tt("doc.table.qty"),
          tt("doc.table.unit"),
          tt("doc.table.lineTotal"),
        ].map(
          (h) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: h, bold: true })],
                }),
              ],
            })
        ),
      });

      const bodyRows = rows.map((r) => {
        const qty = r.qty ?? 1;
        const unit = typeof r.price === "number" ? r.price : 0;
        const line = unit * qty;
        return new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(r.label)] }),
            new TableCell({ children: [new Paragraph(r.text)] }),
            new TableCell({ children: [new Paragraph(String(qty))] }),
            new TableCell({
              children: [new Paragraph(unit ? formatMoney(unit) : "-")],
            }),
            new TableCell({
              children: [new Paragraph(line ? formatMoney(line) : "-")],
            }),
          ],
        });
      });

      const totalRow = new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: tt("common.total"), bold: true }),
                ],
              }),
            ],
            columnSpan: 4,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: formatMoney(total), bold: true }),
                ],
              }),
            ],
          }),
        ],
      });

      const table = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [headerRow, ...bodyRows, totalRow],
      });

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [logoRun],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: tt("doc.heading.orderSummary"),
                heading: "Heading1" as any,
              }),
              new Paragraph({ text: "" }),
              table,
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: tt("doc.heading.buyerDetails"),
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({ text: `${tt("doc.label.email")} ${email}` }),
              new Paragraph({ text: `${tt("doc.label.phone")} ${phone}` }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: tt("doc.heading.additionalNotes"),
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({ text: notes || "-" }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `order_${new Date().toISOString().slice(0, 10)}.docx`);
      setOk(tt("ui.messages.fileDownloaded"));
    } catch (e: any) {
      setErr(e?.message || tt("ui.messages.fileCreateFailed"));
    } finally {
      setBusy(null);
    }
  };

  return (
    <aside className="col-span-12 lg:col-span-4 w-full lg:sticky lg:top-24 h-fit lg:mb-6">
      <p className="flex gap-2 font-bold items-center">
        <Phone />
        +373 69 195 884
      </p>
      <p className="flex gap-2 mb-3 font-bold items-center">
        <Phone />
        +373 69 121 940
      </p>
      <div className="border rounded-xl small-shadow p-6">
        <h2 className="font-medium text-[28px] mb-4">{title}</h2>

        <div className="space-y-2 text-sm">
          {rows.map((r, idx) => (
            <div key={idx} className="flex justify-between items-start gap-3">
              <span className="opacity-70 w-40 shrink-0">{r.label}</span>
              <div className="flex-1 text-right">
                <div className="font-medium">
                  {r.text}
                  {r.qty ? ` × ${r.qty}` : ""}
                </div>
                {typeof r.price === "number" && r.price > 0 && (
                  <div className="text-sm font-medium">
                    {r.price} €{r.qty && r.qty > 1 ? ` × ${r.qty}` : ""}
                  </div>
                )}
              </div>
            </div>
          ))}

          <hr className="my-4" />
          <div className="flex justify-between text-base mb-4">
            <span className="font-semibold">{tt("common.total")}</span>
            <span className="font-bold">{total} €</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">
                {tt("ui.labels.email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tt("ui.placeholders.email")}
                className={`w-full rounded border px-3 py-2 text-sm ${
                  email && !emailRe.test(email) ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">
                {tt("ui.labels.phone")}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={tt("ui.placeholders.phone")}
                className={`w-full rounded border px-3 py-2 text-sm ${
                  phone && !phoneRe.test(phone) ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">
                {tt("ui.labels.notes")}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full rounded border px-3 py-2 text-sm"
                placeholder={tt("ui.placeholders.notes")}
              />
            </div>

            {err && <div className="text-red-600 text-sm">{err}</div>}
            {ok && <div className="text-green-600 text-sm">{ok}</div>}

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSend}
                disabled={!isValid || busy === "send"}
                className="flex-1 rounded-xl bg-[#00B163] text-white px-4 py-2 text-sm font-medium cursor-pointer disabled:opacity-60"
              >
                {busy === "send"
                  ? tt("ui.buttons.sending")
                  : tt("ui.buttons.sendOrder")}
              </button>
              <button
                onClick={handleDownload}
                disabled={busy === "download"}
                className="flex-1 rounded-xl bg-[#6C5F5B] text-white px-4 py-2 text-sm font-medium cursor-pointer disabled:opacity-60"
              >
                {busy === "download"
                  ? tt("ui.buttons.buildingFile")
                  : tt("ui.buttons.downloadOrderFile")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StickySummary;
