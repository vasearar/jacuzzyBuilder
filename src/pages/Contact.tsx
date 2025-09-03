import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "contact" });
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    if ((data.get("_honey") as string)?.length) return;

    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg(t("fillAll") || "Please fill all fields.");
      return;
    }

    try {
      setStatus("sending");
      setErrorMsg("");

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message,
          to_email: "prodius345@gmail.com",
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      setStatus("sent");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.text || "Sending failed. Please try again.");
    }
  };

  return (
    <section className="grid grid-cols-full w-full">
      <h1 className="text-2xl col-span-full mt-32">{t("header")}</h1>

      <div className="bg-[#f1f1f1] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 w-full col-span-full rounded-2xl gap-6">
        <div className="col-span-1">
          <p
            dangerouslySetInnerHTML={{ __html: t("address") }}
            className="mb-2"
          />
          <p
            dangerouslySetInnerHTML={{ __html: t("phone") }}
            className="mb-2"
          />
          <p dangerouslySetInnerHTML={{ __html: t("fax") }} className="mb-2" />
          <p dangerouslySetInnerHTML={{ __html: t("mail") }} className="mb-2" />

          <div className="flex flex-wrap gap-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/anvmd"
              className="underline underline-offset-2 hover:opacity-80"
            >
              Facebook
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/anv_md/"
              className="underline underline-offset-2 hover:opacity-80"
            >
              Instagram
            </a>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 mt-6 pr-0 md:pr-12 lg:pr-32"
          >
            <input
              type="text"
              name="_honey"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <input
              type="text"
              name="name"
              placeholder={t("nume")}
              className="w-full py-2 px-3 rounded-xl border border-[#CAD5E2] focus:outline-none focus:ring-2 focus:ring-[#5F9CFF]"
              autoComplete="name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("email")}
              className="w-full py-2 px-3 rounded-xl border border-[#CAD5E2] focus:outline-none focus:ring-2 focus:ring-[#5F9CFF]"
              autoComplete="email"
              required
            />
            <textarea
              name="message"
              placeholder={t("mesage")}
              className="w-full py-2 px-3 rounded-xl border border-[#CAD5E2] focus:outline-none focus:ring-2 focus:ring-[#5F9CFF]"
              rows={5}
              required
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full sm:w-auto self-stretch sm:self-start px-4 py-3 bg-[#5F9CFF] rounded-2xl text-[#f1f1f1] border border-[#F1F1F1] cursor-pointer small-shadow hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? t("sending") || "Sending…" : t("send")}
            </button>

            <div className="min-h-[1.25rem] mt-1" aria-live="polite">
              {status === "sent" && (
                <p className="text-green-700 text-sm">
                  {t("sentOk") || "Thank you! Your message has been sent."}
                </p>
              )}
              {status === "error" && (
                <p className="text-red-700 text-sm">{errorMsg}</p>
              )}
            </div>
          </form>
        </div>

        <div className="col-span-1">
          <div className="relative w-full h-full aspect-square lg:aspect-auto rounded-2xl overflow-hidden small-shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d959.1970421083537!2d28.808054247258266!3d47.02253969098323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dd08ff7299b%3A0x8c2c10e77adcc336!2s58%2C%20Strada%20Vasile%20Lupu%206A%2C%20MD-2008%2C%20Chi%C8%99in%C4%83u%2C%20Moldova!5e1!3m2!1sen!2s!4v1756852691233!5m2!1sen!2s"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
