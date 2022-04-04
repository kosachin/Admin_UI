import classes from "../styles/userRow.module.css";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useContext, useRef } from "react";
import { UsersDataContext } from "../context/UsersDataContextProvider";
export const UserRow = (props) => {
  const {
    isSelected,
    setIsSelected,
    areSelected,
    setAreSelected,
    handleDeleteEvent,
    paginatedUsersData
  } = useContext(UsersDataContext);

  return (
    <div
      key={props.userData.id}
      className={`${classes.tableHeading}`}
      style={{
        backgroundColor: isSelected[props.position] ? "#f3f3f3" : null
      }}
    >
      <h4>
        {props.userData.id === 0 ? (
          <input
            type={"checkbox"}
            checked={areSelected}
            onChange={() => {
              setAreSelected((prev) => !prev);
              setIsSelected(
                new Array(paginatedUsersData.length).fill(!areSelected)
              );
            }}
          />
        ) : (
          <input
            type={"checkbox"}
            checked={isSelected[props.position]}
            onChange={() => {
              setIsSelected((checks) =>
                checks.map((check, i) => {
                  if (i === props.position) {
                    return !check;
                  }
                  return check;
                })
              );
            }}
          />
        )}
      </h4>
      <h4>{props.userData.name}</h4>
      <h4>{props.userData.email}</h4>
      <h4>{props.userData.role}</h4>
      {props.userData.action ? (
        <h4>Actions</h4>
      ) : (
        <h4>
          <BiEdit />
          <AiOutlineDelete
            color={"red"}
            onClick={() => {
              handleDeleteEvent(props.userData.id);
            }}
          />
        </h4>
      )}
    </div>
  );
};
