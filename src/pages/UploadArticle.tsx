import React, { useState, useRef,useCallback } from "react";
import { useDropzone } from "react-dropzone";
import UploadFileFromUrl from "../components/UploadFileFromUrl"
import UploadedFile from "../components/UploadedFile";
import uploadIcon from '../assets/upload_cloud.svg';

interface UploadedFile {
    source:string
}

const UploadArticle = () => {
    const [uploadedFiles,setUploadedFiles] = useState<UploadedFile[]>([]);
    const fileInputRef= useRef<HTMLInputElement>(null);
    
    const onDrop = useCallback((acceptedFiles:File[])=> {
        const newUploadedFiles = acceptedFiles.map(file => ({ source: file.name }));
        setUploadedFiles([...newUploadedFiles,...uploadedFiles]);
      }, [uploadedFiles]);
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    
    const handleUrlInputSubmitEvent = (url:string) => {
        setUploadedFiles([{source:url},...uploadedFiles]);
    }

    const handleFileInputChangeEvent = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {files} = event.target;
        if(files){
            const filesArray:File[] = Array.from(files);
            const newUploadedFiles = filesArray.map(file => ({ source: file.name }));
            setUploadedFiles([...newUploadedFiles, ...uploadedFiles]);
        }
    }
    
    const handleOpeningFileMenu = (event:React.MouseEvent) =>{
        event.preventDefault();
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }
    
    const handleClickedClear = () => {
        setUploadedFiles([]);
    }

    return (
    <div className="flex items-start justify-center w-screen h-screen bg-blue-100">
        <div className="flex flex-col gap-2 mt-4 w-[500px]">
            <form {...getRootProps({ className: "dropzone" })} className={`relative flex items-center justify-center rounded w-full h-60 outline-dashed outline-blue-500 outline-2 ${isDragActive ? '':'grayscale'}`}>
                <button className="absolute w-full h-full" onClick={handleOpeningFileMenu} ></button>
                <input hidden {...getInputProps()} type="file" ref={fileInputRef} accept=".pdf" onChange={handleFileInputChangeEvent}/>
                {
                    isDragActive ? 
                        <div className="flex flex-col items-center">
                            <img className="w-16 mb-2 " src={uploadIcon} alt="Upload icon"/>
                            <h2 className="text-xs text-blue-500">drop the file here</h2>
                        </div>
                        :
                        <div className="flex flex-col items-center">
                            <img className="w-16 mb-2 " src={uploadIcon} alt="Upload icon"/>
                            <h1 className="mb-1 text-sm text-blue-500">Select an article to upload</h1>
                            <h2 className="text-xs text-blue-500">or drag and drop it here</h2>
                        </div>
                }
            </form>
            <div className="flex items-center justify-center mt-2">
                <span className="flex-1 h-px bg-blue-950"></span>
                <p className="mx-2 text-sm text-center text-blue-950">or</p>
                <span className="flex-1 h-px bg-blue-950"></span>
            </div>
            <UploadFileFromUrl placeholder="Entrer le lien" label="Upload from URL" handleSubmitEvent={handleUrlInputSubmitEvent}/>
            {uploadedFiles.length !== 0 && (
                <>
                    <button onClick={handleClickedClear} className="self-end my-0 mr-2 px-1 py-0.5 hover:text-red-500 text-slate-500 w-fit">clear</button>
                    <div className="flex flex-col w-full h-24 gap-2 overflow-y-auto ">
                        {uploadedFiles.map((item,index) => <UploadedFile key={index} source={item.source}/>)}
                    </div>
                </>
            )}
        </div>
    </div>
  )
}

export default UploadArticle;