import React, {useEffect, useState} from 'react';

interface FilterByPeriodProps {
    onChange: (startDate: string | null, endDate: string | null) => void;
    clear: boolean;
}

const FilterByPeriod: React.FC<FilterByPeriodProps> = ({onChange, clear}) => {
    const [isActive, setIsActive] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleToggle = () => {
        setIsActive(!isActive);
        onChange(isActive ? null : startDate, isActive ? null : endDate);
    };
    useEffect(() => {
        setIsActive(false);
        setStartDate('');
        setEndDate('');
    }, [clear]);

    return (
        <div className="w-full max-w-[300px] rounded-md bg-[#eef5fc40] p-10 shadow-custom mb-5">
            <div className="flex items-center mb-6">
                <p className="text-lg font-medium ">Filter par periode:</p>
                <label className='relative inline-flex items-center cursor-pointer select-none '>
                <input
                    type='checkbox' className='sr-only '
                    checked={isActive}
                    onChange={handleToggle}
                />
                <span
                    className={` border slider ml-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
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
            <div>
                <label className="block mb-2">Début:</label>
                <input
                    type="date"
                    value={startDate}
                    disabled={!isActive}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`border p-2 rounded-md w-full mb-2 ${
                        isActive ? 'bg-[#EEF5FC] border-blue-500' : 'bg-gray-100'
                    }`}
                />
            </div>
            <div>
                <label className="block mb-2">Fin:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={!isActive}
                    className={`border p-2 rounded-md w-full mb-2 ${
                        isActive ? 'bg-[#EEF5FC] border-blue-500' : 'bg-gray-100'
                    }`}
                />
            </div>
        </div>
    );
};

export default FilterByPeriod;
