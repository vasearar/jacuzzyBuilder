import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "hero" });
  return (
    <div className="w-full h-fit mt-20 bg-[linear-gradient(45deg,#1449E6,#2B7EFE,#165FFC)]">
      <div className="w-full h-full bg-[url(/public/images/circle.svg)] relative py-10">
        <div className="grid grid-cols-full w-full h-full relative text-[#f1f1f1]">
          <div className="col-span-6 flex flex-col justify-center gap-4">
            <h1 className="font-semibold text-5xl">{t("heroHeader")}</h1>
            <h2 className="my-4">{t("heroText")}</h2>
            <div className="gap-6 flex">
              <button className="rounded-2xl border-[1px] border-[#f1f1f1] px-4 py-3 cursor-pointer bg-[#f1f1f1]/40 hover:bg-[#f1f1f1]/20 transition">
                {t("heroButton1")}
              </button>
              <button className="rounded-2xl border-[1px] border-[#f1f1f1] px-4 py-3 cursor-pointer bg-[#f1f1f1]/40 hover:bg-[#f1f1f1]/20 transition">
                {t("heroButton2")}
              </button>
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
    </div>
  );
};

export default Hero;
