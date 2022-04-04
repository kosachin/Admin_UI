import classes from "../styles/usersList.module.css";
import { UsersDataContext } from "../context/UsersDataContextProvider";
import { useContext } from "react";
export const PageNavigationController = () => {
  const {
    currentPageNum,
    setCurrentPageNum,
    totalDataSize,
    handleDeletSelected,
    query,
    totalSearchedDataSize,
    searchedData
  } = useContext(UsersDataContext);
  const firstPageNum = 1;
  let lastPageNum =
    query.length > 0 && searchedData.length > 0
      ? Math.ceil(totalSearchedDataSize.current / 10)
      : Math.ceil(totalDataSize.current / 10);

  const handleCurrentPageNum = (payload) => {
    if (payload < 0 && currentPageNum > firstPageNum) {
      setCurrentPageNum((prev) => prev + payload);
    } else if (payload > 0 && currentPageNum < lastPageNum) {
      setCurrentPageNum((prev) => prev + payload);
    }
  };
  const handleJumpToPage = (pageNum) => {
    setCurrentPageNum(pageNum);
  };

  const numberOfPages =
    query.length > 0
      ? Math.ceil(totalSearchedDataSize.current / 10)
      : Math.ceil(totalDataSize.current / 10);
  return (
    <div className={classes.bottomController}>
      <button
        onClick={() => {
          handleDeletSelected();
        }}
      >
        Delete Selected
      </button>
      <div className={classes.pageNavigationMenu}>
        <div className={classes.previousPages}>
          {currentPageNum === firstPageNum ? (
            <>
              <input type="button" value={"<<"} disabled />
              <input type="button" value={"<"} disabled />
            </>
          ) : (
            <>
              <input
                type="button"
                value={"<<"}
                onClick={() => handleCurrentPageNum(-currentPageNum + 1)}
              />
              <input
                type="button"
                value={"<"}
                onClick={() => handleCurrentPageNum(-1)}
                searchBox
              />
            </>
          )}
        </div>
        <div className={classes.pageIndexs}>
          {[...Array(numberOfPages + 1).keys()].map((pageNum) =>
            pageNum > 0 ? (
              <input
                key={pageNum}
                onClick={() => handleJumpToPage(pageNum)}
                type={"button"}
                value={pageNum}
                style={{
                  background: pageNum === currentPageNum ? "blue" : null
                }}
              />
            ) : null
          )}
        </div>
        <div className={classes.nextPages}>
          {currentPageNum === lastPageNum ? (
            <>
              <input
                // className={classes.pageIndexs}
                disabled
                type={"button"}
                value={">"}
              />
              <input
                // className={classes.pageIndexs}
                disabled
                type={"button"}
                value={">>"}
              />
            </>
          ) : (
            <>
              <input
                // className={classes.pageIndexs}
                value={">"}
                type="button"
                onClick={() => handleCurrentPageNum(1)}
              />
              <input
                // className={classes.pageIndexs}
                value={">>"}
                type="button"
                onClick={() =>
                  handleCurrentPageNum(lastPageNum - currentPageNum)
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
