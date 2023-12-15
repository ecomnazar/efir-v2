import clsx from "clsx";
import { TString } from "../../../interfaces/IGlobal";
import { NavLink } from "react-router-dom";

interface INavbarButton {
  title: TString;
  link: TString;
  icon: any;
}

const NavbarButton = ({ title, link, icon }: INavbarButton) => {
  return (
    <NavLink
      to={link}
      className={clsx(
        "flex cursor-pointer shadow gap-x-2 items-center rounded-xl mb-4 p-3"
      )}
    >
      <div
        className={clsx(
          "w-[40px] h-[40px] bg-primaryColor rounded-xl flex items-center justify-center"
        )}
      >
        {icon}
      </div>
      <h2 className="font-medium text-[15px]">{title}</h2>
    </NavLink>
  );
};

export default NavbarButton;
