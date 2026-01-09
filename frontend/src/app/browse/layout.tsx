import BrowseNavBar from "@/src/components/NavBar/BrowseNavBar";

const BrowseLayout = ({ children } : Readonly<{children : React.ReactNode; }>) => {
    return (
        <div>
            <div className="w-full">
                <BrowseNavBar/>
            </div>
            {children}
        </div>
    );
}

export default BrowseLayout