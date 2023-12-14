import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import pdfIcon from '../assets/pdf_icon.svg'
import driveIcon from '../assets/drive_icon.svg'
const UploadedFile = ({source}) => {
  
  const [icon,setIcon] = useState(null);
  const [sourceType, setSourceType] = useState('');
  const text = source.length > 50 ? source.substring(0,50)+"..." : source;

  useEffect(() => {
    const getFileType = source =>{
      const lowerCasedUrl = source.toLowerCase();
      if(lowerCasedUrl.includes('drive.google.com')){
        setSourceType('google-drive');
        setIcon(driveIcon);
      }else if(lowerCasedUrl.endsWith('.pdf')){
        setSourceType('pdf');
        setIcon(pdfIcon);
      }
  }
    getFileType(source);
  }, [source])
 
  
  return (
    <div className='relative w-full h-fit'>
      <img className='absolute w-4 top-[8px] left-2' src={icon} alt={sourceType}/>
      <div className="w-full px-8 py-2 text-xs font-normal rounded-md bg-slate-50">{text}</div>
    </div>
  )
}
UploadedFile.propTypes = {
    source: PropTypes.string.isRequired,
};

export default UploadedFile;