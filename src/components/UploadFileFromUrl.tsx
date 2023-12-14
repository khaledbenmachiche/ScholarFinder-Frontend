import React, { useState } from 'react';
import PropTypes from 'prop-types';
import urlUploadIcon from '../assets/url_upload_icon.svg';


interface UploadFileFromUrlProps {
    label: string;
    placeholder: string;
    handleSubmitEvent: (url:string) => void;
}

const UploadFileFromUrl:React.FC<UploadFileFromUrlProps> = ({label,placeholder,handleSubmitEvent}) => {
    const [url, setUrl] = useState<string>('');
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    }
    const handleClickEvent = () => {
      handleSubmitEvent(url);
      setUrl('');
    }
  return (
    <div className="relative flex flex-col w-full">
        <label htmlFor="url" className="mb-1 text-sm font-medium text-gray-700">{label}</label>
        <input className='w-full py-1 pl-8 pr-20 border rounded-md outline-none appearance-none ' type="text" id="url" name="url" placeholder={placeholder} value={url} onChange={handleChange}/>
        <img className='absolute w-6 border-r border-spacing-10 left-1 top-8' src={urlUploadIcon} alt="Upload file from url"/>
        <button disabled={url.length === 0} onClick={handleClickEvent} className={`absolute text-blue-300 right-2 top-7 rounded-sm px-2 bg-white ${url.length != 0 ? "hover:bg-gray-200 text-blue-500" : ""}`}>Upload</button>
    </div>
  );
}

UploadFileFromUrl.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    handleSubmitEvent: PropTypes.func.isRequired,
};

export default UploadFileFromUrl