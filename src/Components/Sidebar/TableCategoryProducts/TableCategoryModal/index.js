import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TableCategoryModal(props) {
  const { handleShowCategoryProduct, changeDataCategory } = props;
  const [active, setActive] = useState(null);
  const [data, setData] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const someHandler = (index, data, title) => {
    setActive(index);
    setShowTable(true);
    setData({ data, title });
  };

  useEffect(() => {
    handleShowCategoryProduct(data, showTable);
    return () => handleShowCategoryProduct;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, showTable]);

  return (
    <div className="col-sm-3">
      <div className="category-product">
        <div className="title-category">Thể Loại</div>
        <ul>
          {changeDataCategory.category.map((item, index) => (
            <Link
              to={`/category/${
                changeDataCategory.title + "/" + item.name_category
              }`}
              key={index}
            >
              <div
                className="category-product-item"
                key={index}
                onMouseEnter={() =>
                  someHandler(index, item.listData, changeDataCategory.title)
                }
              >
                <li
                  key={index}
                  style={{
                    color: active === index && "#255cd8",
                    fontWeight: active === index && 600,
                  }}
                >
                  {item.name_category}
                </li>
                {active === index ? <i className="fad fa-caret-right"></i> : ""}
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

TableCategoryModal.propTypes = {};

export default TableCategoryModal;
