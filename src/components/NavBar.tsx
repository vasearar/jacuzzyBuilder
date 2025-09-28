import LanguageSwitcher from "./LanguageSwitcher";

function NavBarInner() {
  return (
    <nav className="bg-[#FCFDFE]/50 small-shadow backdrop-blur w-full block z-40">
      <div className="grid-cols-full grid items-center container mx-auto px-4">
        <div className="col-span-full relative w-full h-full flex justify-center items-center py-2">
          <img className="h-28" alt="logo" src="/logo.png" />
          <div className="absolute right-0">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}

export const NavBar = NavBarInner;
export default NavBarInner;
