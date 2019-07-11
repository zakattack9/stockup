import React from 'react';
import Fade from 'react-reveal/Fade';
import MarketIndex from './home/MarketIndex';
import SearchBar from './home/SearchBar';
import './Home.css';

const Home = () => {
  return (
    <div className="Home">
      <div className="marketIndexWrapper">
        <MarketIndex name="DJIA" index="^DJI" />
        <MarketIndex name="NASDAQ" index="^IXIC" />
        <MarketIndex name="S&P 500" index="^GSPC" />
      </div>

      <div className="searchWrapper">
        <Fade bottom distance={'15px'}>
          <StockupLogo />
          <div className="stockupPhrase">Stock up on all the news for the stocks you follow</div>
        </Fade>
        <Fade bottom distance={'15px'} delay={210}>
          <SearchBar />
        </Fade>
      </div>
    </div>
  );
};

const StockupLogo = () => {
  return (
    <div className="StockupLogo">
      <svg width="100%" viewBox="0 0 318 61" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <g id="Full-App" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Desktop-HD-Copy-7" transform="translate(-555.000000, -278.000000)" fillRule="nonzero">
            <g id="stockup." transform="translate(555.000000, 278.000000)">
              <path d="M21.4921326,48.9433761 C18.4575543,48.9433761 15.5422353,48.6175246 12.7460882,47.965812 C9.94994104,47.3140993 7.77158001,46.488609 6.21093975,45.4893162 C5.42447375,44.8359639 4.87396343,44.3433592 4.55940878,44.011502 C4.2517798,43.6869515 3.86901468,43.1949448 3.41111341,42.5354819 L1.24485508,44.9429594 L0,33.5304487 L10.9928427,32.8230716 L9.19086713,35.0619658 C9.46196907,35.4827262 9.68710775,35.7977191 9.86628314,36.0069444 C10.0219724,36.1887447 10.2991307,36.4602903 10.6977581,36.8215812 C12.3017494,37.8208739 14.20917,38.6137791 16.4200771,39.2003205 C18.6309841,39.7868619 20.7985075,40.0801282 22.9227123,40.0801282 C26.6942596,40.0801282 28.580005,39.2329145 28.580005,37.5384615 C28.580005,36.8433014 28.1356627,36.3328008 27.2469648,36.0069444 C26.3582668,35.6810881 24.938539,35.3660984 22.9877387,35.0619658 C20.3866716,34.5840432 18.251661,34.0735426 16.582643,33.5304487 C14.9136249,32.9873548 13.4505466,32.0641091 12.1933642,30.7606838 C10.9361817,29.4572584 10.3076,27.6324904 10.3076,25.2863248 C10.3076,21.2022588 12.0524563,18.0414998 15.5422213,15.803953 C19.0319864,13.5664062 23.5512727,12.4476496 29.1002158,12.4476496 C31.6145807,12.4476496 34.0422069,12.697469 36.3831673,13.1971154 C38.724116,13.6967618 40.7615997,14.3810498 42.4956444,15.25 L38.1388788,23.917735 C35.1910027,22.1363871 31.7012901,21.2457265 27.6696361,21.2457265 C25.7621868,21.2457265 24.342459,21.4955459 23.41041,21.9951923 C22.4783609,22.4948387 22.0123434,23.1356799 22.0123434,23.917735 C22.0123434,24.6128952 22.4566857,25.1233958 23.3453836,25.4492521 C24.2340815,25.7751085 25.6971598,26.1335451 27.7346624,26.5245726 C30.2490273,26.9590478 32.3406874,27.4586866 34.0097054,28.0235043 C35.6787235,28.5883219 37.1309642,29.5224294 38.366471,30.8258547 C39.6019779,32.12928 40.2197221,33.9106012 40.2197221,36.1698718 C40.2197221,40.2539378 38.4640281,43.4038462 34.9525875,45.6196581 C31.4411469,47.8354812 26.9543735,48.9433761 21.4921326,48.9433761 Z M62.2636555,35.1923077 C62.1769533,35.8005728 62.1336028,36.1915946 62.1336028,36.3653846 C62.1336028,38.3639701 63.2173645,39.3632479 65.3849205,39.3632479 C66.5553948,39.3632479 67.790889,39.015673 69.0914225,38.3205128 L70.652055,46.857906 C68.2243924,48.2482263 65.1681844,48.9433761 61.4833393,48.9433761 C57.8418454,48.9433761 54.9482016,48.030992 52.8023213,46.2061966 C50.6564409,44.3814011 49.5835168,41.8397599 49.5835168,38.5811966 C49.5835168,37.3212188 49.691893,36.2133239 49.9086486,35.2574786 L52.2495973,23.5918803 L47.0474891,23.5918803 L48.9332533,14.3376068 L54.0703351,14.3376068 L55.891073,5.14850427 L68.24608,5.14850427 L66.4253421,14.3376068 L74.4235834,14.3376068 L72.6028456,23.5918803 L64.6046042,23.5918803 L62.2636555,35.1923077 Z M96.0773588,48.9433761 C92.3491626,48.9433761 89.0978775,48.2808115 86.3234059,46.9556624 C83.5489344,45.6305133 81.4030862,43.7514367 79.885797,41.3183761 C78.3685079,38.8853155 77.6098747,36.0612696 77.6098747,32.8461538 C77.6098747,28.9793254 78.5419098,25.5035767 80.4060079,22.4188034 C82.270106,19.3340302 84.8494588,16.9010061 88.1441438,15.1196581 C91.4388288,13.3383102 95.1452938,12.4476496 99.2636501,12.4476496 C102.991846,12.4476496 106.243131,13.1102142 109.017603,14.4353632 C111.792075,15.7605123 113.937923,17.6287273 115.455212,20.0400641 C116.972501,22.4514009 117.731134,25.2645851 117.731134,28.4797009 C117.731134,32.3465293 116.799099,35.8331397 114.935001,38.9396368 C113.070903,42.0461338 110.502388,44.4900196 107.229378,46.2713675 C103.956369,48.0527155 100.239066,48.9433761 96.0773588,48.9433761 Z M96.7926487,38.9722222 C99.2636624,38.9722222 101.279459,38.0598382 102.840099,36.2350427 C104.40074,34.4102473 105.181048,32.0423935 105.181048,29.1314103 C105.181048,27.0459297 104.595817,25.3949491 103.425337,24.1784188 C102.254856,22.9618885 100.629214,22.3536325 98.5483602,22.3536325 C96.0773464,22.3536325 94.0615497,23.2660165 92.5009094,25.090812 C90.9402692,26.9156074 90.1599607,29.3051847 90.1599607,32.2596154 C90.1599607,34.3450959 90.7451921,35.9852148 91.9156722,37.1800214 C93.0861524,38.3748279 94.711795,38.9722222 96.7926487,38.9722222 Z M142.05099,48.9433761 C138.322794,48.9433761 135.060671,48.2808115 132.264524,46.9556624 C129.468377,45.6305133 127.300853,43.7514367 125.761889,41.3183761 C124.222924,38.8853155 123.453453,36.0612696 123.453453,32.8461538 C123.453453,28.9793254 124.385488,25.5035767 126.249586,22.4188034 C128.113684,19.3340302 130.714713,16.9010061 134.052749,15.1196581 C137.390785,13.3383102 141.1406,12.4476496 145.302308,12.4476496 C149.29061,12.4476496 152.736973,13.2840016 155.641498,14.9567308 C158.546023,16.6294599 160.670195,18.986452 162.01408,22.0277778 L151.479811,27.0459402 C150.179278,23.9177194 147.903378,22.3536325 144.652044,22.3536325 C142.137679,22.3536325 140.067694,23.2660165 138.442027,25.090812 C136.81636,26.9156074 136.003539,29.2617378 136.003539,32.1292735 C136.003539,34.214754 136.599608,35.8765964 137.791764,37.1148504 C138.98392,38.3531045 140.685426,38.9722222 142.896333,38.9722222 C144.543675,38.9722222 145.995916,38.6029239 147.253098,37.8643162 C148.510281,37.1257086 149.594042,35.9526434 150.504416,34.3450855 L159.543079,39.8194444 C157.852385,42.6869801 155.478947,44.9244934 152.422693,46.5320513 C149.366439,48.1396092 145.909239,48.9433761 142.05099,48.9433761 Z M192.706519,28.6752137 L204.541315,48.3568376 L190.105464,48.3568376 L182.887539,36.3002137 L177.815484,40.7318376 L176.319878,48.3568376 L163.964871,48.3568376 L173.588771,0 L185.943778,0 L180.936749,25.090812 L195.17752,13.034188 L210.783844,13.034188 L192.706519,28.6752137 Z M253.376105,13.034188 L246.353259,48.3568376 L234.648516,48.3568376 L235.363806,44.707265 C233.846517,46.1410328 232.145001,47.2054809 230.259237,47.900641 C228.373463,48.5958012 226.43353,48.9433761 224.439378,48.9433761 C220.581129,48.9433761 217.514072,47.9006515 215.23815,45.8151709 C212.962216,43.7296904 211.824266,40.7535806 211.824266,36.8867521 C211.824266,35.4529843 211.975993,33.9975145 212.279451,32.5202991 L216.181032,13.034188 L228.536039,13.034188 L224.894563,31.3472222 C224.721158,32.1727249 224.634458,32.9764918 224.634458,33.758547 C224.634458,36.8433203 226.21675,38.3856838 229.381381,38.3856838 C231.505586,38.3856838 233.26128,37.7231192 234.648516,36.3979701 C236.035752,35.072821 236.989462,33.1068506 237.509675,30.5 L241.021098,13.034188 L253.376105,13.034188 Z M285.108965,12.4476496 C287.710032,12.4476496 290.148496,13.0884907 292.42443,14.3701923 C294.700364,15.6518939 296.531921,17.5092471 297.919157,19.9423077 C299.306393,22.3753683 300,25.2211376 300,28.4797009 C300,32.3465293 299.143828,35.8331397 297.431459,38.9396368 C295.71909,42.0461338 293.39984,44.4900196 290.473639,46.2713675 C287.547439,48.0527155 284.350342,48.9433761 280.882252,48.9433761 C275.76682,48.9433761 272.168732,47.3358423 270.087878,44.1207265 L266.706508,61 L254.351501,61 L263.910374,13.034188 L275.615118,13.034188 L274.899828,16.357906 C277.717651,13.7510553 281.120662,12.4476496 285.108965,12.4476496 Z M279.126541,38.9722222 C281.597555,38.9722222 283.613351,38.0598382 285.173992,36.2350427 C286.734632,34.4102473 287.51494,32.0423935 287.51494,29.1314103 C287.51494,27.0459297 286.918871,25.3949491 285.726716,24.1784188 C284.53456,22.9618885 282.89808,22.3536325 280.817226,22.3536325 C278.346212,22.3536325 276.330416,23.2660165 274.769775,25.090812 C273.209135,26.9156074 272.428827,29.3051847 272.428827,32.2596154 C272.428827,34.3450959 273.024896,35.9852148 274.217051,37.1800214 C275.409207,38.3748279 277.045687,38.9722222 279.126541,38.9722222 Z" id="stockup" fill="#333333"></path>
              <path d="M310.074236,48 C308.021824,48 306.329701,47.344451 304.997817,46.0333333 C303.665932,44.7222157 303,43.0666767 303,41.0666667 C303,38.6666547 303.775101,36.7222297 305.325328,35.2333333 C306.875554,33.744437 308.764181,33 310.991266,33 C313.087347,33 314.77947,33.633327 316.067686,34.9 C317.355902,36.166673 318,37.844434 318,39.9333333 C318,42.2889007 317.224899,44.2222147 315.674672,45.7333333 C314.124446,47.244452 312.257653,48 310.074236,48 Z" id="." fill="#1ABA34"></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default Home;