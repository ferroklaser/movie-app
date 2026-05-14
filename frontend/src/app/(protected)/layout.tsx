import { RealTimeProvider } from "@/src/context/RealTimeContext"
import ViewCardListener from "@/src/components/ViewCardListener"
import NavBar from "@/src/components/NavBar/NavBar"

const ProtectedLayout = ({ children } : Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <RealTimeProvider>
                <NavBar />
                {children}
                <ViewCardListener />
            </RealTimeProvider>
        </div>
    )
}

export default ProtectedLayout