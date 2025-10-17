import React from "react";
import ListItem from "./ListItem";

import { type ListResponse } from "../../types/types";
import { fetchNotes } from "../store/ListSlice";
import { useAppSelector, useAppDispatch } from "../hooks/redux";

const List = () => {

  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.list);
  const completed = useAppSelector((state) => state.filter.completed);
  React.useEffect(() => {
    dispatch(fetchNotes(completed));
  }, [completed]);

  return (
    <div className="flex flex-col gap-2 max-h-[calc(100vh-185px)] overflow-y-auto">
      {list.map((note: ListResponse) => (
        <ListItem
          key={note?.id}
          id={note?.id}
          text={note?.text}
          initialChecked={note?.completed}
        />
      ))}
    </div>
  );
};

export default React.memo(List);
