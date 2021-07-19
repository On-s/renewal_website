//javaScript ------------------------------
// flie name : bhc_renewal_sub_StartUp
//-------------------------------------


$.ajax({
  url: "../res/data/startUpData.json",
  context: document.body
}).done(function (data) {
  const briefingData = data.BHC_Startups;
  const faqData = data.BHC_FAQ;

  const startUpQnA = document.querySelector('#startUpQnA');
  const briefingSession = startUpQnA.querySelector('.briefing_session');
  const briefingDayInfo = briefingSession.querySelector('.briefing_day_info');

  const bhcQnAInfo = startUpQnA.querySelector('.bhc_qna');


  // 함수를 각각 나눠서 쓰기



  // Dl 생성 클래스
  class mDl {
    constructor(data, position) {
      // 데이터가 객체형식일때
      if (!data.length) {
        for (let i in data) {
          let mDl = document.createElement('dl');
          // document 안에 먼저 생성한후에 넣어주어야 한다.
          let con = `<dt class="fontup">${i}</dt><dd>${data[i]}</dd>`;
          mDl.innerHTML = con;
          position.appendChild(mDl);
        }
        // 데이터가 배열형식일때
      } else {
        for (let i = 0; i < data.length; i++) {
          // 배열의 i번째객체의 첫번째 데이터
          let fstkey = data[i][Object.keys(data[i])[0]];
          // 배열의 i번째 객체의 두번째 데이터
          let seckey = data[i][Object.keys(data[i])[1]];
          let mDl = document.createElement('dl');
          let con = `<dt class="fontup">${fstkey}</dt><dd>${seckey}</dd>`
          mDl.innerHTML = con;
          position.appendChild(mDl);
        }
      }
    }
  }

  const createbriefing = new mDl(briefingData, briefingDayInfo);
  const createbhc_qna = new mDl(faqData, bhcQnAInfo);


});
