import NavBarItem, { NavBarItemProps } from "./NavBarItem"
import Search from "../Search";

const nowPlaying: NavBarItemProps = {
    label: "Now Playing",
    to: "/browse/now-playing"
}

const upcoming : NavBarItemProps = {
    label: "Upcoming",
    to: "/browse/upcoming"
} 

const browseBarStyle = { 
    border: '2px solid white', 
    padding: '0.25rem', 
    margin: '0.5rem', 
    borderRadius: 50,
    width: '9rem',
    display: 'flex',
    justifyContent: 'center'
};

const BrowseNavBar = () => {
    return (
        <div className="flex w-full justify-between h-[4rem] m-0">
            <div className="h-full flex items-center">
                <NavBarItem {...nowPlaying} style={ browseBarStyle }/>
                <NavBarItem {...upcoming} style={ browseBarStyle }/>
            </div>
            <div className="h-full flex items-center">
                <Search placeholder="Find by name" className="lg:w-md w-2xs mx-3"/>
            </div>
        </div>
    )
}

export default BrowseNavBar;