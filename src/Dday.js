const title = document.querySelector(".end-time");

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

  title.innerText = `${day}일 
      ${hours < 10 ? `0${hours}` : hours}시간 
      ${minutes < 10 ? `0${minutes}` : minutes}분 
      ${seconds < 10 ? `0${seconds}` : seconds}초 남았습니다.`;
};

const init = () => {
  getDDay();
  setInterval(getDDay, 1000);
};

init();
