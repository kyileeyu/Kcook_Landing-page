<template>
<div class="landing-page">
      <header class="landing-header">
        <img src="./assets/icon-menu.svg" alt="menu" class="menu" />
        <img src="./assets/logo.webp" alt="logo" class="logo"/>
        <img src="./assets/search.svg" alt="search" class="search"/>
      </header>


  <div class="intro">
    <div class="kcook-img">
      <img src="./assets/intro-kcook.webp" alt="kcook-logo" class="kcook-logo" />
    </div>
    <p class="intro-span">
      <span>쉽게! 간편하게!</span>
      <br />
      커스텀케이크 주문 플랫폼이 온다.
    </p>
    <div class="end-time" id="end-time">
      <div class="end-time-day"></div>
      <img src="./assets/colon.svg" alt=":" class="colon" />
      <div class="end-time-hours"></div>
      <img src="./assets/colon.svg" alt=":" class="colon" />
      <div class="end-time-minutes"></div>
      <img src="./assets/colon.svg" alt=":" class="colon" />
      <div class="end-time-seconds"></div>
    </div>
    <div class="time-desc">
      <p class="time-desc-text">일</p>
      <p class="time-desc-text">시간</p>
      <p class="time-desc-text">분</p>
      <p class="time-desc-text">초</p>
    </div>




    <div class="bar"></div>
    <p class="intro-title">
      <span>케이쿡 Beta 0.1.0</span>
      <br />
      출시 알림 신청 이벤트
    </p>
    <p class="title-desc">출시 알림 신청하고, 랜덤 쿠폰 받자!</p>
    <div class="coupon-img">
      <img src="./assets/coupon.webp" class="kcook-coupon" alt="kcook-coupon" />
    </div>
    <span class="intro-footer">
      *이벤트 및 베타 서비스 일정은 내부 사정 등에 의해 변경될 수 있습니다.
    </span>
  </div>
  <div class="get-email">
    <h1 class="get-email-title">출시 알림 신청하기</h1>
      <p class="get-email-desc">고객 정보(필수)</p>


    <form class="get-email-form" @submit="checkForm" method="post" id="registerForm" v-on:submit.prevent="submitForm">
        <span>휴대폰번호</span>
        <input placeholder="0100000000" type="string"  name="phoneNumber"  v-model="form.phoneNumber"/>
      <span>거주지역</span>
      <!-- <v-select label="지역 선택" v-model="cityName"> </v-select> -->
      <select class="dropdown-bar-do" v-model="form.city" aria-label="지역 선택">
        <option disabled selected >지역 선택</option>
        <option v-for="i in loadCity" v-bind:key="i" > {{i.cityName}}</option>

      </select>

      <select class="dropdown-bar-si"  v-model="form.location" v-if="form.city == '서울특별시'">
        <option  selected disabled>시/군 선택</option>
        <option v-for="se in loadSeoul" v-bind:key="se" > {{se.locationName}}</option>
      </select>

      <select class="dropdown-bar-si"  v-model="form.location" v-else-if="form.city == '경기도'">
        <option  selected disabled>시/군 선택</option>
        <option v-for="gung in loadGunggi" v-bind:key="gung" > {{gung.locationName}}</option>
      </select>

      <select class="dropdown-bar-si"  v-model="form.location" v-else>
        <option  selected disabled>시/군 선택</option>
        <option> - </option>
      </select>



      <p class="get-email-sub">개인정보 제공 및 SMS 수신에 동의합니다.</p>
      <button class="get-email-btn">출시 알림 신청</button>
    </form>

    <footer class="kcook-info">
      케이쿡 | 대표 정예빈 | 입점 문의 : cakeorder.kcook@gmail.com
    </footer>
  </div>
</div>
</template>

<script>
import axios from 'axios';
// import func from 'vue-editor-bridge';

