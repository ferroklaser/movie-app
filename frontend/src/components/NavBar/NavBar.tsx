import { blue } from "@/src/resources/colors";
import NavBarItem, { NavBarItemProps } from "./NavBarItem";
import Search from "../Search";

const NavBar = () => {
    const nowPlaying : NavBarItemProps = {
        label : "Now Playing",
        to : "/now-playing"
    }

    const myList : NavBarItemProps = {
        label: "My List",
        to: "/my-list"
    }

    const upcoming : NavBarItemProps = {
        label: "Upcoming",
        to: "/upcoming"
    }

    return (
        <div className="flex w-full justify-between h-[4rem] m-0" style={{ backgroundColor: blue }}>
            <div className="w-[25.5rem]"></div>
            <div className="flex items-center">
                <Search placeholder="Search"/>
            </div>
            <div className="h-full flex items-center">
                <NavBarItem {...nowPlaying}/>
                <NavBarItem {...upcoming} />
                <NavBarItem {...myList}/>
            </div>
        </div>
    )
}

export default NavBar;