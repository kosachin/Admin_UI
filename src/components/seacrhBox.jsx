import { useContext, useState } from "react";
import { UsersDataContext } from "../context/UsersDataContextProvider";

export const SearchBox = () => {
  const { query, setQuery, searchedData } = useContext(UsersDataContext);
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "95vw" }}
      />
    </div>
  );
};
