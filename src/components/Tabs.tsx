import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setFilter, resetFilter } from "../store/FilterSlice";

const Tabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const completed = useAppSelector((state) => state.filter.completed);
  console.log(completed);
  
  return (
    <div className="flex justify-center bg-white rounded">
      <div className="tabs tabs-box bg-white font-semibold ">
        <input
          type="radio"
          name="my_tabs_1"
          className="tab [--tab-bg:gray]"
          aria-label="Hamısı"
          defaultChecked
          onClick={() => dispatch(resetFilter())}
        />
        <input
          type="radio"
          name="my_tabs_1"
          className="tab [--tab-bg:orange]"
          aria-label="Gözləmədə "
          onClick={() => dispatch(setFilter(false))}
        />
        <input
          type="radio"
          name="my_tabs_1"
          className="tab [--tab-bg:green]"
          aria-label="Tamamlanmış"
          onClick={() => dispatch(setFilter(true))}
        />
      </div>
    </div>
  );
};

export default Tabs;
