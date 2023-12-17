import NavBar from "../components/NavBar";
import SignInSection from "../components/ui/SignInSection.tsx";
import earth from "../assets/wide_earth.svg";
const SignIn=()=>
{
    return(
        <div className="w-screen h-fit lg:h-screen flex bg-[#EEF5FC] overflow-scroll lg:overflow-hidden">
            <SignInSection/>
            <div className="hidden md:block">
                <NavBar/>
                <h1 className="text-[#0053AD] text-xl font-poppins font-medium text-center mt-32 mb-10 ">L'INFINI DU SAVOIR VOUS ATTEND A PORTEE DE CLIC</h1>
                <p className="text-2xl font-light text-center font-poppins">Votre passerelle vers une découverte scientifique<br/>Simplifiez l'exploration des articles savants <br/>avec notre plateforme conviviale.<br/>Donnez vie à votre curiosité.</p>
                <img src={earth} alt="earth" className="mt-[80px]" />
            </div>
        </div>

    );
}

export default SignIn;
