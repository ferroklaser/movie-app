import { blue } from "@/src/resources/colors";
import NavBarItem from "./NavBarItem";

const NavBar = () => {
    return (
        <div className="flex w-full h-[4rem] items-center justify-end m-0" style={{ backgroundColor: blue }}>
            <div>
                <NavBarItem label="My List"/>
            </div>
        </div>
    )
}

export default NavBar;