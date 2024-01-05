import React, {useEffect, useState} from 'react';
import {FaPlus, FaTimes} from 'react-icons/fa';

interface FilterByTagProps {
    onChange: (tags: string[]) => void;
    clear: boolean;
}

const FilterByTag: React.FC<FilterByTagProps> = ({onChange, clear}) => {
    const [isActive, setIsActive] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');

    const handleToggle = () => {
        setIsActive(!isActive);
        onChange(isActive ? [] : tags);
    };

    const addTag = () => {
        if (newTag.trim() !== '') {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
            onChange([...tags, newTag.trim()]);
        }
    };

    const removeTag = (index: number) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
        onChange(updatedTags);
    };

    useEffect(() => {
        setIsActive(false);
        setTags([]);
        setNewTag('');
    }, [clear]);

    return (
        <div className="w-full max-w-[300px] rounded-md bg-[#eef5fc40] p-10 shadow-custom my-5">
            <div className="flex items-center mb-6">
                <p className="mr-6 font-medium text-xl">Filter par tag :</p>
                <label className='relative inline-flex cursor-pointer select-none items-center'>
                    <input
                        type='checkbox'
                        className='sr-only'
                        checked={isActive}
                        onChange={handleToggle}
                    />
                    <span
                        className={`border slider ml-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                            isActive ? 'bg-[#5555f8]' : ' bg-gray-500'
                        }`}
                    >
            <span
                className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                    isActive ? 'translate-x-6' : ''
                }`}
            ></span>
          </span>
                </label>
            </div>
            <div className="flex mb-2">
                <input
                    type="text"
                    placeholder="Ajouter un tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    disabled={!isActive}
                    className={`border p-2  ${
                        isActive ? 'bg-[#EEF5FC] border-blue-500' : 'bg-gray-100'
                    }`}
                />
                <button
                    onClick={addTag}
                    className={`border p-2  ${
                        isActive ? 'bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600' : 'bg-gray-100 px-3 py-2 rounded-r-md'
                    }`}
                >
                    <FaPlus/>
                </button>
            </div>
            <div>
                {tags.map((tag, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <p className={`border p-1  ${
                            isActive ? 'bg-[#EEF5FC] border-blue-500' : 'bg-gray-100'
                        }`}>{tag}</p>
                        <button
                            onClick={() => removeTag(index)}
                            className={`border p-2  ${
                                isActive ? 'bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600 ' : 'bg-gray-100 px-3 py-2 rounded-r-md'}`}
                        >
                            <FaTimes/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterByTag;
