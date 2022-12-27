/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AvatarInfo from './AvatarInfo';
import Search from './Search';
import OptionalNav from './OptionalNav';

function DashboardSideBar(props) {
    const { admin } = props;
    return (
        <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
            <AvatarInfo admin={admin} />
            <div className="divider" />
            <Search />
            <OptionalNav />
        </div>
    );
}

DashboardSideBar.propTypes = {};

export default DashboardSideBar;
