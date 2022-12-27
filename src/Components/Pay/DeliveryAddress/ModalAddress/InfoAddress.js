import React from "react";
import { Col, Row } from "antd";
import LocationMap from "../../../BasicMap";

function InfoAddress(props) {
  const {setLngLat, lngLat} = props;

  return (
    <div
      className="address-value"
    >
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="delivery-address__row"
      >
        <Col className="gutter-row delivery-address__col--des" span={24}>
          <LocationMap setLngLat={setLngLat} lngLat={lngLat} />
        </Col>
      </Row>
    </div>
  );
}

InfoAddress.propTypes = {};

export default InfoAddress;