// 디데이
window.onload = function() {
  // const title = document.querySelector(".end-time");
const titleDay = document.querySelector(".end-time-day");
const titleHour = document.querySelector(".end-time-hours");
const titleMin = document.querySelector(".end-time-minutes");
const titleSec = document.querySelector(".end-time-seconds");

const getDDay = () => {
  const setDate = new Date("2022-01-01T00:00:00+0900");
  // const setDateYear = setDate.getFullYear();
  // const setDateMonth = setDate.getMonth() + 1;
  // const setDateDay = setDate.getDate();

  const now = new Date();

  const distance = setDate.getTime() - now.getTime();

  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  titleDay.innerText = `${day}`;
  titleHour.innerText = `${hours < 10 ? `0${hours}`: hours} `;
  titleMin.innerText = `${minutes < 10 ? `0${minutes}` : minutes}`;
  titleSec.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`;
};

const init = () => {
  getDDay();
  setInterval(getDDay, 1000);
};
  init();
}


// axios
      


export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      city:0,
      loadCity :[],
      loadSeoul :[],
      loadGunggi :[],
      form: {
                phoneNumber: '',
                city: '',
                location: '',
            }
      }
  },
  methods:{
    getCity(){
      axios.get(`https://prod.kcook-cake.com/app/cities`)
      .then(res =>{
        this.loadCity =res.data.result;
          })
      .catch((error) => {
        console.error(error);
        }
        );
    },
    getSeoul(){
      axios.get(`https://prod.kcook-cake.com/app/locations/1`)
      .then(res =>{
        console.log(res.data.result);
        this.loadSeoul =res.data.result;
          })
      .catch((error) => {
        console.error(error);
        }
        );
    },
    getGunggi(){
      axios.get(`https://prod.kcook-cake.com/app/locations/9`)
      .then(res =>{
        console.log(res.data.result);
        this.loadGunggi =res.data.result;
          })
      .catch((error) => {
        console.error(error);
        }
        );
    },
    // whereCity() {
    //         let cityid = {
    //             cityid: this.cityid
    //         }
    //         console.log(cityid);

            
    // },
    submitForm(){
      axios.post('https://prod.kcook-cake.com/app/applicants', this.form)
            .then((res) => {
                console.log(res.data);
                console.log('전송성공!');
            })
            .catch((error) => {
                console.error(error);
                console.log(this.form);
            })
            ;
        }

        
  },
  mounted(){
    this.getCity(),
    // this.whereCity(),
    this.getSeoul(),
    this.getGunggi()
  },

}
</script>

<style>

/* reset.css */
button,
input {
  border: none;
  background-color: inherit;
  color: inherit;
}
a {
  text-decoration: none;
  color: initial;
  margin: 0;
}

Link {
  color: #333333;
}

select {
  border: none;
  background-color: inherit;
}
select:focus {
  outline: none;
}

input:focus {
  outline: none;
}
* {
  box-sizing: border-box;
  margin: 0 auto;
}
body {
  max-width: 100%;
}


/* 디데이!!!!!! */

.end-time{
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
  font-weight: 900;
  line-height: 28px;
  color: #f96d6d;
}
.colon{
  margin-bottom: 8px;
}
.end-time-day, .end-time-hours ,.end-time-minutes ,.end-time-seconds{
  width:60px;
  padding:10px 3px 5px 5px;
    background-color: rgba(255, 255, 255, 0.84);
  border-radius: 16px;
 letter-spacing: 2px;
}

.time-desc{
  display: flex;
  align-items: right;

  font-size: 10px;
  font-weight: bold;
  line-height: 2;
  color: #fff;
}

.time-desc-text{
  width:78px;
  text-align: right;
  padding-right: 5px;
  /* margin: 0 1px 0s 29px; */

}


.bar{
  margin-top: 35px;
  margin-bottom: 25px;
  width: 56px;
  border-bottom: 4px solid #ffa4a1;
  border-radius: 2px;

}








.landing-page {
  height: -webkit-fill-available;
  background-color: #f7d2d1;
}
/* // 헤더 */
.landing-header {
  width: 100%;
  position: fixed;
  margin: 0 0;
  padding: 10px 5vw;
  display: flex;
  justify-content: space-between;

  background-color: #fff;
  
}

.landing-header .menu{
  margin: 0;
  width: 30px; 
}

.landing-header .search{
  margin: 0;
  width: 18px;
}

.landing-header .logo{
  width: 88px;

}
/* // intro */

.intro {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 60px;
}


  .kcook-logo {
    margin-top: 36px;
    width: 30vw;
  }
