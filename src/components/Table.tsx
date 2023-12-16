 
 
 import { useTable ,usePagination,useRowSelect} from 'react-table'; 
 import { useMemo } from 'react';
 import MOCK_DATA from './MOCK_DATA .json'
 import { COLUMNS } from './Columns';  
 import { CheckBox } from './CheckBox';
 
 const Table = () => {
   const columns = useMemo(() => COLUMNS, []);
   const data = useMemo(() => MOCK_DATA, []);
   const table = useTable({ columns, data  },usePagination ,
     useRowSelect  ,
     (hooks)=>{  
       hooks.visibleColumns.push((columns)=>  
      {return [  
       { id : 'selection' ,
        Header :  ({getToggleALLRowsSelectedProps}) => (<CheckBox{...getToggleALLRowsSelectedProps}/>) ,
        Cell :({row}) => <CheckBox{...row.getToggleALLRowsSelectedProps}/>
 
       } ,...columns ]}
     ) 
   } 
     );
   const { getTableProps, getTableBodyProps, headerGroups, page ,nextPage,previousPage,canNextPage,canPreviousPage, prepareRow ,selectedFlatRows } = table; // 
 
   return ( 
     <>
     <table {...getTableProps()} className='w-full rounded-lg'>
       <thead className='bg-blue-600 text-white font-poppins h-9'>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()} >
             {headerGroup.headers.map(column => (
               <th {...column.getHeaderProps()}className='px-10 text-left whitespace-nowrap'> {column.render('Header')} </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {page.map((row)=> {
           prepareRow(row);
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map((cell) => {
                 return <td {...cell.getCellProps()} className='px-10 text-left'>{cell.render('Cell')}</td>;
               })}
             </tr>
           );
         })}
       </tbody>
     </table> 
     <div className=''>  
       <button onClick={()=>previousPage()} disabled={!canPreviousPage} className=' absolute bottom-20   right-[1000px] rounded-xl bg-white px-2  py-3 text-base  font-poppins font-bold text-indigo-900'>  Previous</button>
       <button onClick={()=>nextPage()} disabled={!canNextPage}  className='rounded-xl absolute bottom-20 right-20  bg-white px-6 py-2 text-base  font-poppins font-bold text-indigo-900'>Next</button>
      </div> 
     </>
   );
 };
 
 export default Table; 
 