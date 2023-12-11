import NavbarButton from "./NavbarButton";
import { FaUserAlt, FaHome, FaHistory } from 'react-icons/fa'
import { BiSolidMessageSquareAdd, BiSolidCategory } from 'react-icons/bi'
import { HiCollection } from 'react-icons/hi'
import { MdAdminPanelSettings } from 'react-icons/md'
import { AiTwotoneSetting } from 'react-icons/ai'

const Navbar = () => {
  return (
    <ul>
        <NavbarButton title={"Dashoard"} link={"/"} icon={<FaHome color={"#FFFFFF"} />} />
        <NavbarButton title={"Users"} link={"/users"} icon={<FaUserAlt color={"#FFFFFF"} />} />
        <NavbarButton title={"Stories"} link={"/stories"} icon={<FaHistory color={"#FFFFFF"} />} />
        <NavbarButton title={"Posts"} link={"/posts"} icon={<BiSolidMessageSquareAdd color={"#FFFFFF"} />} />
        <NavbarButton title={"Categories"} link={"/categories"} icon={<BiSolidCategory color={"#FFFFFF"} />} />
        <NavbarButton title={"Channels"} link={"/channels"} icon={<HiCollection color={"#FFFFFF"} />} />
        <NavbarButton title={"Admins"} link={"/admins"} icon={<MdAdminPanelSettings color={"#FFFFFF"} />} />
        <NavbarButton title={"Settings"} link={"/settings"} icon={<AiTwotoneSetting color={"#FFFFFF"} />} />
    </ul>
  );
};

export default Navbar;
