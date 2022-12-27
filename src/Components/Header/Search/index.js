import { Button, Form } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { search_item } from "../../../assets/fake-data";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import CategorySearch from "./CategorySearch";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSearchItemUserApi } from "../../../Store/Reducer/searchItem";
import { openNotification } from "../../../utils";

export default function Search(props) {
  let arrSearchItem = [];
  const { searchItem, insertSearchItemUser, removeSearchItem } = props;
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(true);
  const [height, setHeight] = useState(110);
  const [inputSearch, setInputSearch] = useState("");
  const [display, setDisplay] = useState("block");
  const [searchAll, setSearchAll] = useState([]);

  useEffect(() => {
    if (searchItem) {
      setSearchAll([...searchItem, ...search_item]);
    }
  }, [searchItem]);

  const handleHeightSearchItem = (items) => {
    const arr_items = items.slice(2);
    return arr_items.length * 50;
  };

  const setActiveClass = () => {
    if (inputSearch) {
      insertSearchItemUser(inputSearch);
    }
    if (searchRef?.current) {
      if (searchItem === null) {
        dispatch(getSearchItemUserApi());
      }
      searchRef?.current.classList.add("active");
      dropdownRef?.current.classList.remove("hidden");
    }
  };

  const removeActiveClass = () => {
    if (searchRef.current) {
      searchRef.current.classList.remove("active");
      dropdownRef?.current.classList.add("hidden");
      inputRef.current.value = "";
      setInputSearch("");
    }
  };

  const onCloseMenuSearch = (s) => {
    const height_search = handleHeightSearchItem(searchAll);
    if (s) {
      setHeight(110 + height_search);
      setStatus(!s);
    } else {
      setHeight(height - height_search);
      setStatus(!s);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !searchRef?.current?.contains(event.target) &&
        !dropdownRef?.current?.contains(event.target)
      ) {
        dropdownRef.current?.classList.add("hidden");
        setHeight(110);
        setStatus(true);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchRef, dropdownRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !searchRef?.current?.contains(event.target) &&
        !dropdownRef?.current?.contains(event.target)
      ) {
        if (
          searchRef.current?.className ===
          "header__menu__item__search-wrap active"
        ) {
          if (inputRef.current && !inputRef.current.value.length) {
            searchRef.current?.classList.remove("active");
          } else {
            searchRef.current?.classList.add("active");
          }
        }
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchRef, dropdownRef]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.addEventListener("focus", (e) => {
        if (dropdownRef.current) {
          dropdownRef.current?.classList.remove("hidden");
        }
      });
    }
    return () => {
      if (inputRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        inputRef.current.removeEventListener("focus", null);
      }
    };
  }, []);

  const handleHiddenFormSearch = (status) => {
    if (status) {
      if (dropdownRef.current) {
        dropdownRef.current?.classList.add("hidden");
        searchRef.current?.classList.remove("active");
      }
    } else {
      openNotification(
        "Lỗi rồi Bro 🧨",
        "Hiện tại thì tui chưa thêm sản phẩm này nên tạm thời lướt chỗ khác đi nha 😁"
      );
    }
  };

  const heightSearch = () => {
    return height <= 350 ? height : 350;
  };

  const handleImportContentSearch = (data) => {
    return data ? `/search/${data}` : "#";
  };

  const handleChangeInputToSearch = (value, e) => {
    if (!e.target?.closest(".icon-delete")) {
      setInputSearch(value);
      insertSearchItemUser(value);
    }
  };

  const renderUISearch = (arrSearchItem) => {
    return arrSearchItem.length
      ? arrSearchItem.map((item, index) => {
          if (item.status === "searchAI") {
            return (
              <div
                className="header__menu__item__search-item"
                key={index}
                onClick={(e) => handleChangeInputToSearch(item.content, e)}
              >
                <Link
                  to={handleImportContentSearch(item.content)}
                  style={{ width: "100%" }}
                >
                  <div className="header__menu__item__search-item-content">
                    <i className="fad fa-search" />
                    <p className="header__menu__item__search-text">
                      {item.content}
                    </p>
                  </div>
                </Link>
              </div>
            );
          } else {
            return (
              <div
                className="header__menu__item__search-item"
                key={index}
                onClick={(e) => handleChangeInputToSearch(item.content, e)}
              >
                <Link
                  to={() => handleImportContentSearch(item.content)}
                  style={{ width: "100%" }}
                >
                  <div className="header__menu__item__search-item-content">
                    <i className="fad fa-history" />
                    <p className="header__menu__item__search-text">
                      {item.content}
                    </p>
                  </div>
                </Link>
                <i
                  className="fal fa-times icon-delete"
                  onClick={() => removeSearchItem(item._id)}
                />
              </div>
            );
          }
        })
      : "";
  };

  const handleChangeInputSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const renderUISearchSame = () => {
    if (inputSearch) {
      arrSearchItem = searchAll.filter((text) => {
        return text.content.toLowerCase().indexOf(inputSearch) !== -1;
      });
    }
    if (arrSearchItem.length) {
      return renderUISearch(arrSearchItem);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    arrSearchItem = searchAll.filter((text) => {
      return text.content.toLowerCase().indexOf(inputSearch) !== -1;
    });
    setDisplay(arrSearchItem.length ? "block" : "none");
  }, [inputSearch]);

  const handleChangeLink = () => (inputSearch ? `/search/${inputSearch}` : "#");

  return (
    <div className="search-header">
      <div className="header__menu__item header__menu__right__item">
        <div
          className="header__menu__item__search-wrap"
          ref={searchRef}
          id="search"
        >
          <Link to={handleChangeLink}>
            <div
              className="header__menu__item__btn-search"
              onClick={() => setActiveClass()}
              // style={{ color: themeItem.text_color }}
            >
              <i className="fal fa-search" />
            </div>
          </Link>
          <Form>
            <div
              className="header__menu__item__input-search"
              // style={{ color: themeItem.text_color }}
            >
              <input
                type="text"
                placeholder="tìm kiếm sản phẩm ..."
                value={inputSearch}
                ref={inputRef}
                onChange={(e) => handleChangeInputSearch(e)}
              />
            </div>
          </Form>
          <div
            className="header__menu__item__btn-search-off"
            onClick={removeActiveClass}
          >
            <i className="fal fa-times" />
          </div>
        </div>
        {inputSearch ? (
          <div
            className="header__menu__item__search-dropdown-menu-search hidden"
            ref={dropdownRef}
            id="dropdown"
          >
            <div
              className="header__menu__item__search-history"
              style={{ height: "auto", display: display }}
            >
              {renderUISearchSame()}
            </div>
          </div>
        ) : (
          <div
            className="header__menu__item__search-dropdown-menu-search hidden"
            ref={dropdownRef}
          >
            <div
              className="header__menu__item__search-history"
              style={{ height: heightSearch() }}
            >
              {renderUISearch(searchAll)}
            </div>
            <div className="header__menu__item__search-history-close">
              <Button
                type="link"
                onClick={() => onCloseMenuSearch(status)}
                icon={!status ? <UpOutlined /> : <DownOutlined />}
              >
                {!status ? "Thu gọn" : "Xem thêm"}
              </Button>
            </div>
            <CategorySearch handleHiddenFormSearch={handleHiddenFormSearch} />
          </div>
        )}
      </div>
    </div>
  );
}
