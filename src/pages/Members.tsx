import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const MemberCard = ({
  id,
  roleClass = "text-[#3F3F40] text-sm",
  showTasks = false,
}: {
  id: string;
  roleClass?: string;
  showTasks?: boolean;
}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "members" });

  const name = (t(`${id}.name`) as string) ?? "";
  const imageSrc = ((t(`${id}.image`) as string) ?? "").trim();

  const [imgError, setImgError] = useState(false);
  const showFallback = !imageSrc || imgError;

  const initials = useMemo(() => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const chars = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
    return (chars || "?").toUpperCase();
  }, [name]);

  return (
    <div className="small-shadow rounded-2xl p-4 sm:p-5 col-span-8 sm:col-span-6 lg:col-span-4">
      <div className="flex items-center gap-4">
        {showFallback ? (
          <div
            className="size-14 sm:size-16 rounded-full small-shadow border-[1px] border-[#3A47EA] bg-[#3A47EA] text-white flex items-center justify-center text-base sm:text-lg font-semibold select-none"
            aria-label={name || "Member avatar"}
            role="img"
          >
            {initials}
          </div>
        ) : (
          <img
            className="size-14 sm:size-16 rounded-full object-cover object-top small-shadow border-[1px] border-[#3A47EA]"
            src={imageSrc}
            alt={name}
            onError={() => setImgError(true)}
          />
        )}

        <div className="flex flex-col">
          <p className="text-sm sm:text-base">{name}</p>
          <span className={roleClass}>{t(`${id}.role`)}</span>
        </div>
      </div>

      {showTasks && (
        <div className="mt-2 text-sm sm:text-base">
          <p>• {t(`${id}.task1`)}</p>
          <p>• {t(`${id}.task2`)}</p>
        </div>
      )}
    </div>
  );
};

const Members = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "members" });
  return (
    <section className="grid grid-cols-full w-full gap-y-5 sm:gap-y-6">
      <div className="col-span-full mt-32">
        <h1 className="text-2xl">{t("header")}</h1>
        <h2 className="text-[#3F3F40] text-sm sm:text-base">
          {t("subHeader")}
        </h2>
      </div>

      <h1 className="col-span-full text-lg sm:text-xl mt-6 sm:mt-8 mb-3 sm:mb-4">
        {t("consilium")}
      </h1>

      <MemberCard id="1" roleClass="text-[#3A47EA] text-sm" showTasks />
      <MemberCard id="2" roleClass="text-[#3A47EA] text-sm" showTasks />
      <MemberCard id="3" roleClass="text-[#3A47EA] text-sm" showTasks />

      <h1 className="col-span-full text-lg sm:text-xl mt-6 sm:mt-8 mb-3 sm:mb-4">
        {t("founders")}
      </h1>

      <MemberCard id="4" />
      <MemberCard id="5" />
      <MemberCard id="6" />
      <MemberCard id="7" />
      <MemberCard id="8" />
      <MemberCard id="9" />
    </section>
  );
};

export default Members;
