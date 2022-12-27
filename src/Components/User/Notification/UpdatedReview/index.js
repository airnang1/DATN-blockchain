import React from 'react';
import styled from 'styled-components';
import { Col, Empty, Row } from 'antd';

const UpdatedReviewItem = styled.div``;

function UpdatedReview(props) {
    return (
        <UpdatedReviewItem>
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ marginBottom: '20px' }}
            >
                <Col
                    className="gutter-row"
                    span={24}
                    style={{
                        display: 'flex',
                        minHeight: '350px',
                        flexDirection: 'column',
                        height: 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <Empty />
                </Col>
            </Row>
        </UpdatedReviewItem>
    );
}

UpdatedReview.propTypes = {};

export default UpdatedReview;
