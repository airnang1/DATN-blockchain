import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Paginations({ total, callBack }) {
    const [page, setPage] = useState(1);

    const newArr = [...Array(total)].map((_, i) => i + 1);
    const history = useHistory();

    const isActive = (index) => {
        if (index === page) return 'active';
        return '';
    };

    const handlePagination = (num) => {
        history.push(`?page=${num}`);
        callBack(num);
    };

    useEffect(() => {
        const num = history.location.search.slice(6) || 1;
        setPage(+num);
    }, [history.location.search]);

    return (
        <nav
            aria-label="Page navigation example"
            style={{ cursor: 'pointer' }}
            className="pagination-comment"
        >
            <ul className="pagination">
                {page > 1 && (
                    <li className="page-item">
                        <span
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                            onClick={() => handlePagination(page - 1)}
                        >
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </span>
                    </li>
                )}

                {newArr.map((num) => (
                    <li
                        className={`page-item ${isActive(num)}`}
                        key={num}
                        onClick={() => handlePagination(num)}
                    >
                        <span className="page-link">{num}</span>
                    </li>
                ))}

                {page < total && (
                    <li className="page-item">
                        <span
                            className="page-link"
                            href="#"
                            aria-label="Next"
                            onClick={() => handlePagination(page + 1)}
                        >
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </span>
                    </li>
                )}
            </ul>
        </nav>
    );
}

Paginations.propTypes = {};

export default Paginations;
