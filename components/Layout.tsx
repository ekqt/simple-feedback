import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";

export default function Layout({ children }: { children: any }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
