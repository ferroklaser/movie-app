import { blue } from "@/src/resources/colors";
import NavBarItem, { NavBarItemProps } from "./NavBarItem";

const NavBar = () => {
    const nowPlaying : NavBarItemProps = {
        label : "Now Playing",
        to : "/now-playing"
    }

    return (
        <div className="flex w-full h-[4rem] items-center justify-end m-0" style={{ backgroundColor: blue }}>
            <div>
                <NavBarItem {...nowPlaying}/>
            </div>
        </div>
    )
}

export default NavBar;