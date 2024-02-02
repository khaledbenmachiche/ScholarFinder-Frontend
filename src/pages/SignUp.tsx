import SignUpSection from "../components/ui/SignUpSection.tsx";
import earth from "../assets/wide_earth.svg";
import Navbar from "../components/Navbar.tsx";

const SignUp = () => {
    return (
        <>
            <Navbar/>
            <div className="w-screen h-fit lg:h-screen  flex bg-[#EEF5FC]   lg:overflow-hidden">
                <SignUpSection/>
                <div className="hidden lg:block">
                    <h1 className="text-[#0053AD] text-2xl font-bold text-center mt-40 mb-10">L'INFINI DU SAVOIR VOUS
                        ATTEND A PORTEE DE CLIC</h1>
                    <img
                        src={earth}
                        alt="earth"
                        className="lg:mt-[200px]"
                    />
                </div>
            </div>
        </>
    );
}

export default SignUp;
