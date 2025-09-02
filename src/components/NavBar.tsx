import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "navbar" });
  const linkBase = "transition-colors hover:text-[#5F9CFF]";
  const active = "text-[#5F9CFF]";

  return (
    <nav className="bg-[#FCFDFE]/50 backdrop-blur w-full fixed top-0 left-0 right-0 z-10">
      <div className="grid-cols-full grid items-center container mx-auto px-4">
        <div className="flex py-4.5 col-span-4">
          <Logo />
          <div className="flex flex-col ml-2.5">
            <span className="font-medium">{t("logoHeader")}</span>
            <span className="text-xs text-[#3F3F40]">{t("logoSubHeader")}</span>
          </div>
        </div>

        <ul className="col-span-5 col-start-5 flex gap-x-9">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ""} transition`
              }
            >
              {t("home")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ""} transition`
              }
            >
              {t("news")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/documents"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ""} transition`
              }
            >
              {t("documents")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/members"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ""} transition`
              }
            >
              {t("members")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ""} transition`
              }
            >
              {t("contact")}
            </NavLink>
          </li>
        </ul>

        <div className="col-span-3 col-start-11 flex justify-end">
          <LanguageSwitcher />
          <a
            href="mailto:contact@anv.md"
            className="underline text-[#f1f1f1] bg-[#5F9CFF] px-4 py-3 ml-4 rounded-2xl text-center w-fit small-shadow border-[1px] border-[#f1f1f1]"
          >
            contact@anv.md
          </a>
        </div>
      </div>
    </nav>
  );
};
