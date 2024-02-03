import React, {useState} from 'react';
import ArticleFavorisResult from '../components/ArticleFavorisResult';
import {AiOutlineMail} from 'react-icons/ai';
import NavBarUtilisateur from '../components/NavBarUtilisateur';
import logo from '../assets/Logo.svg';
interface Article {
    title: string;
    authors: string[];
    institution: string;
    abstract: string;
}

const SearchPage: React.FC = () => {
    const sampleArticles = [
        {
            title: 'Article 1',
            authors: ['Author 1', 'Author 2'],
            institution: 'Institution 1',
            abstract: 'Abstract for Article 1...Abstract : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially ....',
        },
        {
            title: 'Article 2',
            authors: ['Author 3', 'Author 4'],
            institution: 'Institution 2',
            abstract: 'Abstract for Article 2...Abstract : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially ....',
        },
        {
            title: 'Article 3',
            authors: ['Author 3', 'Author 4'],
            institution: 'Institution 2',
            abstract: 'Abstract for Article 2...Abstract : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially ....',
        },
        {
            title: 'Article 3',
            authors: ['Author 3', 'Author 4'],
            institution: 'Institution 2',
            abstract: 'Abstract for Article 2...Abstract : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially ....',
        },
        {
            title: 'Article 3',
            authors: ['Author 3', 'Author 4'],
            institution: 'Institution 2',
            abstract: 'Abstract for Article 2...Abstract : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially ....',
        },
        {
            title: 'Article 3',
            authors: ['Author 3', 'Author 4'],
            institution: 'Institution 2',
            abstract: 'Abstract for Article 2...Abstract : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially ....',
        },
        // Add more articles as needed
    ];

    const articlesToShow = sampleArticles.slice(0, 5);


    return (
        <div className='Page overflow-x-hidden'>
            <div className=' flex flex-col bg-[#EEF5FC]'>
                <NavBarUtilisateur/>
                <p className='my-auto  py-6 lg:py-16 md:py-16 text-[22px] lg:text-2xl md:text-4xl font-semibold text-[#0053AD] text-center'>
                REDÉCOUVREZ VOS ARTICLES PRÉFÉRÉS.
                </p>
            </div>

            <div className='sticky top-0 bg-white mb-6 p-4 border-y border-solid border-[#00000038]   '>
                <p className='ml-2 md:ml-12'>Accueil {'>'} Article Favoris </p>
            </div>

            <div className='flex flex-col Body md:flex-row'>
                <div className=''>
                    <div className='px-10 lg:grid lg:grid-cols-3 lg:gap-4'>
                        {articlesToShow.map((article, index) => (
                            <ArticleFavorisResult
                                key={index}
                                title={article.title}
                                authors={article.authors}
                                institution={article.institution}
                                abstract={article.abstract}
                                onViewArticle={() => {
                                    // Implement logic to view the article
                                }}
                                onAddToFavorites={() => {
                                    // Implement logic to add to favorites
                                }}
                            />
                        ))}
                    </div>
                </div>

            </div>

            <div className='p-20 PREVIOUS '></div>

            <div className='Footer flex flex-col md:flex-row justify-between bg-[#EEF5FC]'>

                <div className='md:ml-20'>
                    <p className='mt-8 mb-6 font-medium text-center md:mb-10 md:text-left'>QUI SOMMES NOUS</p>
                    <div className='flex justify-center mb-6 md:mb-10'>
                        <img className='font-medium' src={logo} alt='logo'/><span
                        className='font-bold'>Truth Finder</span>
                    </div>
                    <p className='mb-4 font-medium text-center md:mb-20 md:text-left'>L'INFINITE DU SAVOIR <br/>VOUS
                        ATTEND A <br/>PORTEE DU CLIC.</p>
                </div>

                <div>
                    <p className='my-8 font-medium text-center cursor-pointer'>SIGNALER ERREUR</p>
                </div>

                <div className='mb-4 text-center md:mb-0'>
                    <p className='my-4 font-medium md:my-8'>SECTIONS</p>
                    <p className='text-[#717171] font-medium mb-4'>ACCUEIL</p>
                    <p className='text-[#717171] font-medium mb-4'>ARTICLES FAVORIS</p>
                    <p className='text-[#717171] font-medium mb-4'>RECHERCHE</p>
                </div>

                <div className='mb-20 text-center md:mr-20 md:text-left'>
                    <p className='my-4 font-medium md:my-8 '>S'ABONNER</p>
                    <p className='text-[#717171] font-medium mb-6'>ENTRER VOTRE EMAIL<br/> POUR ETRE NOTIFIE SUR <br/>LES
                        NOUVEUX ARTICLES <br/>DISPONIBLES</p>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border rounded p-2 w-64 bg-[#C9CED6]"
                        />
                        <div
                            className="absolute inset-y-0 right-0 flex items-center hidden pr-2 pointer-events-none md:flex">
                            <AiOutlineMail className="text-2xl text-gray-500"/>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    );
};

export default SearchPage;
