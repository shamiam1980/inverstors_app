import React from "react";
import "./Card.css";

const Card = (props) => {
  let arabicChars = /[\u0600-\u06FF]/;

  String.prototype.EngNumbersToArabic = function () {
    return this.replace(/\d/g, (d) => String.fromCharCode("0x066" + d));
  };

  return (
    <div
      id='home-card'
      className={`flex-it ${props.hasSubData ? "has-sub" : null}`}>
      <div className='home-card-icon-wrapper flex-it'>
        <div className='home-card-icon'>{props.icon}</div>
      </div>
      <div className='col'>
        <div className='row home-card-title'>{props.title}</div>
        <div
          className={`row home-card-value text-uppercase rtl ${
            !arabicChars.test(props.titleValue) && "eng-text"
          }`}>
          {props.titleValue
            ? props.isAraNum
              ? props.isDate
                ? props.reverseDateText(props.titleValue.EngNumbersToArabic())
                : props.titleValue.EngNumbersToArabic()
              : props.titleValue
            : "N/A"}
          {props.hasInfoIcon && (
            <span className='home-card-info-icon' onClick={props.action}>
              <svg
                width='30'
                height='31'
                viewBox='0 0 30 31'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M14.0644 14.5625C14.0644 14.3139 14.1631 14.0754 14.339 13.8996C14.5148 13.7238 14.7532 13.625 15.0019 13.625C15.2505 13.625 15.489 13.7238 15.6648 13.8996C15.8406 14.0754 15.9394 14.3139 15.9394 14.5625V20.1875C15.9394 20.4361 15.8406 20.6746 15.6648 20.8504C15.489 21.0262 15.2505 21.125 15.0019 21.125C14.7532 21.125 14.5148 21.0262 14.339 20.8504C14.1631 20.6746 14.0644 20.4361 14.0644 20.1875V14.5625ZM13.5956 10.8125C13.5956 11.1852 13.7437 11.5427 14.0072 11.8062C14.2708 12.0698 14.6282 12.2178 15.0009 12.2178C15.3736 12.2178 15.7311 12.0698 15.9946 11.8062C16.2582 11.5427 16.4062 11.1852 16.4062 10.8125C16.4062 10.44 16.2583 10.0828 15.9949 9.81946C15.7315 9.55609 15.3743 9.40812 15.0019 9.40812C14.6294 9.40812 14.2722 9.55609 14.0088 9.81946C13.7455 10.0828 13.5956 10.44 13.5956 10.8125ZM15 2.375C18.481 2.375 21.8194 3.75781 24.2808 6.21922C26.7422 8.68064 28.125 12.019 28.125 15.5C28.125 18.981 26.7422 22.3194 24.2808 24.7808C21.8194 27.2422 18.481 28.625 15 28.625C11.519 28.625 8.18064 27.2422 5.71922 24.7808C3.25781 22.3194 1.875 18.981 1.875 15.5C1.875 12.019 3.25781 8.68064 5.71922 6.21922C8.18064 3.75781 11.519 2.375 15 2.375ZM26.25 15.5C26.25 14.0226 25.959 12.5597 25.3936 11.1948C24.8283 9.8299 23.9996 8.58971 22.955 7.54505C21.9103 6.50039 20.6701 5.67172 19.3052 5.10636C17.9403 4.54099 16.4774 4.25 15 4.25C13.5226 4.25 12.0597 4.54099 10.6948 5.10636C9.3299 5.67172 8.08971 6.50039 7.04505 7.54505C6.00039 8.58971 5.17172 9.8299 4.60636 11.1948C4.04099 12.5597 3.75 14.0226 3.75 15.5C3.75 18.4837 4.93526 21.3452 7.04505 23.455C9.15483 25.5647 12.0163 26.75 15 26.75C17.9837 26.75 20.8452 25.5647 22.955 23.455C25.0647 21.3452 26.25 18.4837 26.25 15.5Z'
                  fill='black'
                />
              </svg>
            </span>
          )}
        </div>
        {props.hasSubData && (
          <div
            className={`row card-sub-data text-uppercase rtl ${
              !arabicChars.test(props.subDataValue) && "eng-text"
            }`}>
            {props.subDataValue ? props.subDataValue : "N/A"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
