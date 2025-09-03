import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

function NavBarInner() {
  const { t } = useTranslation(undefined, { keyPrefix: "navbar" });
  const [isOpen, setIsOpen] = useState(false);

  const linkBase = "transition-colors hover:text-[#5F9CFF]";
  const active = "text-[#5F9CFF]";

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-[#FCFDFE]/50 backdrop-blur w-full fixed top-0 left-0 right-0 z-40">
      <div className="grid-cols-full grid items-center container mx-auto px-4">
        <div className="flex py-4.5 max-[1170px]:col-span-10 col-span-4 items-center">
          <img className="size-[42px]" src="/Logo.svg" alt="logo" />
          <div className="flex flex-col ml-2.5">
            <span className="font-medium xl:text-base text-sm">
              {t("logoHeader")}
            </span>
            <span className="text-[10px] xl:text-xs text-[#3F3F40]">
              {t("logoSubHeader")}
            </span>
          </div>
        </div>

        <ul className="col-span-5 col-start-5 flex gap-x-9 max-[1170px]:hidden">
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

        <div className="col-span-3 col-start-11 flex justify-end items-center max-[1170px]:hidden">
          <LanguageSwitcher />
          <a
            href="mailto:contact@anv.md"
            className="underline text-[#f1f1f1] bg-[#5F9CFF] px-4 py-3 ml-4 rounded-2xl text-center w-fit small-shadow border-[1px] border-[#f1f1f1]"
          >
            contact@anv.md
          </a>
        </div>

        <div className="col-span-3 col-start-11 hidden max-[1170px]:flex justify-end">
          <button
            type="button"
            className="p-3 -mr-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="block relative w-[20px] h-[18px]">
              <span
                className={`absolute left-0 top-0 w-[20px] h-[2px] rounded-full bg-[#3F3F40] transition-all duration-300 ease-out ${
                  isOpen ? "translate-y-[8px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] w-[20px] h-[2px] rounded-full bg-[#3F3F40] transition-all duration-300 ease-out ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] w-[20px] h-[2px] rounded-full bg-[#3F3F40] transition-all duration-300 ease-out ${
                  isOpen ? "-translate-y-[8px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 bg-[#FCFDFE] text-[#0F172A] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
          <div className="flex items-center">
            <img className="size-[42px]" src="/Logo.svg" alt="logo" />
            <span className="ml-2 font-medium">{t("logoHeader")}</span>
          </div>

          <button
            type="button"
            className="p-3"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          >
            <span className="block relative w-[20px] h-[18px]">
              <span className="absolute left-0 top-[8px] w-[20px] h-[2px] rounded-full bg-[#3F3F40] rotate-45" />
              <span className="absolute left-0 top-[8px] w-[20px] h-[2px] rounded-full bg-[#3F3F40] -rotate-45" />
            </span>
            <span className="sr-only">{t("close") || "Close"}</span>
          </button>
        </div>

        <div className="h-[calc(100vh-64px)] bg-white flex flex-col items-center justify-center gap-8 px-6 text-center">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) => `text-2xl ${isActive ? active : ""}`}
          >
            {t("home")}
          </NavLink>
          <NavLink
            to="/news"
            onClick={closeMenu}
            className={({ isActive }) => `text-2xl ${isActive ? active : ""}`}
          >
            {t("news")}
          </NavLink>
          <NavLink
            to="/documents"
            onClick={closeMenu}
            className={({ isActive }) => `text-2xl ${isActive ? active : ""}`}
          >
            {t("documents")}
          </NavLink>
          <NavLink
            to="/members"
            onClick={closeMenu}
            className={({ isActive }) => `text-2xl ${isActive ? active : ""}`}
          >
            {t("members")}
          </NavLink>
          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) => `text-2xl ${isActive ? active : ""}`}
          >
            {t("contact")}
          </NavLink>

          <div className="pt-6 flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="mailto:contact@anv.md"
              className="underline text-[#f1f1f1] bg-[#5F9CFF] px-4 py-3 rounded-2xl text-center w-fit small-shadow border-[1px] border-[#f1f1f1]"
              onClick={closeMenu}
            >
              contact@anv.md
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export const NavBar = NavBarInner;
export default NavBarInner;
