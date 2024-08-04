import classNames from "classnames";
import errorIcon from "./error.svg";
import successIcon from "./success.svg";
import "./BaseButton.css";

const BaseButton = ({
  id,
  classes,
  success,
  loading,
  error,
  text,
  onClick,
  disabled,
  display,
  displayIcon,
  textColor,
  loginBtn,
}) => (
  <button
    id={id}
    disabled={disabled}
    className={classNames("button", "py-3", classes, {
      "is-loading": loading,
      "is-primary": !error && !success,
      "is-danger": error,
      "is-success": success,
    })}
    style={{ color: !error && !success ? textColor || "#202B33" : "" }}
    onClick={onClick}
    ref={loginBtn}>
    <span
      className='basebtn-display-icon'
      style={{
        display: display ? "inline-block" : "none",
      }}>
      <img
        src={displayIcon}
        style={{
          display: loading || error || success ? "none" : "block",
        }}
      />
      <img
        className={classNames("mx-2", { "is-hidden": !error })}
        src={errorIcon}
        width='20'
      />
      <img
        className={classNames("mx-2", { "is-hidden": !success })}
        src={successIcon}
        width='20'
      />
    </span>
    {text}
  </button>
);
export default BaseButton;
