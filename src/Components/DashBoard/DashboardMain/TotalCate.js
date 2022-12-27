import React from "react";
import { Link } from "react-router-dom";

function TotalCate(props) {
  const { data } = props;

  return (
    <div className="col-xs-12">
      {data.map((item) => (
        <Link key={item.icon} to={item.path}>
          <div className="col-xs-3 col-md-3 col-lg-3 no-padding">
            <div className="panel panel-teal panel-widget border-right">
              <div className="row no-padding">
                <em className={`fa fa-xl ${item.icon} color-blue`} />
                <div className="large">{item.data && item.data.length}</div>
                <div className="text-muted">{item.title}</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

TotalCate.propTypes = {};

export default TotalCate;
