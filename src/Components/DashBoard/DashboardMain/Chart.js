/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import OverviewChart from './OverviewChart';

function Chart(props) {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Site Traffic Overview
                        <ul className="pull-right panel-settings panel-button-tab-right">
                            <li className="dropdown">
                                <a
                                    className="pull-right dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    <em className="fa fa-cogs" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <ul className="dropdown-settings">
                                            <li>
                                                <a>
                                                    <em className="fa fa-cog" />{' '}
                                                    Settings 1
                                                </a>
                                            </li>
                                            <li className="divider" />
                                            <li>
                                                <a>
                                                    <em className="fa fa-cog" />{' '}
                                                    Settings 2
                                                </a>
                                            </li>
                                            <li className="divider" />
                                            <li>
                                                <a>
                                                    <em className="fa fa-cog" />{' '}
                                                    Settings 3
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <span className="pull-right clickable panel-toggle panel-button-tab-left">
                            <em className="fa fa-toggle-up" />
                        </span>
                    </div>
                    <div className="panel-body">
                        <OverviewChart />
                    </div>
                </div>
            </div>
        </div>
    );
}

Chart.propTypes = {};

export default Chart;
