import React, { useState, useEffect, Fragment } from "react";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import baseURL from "../../baseURL";
import "./Home.css";

const Home = () => {
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubTitle, setModalSubTitle] = useState(null);
  // Data
  const [data, setData] = useState([]);
  // Arabic Numerals
  const [isAraNum, setIsAraNum] = useState(false);
  const [showAraNumInfo, setShowAraNumInfo] = useState(false);

  String.prototype.EngNumbersToArabic = function () {
    return this.replace(/\d/g, (d) => String.fromCharCode("0x066" + d));
  };

  const reverseDateText = (text) => {
    const insert = (arr, index, newItem) => [
      // part of the array before the specified index
      ...arr.slice(0, index),
      // inserted item
      newItem,
      // part of the array after the specified index
      ...arr.slice(index),
    ];
    return insert(text.split("/").reverse(), 1, "/");
  };

  const getData = () => {
    const url = new URL("./get_data", baseURL);

    fetch(url, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setIsModal(true);
        setModalTitle("خطأ!");
        setModalMessage("فشل طلب البيانات! حاول مرة أخرى!");
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const beautifyNum = (num) => num.toLocaleString() + " $";

  const openSupportModal = () => {
    setModalTitle("تواصل معنا");
    setModalSubTitle(null);
    setModalMessage(
      <span>
        اضغط على الرابط لإرسال بريد إلكتروني إلى{" "}
        <a
          className='login-err-msg-email eng-text'
          onClick={() => (window.location = "mailto:support@m.shokry.com")}>
          support@mshokry.com
        </a>{" "}
        للمساعدة
      </span>
    );
  };

  const handleOpenSupportModal = () => {
    setIsModal(true);
    openSupportModal();
  };

  const handleOpenSupportModalMobile = () => {
    setTimeout(() => {
      setIsModal(true);
    }, 300);
    openSupportModal();
  };

  const handleOpenCardInfoModal = () => {
    setIsModal(true);
    setModalTitle("إجمالي دفعات الأرباح المستلمة والمتبقية");
    setModalSubTitle(
      "هنا تظهر تفاصيل دفعات الأرباح المستلمة و المخططة مستقبلاً إن وجد"
    );
    // Placeholder
    // setModalMessage(<span>بيانات دفعات الأرباح</span>);
    // Real data
    setModalMessage(JSXCardInfoModalData);
  };

  const handleOpenProfitDetailsModal = () => {
    setIsModal(true);
    setModalTitle("الأرباح السنوية");
    setModalSubTitle("هنا تظهر تفاصيل الأرباح لكل سنـة");
    // Placeholder
    // setModalMessage(<span>بيانات تفاصيل الأرباح سنوياً</span>);
    // Real data
    setModalMessage(JSXCardProfitDetailsData);
  };

  const handleCloseModal = () => {
    setIsModal(false);
    data.length === 0 && getData();
  };

  const openOriginOfNumsModal = () => {
    setIsModal(true);
    setModalTitle("نبذة عن تاريخ الأرقام");
    setModalSubTitle("وبصمة العرب المسلمون في تطويرها");
    setModalMessage(JSXOriginOfANums);
  };

  const JSXOriginOfANums = (
    <div style={{ display: "block !important" }}>
      <p>
        اختلف المؤرخون حول نشأة الأرقام التي يطلق عليها "العربية" على 3 أقسام،
        قسم يقول بأن أصلها هندي ونقلها العرب عنهم، وقسم آخر يرى أن أصلها عربي
        ونقلها عنهم الهنود، وفريق أخير يرى أن أصلها هندي لكن العرب نقلوها عنهم
        وطوروها حتى وصلت إلى شكلها الحالي..
      </p>
      <p>
        أما الأرقام التي يطلق عليها عامة الناس "الإنجليزية"، فأجمع المؤرخون أنها
        عربية الأصل وتسمى الأرقام "الغُبارية"، لكن اختلفوا إذا كان مبتكرها هو
        عالم الرياضيات البغدادي الأشهر محمد بن موسى الخوارزمي في القرن الثاني
        الهجري، أم عالم الرياضيات المغربي الفاسي ابن الياسَمين في القرن السادس
        الهجري..
      </p>
      <p style={{ color: "#ff8080" }}>
        ففي جميع الأحوال، اتفق المؤرخون على "فضل" العرب المسلمون في وصول الأرقام
        سواء العربية أو الإنجليزية إلى شكلها الحالي، فلا نبالغ حين نقول: أن
        الأرقام التي يستخدمها البشر اليوم عليها "بصمة" العرب المسلمون!
      </p>
      <h5>المصادر</h5>
      <div>
        <a
          href='https://misbar.com/qna/2022/12/26/%D9%87%D9%84-%D8%A7%D9%84%D8%A3%D8%B1%D9%82%D8%A7%D9%85-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-%D8%A3%D8%B5%D9%84%D9%87%D8%A7-%D9%87%D9%86%D8%AF%D9%8A%D8%A9'
          target='_blank'>
          رابط 1 (مقال)
        </a>
      </div>
      <div>
        <a href='https://www.youtube.com/watch?v=diAIioE1V4s' target='_blank'>
          رابط 2 (فيديو)
        </a>
      </div>
    </div>
  );

  const SVGCapitalIcon = (
    <svg
      width='70'
      height='76'
      viewBox='0 0 70 76'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M25.2891 14.998L38.5832 23.5312L37.2357 24.2691L25.4082 16.6771L5.34681 28.0406L16.8537 35.4265L16.2932 35.7333V36.6696L7.28028 30.8842L5.38864 31.9558L16.2933 38.9551V40.5579L7.45678 34.8858L5.38864 36.0575L16.2933 43.0568V44.6596L7.45678 38.9875L5.38864 40.1592L16.2933 47.1585V48.7613L2.61695 39.9826L6.0114 38.06L2.61708 35.8811L6.01153 33.9583L2.61722 31.7794L5.83517 29.9566L2.57552 27.8641L25.2891 14.998ZM21.0417 21.1148C23.918 22.558 27.7491 22.8022 30.4466 21.7141L35.7198 25.0988L18.3698 34.5967L13.3684 31.3865C15.3385 29.8312 15.1744 27.5105 12.9661 25.6894L21.0417 21.1148ZM38.8958 26.1658L48.5602 32.4677L30.0197 43.1408L29.8379 43.0245C29.4961 42.8044 29.0135 42.4927 28.4376 42.1204C27.2865 41.3763 25.763 40.3896 24.2439 39.4052C22.0561 37.9874 20.9288 37.256 19.8804 36.5759L38.8958 26.1658ZM23.1093 26.3257H23.1089C22.6716 26.3284 22.2708 26.4221 21.9714 26.5917C21.7971 26.6903 21.662 26.812 21.5737 26.9498C21.4854 27.0876 21.4456 27.2388 21.4566 27.3947C21.4677 27.5506 21.5293 27.7083 21.6381 27.8586C21.7468 28.0089 21.9005 28.149 22.0903 28.2708C22.2801 28.3927 22.5024 28.4939 22.7444 28.5687C22.9864 28.6435 23.2434 28.6904 23.5008 28.7068C23.7582 28.7231 24.0109 28.7086 24.2444 28.6641C24.478 28.6196 24.6879 28.5459 24.862 28.4472C25.2138 28.2479 25.3989 27.9591 25.3765 27.6443C25.3542 27.3294 25.1264 27.0143 24.7431 26.7683C24.5254 26.6285 24.2654 26.5162 23.9825 26.4395C23.6996 26.3629 23.4011 26.324 23.1093 26.3257ZM52.9718 32.7672L67.3826 42.0169L64.1647 43.8398L67.4243 45.9323L64.0299 47.855L67.4243 50.034L64.0299 51.9566L67.4243 54.1357L44.7106 67.0017L30.9971 58.1989V56.5966L44.5915 65.3225L64.6528 53.9589L62.7038 52.7079L44.7106 62.8999L30.9971 54.0974V52.495L44.5915 61.221L64.6528 49.8573L62.7038 48.6064L44.7106 58.7983L30.9971 49.9958V48.3935L44.5915 57.1194L64.6528 45.7558L62.8385 44.5909L44.6686 54.8831L30.9971 46.1074V45.417L31.7464 44.9858L44.5501 53.2039L64.6108 41.8404L51.6553 33.5247L52.9719 32.7668L52.9718 32.7672ZM50.1745 34.3778L56.5894 38.4951C54.6192 40.0501 54.7833 42.3708 56.9916 44.1921L48.9159 48.7667C46.0397 47.3234 42.2089 47.0793 39.5114 48.1674L33.2272 44.1336L50.1748 34.3776L50.1745 34.3778ZM18.7543 38.7788C19.854 39.492 20.8239 40.1216 22.9054 41.4705C24.3036 42.3768 25.7023 43.2825 27.1013 44.1875C27.6779 44.56 28.1616 44.8724 28.5065 45.0942C28.5188 45.1024 28.5239 45.1051 28.5359 45.1129V56.8603L18.7541 50.2858L18.7543 38.7788ZM46.2333 41.1686C45.796 41.1713 45.3951 41.2651 45.0958 41.4348C44.7441 41.634 44.559 41.9229 44.5813 42.2377C44.6036 42.5526 44.8315 42.8677 45.2148 43.1137C45.5981 43.3597 46.1054 43.5164 46.6251 43.5495C47.1448 43.5826 47.6343 43.4893 47.9861 43.2901C48.3378 43.0908 48.5229 42.802 48.5006 42.4871C48.4783 42.1723 48.2504 41.8572 47.8671 41.6111C47.6494 41.4714 47.3894 41.3591 47.1065 41.2824C46.8236 41.2058 46.5251 41.167 46.2333 41.1687V41.1686Z'
        fill='black'
      />
      <path
        d='M26.5 55.5C20.5 59.1 17 59.5 13 59C13.8 59.8 15.4549 61.6497 18 61.5C26.5 61 28.3333 59 30.5 57.5L26.5 55.5Z'
        fill='#7A7A7A'
      />
      <path d='M19 16.5L23 19L36.5 3.5L32.5 1.5L19 16.5Z' fill='#7A7A7A' />
      <path
        d='M36.5 3.5L23 19L36.5 18V13.75C42.9 11.15 46.8333 14.1667 48 16C50.8 20.4 49.8333 28.5 49 32L53 34.5C55.5 29.5 55 21.5 54.5 18.5C52.6667 7.5 40.5 7.5 36.5 9V3.5Z'
        fill='black'
      />
      <path
        d='M12.5 64C5.7 61.6 2.33333 53.8333 2 50.5L6 52.5C6 56.9 10.6667 62.1667 12.5 64Z'
        fill='#7A7A7A'
      />
      <path
        d='M34.5 60.5L30.5 57.5C26.5 60.5 19.8333 61.3333 17 61C10.6 59.4 10 52.6667 10.5 49.5L5.5 52.5C7.1 62.1 13.8333 65.5 17 66C24.6 66.4 31.8333 62.5 34.5 60.5Z'
        fill='black'
      />
      <path
        d='M45.5 29.5L49 32C49.8 29.6 50 25.1667 50 24C50 15 45.5 13.1667 43.5 13C48.5 18.5 46.5 27 45.5 29.5Z'
        fill='#7A7A7A'
      />
      <path d='M7 47.5L10.5 49.5L6 52.5L2 50.5L7 47.5Z' fill='#A2A2A2' />
    </svg>
  );

  const SVGProjectTypeIcon = (
    <svg
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M25.0002 14.5832C23.8496 14.5832 22.9168 13.6504 22.9168 12.4998C22.9168 11.3492 23.8496 10.4165 25.0002 10.4165C26.1508 10.4165 27.0835 11.3492 27.0835 12.4998C27.0835 13.6504 26.1508 14.5832 25.0002 14.5832Z'
        fill='black'
      />
      <path
        d='M37.5 35.4165H12.5V39.5832H37.5V35.4165ZM29.1667 24.6457L23.35 30.4665L15.1583 22.2686L12.5 24.9998V16.6665H20.8333L18.1042 19.3228L23.3521 24.5707L29.1667 18.7498L37.5 27.0832L34.5542 30.029L29.1667 24.6457Z'
        fill='black'
      />
      <path
        d='M10.4168 6.24982H17.2877C17.494 5.94306 17.7166 5.6475 17.9543 5.3644L17.9752 5.3394C19.5064 3.55726 21.6597 2.42623 23.996 2.1769C24.6596 2.05171 25.3407 2.05171 26.0043 2.1769C28.3407 2.42623 30.4939 3.55726 32.0252 5.3394L32.046 5.3644C32.2837 5.64682 32.5062 5.94168 32.7127 6.24773V6.24982H39.5835C41.2406 6.25147 42.8293 6.91048 44.0011 8.08223C45.1728 9.25397 45.8318 10.8427 45.8335 12.4998V41.6665C45.8318 43.3236 45.1728 44.9123 44.0011 46.0841C42.8293 47.2558 41.2406 47.9148 39.5835 47.9165H10.4168C8.75974 47.9148 7.17098 47.2558 5.99924 46.0841C4.8275 44.9123 4.16849 43.3236 4.16683 41.6665V12.4998C4.16849 10.8427 4.8275 9.25397 5.99924 8.08223C7.17098 6.91048 8.75974 6.25147 10.4168 6.24982ZM8.3335 41.6665C8.3335 42.219 8.55299 42.7489 8.94369 43.1396C9.33439 43.5303 9.8643 43.7498 10.4168 43.7498H39.5835C40.136 43.7498 40.6659 43.5303 41.0566 43.1396C41.4473 42.7489 41.6668 42.219 41.6668 41.6665V12.4998C41.6668 11.9473 41.4473 11.4174 41.0566 11.0267C40.6659 10.636 40.136 10.4165 39.5835 10.4165H30.1043C29.8653 9.2391 29.2265 8.18057 28.2963 7.42026C27.366 6.65994 26.2016 6.2446 25.0002 6.2446C23.7988 6.2446 22.6343 6.65994 21.7041 7.42026C20.7738 8.18057 20.1351 9.2391 19.896 10.4165H10.4168C9.8643 10.4165 9.33439 10.636 8.94369 11.0267C8.55299 11.4174 8.3335 11.9473 8.3335 12.4998V41.6665Z'
        fill='black'
      />
    </svg>
  );

  const SVGProfitAccountIcon = (
    <svg
      width='72'
      height='85'
      viewBox='0 0 72 85'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M25.2891 23.998L38.5832 32.5312L37.2357 33.2691L25.4082 25.6771L5.34681 37.0406L16.8537 44.4265L16.2932 44.7333V45.6696L7.28028 39.8842L5.38864 40.9558L16.2933 47.9551V49.5579L7.45678 43.8858L5.38864 45.0575L16.2933 52.0568V53.6596L7.45678 47.9875L5.38864 49.1592L16.2933 56.1585V57.7613L2.61695 48.9826L6.0114 47.06L2.61708 44.8811L6.01153 42.9583L2.61722 40.7794L5.83517 38.9566L2.57552 36.8641L25.2891 23.998ZM21.0417 30.1148C23.918 31.558 27.7491 31.8022 30.4466 30.7141L35.7198 34.0988L18.3698 43.5967L13.3684 40.3865C15.3385 38.8312 15.1744 36.5105 12.9661 34.6894L21.0417 30.1148ZM38.8958 35.1658L48.5602 41.4677L30.0197 52.1408L29.8379 52.0245C29.4961 51.8044 29.0135 51.4927 28.4376 51.1204C27.2865 50.3763 25.763 49.3896 24.2439 48.4052C22.0561 46.9874 20.9288 46.256 19.8804 45.5759L38.8958 35.1658ZM23.1093 35.3257H23.1089C22.6716 35.3284 22.2708 35.4221 21.9714 35.5917C21.7971 35.6903 21.662 35.812 21.5737 35.9498C21.4854 36.0876 21.4456 36.2388 21.4566 36.3947C21.4677 36.5506 21.5293 36.7083 21.6381 36.8586C21.7468 37.0089 21.9005 37.149 22.0903 37.2708C22.2801 37.3927 22.5024 37.4939 22.7444 37.5687C22.9864 37.6435 23.2434 37.6904 23.5008 37.7068C23.7582 37.7231 24.0109 37.7086 24.2444 37.6641C24.478 37.6196 24.6879 37.5459 24.862 37.4472C25.2138 37.2479 25.3989 36.9591 25.3765 36.6443C25.3542 36.3294 25.1264 36.0143 24.7431 35.7683C24.5254 35.6285 24.2654 35.5162 23.9825 35.4395C23.6996 35.3629 23.4011 35.324 23.1093 35.3257ZM52.9718 41.7672L67.3826 51.0169L64.1647 52.8398L67.4243 54.9323L64.0299 56.855L67.4243 59.034L64.0299 60.9566L67.4243 63.1357L44.7106 76.0017L30.9971 67.1989V65.5966L44.5915 74.3225L64.6528 62.9589L62.7038 61.7079L44.7106 71.8999L30.9971 63.0974V61.495L44.5915 70.221L64.6528 58.8573L62.7038 57.6064L44.7106 67.7983L30.9971 58.9958V57.3935L44.5915 66.1194L64.6528 54.7558L62.8385 53.5909L44.6686 63.8831L30.9971 55.1074V54.417L31.7464 53.9858L44.5501 62.2039L64.6108 50.8404L51.6553 42.5247L52.9719 41.7668L52.9718 41.7672ZM50.1745 43.3778L56.5894 47.4951C54.6192 49.0501 54.7833 51.3708 56.9916 53.1921L48.9159 57.7667C46.0397 56.3234 42.2089 56.0793 39.5114 57.1674L33.2272 53.1336L50.1748 43.3776L50.1745 43.3778ZM18.7543 47.7788C19.854 48.492 20.8239 49.1216 22.9054 50.4705C24.3036 51.3768 25.7023 52.2825 27.1013 53.1875C27.6779 53.56 28.1616 53.8724 28.5065 54.0942C28.5188 54.1024 28.5239 54.1051 28.5359 54.1129V65.8603L18.7541 59.2858L18.7543 47.7788ZM46.2333 50.1686C45.796 50.1713 45.3951 50.2651 45.0958 50.4348C44.7441 50.634 44.559 50.9229 44.5813 51.2377C44.6036 51.5526 44.8315 51.8677 45.2148 52.1137C45.5981 52.3597 46.1054 52.5164 46.6251 52.5495C47.1448 52.5826 47.6343 52.4893 47.9861 52.2901C48.3378 52.0908 48.5229 51.802 48.5006 51.4871C48.4783 51.1723 48.2504 50.8572 47.8671 50.6111C47.6494 50.4714 47.3894 50.3591 47.1065 50.2824C46.8236 50.2058 46.5251 50.167 46.2333 50.1687V50.1686Z'
        fill='black'
      />
      <g clipPath='url(#clip0_437_1290)'>
        <path
          d='M38.5119 46.2997L39.8773 45.7411L39.8886 26.4609L41.2112 27.2986L41.1999 45.2002L44.3116 43.9273L44.2988 29.2499L51.8505 34.0232L52.1431 34.2069L52.4596 34.075L53.7492 33.5355L53.5667 16.533L54.8856 16.0007L55.0666 32.9824L57.056 32.1495L57.9166 31.7879L57.8863 31.7549L57.9252 31.739L57.9245 14.772L60.8968 13.5728L54.5133 3.83866L49.2367 18.2804L52.1467 17.1044L52.1467 27.2226L45.402 23.0203L45.1102 22.8384L44.7926 22.9732L44.2934 23.1844L44.2937 23.1676L38.525 25.6157L38.5117 46.2997L38.5119 46.2997ZM41.4009 25.8519L44.994 24.3247L52.1481 28.7801L52.1468 32.6447L41.4009 25.8519Z'
          fill='black'
        />
      </g>
      <defs>
        <clipPath id='clip0_437_1290'>
          <rect
            width='36.2389'
            height='36.2389'
            fill='white'
            transform='translate(37.9302 48.208) rotate(-112.247)'
          />
        </clipPath>
      </defs>
    </svg>
  );

  const JSXCapitalCardSubData = (
    <div id='capital-sub-data'>
      <div className='custom-column'>
        <div className='row ara-text'>إجمالي المسترّد منه</div>
        <div className='row eng-text rtl'>
          {data.length !== 0 &&
            (isAraNum
              ? beautifyNum(data.capitalValPaid).EngNumbersToArabic()
              : beautifyNum(data.capitalValPaid))}
        </div>
      </div>
      <div className='custom-column'>
        <div className='row ara-text'>الرصيد المتبقي منه</div>
        <div className='row eng-text rtl'>
          {data.length !== 0 &&
            (isAraNum
              ? beautifyNum(data.capitalValRem).EngNumbersToArabic()
              : beautifyNum(data.capitalValRem))}
        </div>
      </div>
    </div>
  );

  const JSXCardInfoModalData =
    data.length !== 0 && data.paymentsHistory.length !== 0 ? (
      <div id='data-row' className='payments-history'>
        {data.paymentsHistory.map((obj, index) => {
          return (
            <div className='row eng-text rtl' key={index}>
              <div className='right'>
                <div className='circle flex-it'>{index + 1} </div>
                <div className='value'>
                  <span className='eng-text rtl'>
                    {isAraNum
                      ? beautifyNum(obj.value).EngNumbersToArabic()
                      : beautifyNum(obj.value)}
                  </span>
                  {!obj.done && (
                    <span className='upcoming ara-text'>قادمة</span>
                  )}
                </div>
              </div>
              <div className='left'>
                <div className='eng-text rtl'>
                  <span>
                    {isAraNum
                      ? reverseDateText(
                          obj.date.toString().EngNumbersToArabic()
                        )
                      : obj.date}
                  </span>
                </div>
                <Form.Check
                  inline
                  disabled
                  type='checkbox'
                  id='data-row-checkbox'
                  checked={obj.done}
                />
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <span className='eng-text rtl'>N/A</span>
    );

  const JSXCardProfitDetailsData =
    data.length !== 0 ? (
      <Accordion
        id='annual-profit-accordion'
        defaultActiveKey={["0"]}
        alwaysOpen>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>
            السنة الحالية{" "}
            <span className='year eng-text rtl pr-1'>
              {isAraNum
                ? (data.currYearVal != 0
                    ? data.currYearVal
                    : new Date().getFullYear()
                  )
                    .toString()
                    .EngNumbersToArabic()
                : data.currYearVal != 0
                ? data.currYearVal
                : new Date().getFullYear()}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <div id='data-row' className='profit-by-year'>
              <div className='row eng-text rtl'>
                <div className='right'>
                  <div className='value'>
                    <span>
                      {isAraNum
                        ? beautifyNum(data.currYearProfit).EngNumbersToArabic()
                        : beautifyNum(data.currYearProfit)}
                    </span>
                    <span className='upcoming ara-text'>الربح</span>
                  </div>
                </div>
                <div className='left'>
                  <div className='value'>
                    <span>
                      {isAraNum
                        ? beautifyNum(data.currYearPaid).EngNumbersToArabic()
                        : beautifyNum(data.currYearPaid)}
                    </span>
                    <span className='upcoming ara-text'>صُرف منه</span>
                  </div>
                </div>
              </div>
              {data.currYearProfit != 0 &&
                data.currYearProfit == data.currYearPaid && (
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    className='profit-fully-paid-svg'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM14 21.59L9.00001 16.59L10.59 15L14 18.41L21.41 11L23.006 12.586L14 21.59Z'
                      fill='#7AC142'
                    />
                  </svg>
                )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>
            السنة السابقة{" "}
            <span className='year eng-text rtl pr-1'>
              {isAraNum
                ? (data.lastYearVal != 0
                    ? data.lastYearVal
                    : new Date().getFullYear() - 1
                  )
                    .toString()
                    .EngNumbersToArabic()
                : data.lastYearVal != 0
                ? data.lastYearVal
                : new Date().getFullYear() - 1}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <div id='data-row' className='profit-by-year'>
              <div className='row eng-text rtl'>
                <div className='right'>
                  <div className='value'>
                    <span>
                      {isAraNum
                        ? beautifyNum(data.lastYearProfit).EngNumbersToArabic()
                        : beautifyNum(data.lastYearProfit)}
                    </span>
                    <span className='upcoming ara-text'>الربح</span>
                  </div>
                </div>
                <div className='left'>
                  <div className='value'>
                    <span>
                      {isAraNum
                        ? beautifyNum(data.lastYearPaid).EngNumbersToArabic()
                        : beautifyNum(data.lastYearPaid)}
                    </span>
                    <span className='upcoming ara-text'>صُرف منه</span>
                  </div>
                </div>
              </div>
              {data.lastYearProfit != 0 &&
                data.lastYearProfit == data.lastYearPaid && (
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    className='profit-fully-paid-svg'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM14 21.59L9.00001 16.59L10.59 15L14 18.41L21.41 11L23.006 12.586L14 21.59Z'
                      fill='#7AC142'
                    />
                  </svg>
                )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>
            السنة قبل السابقة{" "}
            <span className='year eng-text rtl pr-1'>
              {isAraNum
                ? (data.yearBeforeVal != 0
                    ? data.yearBeforeVal
                    : new Date().getFullYear() - 2
                  )
                    .toString()
                    .EngNumbersToArabic()
                : data.yearBeforeVal != 0
                ? data.yearBeforeVal
                : new Date().getFullYear() - 2}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <div id='data-row' className='profit-by-year'>
              <div className='row eng-text rtl'>
                <div className='right'>
                  <div className='value'>
                    <span>
                      {isAraNum
                        ? beautifyNum(
                            data.yearBeforeProfit
                          ).EngNumbersToArabic()
                        : beautifyNum(data.yearBeforeProfit)}
                    </span>
                    <span className='upcoming ara-text'>الربح</span>
                  </div>
                </div>
                <div className='left'>
                  <div className='value'>
                    <span>
                      {isAraNum
                        ? beautifyNum(data.yearBeforePaid).EngNumbersToArabic()
                        : beautifyNum(data.yearBeforePaid)}
                    </span>
                    <span className='upcoming ara-text'>صُرف منه</span>
                  </div>
                </div>
              </div>
              {data.yearBeforeProfit != 0 &&
                data.yearBeforeProfit == data.yearBeforePaid && (
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    className='profit-fully-paid-svg'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM14 21.59L9.00001 16.59L10.59 15L14 18.41L21.41 11L23.006 12.586L14 21.59Z'
                      fill='#7AC142'
                    />
                  </svg>
                )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    ) : (
      <span className='eng-text rtl'>N/A</span>
    );

  return (
    <div id='home-wrapper' className='home wrapper'>
      <div className='qobba wrapper'> </div>
      {data.length !== 0 ? (
        <Fragment>
          <Navbar
            handleOpenSupportModal={handleOpenSupportModal}
            handleOpenSupportModalMobile={handleOpenSupportModalMobile}
            userFullName={data.userFullName}
            setIsAraNum={setIsAraNum}
            isAraNum={isAraNum}
            showAraNumInfo={showAraNumInfo}
            setShowAraNumInfo={setShowAraNumInfo}
            openOriginOfNumsModal={openOriginOfNumsModal}
          />
          <Container fluid='sm'>
            <div className='home-content'>
              <div className='home-title'>رأس المال ونوع الاستثمار</div>
              <div className='home-section home-section-1'>
                <Row className='main-row'>
                  <Col className='main-col'>
                    <Card
                      title='رأس المال'
                      titleValue={beautifyNum(data.capitalVal)}
                      icon={SVGCapitalIcon}
                      hasSubData={true}
                      subDataValue={JSXCapitalCardSubData}
                      isAraNum={isAraNum}
                    />
                  </Col>
                  <Col className='main-col'>
                    <Card
                      title='نوع الاستثمار'
                      titleValue={data.investmentType}
                      icon={SVGProjectTypeIcon}
                      hasSubData={true}
                      subDataValue={data.investmentSubType}
                      isAraNum={isAraNum}
                    />
                  </Col>
                </Row>
              </div>
              <div className='home-title'>حساب الأرباح</div>
              <div className='home-section home-section-2'>
                <Row className='main-row'>
                  <Col className='main-col'>
                    <Card
                      title='الربح التالي المستحق'
                      titleValue={beautifyNum(data.profitAccountProfitVal)}
                      icon={SVGProfitAccountIcon}
                      isAraNum={isAraNum}
                    />
                  </Col>
                  <Col className='main-col'>
                    <Card
                      title='موعد الصرف المتوقع'
                      titleValue={data.profitAccountPaymentDue}
                      icon={SVGProfitAccountIcon}
                      hasInfoIcon={true}
                      action={handleOpenCardInfoModal}
                      isAraNum={isAraNum}
                      isDate={true}
                      reverseDateText={reverseDateText}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} lg={8} className='home-details-col-wrapper'>
                    <Button
                      className='home-details-button'
                      variant='warning'
                      onClick={handleOpenProfitDetailsModal}>
                      تفاصيل الأرباح السنوية
                    </Button>
                  </Col>
                  {/* <Row xs={12} lg={4}></Row> */}
                </Row>
              </div>
            </div>
          </Container>
        </Fragment>
      ) : (
        <div className='flex-it' style={{ height: "100svh" }}>
          <span className='loader'></span>
        </div>
      )}
      <Modal
        title={modalTitle}
        subTitle={modalSubTitle}
        modalMessage={modalMessage}
        isModal={isModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default Home;
