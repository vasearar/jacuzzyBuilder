import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "hero" });
  return (
    <>
      <section className="w-full h-fit mt-20 bg-[linear-gradient(45deg,#1449E6,#2B7EFE,#165FFC)] hidden lg:block">
        <div className="w-full h-full bg-[url(/public/images/circle.svg)] relative py-10">
          <div className="grid grid-cols-full w-full h-full relative text-[#f1f1f1]">
            <div className="col-span-6 flex flex-col justify-center gap-4">
              <p className="text-xl">{t("quote")}</p>
              <h1 className="font-semibold text-5xl">{t("heroHeader")}</h1>
              <h2 className="my-4">{t("heroText")}</h2>
              <div className="gap-6 flex">
                <NavLink
                  to="/news"
                  className="rounded-2xl border-[1px] border-[#f1f1f1] px-4 py-3 cursor-pointer bg-[#f1f1f1]/40 hover:bg-[#f1f1f1]/20 transition"
                >
                  {t("heroButton1")}
                </NavLink>

                <NavLink
                  to="/contact"
                  className="rounded-2xl border-[1px] border-[#f1f1f1] px-4 py-3 cursor-pointer bg-[#f1f1f1]/40 hover:bg-[#f1f1f1]/20 transition"
                >
                  {t("heroButton2")}
                </NavLink>
              </div>
            </div>
            <div className="col-span-6 aspect-16/9 my-auto col-start-7">
              <img
                className="rounded-3xl w-full h-full object-cover"
                src="/images/heroImage.jpg"
                alt={t("imgAlt")}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-fit mt-20 bg-[linear-gradient(45deg,#1449E6,#2B7EFE,#165FFC)] lg:hidden">
        <div className="w-full h-full  px-4 bg-[url(/public/images/circle.svg)] bg-repeat relative py-10 sm:py-14 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_80%_at_50%_0%,rgba(0,0,0,0.20),transparent_60%)]"
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-[#f1f1f1]">
              <div className="lg:col-span-6 flex flex-col justify-center gap-5 text-center lg:text-left">
                <p className="text-xl">{t("quote")}</p>
                <h1 className="font-semibold leading-tight text-[clamp(1.5rem,6vw,3rem)]">
                  {t("heroHeader")}
                </h1>
                <p className="text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 opacity-95">
                  {t("heroText")}
                </p>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-2 sm:justify-center lg:justify-start">
                  <button
                    type="button"
                    className="min-h-11 w-full sm:w-auto rounded-2xl border border-[#f1f1f1] px-4 py-3 cursor-pointer bg-[#f1f1f1]/40 hover:bg-[#f1f1f1]/20 transition text-sm md:text-base"
                  >
                    {t("heroButton1")}
                  </button>
                  <button
                    type="button"
                    className="min-h-11 w-full sm:w-auto rounded-2xl border border-[#f1f1f1] px-4 py-3 cursor-pointer bg-[#f1f1f1]/40 hover:bg-[#f1f1f1]/20 transition text-sm md:text-base"
                  >
                    {t("heroButton2")}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
                  <img
                    className="w-full h-auto lg:h-full aspect-video lg:aspect-auto object-cover"
                    src="/images/heroImage.jpg"
                    alt={t("imgAlt")}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
