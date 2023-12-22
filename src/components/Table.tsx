import { MdOutlineNavigateNext } from "react-icons/md"; 
import { GrFormPrevious } from "react-icons/gr";
 import { User } from './Columns'; 
 
 import {
  //Column,
 // Table as ReactTable,
  //PaginationState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  //OnChangeFn,
  flexRender,
} from '@tanstack/react-table'
import { useMemo ,useState} from 'react';
import MOCK_DATA from './MOCK_DATA .json'
import  IndeterminateCheckbox  from './IndeterminateCheckbox';

const Table = () => {    
 

const renderPaginationButtons = () => {
  const currentPageIndex = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();
  const pageSize = 5; 

  
  let start = Math.max(1, Math.ceil(currentPageIndex - (pageSize / 2)));
  let end = Math.min(start + pageSize - 1, pageCount);

 
  if (end === pageCount) {
    start = Math.max(1, pageCount - (pageSize - 1));
  }

  const paginationButtons = [];

  if (start > 1) {
    const prevGroupLastPage = start - 1;
    paginationButtons.push(
      <button
        key="prev-group"
        onClick={() => table.setPageIndex(prevGroupLastPage - 1)}
      >
        {<GrFormPrevious  size={30}/>}
      </button>
    );
  }

  for (let i = start; i <= end; i++) {
    paginationButtons.push(
      <button
        key={i}
        className={`text-lg  ${
          currentPageIndex === i ? 'bg-blue-800 text-white border rounded-lg lg:pl-3 lg:pr-3 lg:pt-1 lg:pb-1 ' : ''
        }`}
        onClick={() => table.setPageIndex(i - 1)}
      >
        {i}
      </button>
    );
  }

  if (end < pageCount) {
    const nextGroupFirstPage = end + 1;
    paginationButtons.push(
      
      <button
        key="next-group-arrow"
        className=" font-bold text-lg"
        onClick={() => table.setPageIndex(nextGroupFirstPage - 1)}
      >
        {<MdOutlineNavigateNext  size={30} />}
      </button>
    );
  }

  return paginationButtons;
};



 
  
 

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
       
        header: 'Nom',
        accessorKey: 'nom',
        cell: info => info.getValue(),
      }, 
      {
        header: 'Prenom',
        accessorKey: 'prenom',
        cell: info => info.getValue(),
      }, 
      {
        header: 'Email',
        accessorKey: 'email',
        cell: info => info.getValue(),
      }, 
      {
        header: "Nom d'utilisateur",
        accessorKey: 'username',
        cell: info => info.getValue(),
      },
      
    ],
    []
  )
 
  const data = useMemo<User[]>(() => MOCK_DATA, []); 
  const [rowSelection, setRowSelection] = useState({})
  
    const table = useReactTable({  
      columns, data ,getPaginationRowModel: getPaginationRowModel(), getCoreRowModel: getCoreRowModel(), 
      state: {
        rowSelection,
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,

    }) ;


return (
  <div className="p-2">
    
    <div className= 'w-[1110px] '>  
    
    <div className='font-poppins  font-medium text-lg mb-4  flex flex-col lg:flex-row'>
    
    <div> 
    
 {Object.keys(rowSelection).length === 0 ? (
   <div>Aucune ligne sélectionnée</div>
 ) : (
   <div>
     {Object.keys(rowSelection).length}{' '}
     {Object.keys(rowSelection).length === 1
       ? 'ligne sélectionnée'
       : 'lignes sélectionnées'}
   </div>
 )}
</div>     
  {/** */}  
  <select 
        className=" w-[93px] lg:ml-[790px]"
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[5,10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    {/** */} 
     
     </div> 
     <div className=" overflow-auto rounded-xl h-[450px] shadow w-[200px] lg:w-full lg:h-full ">
    <table className='w-full border  '> 
    
      <thead className='bg-blue-100 text-blue-500 font-poppins h-9 '>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <th key={header.id} colSpan={header.colSpan} className={` text-center border p-2 ${header.id === 'select' ? 'w-6' : ''}`}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      
                    </div>
                  )}
                </th>
              )
            })}
          </tr>
        ))}
      </thead> 
      <tbody >
        {table.getRowModel().rows.map(row => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                return (
                  <td key={cell.id} className='p-2 text-center whitespace-nowrap border '>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>  
    </div>
    </div>
    <div className="flex justify-center space-x-2 lg:space-x-7 ml-0 lg:mt-6  lg:ml-64 w-fit">
     
      <button
        className="border rounded p-1 ml-"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
       Prev  
      </button> 
      
      
      {renderPaginationButtons()} 
      
     
      <span className="flex items-center gap-1"> 
      <button
        className="border rounded p-1 mr-80"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next 
      </button>
      </span>
    
      
    </div> 
   
    
  </div>
)
              }
export default Table;  
