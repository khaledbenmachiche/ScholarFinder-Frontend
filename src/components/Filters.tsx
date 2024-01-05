import React from 'react';
import FilterByAuthor from './FilterByAuthor';
import FilterByInstitution from './FilterByInstitution';
import FilterByPeriod from './FilterByPeriod';
import FilterByTag from './FilterByTag';


interface FiltersProps {
    handleAuteurFilterChange: (author: string | null) => void;
    handleFilterByInstitutionChange: (institution: string | null) => void;
    handleFilterByPeriodChange: (startDate: string | null, endDate: string | null) => void;
    handleTagFilterChange: (tags: string[]) => void;
    clear: boolean;
}

const Filters: React.FC<FiltersProps> = ({
                                             handleAuteurFilterChange,
                                             handleFilterByInstitutionChange,
                                             handleFilterByPeriodChange,
                                             handleTagFilterChange,
                                             clear,
                                         }) => {

    return (
        <div className='  flex flex-col items-center border-r border-solid border-[#00000033]'>
            <FilterByTag onChange={handleTagFilterChange} clear={clear}/>
            <FilterByAuthor onChange={handleAuteurFilterChange} clear={clear}/>
            <FilterByInstitution onChange={handleFilterByInstitutionChange} clear={clear}/>
            <FilterByPeriod onChange={handleFilterByPeriodChange} clear={clear}/>
        </div>

    );

}

export default Filters;