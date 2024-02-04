import {FaRegFilePdf} from "react-icons/fa6";
import {MdOutlineNavigateNext} from "react-icons/md";
import quotes from "../assets/quotes.svg" ;
import React, {useState, useEffect, useRef} from 'react';
import useAxios from "../hooks/useAxios";
import {useParams} from "react-router-dom";
import _ from 'lodash';
import {RiDeleteBin5Line} from "react-icons/ri";
import useForceUpdate from "../hooks/useForceUpdate";
import {useNavigate} from "react-router-dom";
import ModerateurNavBar from "../components/ModerateurNavBar.tsx";
import {toast, ToastContainer,Bounce} from "react-toastify";
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

interface TextIntegralType {
    header:string;
    paragraph: string[];
}

const ArticleUpdate = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const axios = useAxios();
    const articleRef = useRef<Article | null>(null);
    const textIntegralRef = useRef<TextIntegralType[]>([]);
    const forceUpdate = useForceUpdate();
    useEffect(() => {
        axios.get<Article>(`/articles/${id}`).then((response) => {
            articleRef.current = response.data;
            textIntegralRef.current = JSON.parse(articleRef.current.text_integral);
            forceUpdate();
        });
    }, [id]);

    const openPdf = () => {
        if (articleRef.current?.url) {
            window.location.href = articleRef.current.url;
        } else {
            alert("Pas de pdf pour cet article");
        }
    }
    
    const [editing, setEditing] = useState(false);
    const handleTitleChange = (e: React.ChangeEvent<HTMLHeadingElement>) => {
        const newTitle = e.currentTarget.textContent;
        if(!articleRef.current) return;
        if (newTitle) {
            articleRef.current.titre = newTitle;
        }
    }
    const handleResumeChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
        const newResume = e.currentTarget.textContent;
        if(!articleRef.current) return;
        if (newResume) {
            articleRef.current.resume = newResume;
        }
    }
    const handleMotCleChange = (e: React.ChangeEvent<HTMLHeadingElement>) => {
        const newMotCle = e.currentTarget.textContent;
        const indexString:string|undefined = e.currentTarget.dataset.index;
        if(indexString === undefined) return;
        const index = Number(indexString);
        if(!articleRef.current) return;
        if (newMotCle) {
            articleRef.current.mot_cles[index].text = newMotCle;
        }
    }
    
    const handleAuteurNomChange = (e: React.ChangeEvent<HTMLHeadingElement>) => {
        const newAuteurNom = e.currentTarget.textContent;
        const indexString:string|undefined = e.currentTarget.dataset.index;
        if(indexString === undefined) return;
        const index = Number(indexString);
        if(!articleRef.current) return;
        if (newAuteurNom) {
            articleRef.current.auteurs[index].nom = newAuteurNom;
        }
    }

    const handleAuteurInstitutionChange = (e: React.ChangeEvent<HTMLHeadingElement>) => {
        const newAuteurInstitution = e.currentTarget.textContent;
        const institutionIndexString:string|undefined = e.currentTarget.dataset.institutionIndex;
        if(institutionIndexString === undefined) return;
        const institutionIndex = Number(institutionIndexString);
        const auteurIndexString:string|undefined = e.currentTarget.dataset.auteurIndex;
        if(auteurIndexString === undefined) return;
        const auteurIndex = Number(auteurIndexString);
        if(!articleRef.current) return;
        if (newAuteurInstitution) {
            articleRef.current.auteurs[auteurIndex].institutions[institutionIndex].nom = newAuteurInstitution;
        }
    }

    const handleReferenceBibliographiqueChange = (e: React.ChangeEvent<HTMLHeadingElement>) => {
        const newReferenceBibliographique = e.currentTarget.textContent;
        const indexString:string|undefined = e.currentTarget.dataset.index;
        if(indexString === undefined) return;
        const index = Number(indexString);
        if(!articleRef.current) return;
        if (newReferenceBibliographique) {
            articleRef.current.references_bibliographique[index].nom = newReferenceBibliographique;
        }
    }
    
    const handleTextIntegralHeaderChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
        const newHeader = e.currentTarget.textContent;
        const indexString:string|undefined = e.currentTarget.dataset.index;
        if(indexString === undefined) return;
        const index = Number(indexString);
        if(!articleRef.current) return;
        if (newHeader) {
            textIntegralRef.current[index].header = newHeader;
        }
    }
    const handleTextIntegralBodyChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
        const newBody = e.currentTarget.textContent;
        const indexString:string|undefined = e.currentTarget.dataset.index;
        if(indexString === undefined) return;
        const index = Number(indexString);
        if(!articleRef.current) return;
        if (newBody) {
            textIntegralRef.current[index].paragraph = [newBody];
        }
    }

    const turnTextIntegralIntoJSON = () => {
        const textIntegral = textIntegralRef.current.filter((text) => text.header !== '' && text.paragraph[0] !== '');
        return JSON.stringify(textIntegral);
    }
    
    const handleSubmitUpdate = () => {
        if(!articleRef.current) return;
        articleRef.current.text_integral = turnTextIntegralIntoJSON();
        axios.put(`/articles/${id}/`, articleRef.current).then(res => {
            if(res.status === 200){
                toast.success('Article modifié avec succès', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                forceUpdate();
            }else{
                toast.error('Erreur lors de la modification de l\'article', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
            setEditing(false);
        }).catch(() => {
            toast.error('Erreur lors de la modification de l\'article', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        })
    }

    const handleEditToggle = () => {
        setEditing(prev=>{
            if(prev){
                handleSubmitUpdate();
            }
            return !prev;
        })
    }

    const handleDeleteArticle = () => {
        axios.delete(`/articles/${id}/`).then(res => {
            if(res.status === 204){
                navigate('/moderateur/all_articles');
                toast.success('Article supprimé avec succès', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }else{
                toast.error('Erreur lors de la suppression de l\'article', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        })
            .catch(e => {
                console.error('Erreur lors de la suppression de l\'article :', e);
                toast.error('Erreur lors de la suppression de l\'article', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
    }

    const renderTextIntegral = () => {
        if (articleRef.current) {
            return (
                <div>
                    {textIntegralRef.current.map((text, index) => {
                        return (
                            <div key={index}>
                                <h1 className="mt-8 text-xl font-bold font-poppins" data-index={index} contentEditable={editing} dangerouslySetInnerHTML={{__html: text.header}} onInput={handleTextIntegralHeaderChange} />
                                <p className="font-poppins w-[400px] lg:w-[1180px]" data-index={index} contentEditable={editing} dangerouslySetInnerHTML={{__html: text.paragraph.join(" ")}} onInput={handleTextIntegralBodyChange} />
                            </div>
                        )
                    })}
                </div>
            );
        } else {
            return <></>;
        }
    };
    return (
        <div className="  relative w-screen overflow-x-hidden h-screen pb-6">
            <ToastContainer/>
            <div className='h-48 flex flex-col bg-[#EEF5FC]'>
                <ModerateurNavBar/>
                <p className='my-auto text-2xl md:text-4xl font-semibold text-[#0053AD] text-center'>L'INFINI DU
                    SAVOIR VOUS ATTEND A PORTEE DE CLIC.
                </p>
            </div>
            <div  className="flex w-screen p-3 bg-gray-100 border pl-14 "><h4>Acceuil</h4> <MdOutlineNavigateNext  size={20} className="relative top-1" /> <h4>consultation d'un article</h4></div>
        <div className="flex justify-center gap-2 lg:mr-2 mt-10 md:justify-end md:mt-3 md:mr-2 lg:justify-end lg:mt-3 ">
                <button onClick={openPdf} className="flex  p-2 lg:p-2 bg-gray-300 rounded-sm">
                    <FaRegFilePdf size={20} /> Ouvrir sous forme pdf
                </button>
                <button
                    className="flex  p-2 lg:p-2 px-2 font-semibold text-white bg-blue-700 rounded-sm font-poppins"
                    onClick={handleEditToggle}
                >
                {editing ? 'Enregistrer Article' : 'Editer Article'}
                </button>
                <button onClick={handleDeleteArticle} className="flex justify-center items-center p-1 lg:p-2 font-semibold text-white bg-red-600 rounded-sm font-poppins">
                    <RiDeleteBin5Line size={25} /> Supprimer
                </button>
        </div>
            <div className="flex items-center py-4  lg:mt-5 lg:ml-20 space-x-7 pr-10 lg:w-1/2 mt-5 ml-12  ">
                <img className="w-14 " alt="quote" src={quotes}/>
                <div className="h">
                    <h1 contentEditable={editing} dangerouslySetInnerHTML={{__html: articleRef.current ? articleRef.current.titre : '' }} onInput={handleTitleChange} className="text-2xl font-bold font-poppins" />
                    <div className="w-full h-px border-b border-black border-solid"></div>
                </div>
            </div>

            <div className="mt-5 ml-12 lg:ml-20">
                <h6 className="font-poppins "> Date de publication : {articleRef.current?.date_de_publication}</h6>
                <br/>
                <div>
                    {
                        articleRef.current?.auteurs.map((auteur,auteurIndex) => {
                            return (
                                <div
                                    className="flex flex-row flex-wrap space-x-2 font-semibold font-poppins"
                                    key={auteur.id}
                                >
                                    <h6 data-index={auteurIndex} contentEditable={editing} dangerouslySetInnerHTML={{__html: auteur.nom }} onInput={handleAuteurNomChange} />{" ,"}
                                    <div>{auteur.institutions.map((institution,institutionIndex) => {
                                        return (
                                            <h6 key={institution.id} className="font-thin font-poppins" data-institution-index={institutionIndex} data-auteur-index={auteurIndex} contentEditable={editing} dangerouslySetInnerHTML={{__html: institution.nom }} onInput={handleAuteurInstitutionChange}/>
                                        )
                                    })} </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <h1 className="mt-10 ml-12 text-xl font-bold font-poppins lg:ml-20 "> ABSTRACT </h1>
            <p className="font-poppins ml-12 lg:ml-20 mr-2 " contentEditable={editing} dangerouslySetInnerHTML={{__html: articleRef.current ? articleRef.current.resume : '' }} onInput={handleResumeChange} />
            <h1 className="mt-8 ml-12 text-xl font-bold font-poppins lg:ml-20"> KEYWORDS </h1>
            <div className="flex font-poppins text-sm flex-row ml-12  lg:ml-20 flex-wrap">
                {articleRef.current?.mot_cles.map((motcle,index) => {
                    return (
                        <div className="flex gap-1" key={motcle.id}><h6 key={motcle.id} data-index={index} contentEditable={editing} dangerouslySetInnerHTML={{__html: motcle.text }} onInput={handleMotCleChange}/>,</div>
                    )
                })}
                <div className=" mt-10 font-poppins w-full text-sm ">
                    {renderTextIntegral()}
                </div>
            </div>
            <h1 className="mt-8 ml-12 text-xl font-bold font-poppins lg:ml-20 "> REFERENCES</h1>
            <div className=" font-poppins text-sm flex flex-col gap-2  ml-12 lg:ml-20">
                {
                    articleRef.current?.references_bibliographique.map((ref,index) => {
                        return (
                            <div className="flex flex-row items-center gap-2" key={ref.id}>
                                <h6 data-index={index} contentEditable={editing} dangerouslySetInnerHTML={{__html: ref.nom}} onInput={handleReferenceBibliographiqueChange}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ArticleUpdate;