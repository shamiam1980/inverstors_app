import React, { useState, useEffect } from "react";
import "./Modal.css";

const Modal = (props) => {
  const [isModal, setIsModal] = useState(false);

  const active = isModal ? "is-active" : "";

  useEffect(() => {
    setIsModal(props.isModal);
  });

  return (
    <div id='custom-modal' className={`modal ${active}`}>
      <div
        className='modal-background'
        style={{ backgroundColor: "rgb(30,39,51,0.86)" }}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{props.title}</p>
          {props.subTitle && (
            <p className='modal-card-sub-title'>{props.subTitle}</p>
          )}
          <button
            className='delete'
            aria-label='close'
            onClick={props.handleCloseModal}></button>
        </header>
        <section
          className='modal-card-body'
          style={{ display: "flex", alignItems: "center", minHeight: "90px" }}>
          {props.modalMessage}
        </section>
        <footer
          className='modal-card-foot'
          style={{ justifyContent: "flex-end" }}>
          <button className='button' onClick={props.handleCloseModal}>
            {props.cta || "إغلاق"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
