import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "footer" });

  return (
    <footer>
      <div className="bg-[#f1f1f1] py-10 mt-28 border-y border-[#BDBFC0]">
        <div className="grid grid-cols-full container mx-auto px-4">
          <div className="col-span-4">
            <div className="flex gap-3 items-center">
              <Logo />
              <span className="font-medium">{t("logoText")}</span>
            </div>
            <p className="text-[#3F3F40] mt-4">{t("textUnderLogo")}</p>
          </div>

          <ul className="flex flex-col col-span-2 col-start-6 gap-2">
            <li className="font-medium mb-4">{t("quickLinks")}</li>
            <li>
              <NavLink to="/contact">{t("contact")}</NavLink>
            </li>
            <li>
              <NavLink to="/documents">{t("documents")}</NavLink>
            </li>
            <li>
              <NavLink to="/members">{t("members")}</NavLink>
            </li>
            <li>
              <NavLink to="/news">{t("news")}</NavLink>
            </li>
          </ul>

          <ul className="flex flex-col col-span-3 col-start-9 gap-2">
            <li className="font-medium mb-4">{t("contactCategory")}</li>
            <li>{t("address")}</li>
            <li>{t("phone")}</li>
            <li>
              <a
                href="mailto:contact@anv.md"
                className="hover:text-[#5F9CFF] transition-colors"
              >
                {t("email")}
              </a>
            </li>
            <li className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#5F9CFF]"
              >
                {t("facebook")}
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#5F9CFF]"
              >
                {t("instagram")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-full place-items-center">
        <p className="col-span-full text-[#3F3F40] py-6">{t("copyright")}</p>
      </div>
    </footer>
  );
};

export default Footer;