.intro-span {
  margin-bottom: 12px;
  color: #f96d6d;
  font-size: 14px;
  font-weight: 700;
}

.intro-span  span {
    font-size: 10px;
  }
.intro-title {
  margin-bottom: 12px;
  color: #ea5450;
  font-size: 28px;
  font-weight: 900;
  line-height: 33px;
}
.intro-title span {
    letter-spacing: 1.68px;
  }
.title-desc {
  margin-bottom: 40px;
  color: #525252;
  font-size: 12px;
  font-weight: bold;
}

.coupon-img {
  margin-bottom: 40px;
  overflow: hidden;
}
.kcook-coupon {
  width: 80vw;
}

.intro-footer {
  margin-bottom: 45px;
  color: #808080;
  font-size: 10px;
  font-weight: 500;
}

/* // 이메일 정보 확인 */

.get-email {
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -8px 10px 0 rgba(0, 0, 0, 0.16);
}

.get-email-desc {
  margin-bottom: 14px;
  color: #525252;
  font-size: 14px;
  font-weight: 500;
  padding: 0 12vw;
}
.get-email-title {
  padding: 20px 0;
  text-align: center;
  font-size: 26px;
  font-weight: 900;
  color: #ea5450;
}

.get-email-form {
  padding: 0 11vw;
  display: grid;
  grid-template-columns: 1.2fr 2fr 2fr;
  align-items: center;
  text-align: left;
  justify-content: center;
  row-gap: 14px;
  column-gap: 5px;
}
.get-email-form  span {
    display: block;
    /* // padding-right: 16px; */
    font-size: 12px;
    color: #808080;
    font-weight: 500;
  }
.get-email-form  input {
   padding-left: 10px;
    height: 36px;
    width: 100%;
    border: 1px solid #ea5450;
  }
.get-email-form  select {
  padding-left: 8px;
    width: 100%;
    height: 36px;
    border: 1px solid #ea5450;
    margin-right: 6px;
  }
.get-email-form  :nth-child(2) {
    grid-column: 2 / span 2;
  }
.get-email-form :nth-child(6),
.get-email-form :nth-child(7) {
    grid-column: 1 / span 3;
  }

.get-email-sub {
  text-align: center;
  padding: 2px;
  font-size: 10px;
  color: #808080;
  font-weight: 500;
}

.get-email-btn {
  display: block;
  margin: 0 auto 20px;
  padding: 7px 0;
  width: 70vw;
  background-color: #ea5450;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border-radius: 17px;
}
.kcook-info {
  color: #999999;
  font-size: 10px;
  font-weight: 300;
  padding: 0 5vw 16px;
}

/* // 눈송이 부분 */
.snowflake {
  font-size: 26px;
}

#outer {
  width: 98%;
  height: 600px;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}
.snowflake {
  height: 600px;
  color: #fff;
  font-size: 1em;
  font-family: Arial;
  text-shadow: 0 0 1px #000;
} /* height값은 없어도 되는 속성 */

.intro {
  background-image: url("./assets/snow.png"), url("./assets/snow2.png");

  -webkit-animation: snow 10s linear infinite;

  -moz-animation: snow 10s linear infinite;

  -ms-animation: snow 10s linear infinite;

  animation: snow 10s linear infinite;
}

@keyframes snow {
  0% {
    background-position: 0px 0px, 0px 0px, 0px 0px;
  }

  100% {
    background-position: 500px 1000px, 400px 400px, 300px 300px;
  }
}

@-moz-keyframes snow {
  0% {
    background-position: 0px 0px, 0px 0px, 0px 0px;
  }

  100% {
    background-position: 500px 1000px, 400px 400px, 300px 300px;
  }
}

@-webkit-keyframes snow {
  0% {
    background-position: 0px 0px, 0px 0px, 0px 0px;
  }

  50% {
  }

  100% {
    background-position: 500px 1000px, 400px 400px, 300px 300px;
  }
}

@-ms-keyframes snow {
  0% {
    background-position: 0px 0px, 0px 0px, 0px 0px;
  }

  100% {
    background-position: 500px 1000px, 400px 400px, 300px 300px;
  }
}

</style>
