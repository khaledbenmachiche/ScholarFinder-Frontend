import NavBar from "../components/NavbarAuth.tsx"
import SignUpSection from "../components/ui/SignUpSection.tsx";
import earth from "../assets/wide_earth.svg";
import { motion } from "framer-motion";
const SignUp=()=>
{
    return(
        <div className="w-screen h-fit lg:h-screen  flex bg-[#EEF5FC] overflow-scroll lg:overflow-hidden">
            <SignUpSection/>
            <NavBar/>
            <div className="hidden md:block">
                <h1 className="text-[#0053AD] text-xl font-medium text-center mt-32 mb-10">L'INFINI DU SAVOIR VOUS ATTEND A PORTEE DE CLIC</h1>
                <p className="text-lg font-light text-center">Votre passerelle vers une découverte scientifique<br/>Simplifiez l'exploration des articles savants <br/>avec notre plateforme conviviale.<br/>Donnez vie à votre curiosité.</p>
                <motion.img
                    src={earth}
                    alt="earth"
                    className="mt-[80px]"
                    initial={{
                        x:100,
                        y:-20,
                        rotate:2
                    }}
                    animate={{
                        x:0,
                        y:0,
                        rotate:0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        duration: 1,
                        x: { duration: 1 },
                        y:{duration:1},

                    }}

                />
            </div>
        </div>

    );
}

export default SignUp;
