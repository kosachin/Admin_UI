import { useContext, useEffect, useState } from "react";
import { UserRow } from "./userRow";
import { UsersDataContext } from "../context/UsersDataContextProvider";
import { PageNavigationController } from "./pageNavigation";
import { SearchBox } from "./seacrhBox";
const userInfoFields = {
  id: 0,
  name: "Name",
  email: "Email",
  role: "Role",
  action: "Actions"
};
export const UsersList = () => {
  const { paginatedUsersData, query, searchedData } = useContext(
    UsersDataContext
  );
  return (
    <>
      <SearchBox />
      <UserRow userData={userInfoFields} />
      {paginatedUsersData.map((user, i) => (
        <UserRow userData={user} position={i} />
      ))}
      <PageNavigationController />
    </>
  );
};
