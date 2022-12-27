import { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadingSelector } from "../../Store/Reducer/loadingReducer";

const ScrollToTop = ({ children, location: { pathname } }) => {
  const loading = useSelector(loadingSelector);

  useEffect(() => {
    if (!loading) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, loading]);

  return children || null;
};

export default withRouter(ScrollToTop);
