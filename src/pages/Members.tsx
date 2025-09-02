import { useTranslation } from "react-i18next";

const Members = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "members" });
  return (
    <section className="grid grid-cols-full w-full">
      <div className="col-span-full mt-32">
        <h1 className="text-2xl">{t("header")}</h1>
        <h2 className="text-[#3F3F40]">{t("subHeader")}</h2>
      </div>
      <h1 className="text-xl mt-8 mb-4 col-span-full">{t("consilium")}</h1>
      <div className="small-shadow col-span-4 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <img
            className="size-16 rounded-full object-cover object-top small-shadow border-[1px] border-[#3A47EA]"
            src={t("1.image")}
            alt={t("1.name")}
          />
          <div className="flex flex-col">
            <p>{t("1.name")}</p>
            <span className="text-[#3A47EA] text-sm">{t("1.role")}</span>
          </div>
        </div>
        <div className="mt-2">
          <p>• {t("1.task1")}</p>
          <p>• {t("1.task2")}</p>
        </div>
      </div>
      <div className="small-shadow col-span-4 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <img
            className="size-16 rounded-full object-cover object-top small-shadow border-[1px] border-[#3A47EA]"
            src={t("2.image")}
            alt={t("2.name")}
          />
          <div className="flex flex-col">
            <p>{t("2.name")}</p>
            <span className="text-[#3A47EA] text-sm">{t("2.role")}</span>
          </div>
        </div>
        <div className="mt-2">
          <p>• {t("2.task1")}</p>
          <p>• {t("2.task2")}</p>
        </div>
      </div>
      <div className="small-shadow col-span-4 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <img
            className="size-16 rounded-full object-cover object-top small-shadow border-[1px] border-[#3A47EA]"
            src={t("3.image")}
            alt={t("3.name")}
          />
          <div className="flex flex-col">
            <p>{t("3.name")}</p>
            <span className="text-[#3A47EA] text-sm">{t("3.role")}</span>
          </div>
        </div>
        <div className="mt-2">
          <p>• {t("3.task1")}</p>
          <p>• {t("3.task2")}</p>
        </div>
      </div>
      <h1 className="text-xl mt-8 mb-4 col-span-full">{t("founders")}</h1>
      <div className="small-shadow col-span-4 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <img
            className="size-16 rounded-full object-cover object-top small-shadow border-[1px] border-[#3A47EA]"
            src={t("4.image")}
            alt={t("4.name")}
          />
          <div className="flex flex-col">
            <p>{t("4.name")}</p>
            <span className="text-[#3F3F40] text-sm">{t("4.role")}</span>
          </div>
        </div>
      </div>
      <div className="small-shadow col-span-4 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <img
            className="size-16 rounded-full object-cover object-top small-shadow border-[1px] border-[#3A47EA]"
            src={t("5.image")}
            alt={t("5.name")}
          />
          <div className="flex flex-col">
            <p>{t("5.name")}</p>
            <span className="text-[#3F3F40] text-sm">{t("5.role")}</span>
          </div>
        </div>
      </div>
      <div className="small-shadow col-span-4 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <img
            className="size-16 rounded-full object-cover object-top small-shadow border-[1px] border-[#3A47EA]"
            src={t("6.image")}
            alt={t("6.name")}
          />
          <div className="flex flex-col">
            <p>{t("6.name")}</p>
            <span className="text-[#3F3F40] text-sm">{t("6.role")}</span>
          </div>
        </div>
      </div>
      <div className="small-shadow col-span-4 rounded-2xl p-5 mt-4">
        <div className="flex items-center gap-4">
          <img
            className="size-16 rounded-full object-cover object-top small-shadow border-[1px] border-[#3A47EA]"
            src={t("7.image")}
            alt={t("7.name")}
          />
          <div className="flex flex-col">
            <p>{t("7.name")}</p>
            <span className="text-[#3F3F40] text-sm">{t("7.role")}</span>
          </div>
        </div>
      </div>
      <div className="small-shadow col-span-4 rounded-2xl p-5 mt-4">
        <div className="flex items-center gap-4">
          <img
            className="size-16 rounded-full object-cover object-top small-shadow border-[1px] border-[#3A47EA]"
            src={t("8.image")}
            alt={t("8.name")}
          />
          <div className="flex flex-col">
            <p>{t("8.name")}</p>
            <span className="text-[#3F3F40] text-sm">{t("8.role")}</span>
          </div>
        </div>
      </div>
      <div className="small-shadow col-span-4 rounded-2xl p-5 mt-4">
        <div className="flex items-center gap-4">
          <img
            className="size-16 rounded-full object-cover object-top small-shadow border-[1px] border-[#3A47EA]"
            src={t("9.image")}
            alt={t("9.name")}
          />
          <div className="flex flex-col">
            <p>{t("9.name")}</p>
            <span className="text-[#3F3F40] text-sm">{t("9.role")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Members;
