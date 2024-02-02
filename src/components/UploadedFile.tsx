import { FaCheck } from "react-icons/fa6";
import { useState,useEffect } from 'react';
import pdfIcon from '../assets/pdf_icon.svg';
import driveIcon from '../assets/drive_icon.svg';
import { Spinner } from "@material-tailwind/react";

enum UploadStatus {
    UPLOADING,
    SUCCESS,
    FAILED
}
interface UploadedFileProps {
  source:string;
  status?:UploadStatus;
}

const UploadedFile = ({source,status}:UploadedFileProps) => {
  const [icon,setIcon] = useState('');
  const [sourceType, setSourceType] = useState('');
  const text = source.length > 50 ? source.substring(0,50)+"..." : source;

  useEffect(() => {
    const getFileType = (source : string) =>{
      const lowerCasedUrl = source.toLowerCase();
      if(lowerCasedUrl.includes('drive.google.com')){
        setSourceType('google-drive');
        setIcon(driveIcon);
      }else if(lowerCasedUrl.endsWith('.pdf')){
        setSourceType('pdf');
        setIcon(pdfIcon);
      }else if(lowerCasedUrl.endsWith('.zip')){
        setSourceType('zip');
        setIcon(pdfIcon);
      }
  }
    getFileType(source);
  }, [source])

  return (
          <div className='flex items-center w-full py-4 pl-6 pr-4 border border-blue-100 rounded-md bg-slate-50'>
            <img className='w-5 mr-5' src={icon} alt={sourceType}/>
            <p className="text-xs font-medium ">{text}</p>
            {status === UploadStatus.UPLOADING && <Spinner className="w-5 ml-auto" color="blue" />}
            {status === UploadStatus.SUCCESS && <FaCheck className="w-5 ml-auto text-green-500" />}
            {status === UploadStatus.FAILED && <p className="ml-auto text-red-500">Upload Failed</p>}
          </div>
  )
}

export default UploadedFile;