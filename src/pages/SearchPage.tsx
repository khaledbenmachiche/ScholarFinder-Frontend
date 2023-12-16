
import FilterByAuthor from '../components/FilterByAuthor';
import SearchBar from '../components/SearchBar'
import articleData from "../Data.json";



function SearchPage() {
  return (
   <div className=''>
     <SearchBar data={articleData.articles} />
     
   </div>
   
  )
}

export default SearchPage ; 
 