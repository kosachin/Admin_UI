import { useEffect, useState, useRef, createContext } from "react";
import axios from "axios";
const UsersDataContext = createContext();

const UsersDataContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchedData, setSearchedData] = useState(usersData);
  const [paginatedUsersData, setPaginatedUsersData] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const [areSelected, setAreSelected] = useState(false);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const totalDataSize = useRef(0);
  totalDataSize.current = usersData.length || 0;
  const totalSearchedDataSize = useRef(0);
  totalSearchedDataSize.current = searchedData.length || 0;
  const maxRows = 10;
  const startIndex = maxRows * currentPageNum - maxRows;
  const endIndex = maxRows * currentPageNum;
  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((data) => {
        totalDataSize.current = data.data.length;
        setUsersData(data.data);
        setPaginatedUsersData(data.data.slice(startIndex, endIndex));
        setIsSelected(new Array(maxRows).fill(false));
      });
  }, []);

  const handleDeleteEvent = (id) => {
    if (query.length) {
      setSearchedData((users) => users.filter((user) => user.id !== id));
      setUsersData((users) => users.filter((user) => user.id !== id));
    } else {
      setUsersData((users) => users.filter((user) => user.id !== id));
    }
    setIsSelected(new Array(paginatedUsersData.length).fill(false));
  };

  const handleDeletSelected = () => {
    let selectedUsers = [];
    isSelected.forEach((e, i) => {
      if (e === true) {
        selectedUsers.push(paginatedUsersData[i].id);
      }
    });
    setUsersData(
      usersData.filter((user) => {
        if (!selectedUsers.includes(user.id)) return user;
      })
    );
    setAreSelected(false);
    setIsSelected(new Array(paginatedUsersData.length).fill(false));
    if (query.length) {
      setSearchedData(
        searchedData.filter((user) => {
          if (!selectedUsers.includes(user.id)) return user;
        })
      );
      setPaginatedUsersData(searchedData.slice(startIndex, endIndex));
    } else {
      setPaginatedUsersData(usersData.slice(startIndex, endIndex));
    }
  };
  useEffect(() => {
    if (query.length > 0) {
      if (query.includes("@")) {
        const searchedFound = usersData.filter((e, i) =>
          e.email.startsWith(query)
        );
        setSearchedData(searchedFound);
      } else if ("admin".startsWith(query) || "member".startsWith(query)) {
        const searchedFound = usersData.filter((e, i) =>
          e.role.startsWith(query)
        );
        setSearchedData(searchedFound);
      } else {
        const searchedFound = usersData.filter((e, i) =>
          e.name.toLowerCase().startsWith(query.toLowerCase())
        );
        setSearchedData(searchedFound);
      }
      setPaginatedUsersData(searchedData.slice(startIndex, endIndex));
    } else {
      setPaginatedUsersData(usersData.slice(startIndex, endIndex));
      setCurrentPageNum(1);
    }
  }, [query]);

  useEffect(() => {
    setAreSelected(false);
    if (query.length) {
      setIsSelected(new Array(paginatedUsersData.length).fill(false));
      setPaginatedUsersData(searchedData.slice(startIndex, endIndex));
    } else {
      setIsSelected(new Array(paginatedUsersData.length).fill(false));
      setPaginatedUsersData(usersData.slice(startIndex, endIndex));
    }
  }, [currentPageNum]);

  useEffect(() => {
    if (query.length) {
      setPaginatedUsersData(searchedData.slice(startIndex, endIndex));
    } else {
      setPaginatedUsersData(usersData.slice(startIndex, endIndex));
    }
  }, [usersData, searchedData]);

  const store = {
    usersData,
    setUsersData,
    paginatedUsersData,
    totalDataSize,
    currentPageNum,
    setCurrentPageNum,
    handleDeleteEvent,
    handleDeletSelected,
    isSelected,
    setIsSelected,
    areSelected,
    setAreSelected,
    query,
    setQuery,
    searchedData,
    totalSearchedDataSize
  };
  return (
    <UsersDataContext.Provider value={store}>
      {children}
    </UsersDataContext.Provider>
  );
};
export { UsersDataContext, UsersDataContextProvider };
