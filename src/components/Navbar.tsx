import LoadingSpinner from "./LoadingSpinner";
import { useAppSelector } from "../hooks/redux";
import React from "react";
import CustomModal from "./CustomModal";

const Navbar = React.memo(({ message }: { message: string }) => {
  const { loading } = useAppSelector((state) => state.list);
  return (
    <>
      <CustomModal
        modalID={"about_modal"}
        modalTitle={"Haqqında"}
        modalBody={
          "Sədi Məmmədov tərəfindən hazırlanıb. Bütün hüquqlar qorunur. "
        }
        modalCancelBtnClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        modalConfirmBtnClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        modalConfirmBtnText={"Təşəkkürlər"}
        modalCancelBtnText={"Bağla"}
      />
      <div className="navbar bg-base-100 shadow-sm w-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  onClick={() => {
                    const modal = document.getElementById("about_modal");
                    if (modal instanceof HTMLDialogElement) modal.showModal();
                  }}
                >
                  Haqqında
                </a>
              </li>
              <li>
                <a className="text-error">Çıxış</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <p className="btn btn-ghost text-xl">{message}</p>
        </div>
        <div className="navbar-end">
          {loading && (
            <div className="indicator">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default Navbar;
