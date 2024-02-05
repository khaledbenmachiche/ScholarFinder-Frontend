import {FaRegFilePdf} from "react-icons/fa6";
import {MdFavoriteBorder} from "react-icons/md";
import {MdOutlineNavigateNext} from "react-icons/md";
import quotes from "../assets/quotes.svg" ;
import React, {useState, useEffect} from 'react';
import useAxios from "../hooks/useAxios";
import {useParams} from "react-router-dom";
import NavBarUtilisateur from "../components/NavBarUtilisateur";
import {ToastContainer,toast} from "react-toastify";
import useForceUpdate from "../hooks/useForceUpdate.ts";

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
    id: number;
    titre: string;
    auteurs: Auteur[];
    resume: string;
    mot_cles: MotCle[];
    text_integral: string;
    references_bibliographique: ReferenceBibliographique[];
    date_de_publication: string;
    url: string;
}

interface TextIntegralType {
    header:string;
    paragraph: Array<string>;
}
const DetailArticle = () => {
    const {id} = useParams<{ id: string }>();
    const axios = useAxios();
    const [article, setArticle] = useState<Article | null>(null);
    const [isFavoris, setIsFavoris] = useState<boolean>(false);
    const forceUpdate = useForceUpdate();
    useEffect(() => {
        if(id === undefined){
            return;
        }
        axios.get<Article>(`/articles/${id}`).then((response) => {
            setArticle(response.data);
        });
        axios.get(`/articles_favoris/`).then((response) => {
            const isFavoris = response.data.some((article: Article) => article.id === parseInt(id));
            setIsFavoris(isFavoris);
        });
    }, [id,forceUpdate]);

    const openPdf = () => {
        if (article?.url) {
            window.location.href = article.url;
        } else {
            toast.warning("L'article n'a pas de lien pdf", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    const ajouterFavoris = async () => {
        try{
            if (article) {
                const response = await axios.post(`/articles_favoris/`, {article_id: article.id});
                if(response.status === 201) {
                    toast.success('Article ajouté aux favoris avec succès', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    forceUpdate()
                }else{
                    toast.warning('Erreur lors de l\'ajout de l\'article aux favoris', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    forceUpdate();
                }
            }
        }catch(e){
            toast.error('Erreur lors de l\'ajout de l\'article aux favoris', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const retirerFavoris = async () => {
        try{
            if (article) {
                const response = await axios.delete(`/articles_favoris/${article.id}`);
                if(response.status === 204) {
                    toast.success('Article retiré des favoris avec succès', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }else{
                    toast.warning('Erreur lors du retrait de l\'article des favoris', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        }catch(e){
            toast.error('Erreur lors du retrait de l\'article des favoris', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

        const renderTextIntegral = () => {
        if (article) {
            return (
                <div>
                    {
                        JSON.parse(article.text_integral).map((section: TextIntegralType) => {
                            return (
                                <>
                                    <h1 className="font-bold text-xl mt-4">{section.header}</h1>
                                    <div>
                                        {
                                            section.paragraph.map((paragraph) => {
                                                return (
                                                    <p className="font-thin">{paragraph}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            );
                        })
                    }
                </div>
            );
        } else {
            return <></>;
        }
    };

    return (
        <div className=" relative w-screen   overflow-x-hidden h-screen ">
            <ToastContainer/>
            <div className='h-72 flex flex-col bg-[#EEF5FC]'> 
               
                <NavBarUtilisateur />
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
                <button
                    onClick={isFavoris?retirerFavoris:ajouterFavoris}
                    className={`flex items-center p-2 whitespace-nowrap ${isFavoris ? 'bg-blue-200':'bg-gray-300'}`}>
                    <MdFavoriteBorder  size={20}/>
                    {isFavoris ? "RETIRER DES FAVORIS" : "AJOUTER AUX FAVORIS"}
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
               <div className=" mt-10 font-poppins text-sm   w-[400px] lg:w-[1180px]">
                    {renderTextIntegral()}
                </div>
            </div>
            <h1 className="mt-8 ml-12 text-xl font-bold font-poppins lg:ml-20 "> REFERENCES</h1>
            <div className=" font-poppins text-sm ml-12 lg:ml-20 w-[400px]  lg:w-[1180px] ">
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
