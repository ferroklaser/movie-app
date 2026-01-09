import NavBarItem, { NavBarItemProps } from "./NavBarItem"
import { blue } from "@/src/resources/colors"

const nowPlaying: NavBarItemProps = {
    label: "Now Playing",
    to: "/browse/now-playing"
}

const upcoming : NavBarItemProps = {
    label: "Upcoming",
    to: "/browse/upcoming"
} 

const BrowseNavBar = () => {
    return (
        <div className="flex w-full justify-between h-[4rem] m-0">
            <div className="h-full flex items-center">
                <NavBarItem {...nowPlaying} />
                <NavBarItem {...upcoming} />
            </div>
        </div>
    )
}

export default BrowseNavBar;