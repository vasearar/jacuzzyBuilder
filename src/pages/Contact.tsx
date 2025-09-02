import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "contact" });

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
          <p dangerouslySetInnerHTML={{ __html: t("mail") }} className="mb-2" />
          <div className="flex flex-wrap gap-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/"
              className="underline underline-offset-2 hover:opacity-80"
            >
              Facebook
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/"
              className="underline underline-offset-2 hover:opacity-80"
            >
              Instagram
            </a>
          </div>

          <form className="flex flex-col gap-3 mt-6 pr-0 md:pr-12 lg:pr-32">
            <input
              type="text"
              placeholder={t("nume")}
              className="w-full py-2 px-3 rounded-xl border border-[#CAD5E2] focus:outline-none focus:ring-2 focus:ring-[#5F9CFF]"
            />
            <input
              type="email"
              placeholder={t("email")}
              className="w-full py-2 px-3 rounded-xl border border-[#CAD5E2] focus:outline-none focus:ring-2 focus:ring-[#5F9CFF]"
            />
            <textarea
              placeholder={t("mesage")}
              className="w-full py-2 px-3 rounded-xl border border-[#CAD5E2] focus:outline-none focus:ring-2 focus:ring-[#5F9CFF]"
              rows={5}
            />
            <button
              type="submit"
              className="w-full sm:w-auto self-stretch sm:self-start px-4 py-3 bg-[#5F9CFF] rounded-2xl text-[#f1f1f1] border border-[#F1F1F1] cursor-pointer small-shadow hover:opacity-90 transition"
            >
              {t("send")}
            </button>
          </form>
        </div>

        <div className="col-span-1">
          <div className="relative w-full h-full aspect-square lg:aspect-auto rounded-2xl overflow-hidden small-shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1613.9734393308527!2d28.860144667861764!3d46.995967983891035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97eab9e825bcf%3A0x4aed2e91353dc8a2!2sSerghei%20Lazo%20Park!5e1!3m2!1sen!2s!4v1756772178518!5m2!1sen!2s"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
