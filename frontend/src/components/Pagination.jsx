import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => {
    return (
        <div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>이전</button>
            <span>{page} / {totalPages}</span>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>다음</button>
        </div>
    );
};

export default Pagination;
