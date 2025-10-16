import React from "react";
{
  /* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */
}

interface CustomModalProps {
  modalID: string;
  modalTitle: string;
  modalBody: string;
  modalCancelBtnClick: () => void;
  modalConfirmBtnClick: () => void;
  modalConfirmBtnText: string;
  modalCancelBtnText: string;
}
const CustomModal: React.FC<CustomModalProps> = ({
  modalID = "my_modal_1",
  modalTitle = "Modal Title",
  modalBody = "Modal Body",
  modalCancelBtnClick = () => {},
  modalConfirmBtnClick = () => {},
  modalConfirmBtnText = "Confirm",
  modalCancelBtnText = "Cancel",
}) => {
  return (
    <dialog id={modalID} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{modalTitle}</h3>
        <p className="py-4">{modalBody}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error" onClick={modalCancelBtnClick}>
              {modalCancelBtnText}
            </button>
            <button
              className="btn btn- btn-success ml-2"
              onClick={modalConfirmBtnClick}
            >
              {modalConfirmBtnText}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CustomModal;
