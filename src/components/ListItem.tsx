import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { updateStatus, removeNote } from "../store/ListSlice";
import { Trash } from "lucide-react";
import CustomModal from "./CustomModal";

interface ListItemProps {
  text: string;
  initialChecked: boolean;
  id: number;
}

const ListItem: React.FC<ListItemProps> = ({ text, initialChecked, id }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.list);
  return (
    <>
      <CustomModal
        modalID="delete_modal"
        modalTitle="Qeyd Silinsin?"
        modalBody="Bu qeydi silmək istədiyinizə əminsiniz?"
        modalCancelBtnClick={() => {}}
        modalConfirmBtnClick={() => dispatch(removeNote(id))}
        modalCancelBtnText="İmtina et"
        modalConfirmBtnText="Sil"
      />
      <div className="flex gap-4 justify-between items-center p-2 bg-white rounded cursor-pointer hover:bg-gray-100">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={initialChecked}
          disabled={loading}
          onChange={() =>
            dispatch(updateStatus({ noteId: id, completed: !initialChecked }))
          }
        />
        <p
          onClick={() =>
            dispatch(updateStatus({ noteId: id, completed: !initialChecked }))
          }
          className={`font-semibold text-lg w-full text-center ${
            initialChecked && "line-through "
          }`}
        >
          {text}
        </p>
        {/* () => {dispatch(removeNote(id)) */}
        <button
          className="btn btn-ghost  rounded-full text-error p-2"
          onClick={() => {
            const modal = document.getElementById("delete_modal");
            if (modal instanceof HTMLDialogElement) modal.showModal();
          }}
        >
          <Trash />
        </button>
      </div>
    </>
  );
};

export default React.memo(ListItem);
