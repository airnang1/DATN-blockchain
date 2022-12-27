/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { forwardRef } from 'react';
 

const Pagination = forwardRef((props, ref) => {
    const { productsPerPage, totalProducts, paginate } = props;

    const pageNumbers = [];

    for (
        let i = 1;
        i <= Math.ceil(totalProducts && totalProducts.length / productsPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

    return (
        <nav
            aria-label="Page navigation example"
            style={{ display: 'flex', justifyContent: 'center' }}
            ref={ref}
        >
            <ul className="pagination justify-content-center">
                {pageNumbers.map((number, index) => (
                    <li className="page-item" key={index}>
                        <a
                            className="page-link"
                            href="#"
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
});

Pagination.propTypes = {};

export default Pagination;
