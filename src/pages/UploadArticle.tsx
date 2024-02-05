import React, {useState, useRef, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import UploadFileFromUrl from "../components/UploadFileFromUrl"
import UploadedFile from "../components/UploadedFile";
import uploadIcon from '../assets/upload_cloud.svg';
import AdminSideBar from "../components/AdminSideBar.tsx";
import useAxios from "../hooks/useAxios.ts";
import {AxiosProgressEvent, AxiosResponse} from "axios";
import {v4 as uuidv4} from 'uuid';

enum UploadStatus {
    UPLOADING,
    SUCCESS,
    FAILED
}

interface UploadInformations {
    id: string;
    source: string;
    status?: UploadStatus;
}

const UploadArticle = () => {
    const {uploadsInfo, clearUploadsInfo, uploadArticlesViaFiles, uploadArticleViaUrl} = useUploadArticles();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        uploadArticlesViaFiles(acceptedFiles);
    }, [uploadArticlesViaFiles]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const handleUrlInputSubmitEvent = (url: string) => {
        uploadArticleViaUrl(url);
    }

    const handleFileInputChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = event.target;
        if (files) {
            const filesArray: File[] = Array.from(files);
            uploadArticlesViaFiles(filesArray);
        }
    }

    const handleOpeningFileMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleClickedClear = () => {
        clearUploadsInfo();
    }

    return (
        <>
            <AdminSideBar/>
            <div className="flex items-start justify-center w-screen h-screen px-4 pt-12 bg-white lg:pt-0">
                <div className="flex flex-col gap-2 mt-4 lg:mt-10 lg:ml-64 md:ml-64 md:w-[700px] lg:w-[700px]">
                    <form {...getRootProps({className: "dropzone"})}
                          className={`relative flex items-center justify-center rounded w-full h-60 outline-dashed outline-blue-500 outline-2 ${isDragActive ? '' : 'grayscale'}`}>
                        <button className="absolute w-full h-full" onClick={handleOpeningFileMenu}></button>
                        <input hidden {...getInputProps()} type="file" ref={fileInputRef} accept=".pdf, .zip"
                               onChange={handleFileInputChangeEvent}/>
                        {
                            isDragActive ?
                                <div className="flex flex-col items-center">
                                    <img className="w-16 mb-2 " src={uploadIcon} alt="Upload icon"/>
                                    <h2 className="text-xs text-blue-500">drop the file here</h2>
                                </div>
                                :
                                <div className="flex flex-col items-center">
                                    <img className="w-16 mb-2" src={uploadIcon} alt="Upload icon"/>
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
                    <UploadFileFromUrl placeholder="Entrer le lien" label="Upload from URL"
                                       handleSubmitEvent={handleUrlInputSubmitEvent}/>
                    {uploadsInfo.length !== 0 && (
                        <div className="flex flex-col flex-grow w-full gap-1 p-2 mb-10 bg-slate-100   rounded shadow-md  h-2/5">
                            <button onClick={handleClickedClear}
                                    className="self-end my-0 mr-2 px-1 py-0.5 hover:text-red-500 text-slate-500 w-fit">clear
                            </button>
                            <div className="flex flex-col h-full gap-1 overflow-y-scroll">
                                    {
                                        uploadsInfo.map((item) => {
                                            return <UploadedFile key={item.id} source={item.source}  status={item.status}/>
                                        })
                                    }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UploadArticle;


const useUploadArticles = () => {
    const axios = useAxios();
    const [uploadsInfo, setUploadsInfo] = useState<UploadInformations[]>([]);

    function _uploadPdfFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return axios.post('/articles/upload-via-file/', formData, );
    }

    function _uploadZipFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return axios.post('/articles/upload-via-zip/', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    function _uploadUrl(url: string) {
        return axios.post('/articles/upload-via-url/', {url});
    }

    function _uploadGoogleDriveFolderViaUrl(url: string) {
        return axios.post('/articles/upload-via-drive/', {url});
    }

    function uploadArticleViaUrl(url: string) {
        let uploadFunction: (url: string) => Promise<AxiosResponse<any, any>>;
        if (url.toLowerCase().startsWith('https://drive.google.com/')) {
            uploadFunction = _uploadGoogleDriveFolderViaUrl;
        } else {
            uploadFunction = _uploadUrl;
        }

        setUploadsInfo(prev => {
            const newUploadsInfo = [...prev];
            newUploadsInfo.unshift({source: url, status: UploadStatus.UPLOADING, id: uuidv4()});
            return newUploadsInfo;
        });

        uploadFunction(url).then((response) => {
            if (response.status === 201) {
                setUploadsInfo(prevState => {
                    const newUploadsInfo = [...prevState];
                    const fileToUpdate = newUploadsInfo.find(item => item.source === url);
                    if (fileToUpdate) {
                        fileToUpdate.status = UploadStatus.SUCCESS;
                    }
                    return newUploadsInfo;
                });
            } else {
                setUploadsInfo(prevState => {
                    const newUploadsInfo = [...prevState];
                    const fileToUpdate = newUploadsInfo.find(item => item.source === url);
                    if (fileToUpdate) {
                        fileToUpdate.status = UploadStatus.FAILED;
                    }
                    return newUploadsInfo;
                });
            }
        })
            .catch(() => {
                setUploadsInfo(prevState => {
                    const newUploadsInfo = [...prevState];
                    const fileToUpdate = newUploadsInfo.find(item => item.source === url);
                    if (fileToUpdate) {
                        fileToUpdate.status = UploadStatus.FAILED;
                    }
                    return newUploadsInfo;
                })
            });
    }

    function fileIsPdf(file: File) {
        return file.name.endsWith('.pdf');
    }

    function fileIsZip(file: File) {
        return file.name.endsWith('.zip');
    }

    function fileIsValid(file: File) {
        return fileIsPdf(file) || fileIsZip(file);
    }

    // the files : .pdf , .zip
    function uploadArticlesViaFiles(files: File[]) {
        files = files.filter(fileIsValid);

        const uploadPromises = files.map(async (file) => {
            let uploadFunction: (file: File) => Promise<AxiosResponse<any, any>>;

            if (fileIsPdf(file)) {
                uploadFunction = _uploadPdfFile;
            } else if (fileIsZip(file)) {
                uploadFunction = _uploadZipFile;
            } else {
                return Promise.reject(new Error("File type not supported"));
            }
            setUploadsInfo(prev => {
                const newUploadsInfo = [...prev];
                newUploadsInfo.unshift({source: file.name, status: UploadStatus.UPLOADING, id: uuidv4()});
                return newUploadsInfo;
            });
            const formData = new FormData();
            formData.append('file', file);
            return uploadFunction(file);
        });

        Promise.all(uploadPromises)
            .then((responses) => {
                responses.forEach((response, index) => {
                    if (response.status === 201) {
                        setUploadsInfo(prevState => {
                            const newUploadsInfo = [...prevState];
                            const fileToUpdate = newUploadsInfo.find(item => item.source === files[index].name)
                            if (fileToUpdate) {
                                fileToUpdate.status = UploadStatus.SUCCESS;
                            }
                            return newUploadsInfo;
                        });
                    } else {
                        setUploadsInfo(prevState => {
                            const newUploadsInfo = [...prevState];
                            const fileToUpdate = newUploadsInfo.find(item => item.source === files[index].name)
                            if (fileToUpdate) {
                                fileToUpdate.status = UploadStatus.FAILED;
                            }
                            return newUploadsInfo;
                        });
                    }
                });
            })
            .catch((error) => {
                setUploadsInfo(prevState => {
                    const newUploadsInfo = [...prevState];
                    files.forEach(file => {
                        const fileToUpdate = newUploadsInfo.find(item => item.source === file.name);
                        if (fileToUpdate) {
                            fileToUpdate.status = UploadStatus.FAILED;
                        }
                    });
                    return newUploadsInfo;
                });
            });
    }

    function clearUploadsInfo() {
        setUploadsInfo([]);
    }

    return {uploadsInfo, clearUploadsInfo, uploadArticlesViaFiles, uploadArticleViaUrl};
}
