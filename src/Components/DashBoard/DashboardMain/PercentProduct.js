import React from 'react';
import { Progress } from 'antd';

function PercentProduct(props) {
    return (
        <div className="col-xs-12 overview-main">
            {/* <EmptyComponent> */}
            <div className="row overview-main-row">
                <div
                    className="col-xs-3 col-md-3 overview-main__item"
                    style={{
                        background: '#8cdfe2',
                        borderRadius: '5px',
                    }}
                >
                    <div
                        className="panel panel-default"
                        style={{
                            background: '#8cdfe2',
                            borderRadius: '5px',
                        }}
                    >
                        <div className="panel-body easypiechart-panel">
                            <h4>Orders</h4>
                            <Progress type="circle" percent={92} />
                        </div>
                    </div>
                </div>
                <div
                    className="col-xs-3 col-md-3 overview-main__item"
                    style={{
                        background: '#d6b180',
                        borderRadius: '5px',
                    }}
                >
                    <div className="panel panel-default">
                        <div
                            className="panel-body easypiechart-panel"
                            style={{
                                background: '#d6b180',
                                borderRadius: '5px',
                            }}
                        >
                            <h4>Comments</h4>
                            <Progress
                                type="circle"
                                percent={65}
                                style={{
                                    stroke: '#4cc541 !important',
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="col-xs-3 col-md-3 overview-main__item"
                    style={{
                        background: 'rgb(250 84 84)',
                        borderRadius: '5px',
                    }}
                >
                    <div
                        className="panel panel-default"
                        style={{
                            background: 'rgb(250 84 84)',
                            borderRadius: '5px',
                        }}
                    >
                        <div className="panel-body easypiechart-panel">
                            <h4>New Users</h4>
                            <Progress type="circle" percent={56} />
                        </div>
                    </div>
                </div>
                <div
                    className="col-xs-3 col-md-3 overview-main__item"
                    style={{
                        background: 'rgb(247 119 254)',
                        borderRadius: '5px',
                    }}
                >
                    <div
                        className="panel panel-default"
                        style={{
                            background: 'rgb(247 119 254)',
                            borderRadius: '5px',
                        }}
                    >
                        <div className="panel-body easypiechart-panel">
                            <h4>Visitors</h4>
                            <Progress type="circle" percent={27} />
                        </div>
                    </div>
                </div>
            </div>
            {/* </EmptyComponent> */}
        </div>
    );
}

PercentProduct.propTypes = {};

export default PercentProduct;
