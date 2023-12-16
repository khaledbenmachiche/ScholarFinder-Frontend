import NavBar from "../components/NavBar";
import SignUpSection from "../components/ui/SignUpSection.tsx";
import earth from "../assets/wide_earth.svg";
import { motion } from "framer-motion";
const SignUp=()=>
{
    return(
        <div className="w-screen h-screen flex bg-[#EEF5FC] overflow-hidden">
            <SignUpSection/>
            <div className="hidden md:block">
                <NavBar/>
                <p className="text-[#0053AD] text-3xl font-poppins font-medium text-center mt-32 mb-10 ">L'INFINI DU SAVOIR VOUS ATTEND A PORTEE DE CLIC</p>
                <p className="text-2xl font-light text-center font-poppins">Votre passerelle vers une découverte scientifique<br/>Simplifiez l'exploration des articles savants <br/>avec notre plateforme conviviale.<br/>Donnez vie à votre curiosité.</p>
                <motion.img
                    src={earth}
                    alt="earth"
                    className="mt-[80px]"
                    initial={{
                        x:100,
                        y:-20,
                    }}
                    animate={{
                        x:0,
                        y:0,
                    }}
                    transition={{type: "spring", stiffness: 100}}

                />
            </div>
        </div>

    );
}

export default SignUp;
