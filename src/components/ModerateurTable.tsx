import {MdOutlineNavigateNext} from "react-icons/md";
import {GrFormPrevious} from "react-icons/gr";
import User from '../types/User';
import {toast, Bounce, ToastContainer} from "react-toastify";

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
import React, {useEffect, useMemo, useState} from 'react';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import useAxios from "../hooks/useAxios";
import ModifierModerateurForms from "./ModifierModerateurForms";
import useForceUpdate from "../hooks/useForceUpdate";
interface ModerateurTableProps {
    updateSelectedRows: (selectedModertors:number[]) => void;
}

const ModerateurTable = ({updateSelectedRows}:ModerateurTableProps) => {
    const axios = useAxios();
    const [tableData, setTableData] = useState<User[]>([]);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        axios.get('/moderation/')
            .then(res => {
                setTableData(res.data.results);
            })
            .catch(err => console.log(err));
    }, []);
    const [moderateurToModify, setModerateurToModify] = useState<User|undefined>(undefined);
    const handleOpenModificationPopUp = (id:number) => {
        setTableData((prevTableData: User[]): User[] => {
            if (!prevTableData || prevTableData.length === 0) {
                console.error('Table data is not available or empty.');
                return prevTableData;
            }    
            const moderateur = prevTableData.find(moderateur => id === moderateur.id)
            if(!moderateur) {
                console.error(`Moderateur with id ${id} not found in tableData`);
                return prevTableData;
            };
            setModerateurToModify({...moderateur});
            setTriggerModificationPopUp(true);
            return prevTableData;
        })
    }
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
                    {<GrFormPrevious size={30}/>}
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
                    {<MdOutlineNavigateNext size={30}/>}
                </button>
            );
        }

        return paginationButtons;
    };

    const [triggerModificationPopUp,setTriggerModificationPopUp] = useState(false);

    const handleCloseModificationPopUp=()=>{
        setTriggerModificationPopUp(false);
    };
    
    const data = useMemo<User[]>(() => tableData, [tableData]);

    const columns = useMemo<ColumnDef<User>[]>(
        () => [
            {
                id: 'select',
                header: ({table}) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                    />
                ),
                cell: ({row}) => (
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
                accessorKey: 'last_name',
                cell: info => info.getValue(),
            },
            {
                header: 'Prenom',
                accessorKey: 'first_name',
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
            {
                header:"modifier",
                accessorKey: "id",
                cell: info => <button className="text-blue-500" onClick={()=>{
                    const id:number = info.getValue<number>(); 
                    handleOpenModificationPopUp(id);
                }}>modifier</button>
            }
        ],
        []
    )
 
    const [rowSelection, setRowSelection] = useState({});
    useEffect(() => {
        const selectedRows = Object.keys(rowSelection).map((key) => parseInt(key));
        const moderateurToDelete:number[] = [];
        selectedRows.forEach((index) => {
            const moderateur = tableData[index];
            if (moderateur) {
                moderateurToDelete.push(moderateur.id);
            }
        });
        updateSelectedRows(moderateurToDelete);
    }, [tableData,rowSelection]);
    const table = useReactTable({
        columns, data, getPaginationRowModel: getPaginationRowModel(), getCoreRowModel: getCoreRowModel(),
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange:setRowSelection,
    });

    return (
        <>
            <ToastContainer/>
            <ModifierModerateurForms forceUpdate={forceUpdate} moderateurToModify={moderateurToModify} trigger={triggerModificationPopUp} handleCloseModificationPopUp={handleCloseModificationPopUp} />
            <div className="flex-grow mx-4 overflow-hidden">
                <div className="relative flex flex-grow overflow-x-scroll shadow-md h-fit sm:rounded-lg">
                    <table className='w-full text-sm text-left text-gray-500 rtl:text-right'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th key={header.id} colSpan={header.colSpan}
                                            className={` text-center border p-2 ${header.id === 'select' ? 'w-6' : ''}`}>
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
                        <tbody>
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
                <div className="flex flex-wrap items-center justify-between pt-4 mx-6 my-2 flex-column md:flex-row">
                    <button
                        className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg ms-0 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Prev
                    </button>
                    {renderPaginationButtons()}
                    <span className="flex items-center gap-1">
                    <button
                        className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg ms-0 hover:bg-gray-100 hover:text-gray-700 "
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </button>
                    </span>
                </div>
            </div>
        </>

    )
}
export default ModerateurTable;