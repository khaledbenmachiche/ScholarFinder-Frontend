import {FaRegFilePdf} from "react-icons/fa6";
import {MdFavoriteBorder} from "react-icons/md";
import {MdOutlineNavigateNext} from "react-icons/md";
import quotes from "../assets/quotes.svg" ;
import React, {useState, useEffect} from 'react';
import {GrMenu} from "react-icons/gr";
import useAxios from "../hooks/useAxios";
import {useParams} from "react-router-dom";
import NavBarUtilisateur from "../components/NavBarUtilisateur";

interface Institution {
    id: number;
    nom: string;
}

interface Auteur {
    id: number
    nom: string;
    institutions: Institution[];
}

interface MotCle {
    id: number;
    text: string;
}

interface ReferenceBibliographique {
    id: number;
    nom: string;
}

interface Article {
    titre: string;
    auteurs: Auteur[];
    resume: string;
    mot_cles: MotCle[];
    text_integral: string;
    references_bibliographique: ReferenceBibliographique[];
    date_de_publication: string;
    url: string;
}

const DetailArticle = () => {
    const {id} = useParams<{ id: string }>();
    const axios = useAxios();
    const [article, setArticle] = useState<Article | null>(null);
    useEffect(() => {
        axios.get<Article>(`/articles/${id}`).then((response) => {
            setArticle(response.data);
        });
    }, [id]);

    const openPdf = () => {
        if (article?.url) {
            window.location.href = article.url;
        } else {
            alert("Pas de pdf pour cet article");
        }
    }
    return (

        <div className="w-screen h-screen ">
            <div className='h-72 flex flex-col bg-[#EEF5FC]'>
                <NavBarUtilisateur/>
                <p className='my-auto text-2xl md:text-4xl font-semibold text-[#0053AD] text-center'>L'INFINI DU
                    SAVOIR VOUS ATTEND A PORTEE DE CLIC.
                </p>
            </div>
            <div className="flex w-screen p-3 bg-gray-100 border pl-14 ">
                <h4>Acceuil</h4> <MdOutlineNavigateNext size={20} className="relative top-1"/> <h4>Recherche</h4>
                <MdOutlineNavigateNext size={20} className="relative top-1"/> <h4>Article detail</h4>
            </div>
            <div className="flex justify-center gap-5 pr-6 mt-4 lg:justify-end">
                <button onClick={openPdf} className="flex items-center p-2 bg-gray-300 whitespace-nowrap"><FaRegFilePdf
                    size={20}/> Ouvrir sous forme pdf
                </button>
                <button className="flex items-center p-2 bg-gray-300 whitespace-nowrap"><MdFavoriteBorder
                    size={20}/> AJOUTER AUX FAVORIS
                </button>
            </div>
            <div className="flex items-center py-4  lg:mt-5 lg:ml-20 space-x-7 w-1/2 lg:w[1180px] mt-5 ml-12  ">
                <img className="w-14 " alt="quote" src={quotes}/>
                <div className="h">
                    <h1 className="text-2xl font-bold font-poppins">{article?.titre}</h1>
                    <div className="w-full h-px border-b border-black border-solid"></div>
                </div>
            </div>

            <div className="mt-5 ml-12 lg:ml-20">
                <h6 className="font-poppins "> Date de publication : {article?.date_de_publication}</h6>
                <br/>
                <div>
                    {
                        article?.auteurs.map(auteur => {
                            return (
                                <div
                                    className="flex flex-row flex-wrap space-x-2 font-semibold font-poppins"
                                    key={auteur.id}
                                >
                                    <h6>{auteur.nom} , </h6>
                                    <div>{auteur.institutions.map(institution => {
                                        return (
                                            <h6 className="font-thin font-poppins"> {institution.nom}</h6>

                                        )
                                    })} </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <h1 className="mt-10 ml-12 text-xl font-bold font-poppins lg:ml-20 "> ABSTRACT </h1>
            <div className="font-poppins ml-12   lg:ml-20  w-[400px]  lg:w-[1180px] "> {article?.resume}</div>
            <h1 className="mt-8 ml-12 text-xl font-bold font-poppins lg:ml-20"> KEYWORDS </h1>
            <div
                className="flex  font-poppins text-sm  flex-row ml-12  w-[400px]  lg:w-[1180px] lg:ml-20 flex-wrap">
                {article?.mot_cles.map(motcle => {
                    return (
                        <div className=""><h6 className=""> {motcle.text} , </h6></div>
                    )

                })}
                <div className="mt-14  w-[400px] lg:w-[1180px]">
                    {article?.text_integral}
                </div>
            </div>
            <h1 className="mt-8 ml-12 text-xl font-bold font-poppins lg:ml-20 "> REFERENCES</h1>
            <div className=" font-poppins text-sm   ml-12 lg:ml-20 w-[400px]  lg:w-[1180px] ">
                {
                    article?.references_bibliographique.map(ref => {
                        return (
                            <div className="flex flex-row" key={ref.id}>
                                <h6 className="mt-4 "> [ {ref.id} ] {ref.nom}</h6>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default DetailArticle