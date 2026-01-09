import { blue } from "@/src/resources/colors";
import NavBarItem, { NavBarItemProps } from "./NavBarItem";
import Search from "../Search";

const NavBar = () => {
    const browse : NavBarItemProps = {
        label : "Browse",
        to : "/browse/now-playing"
    }

    const myList : NavBarItemProps = {
        label: "My List",
        to: "/my-list"
    }

    return (
        <div className="flex w-full justify-between h-[4rem] m-0" style={{ backgroundColor: blue }}>
            <div className="w-[14rem]"></div>
            <div className="flex items-center">
                <Search placeholder="Search"/>
            </div>
            <div className="h-full flex items-center">
                <NavBarItem {...browse}/>
                <NavBarItem {...myList}/>
            </div>
        </div>
    )
}

export default NavBar;