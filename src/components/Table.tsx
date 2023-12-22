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
          currentPageIndex === i ? 'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700' : ''
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
        className="text-lg font-bold "
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
    <div className="flex-grow overflow-hidden mx-4">
         <div className=" relative h-fit overflow-x-scroll shadow-md sm:rounded-lg flex-grow">
            <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
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
                          <td key={cell.id} className='p-2 text-center border whitespace-nowrap '>
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
        <div className="mx-6 my-2 flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
            <button
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Prev
            </button>
            {renderPaginationButtons()}
            <span className="flex items-center gap-1">
                  <button
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
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
