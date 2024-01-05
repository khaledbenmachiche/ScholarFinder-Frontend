// Pagination.tsx

import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalResults: number;
    resultsPerPage: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalResults,
                                                   resultsPerPage,
                                                   onPageChange,
                                               }) => {
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li
                    key={i}
                    className={`page-item ${i === currentPage ? 'active' : ''}`}
                >
                    <button onClick={() => onPageChange(i)} className="page-link">
                        {i}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                </li>

                {renderPageNumbers()}

                <li
                    className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
