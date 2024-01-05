import reactDom from "react-dom";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return reactDom.createPortal(
    <>
      <div
        className="modal_wrapper flex justify-center items-center w-screen h-screen  fixed top-0 left-0 right-0 bottom-0 "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 40000 }}
      >
        <div className="modal_inner bg-purple-400 p-3 rounded-md min-w-[70%] min-h-[50%]">
          <div className="modal_top flex justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
