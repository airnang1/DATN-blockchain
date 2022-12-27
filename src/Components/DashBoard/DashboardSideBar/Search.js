import React from 'react';

function Search(props) {
    return (
        <form role="search">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                />
            </div>
        </form>
    );
}

Search.propTypes = {};

export default Search;
