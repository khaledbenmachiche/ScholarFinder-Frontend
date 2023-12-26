import { FaCheck } from "react-icons/fa6";
import { useState,useEffect } from 'react';
import pdfIcon from '../assets/pdf_icon.svg';
import driveIcon from '../assets/drive_icon.svg';
import {motion} from 'framer-motion';

enum UploadStatus {
    UPLOADING,
    SUCCESS,
    FAILED
}
interface UploadedFileProps {
  source:string;
  progress:number;
  status?:UploadStatus;
}

const UploadedFile = ({source,progress,status}:UploadedFileProps) => {
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
          <motion.div 
            initial={{opacity:0,height:0}}
            animate={{opacity:1,height:"auto"}}
            exit={{opacity:0}}
            transition={{height:{duration:0.2},opacity:{duration:0.1}}}
            className='relative w-full py-4 pl-12 pr-4 border border-blue-100 rounded-md bg-slate-50'
          >
            <img className='absolute w-5 top-[15px] left-4' src={icon} alt={sourceType}/>
            <p className="mb-2 text-xs font-medium">{text}</p>
              <div className="relative flex w-full rounded-full bg-slate-600">
                  {status === UploadStatus.SUCCESS &&
                      <FaCheck
                          className="text-xs font-thin absolute right-1.5 bottom-3 text-green-600"
                      />}
                  <motion.div
                      initial={{width:0}}
                      animate={{width: progress.toString() + "%"}}
                      transition={{type: "linear",duration:2}}
                      className={`py-[1.5px] rounded-full ${status === UploadStatus.UPLOADING && "bg-blue-600"} ${status === UploadStatus.SUCCESS && "bg-green-600"}`}
                  />
              </div>
          </motion.div>
  )
}

export default UploadedFile;