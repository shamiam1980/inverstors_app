import React, { useState, useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import BaseButton from "../BaseButton/BaseButton";
import AlAqsaMob from "../../images/login-al-aqsa-mobile.png";
import LoginPalestineMap from "../../images/login-palestine-map.svg";
import LoginPalestineOldKeyIcon from "../../images/login-palestine-old-key.svg";
import LoginFormIcon from "../../images/login-form-icon.png";
import baseURL from "../../baseURL";
import "./Login.css";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwInputType, setPwInputType] = useState("password");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    getCSRFToken();
  }, []);

  const target = useRef(null);
  const loginBtn = useRef(null);

  const history = useHistory();

  const getCSRFToken = () => {
    const url = new URL("./api/get_csrf_token/", baseURL);

    fetch(url, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then((data) => {
        setToken(data.csrfToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateEmail = (val) => {
    setEmailIsValid(false);
    let emailValidate =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    if (emailValidate.test(val)) {
      setEmailIsValid(true);
      // setErrMsg("");
      return true;
    } else {
      // setErrMsg("يرجى إدخال بريد إلكتروني صحيح!");
      return false;
    }
  };

  const handleShowPw = () => {
    if (pwInputType === "password") {
      setPwInputType("text");
    } else {
      setPwInputType("password");
    }
  };

  const handlePwOnChange = (e) => {
    setErrMsg("");
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async () => {
    if (email === "" && password === "") {
      setErrMsg("لم يتم إدخال أيّة بيانات!");
    } else if (!emailIsValid || password.length < 6) {
      setErrMsg("يرجى إدخال بريد إلكتروني صحيح و كلمة سر  لا تقل عن 6 أحرف!");
    } else {
      setErrMsg("");
      setLoading(true);
      // TEMP
      // setTimeout(() => {
      //   setLoading(false);
      //   setSuccess(true);
      //   setTimeout(() => {
      //     history.push("/home");
      //   }, 2600);
      // }, 2000);
      // True Request
      try {
        const url = new URL("./login", baseURL);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": token,
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          setTimeout(() => {
            setLoading(false);
            setSuccess(false);
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 3000);
          }, 1500);
          throw new Error("Failed to fetch.");
        } else {
          setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
              history.push("/home");
            }, 2300);
          }, 1500);
        }
      } catch (err) {
        setTimeout(() => {
          setLoading(false);
          setError(true);
          setSuccess(false);
          setErrMsg(
            <span>
              بيانات الدخول غير صحيحة! يرجي التواصل مع{" "}
              <a
                className='login-err-msg-email eng-text'
                onClick={() =>
                  (window.location = "mailto:support@m.shokry.com")
                }>
                support@mshokry.com
              </a>{" "}
              للمساعدة
            </span>
          );
          setTimeout(() => {
            setError(false);
          }, 3000);
        }, 1500);
        console.log(err);
      }
    }
  };

  // Submit login when clicking Enter
  const handleKeyboardSubmit = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      loginBtn.current.click();
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className='login wrapper'>
        <div className='login-svg-wrapper'>
          <div className='login-logo flex-it'>
            شعار
            <br />
            الشركة
          </div>
          <div
            className='login-lang-sel flex-it'
            style={{ zIndex: success ? "100" : "1000000" }}
            ref={target}
            onClick={() => (
              setShow(!show),
              setTimeout(() => {
                setShow(false);
              }, 2500)
            )}>
            <svg
              width='31'
              height='29'
              viewBox='0 0 31 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <g clipPath='url(#clip0_257_9236)'>
                <path
                  d='M28 0H12V5H14V2H28C28.6 2 29 2.4 29 3V14C29 14.6 28.6 15 28 15H15V22H9.7L6 24.9V22H3C2.4 22 2 21.6 2 21V10C2 9.4 2.4 9 3 9H16V7H3C1.3 7 0 8.3 0 10V21C0 22.7 1.3 24 3 24H4V29.1L10.3 24H17V17H28C29.7 17 31 15.7 31 14V3C31 1.3 29.7 0 28 0Z'
                  fill='#202020'
                />
                <path
                  d='M4.2002 19.9H6.6002L7.2002 18.3H10.3002L10.9002 19.9H13.3002L9.9002 11H7.5002L4.2002 19.9ZM8.7002 13.5L9.7002 16.6H7.7002L8.7002 13.5Z'
                  fill='#202020'
                />
                <path
                  d='M19.1631 7.06055C19.0856 6.80078 19.0469 6.52962 19.0469 6.24707C19.0514 5.96452 19.0833 5.69336 19.1426 5.43359C19.2109 5.14648 19.3203 4.8776 19.4707 4.62695C19.6211 4.3763 19.7988 4.15072 20.0039 3.9502C20.2135 3.74512 20.4437 3.56966 20.6943 3.42383C20.9495 3.27799 21.2184 3.16862 21.501 3.0957C21.7744 3.02279 22.0524 2.98861 22.335 2.99316C22.6175 2.99772 22.891 3.03874 23.1553 3.11621C23.4242 3.19368 23.6771 3.3099 23.9141 3.46484C24.151 3.61523 24.3607 3.7998 24.543 4.01855C24.5703 4.05501 24.6068 4.10286 24.6523 4.16211C24.6979 4.2168 24.7367 4.27832 24.7686 4.34668C24.805 4.41504 24.8278 4.48112 24.8369 4.54492C24.8506 4.60872 24.8369 4.66341 24.7959 4.70898C24.7412 4.77734 24.6683 4.83659 24.5771 4.88672C24.486 4.93229 24.404 4.98014 24.3311 5.03027C24.2627 5.0804 24.1943 5.12826 24.126 5.17383C24.0622 5.2194 23.9938 5.2627 23.9209 5.30371C23.8024 5.37207 23.7044 5.3903 23.627 5.3584C23.5495 5.3265 23.4766 5.27637 23.4082 5.20801C23.3444 5.13965 23.2806 5.06673 23.2168 4.98926C23.153 4.90723 23.0801 4.85254 22.998 4.8252C22.9115 4.80241 22.8226 4.79329 22.7314 4.79785C22.6403 4.79785 22.5492 4.79557 22.458 4.79102C22.3395 4.78646 22.2188 4.79557 22.0957 4.81836C21.9772 4.83659 21.8587 4.87077 21.7402 4.9209C21.5169 5.03027 21.3483 5.1875 21.2344 5.39258C21.1204 5.5931 21.0544 5.81413 21.0361 6.05566C21.0225 6.17415 21.0133 6.29948 21.0088 6.43164C21.0088 6.55924 21.0179 6.68685 21.0361 6.81445C21.0544 6.94206 21.084 7.06738 21.125 7.19043C21.1706 7.30892 21.2344 7.41602 21.3164 7.51172C21.3939 7.60742 21.4827 7.6849 21.583 7.74414C21.6878 7.80339 21.7972 7.85124 21.9111 7.8877C22.0251 7.9196 22.1413 7.94238 22.2598 7.95605C22.3828 7.96973 22.5036 7.97656 22.6221 7.97656C22.8955 7.97656 23.1644 7.95605 23.4287 7.91504C23.6976 7.86947 23.9642 7.81934 24.2285 7.76465C24.388 7.73275 24.543 7.6849 24.6934 7.62109C24.7253 7.61198 24.7686 7.59375 24.8232 7.56641C24.8825 7.53451 24.944 7.50716 25.0078 7.48438C25.0716 7.46159 25.1331 7.44792 25.1924 7.44336C25.2516 7.43424 25.2949 7.44792 25.3223 7.48438C25.3496 7.51628 25.361 7.56185 25.3564 7.62109C25.3519 7.67578 25.3405 7.73503 25.3223 7.79883C25.3086 7.85807 25.2904 7.91732 25.2676 7.97656C25.2448 8.03581 25.2288 8.08366 25.2197 8.12012C25.1969 8.21582 25.1719 8.3138 25.1445 8.41406C25.1217 8.50977 25.1012 8.60775 25.083 8.70801C25.0465 8.83105 25.0078 8.94499 24.9668 9.0498C24.9303 9.15007 24.8483 9.22982 24.7207 9.28906C24.5977 9.33919 24.4632 9.36198 24.3174 9.35742C24.1761 9.34831 24.0439 9.34603 23.9209 9.35059C23.693 9.36426 23.4697 9.38932 23.251 9.42578C23.0322 9.46224 22.8135 9.50098 22.5947 9.54199C22.4854 9.56478 22.3646 9.58984 22.2324 9.61719C22.1003 9.64453 21.9704 9.68099 21.8428 9.72656C21.7152 9.77214 21.5967 9.8291 21.4873 9.89746C21.3779 9.96582 21.2891 10.0501 21.2207 10.1504C21.1523 10.2552 21.1136 10.3691 21.1045 10.4922C21.0954 10.6152 21.1068 10.7383 21.1387 10.8613C21.1706 10.9844 21.2184 11.1006 21.2822 11.21C21.346 11.3239 21.4144 11.4219 21.4873 11.5039C21.6149 11.6497 21.7562 11.7956 21.9111 11.9414C22.0706 12.0872 22.237 12.2035 22.4102 12.29C22.5013 12.3402 22.5902 12.3789 22.6768 12.4062C22.7679 12.4382 22.8613 12.4678 22.957 12.4951C23.0072 12.5088 23.0641 12.5247 23.1279 12.543C23.1917 12.5612 23.235 12.5954 23.2578 12.6455C23.2715 12.6774 23.2692 12.707 23.251 12.7344C23.2327 12.7663 23.2077 12.7913 23.1758 12.8096C23.1439 12.8324 23.112 12.8529 23.0801 12.8711C23.0482 12.8893 23.0231 12.9053 23.0049 12.9189L21.4736 13.8486C21.4144 13.8805 21.3551 13.9124 21.2959 13.9443C21.2412 13.9762 21.1842 14.0104 21.125 14.0469C21.084 14.0742 21.0384 14.0719 20.9883 14.04C20.9382 14.0127 20.8949 13.9876 20.8584 13.9648C20.6396 13.8281 20.4232 13.6709 20.209 13.4932C19.9948 13.32 19.8034 13.1263 19.6348 12.9121C19.4707 12.7025 19.3363 12.4723 19.2314 12.2217C19.1312 11.9756 19.0879 11.7135 19.1016 11.4355C19.1107 11.2897 19.1266 11.1462 19.1494 11.0049C19.1722 10.8682 19.195 10.7269 19.2178 10.5811C19.2451 10.4307 19.2816 10.278 19.3271 10.123C19.3727 9.97266 19.4456 9.83594 19.5459 9.71289C19.5641 9.6901 19.6029 9.65137 19.6621 9.59668C19.7214 9.53743 19.792 9.47591 19.874 9.41211C19.9606 9.34831 20.0495 9.28451 20.1406 9.2207C20.2318 9.1569 20.3184 9.10449 20.4004 9.06348C20.4824 9.0179 20.5531 8.99056 20.6123 8.98145C20.6761 8.96777 20.7171 8.98372 20.7354 9.0293C20.7035 8.95638 20.6943 8.90853 20.708 8.88574C20.7262 8.86296 20.7513 8.85156 20.7832 8.85156C20.8197 8.84701 20.8607 8.84928 20.9062 8.8584C20.9564 8.86751 20.9997 8.86751 21.0361 8.8584C21.1136 8.84017 21.1546 8.82422 21.1592 8.81055C21.1683 8.79232 21.1546 8.77637 21.1182 8.7627C21.0863 8.74447 21.043 8.72852 20.9883 8.71484C20.9382 8.70117 20.8949 8.68978 20.8584 8.68066C20.6898 8.63509 20.5326 8.58268 20.3867 8.52344C20.2454 8.46419 20.111 8.37077 19.9834 8.24316C19.8102 8.06999 19.6484 7.88997 19.498 7.70312C19.3522 7.51628 19.2406 7.30208 19.1631 7.06055ZM23.873 5.33105C23.8776 5.33105 23.8936 5.32194 23.9209 5.30371C23.9528 5.28548 23.9801 5.26953 24.0029 5.25586C24.0257 5.24219 24.0348 5.23763 24.0303 5.24219C24.0257 5.24219 23.9893 5.2627 23.9209 5.30371C23.8981 5.31283 23.8822 5.32194 23.873 5.33105Z'
                  fill='#202020'
                />
              </g>
              <defs>
                <clipPath id='clip0_257_9236'>
                  <rect width='31' height='29' fill='white' />
                </clipPath>
              </defs>
            </svg>
            <span className='eng-text login-lang-sel-text'>EN</span>
          </div>
          <Overlay target={target.current} show={show} placement='top'>
            {(props) => (
              <Tooltip id='login-lang-sel-tooltip' {...props}>
                قريباً إن شاء الله!
                <br />
                اللهم اجعل زوال الكيان اللقيط أقرب!
              </Tooltip>
            )}
          </Overlay>
          <div className='login-content flex-it'>
            <div className='login-form-wrapper'>
              <div className='login-form-icon'>
                <img src={LoginFormIcon} alt='inverstor icon' />
              </div>
              <div className='login-form-label'>تسجيل دخول مستثمر</div>
              <div className='login-form-input-wrapper'>
                <div className='login-form-input-label'>البريد الإلكتروني</div>
                <input
                  className={email !== "" ? "unempty" : ""}
                  type='text'
                  placeholder='يرجى إدخال بريدك الإلكتروني'
                  style={{
                    direction: "ltr",
                    // textAlign: email === "" ? "right" : "left",
                    textAlign: "right",
                  }}
                  onKeyUp={(e) => handleKeyboardSubmit(e)}
                  value={email}
                  onChange={(e) => {
                    setErrMsg("");
                    setEmail(e.target.value.replace(" ", ""));
                    validateEmail(e.target.value.replace(" ", ""));
                  }}
                />
                <div
                  style={{
                    border: "1.5px solid",
                    borderColor:
                      email === "" || emailIsValid ? "#08D7BD" : "#f14668",
                  }}></div>
              </div>
              <div className='login-form-input-wrapper'>
                <div className='login-form-input-label'>كلمة السر</div>
                <input
                  className={password !== "" ? "unempty" : ""}
                  placeholder='يرجى إدخال كلمة السر'
                  // style={{
                  //   direction: "rtl",
                  //   textAlign: password === "" ? "right" : "left",
                  // }}
                  type={pwInputType}
                  maxLength='20'
                  onChange={handlePwOnChange}
                  onKeyUp={(e) => handleKeyboardSubmit(e)}
                  value={password}
                />
                <svg
                  id='auth-toggle-show-pw-icon'
                  width='38'
                  height='38'
                  viewBox='0 0 38 38'
                  fill='none'
                  className='eye-icon'
                  alt='Show password'
                  onClick={handleShowPw}
                  xmlns='http://www.w3.org/2000/svg'>
                  <rect
                    width='38'
                    height='38'
                    viewBox='0 0 38 38'
                    x='0'
                    y='0'
                    fill='none'></rect>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5ZM12 9.5C10.34 9.5 9 10.84 9 12.5C9 14.16 10.34 15.5 12 15.5C13.66 15.5 15 14.16 15 12.5C15 10.84 13.66 9.5 12 9.5Z'
                    fill={pwInputType === "password" ? "#757575" : "#1DE9B6"}
                  />
                </svg>
                <div
                  style={{
                    border: "1.5px solid",
                    borderColor:
                      password === "" || password.length > 5
                        ? "#08D7BD"
                        : "#f14668",
                  }}></div>
              </div>
              <div className='login-form-submit-wrapper'>
                <BaseButton
                  id='login-form-submit-btn'
                  onClick={handleLoginSubmit}
                  loading={loading}
                  success={success}
                  error={error}
                  text='دخول'
                  textColor='#fff'
                  display={true}
                  displayIcon={LoginPalestineOldKeyIcon}
                  loginBtn={loginBtn}
                  disabled={loading || error}
                />
                <p className='login-err-msg'>{errMsg}</p>
                <span className={`splash ${success ? "expanded" : ""}`}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='login-al-aqsa-wrapper'>
        <div style={{ position: "relative", display: "flex" }}>
          <img
            className='login-al-aqsa'
            src={AlAqsaMob}
            alt='al aqsa al qibly'
          />
          <div className='login-al-aqsa-map'>
            <img src={LoginPalestineMap} alt='palestine map with stars' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
