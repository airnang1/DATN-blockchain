/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import OverviewChart from '../DashboardMain/OverviewChart';
import SimpleBarChart from './SimpleBarChart';
import PieChartWithCustomizedLabel from './PieChartWithCustomizedLabel';
import TwoSimplePieChart from './TwoSimplePieChart';

function DashboardCharts(props) {
    return (
        <div>
            {/*/.sidebar*/}
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li>
                            <a href="#">
                                <em className="fa fa-home" />
                            </a>
                        </li>
                        <li className="active">Charts</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Charts</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Line Chart
                                <ul
                                    className="
                                    pull-right
                                    panel-settings panel-button-tab-right
                                "
                                >
                                    <li className="dropdown">
                                        <a
                                            className="pull-right dropdown-toggle"
                                            data-toggle="dropdown"
                                            href="#"
                                        >
                                            <em className="fa fa-cogs" />
                                        </a>
                                        <ul
                                            className="
                                            dropdown-menu dropdown-menu-right
                                        "
                                        >
                                            <li>
                                                <ul className="dropdown-settings">
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 1
                                                        </a>
                                                    </li>
                                                    <li className="divider" />
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 2
                                                        </a>
                                                    </li>
                                                    <li className="divider" />
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 3
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <span
                                    className="
                                    pull-right
                                    clickable
                                    panel-toggle panel-button-tab-left
                                "
                                >
                                    <em className="fa fa-toggle-up" />
                                </span>
                            </div>
                            <div className="panel-body">
                                <OverviewChart />
                            </div>
                        </div>
                    </div>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Bar Chart
                                <ul
                                    className="
                                    pull-right
                                    panel-settings panel-button-tab-right
                                "
                                >
                                    <li className="dropdown">
                                        <a
                                            className="pull-right dropdown-toggle"
                                            data-toggle="dropdown"
                                            href="#"
                                        >
                                            <em className="fa fa-cogs" />
                                        </a>
                                        <ul
                                            className="
                                            dropdown-menu dropdown-menu-right
                                        "
                                        >
                                            <li>
                                                <ul className="dropdown-settings">
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 1
                                                        </a>
                                                    </li>
                                                    <li className="divider" />
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 2
                                                        </a>
                                                    </li>
                                                    <li className="divider" />
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 3
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <span
                                    className="
                                    pull-right
                                    clickable
                                    panel-toggle panel-button-tab-left
                                "
                                >
                                    <em className="fa fa-toggle-up" />
                                </span>
                            </div>
                            <div className="panel-body">
                                <SimpleBarChart />
                            </div>
                        </div>
                    </div>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Pie Chart
                                <ul
                                    className="
                                    pull-right
                                    panel-settings panel-button-tab-right
                                "
                                >
                                    <li className="dropdown">
                                        <a
                                            className="pull-right dropdown-toggle"
                                            data-toggle="dropdown"
                                            href="#"
                                        >
                                            <em className="fa fa-cogs" />
                                        </a>
                                        <ul
                                            className="
                                            dropdown-menu dropdown-menu-right
                                        "
                                        >
                                            <li>
                                                <ul className="dropdown-settings">
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 1
                                                        </a>
                                                    </li>
                                                    <li className="divider" />
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 2
                                                        </a>
                                                    </li>
                                                    <li className="divider" />
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 3
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <span
                                    className="
                                    pull-right
                                    clickable
                                    panel-toggle panel-button-tab-left
                                "
                                >
                                    <em className="fa fa-toggle-up" />
                                </span>
                            </div>
                            <div className="panel-body">
                                <PieChartWithCustomizedLabel />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Doughnut Chart
                                <ul
                                    className="
                                    pull-right
                                    panel-settings panel-button-tab-right
                                "
                                >
                                    <li className="dropdown">
                                        <a
                                            className="pull-right dropdown-toggle"
                                            data-toggle="dropdown"
                                            href="#"
                                        >
                                            <em className="fa fa-cogs" />
                                        </a>
                                        <ul
                                            className="
                                            dropdown-menu dropdown-menu-right
                                        "
                                        >
                                            <li>
                                                <ul className="dropdown-settings">
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 1
                                                        </a>
                                                    </li>
                                                    <li className="divider" />
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 2
                                                        </a>
                                                    </li>
                                                    <li className="divider" />
                                                    <li>
                                                        <a href="#">
                                                            <em className="fa fa-cog" />
                                                            Settings 3
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <span
                                    className="
                                    pull-right
                                    clickable
                                    panel-toggle panel-button-tab-left
                                "
                                >
                                    <em className="fa fa-toggle-up" />
                                </span>
                            </div>
                            <div className="panel-body">
                                <TwoSimplePieChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

DashboardCharts.propTypes = {};

export default DashboardCharts;
