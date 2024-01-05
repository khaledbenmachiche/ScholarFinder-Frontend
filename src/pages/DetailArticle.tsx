
import logo from "../assets/logo.svg"   
import { FaRegFilePdf } from "react-icons/fa6"; 
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";   
import quotes from "../assets/quotes.svg" ;
import { useState, useEffect } from 'react';
import TEXT_INFO from './ibtihel.json' ;  
import { GrMenu } from "react-icons/gr"; 




export const navLinks = [ 
    {
        id: "1",
        title: "Acceuil",
        path:"/Acceuil"
    },
    {
      id: "2",
      title: "Articles Favoris",
      path:"/ArticlesFavoris",
    }, ]
 const DetailArtcile = () =>
{       
  
     const [toggle, setToggle] = useState(false);
    const [jsonData, setJsonData] = useState([]); 
    useEffect(() => {
        fetch('C:\Users\dell\Desktop\FrontTPIGL\TPFront\src\pages\ibtihel.json')
          .then((response) => response.json())
          .then((data) => {
            setJsonData(data);
          })
          
      }, []);
     return (

<div className="  w-screen h-screen ">  

 {/*Navbar */} 
 <nav className=" h-[4rem] w-screen text-black flex px-10  ">   
  {/*Large */}  
 <div className="hidden lg:flex">
  <div className="flex flex-row space-x-4 "> <img className="w-10 cursor-pointer" alt="logo" src={logo}/>  <h3 className=" font-bold font-poppins absolute top-5 left-20">Truth finder </h3> </div> 
  <div>
  <ul   className="flex flex-row space-x-5 font-poppins font-bold   absolute top-5 left-56 " >
                          { 
                          navLinks.map                  
                          ( (nav) =>              
                          (
                            <li key={nav.id}  >
                               <a href={`#${nav.id}`}>{nav.title}</a>
                             </li>

                          )
                          )
                          }
                     </ul>
     </div>   
     </div> 
     {/*Large */} 
     {/*Mobile  */}   

     <div className="flex ">  <img className="w-10 lg:hidden " alt="logo" src={logo}/>  <h3 className=" lg:hidden font-bold font-poppins mt-5 ml-3  whitespace-nowrap">Truth finder </h3>  <GrMenu size={28}  className =' cursor-pointer mt-4 ml-60 lg:hidden'onClick={() => setToggle(!toggle)}/>  </div>
 <div className={`${!toggle ? "hidden" : "flex" } p-6 bg-blue-800  mx-4 my-2 h-fit absolute top-11 right-0  rounded-xl sidebar lg:hidden `} >
 <ul   className=" text-white font-poppins font-bold  list-none flex justify-end items-start flex-1 flex-col   " >
                          { 
                          navLinks.map                  
                          ( (nav) =>              
                          (
                            <li key={nav.id}  >
                               <a href={`#${nav.id}`}>{nav.title}</a>
                             </li>

                          )
                          )
                          }
                     </ul>
  </div>
  {/*Mobile  */}  
    
 </nav> 
 {/*Navbar */}    

 







 <h1 className="font-poppins font-bold text-blue-600 ml-28 lg:mt-12 lg:ml-[420px] text-sm  lg:text-2xl  "> L'infini   du   savoir   vous   attend   à   portée   de   clic.</h1> 
 <div  className="border  bg-gray-100 w-screen  flex p-3 pl-14  mt-2 "> 
 <h4>Acceuil</h4> <MdOutlineNavigateNext  size={20} className="relative top-1" /> <h4>Recherche</h4>  <MdOutlineNavigateNext  size={20} className="relative top-1" /> <h4>Article detail</h4> 
 </div> 
 <div className="flex space-x-4 mt-10 ml-12 lg:mt-3 lg:ml-[900px] ">  
  <button className="bg-gray-300  flex p-2 "> <FaRegFilePdf size={20} /> Ouvrir sous forme pdf</button>  
 <button className="bg-gray-300 flex p-2 "> <MdFavoriteBorder  size={20} /> AJOUTER AUX FAVORIS</button>  </div>
  
                                                          
  {TEXT_INFO.map (text => {
    return ( 
      < >    
             
                <div className="flex lg:mt-5 lg:ml-20  space-x-7 w-[400px] lg:w[1180px] mt-5 ml-12  ">
                          <img className="w-14  " alt="quote" src={quotes}/>  
                          <div>
                                <h1 className="font-poppins  font-bold text-2xl mt-7">{text.titre}</h1>    
                                <div className="border-b border-solid border-black h-px w-full"></div>   
                          </div>
                </div>  
                
                  <div className="  mt-5 ml-12  lg:ml-20 "> 
                 <h6 className="font-poppins " > Date de publication : {text.date_de_publication}</h6>  
                 <br/>
                 <div> 
                        {
                           text.auteurs.map (auteur => 
                             { return ( 
                                          <> 
                                             <div className=" flex flex-row  space-x-2 font-poppins font-semibold flex-wrap "><h6>{auteur.nom} {auteur.prenom} , </h6> 
                                              <div>{auteur.institutions.map (institution => 
                                               {   
                                                return ( 
                                                  <h6 className="font-poppins font-thin"> {institution.nom}</h6>

                                                )

                                              })} </div></div> 
                                           </> 
                                      )
                             }              )
                         } 
                        
                   </div>    
                   
                   
                   </div> 
                   <h1 className="font-poppins font-bold  text-xl  ml-12  mt-10 lg:ml-20  "> ABSTRACT </h1> 
                   <div className="font-poppins ml-12   lg:ml-20  w-[400px]  lg:w-[1180px] "> {text.resume}</div> 
                   <h1 className="font-poppins font-bold text-xl mt-8  ml-12   lg:ml-20"> KEYWORDS </h1>  
                   <div className="flex  font-poppins text-sm  flex-row ml-12  w-[400px]  lg:w-[1180px] lg:ml-20 flex-wrap">
                    {text.mot_cles.map( motcle =>{  
                    return (
                      <div className=" ">  <h6 className=""> {motcle.text} , </h6> </div>
                    )

                   })}  
                   {/** */}    
                   <div className="mt-14  w-[400px] lg:w-[1180px]"> 
                    {text.text_integral}
                   </div>
                  
                   
                   {/** */}   
                   </div> 
                   <h1 className="font-poppins font-bold text-xl ml-12    lg:ml-20 mt-8 "> REFERENCES</h1>  
                   <div className=" font-poppins text-sm   ml-12 lg:ml-20 w-[400px]  lg:w-[1180px] "> 
                    {
                      text.references_bibliographique.map (ref=> 
                        {
                                 return (
                                  <div className="flex flex-row"> 
                                     <h6 className="mt-4 "> [ {ref.id} ] {ref.nom}</h6> 
                                  </div>

                                 )
                      })
                    }
                   </div>
                   
                  
        </> 
    )
  })}  
    
  
</div>


     )
} 
export default DetailArtcile