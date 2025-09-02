import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "contact" });
  return (
    <section className="grid grid-cols-full w-full">
      <h1 className="text-2xl col-span-full mt-32">{t("header")}</h1>
      <div className="bg-[#f1f1f1] p-8 grid grid-cols-2 w-full col-span-full rounded-2xl">
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
          <div className="flex gap-3">
            <a target="_blank" href="https://www.facebook.com/">
              Facebook
            </a>
            <a target="_blank" href="https://www.instagram.com/">
              Instagram
            </a>
          </div>
          <div className="flex flex-col gap-3 mt-6 pr-32">
            <input
              type="text"
              placeholder={t("nume")}
              className="py-2 px-3 rounded-xl border-[1px] border-[#CAD5E2]"
            />
            <input
              type="text"
              placeholder={t("email")}
              className="py-2 px-3 rounded-xl border-[1px] border-[#CAD5E2]"
            />
            <textarea
              placeholder={t("mesage")}
              className="py-2 px-3 rounded-xl border-[1px] border-[#CAD5E2]"
              rows={5}
            />
            <button className="self-start px-4 py-3 bg-[#5F9CFF] rounded-2xl text-[#f1f1f1] border-[1px] border-[#F1F1F1] cursor-pointer small-shadow">
              {t("send")}
            </button>
          </div>
        </div>
        <div className="col-span-1 col-start-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1613.9734393308527!2d28.860144667861764!3d46.995967983891035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97eab9e825bcf%3A0x4aed2e91353dc8a2!2sSerghei%20Lazo%20Park!5e1!3m2!1sen!2s!4v1756772178518!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            className="w-full h-full rounded-r-2xl"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
