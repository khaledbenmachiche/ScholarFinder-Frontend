import SignInSection from "../components/ui/SignInSection.tsx";
import earth from "../assets/wide_earth.svg";
import Navbar from "../components/Navbar.tsx";

const SignIn = () => {
    return (
        <>
            <Navbar/>
            <div className="w-screen h-fit lg:h-screen flex bg-[#EEF5FC] overflow-scroll lg:overflow-hidden">
                <SignInSection/>
                <div className="hidden md:hidden lg:block ">
                    <h1 className="text-[#0053AD] text-2xl font-bold text-center mt-40 mb-10">L'INFINI DU SAVOIR VOUS
                        ATTEND A PORTEE DE CLIC</h1>
                    <img src={earth} alt="earth" className="mt-[200px]"/>
                </div>
            </div>
        </>
    );
}

export default SignIn;
