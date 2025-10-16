import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { createNote } from "../store/ListSlice";

const InputCnt = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.list);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim() === "") return;

    try {
      await dispatch(createNote(value)).unwrap();
    } catch (error) {
      console.error("Failed to add note:", error);
    } finally {
      setValue("");
    }
  };

  const [value, setValue] = React.useState("");
  return (
    <form onSubmit={handleSubmit}>
      <label className="input w-full">
        <input
          type="text"
          className="grow "
          value={value}
          placeholder="Daxil et"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={loading}
        />
        {/* <kbd className="kbd kbd-sm">⌘</kbd> */}
        <kbd className="kbd kbd-sm">Enter</kbd>
      </label>
    </form>
  );
};

export default InputCnt;
