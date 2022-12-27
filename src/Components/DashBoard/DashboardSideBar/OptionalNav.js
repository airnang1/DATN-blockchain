/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { nav_dashboard } from '../../../assets/fake-data';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../../Store/Reducer/authReducer';

function OptionalNav(props) {
    const history = useHistory();
    const dispatch = useDispatch()
    const handleUpdateLink = (item) => {
        if(item.name === 'Logout') {
            dispatch(handleLogout(history));
            return item.link;
        }else {
            return item.link;
        }
    } 

    const renderOptionalNav = nav_dashboard.map((item, index) => {
        return (
            <li className="active" key={index}>
                <NavLink
                    to={item.link}
                    activeStyle={{
                        fontWeight: 'bold',
                        color: '#fff',
                        backgroundColor: '#30a5ff',
                    }}
                    onClick={()=>handleUpdateLink(item)}
                >
                    <i className={item.icon}></i> {item.name}
                </NavLink>
            </li>
        );
    });
    return <ul className="nav menu">{renderOptionalNav}</ul>;
}

OptionalNav.propTypes = {};

export default OptionalNav;
