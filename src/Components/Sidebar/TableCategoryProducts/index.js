import React, { forwardRef } from "react";
import TableCategoryModal from "./TableCategoryModal";
import TableCategoryHighlights from "./TableCategoryHighlights";
import TableCategoryEvent from "./TableCategoryEvent";

const TableCategoryProducts = forwardRef((props, ref) => {
  const {
    showTable,
    handleShowCategoryProduct,
    data,
    isShow,
    changeDataCategory,
  } = props;

  return showTable ? (
    <div className="table-category-product" ref={ref}>
      <div className="table-title">
        <span className="table-title-name">Phân Loại Sản Phẩm</span>
      </div>
      <div className="table-content">
        <div className="row">
          <TableCategoryModal
            handleShowCategoryProduct={handleShowCategoryProduct}
            changeDataCategory={changeDataCategory}
          />
          <TableCategoryHighlights data={data} isShow={isShow} />
          <TableCategoryEvent />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
});

TableCategoryProducts.propTypes = {};

export default TableCategoryProducts;
