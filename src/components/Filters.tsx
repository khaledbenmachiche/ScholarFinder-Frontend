import React from 'react';
import FilterByAuthor from './FilterByAuthor';
import FilterByInstitution from './FilterByInstitution';
import FilterByPeriod from './FilterByPeriod';
import FilterByTag from './FilterByTag';


const Filters=()=>
{
  const handleFilterChange = (author: string | null) => {
    // Make API request to filter articles based on the author
    // Update the state with the filtered results
  };
  const handleFilterByInstitutionChange = (institution: string | null) => {
    // Handle the change in institution filter
    // You may want to update the state or trigger a new search based on the institution filter.
  };
  const handleFilterByPeriodChange = (startDate: string | null, endDate: string | null) => {
    // Handle changes in the date range (e.g., make API calls)
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };
  const handleTagFilterChange = (tags: string[]) => {
    // Update your state or perform actions based on the selected tags
    console.log('Selected tags:', tags);
    // You can make API requests or update state as needed
  };

  return(
    <div className='  flex flex-col items-center border-r border-solid border-[#00000033]'>
    <FilterByTag onChange={handleTagFilterChange} />
    <FilterByAuthor onChange={handleFilterChange} />
    <FilterByInstitution onChange={handleFilterByInstitutionChange} />
    <FilterByPeriod onChange={handleFilterByPeriodChange} />
    </div>
    
  );

}

export default Filters;