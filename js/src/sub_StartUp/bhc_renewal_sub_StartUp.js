//javaScript ------------------------------
// flie name : bhc_renewal_sub_StartUp
//-------------------------------------

window.onload = function () {
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
    const titleName = document.querySelector('#titleName');
    const title = titleName.querySelector('.title');
    const selectMenu = titleName.querySelector('.select_menu');
    const openInfo = selectMenu.querySelector('.open_info');
    const startUpFna = selectMenu.querySelector('.start_upfna');

    const startup_box = document.querySelector('.startup_box');
    const startUpSupport = startup_box.querySelector('#startUpSupport');


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
    };
    // Object.keys(data)[0]

    const createbriefing = new mDl(briefingData, briefingDayInfo);
    const createbhc_qna = new mDl(faqData, bhcQnAInfo);

    const qnaDl = bhcQnAInfo.getElementsByTagName('dl')[0];
    // const qnaDt = qnaDl.getElementsByTagName('dt');
    // const qnaDd = qnaDl.getElementsByTagName('dd');


    // display 상대 체크
    class clickchangeInfo {
      constructor(data1, data2) {
        let getdata1attr = data1.getAttribute('display');
        let getdata2attr = data2.getAttribute('display');

        if (getdata1attr === 'none' && getdata2attr === 'block') {
          data1.style.display = 'block';
          data2.style.display = 'none';
        }
        data1.style.display = 'none';
        data2.style.display = 'block';
      }
    }

    // 이벤트 클릭 개설정보 
    openInfo.addEventListener('click', function (e) {
      e.preventDefault();
      new clickchangeInfo(startUpQnA, startUpSupport);
      title.innerText = (Object.keys(data)[0]);
    });
    // 이벤트클릭 창업fna
    startUpFna.addEventListener('click', function (e) {
      e.preventDefault();
      new clickchangeInfo(startUpSupport, startUpQnA);
      title.innerText = (Object.keys(data)[1]);
    });


    // 배열에 형제노드들을 저장
    class GetSelectArray {
      constructor(temp) {
        let children = temp.parentElement.children;
        let tempArr = [];

        for (let i = 0; i < children.length; i++) {
          tempArr.push(children[i]);
        }
        return tempArr.filter(function (e) {
          return e = temp;
        });
      }
    };

    let dlData = new GetSelectArray(qnaDl);

    const setDataDt = function (dataEl, index) {      
      dataEl.forEach((d, i) => {
        let el =  d.querySelector('dd').style; 
        (i !== index) ? el.display = 'none' :  el.display = 'block';
      });
    };    
    
    dlData.forEach((data, index) => {
      data.querySelector('dt').addEventListener('click', function (e) {        
        // for(let i=0; i<dlData.length; i++ ){
        //   dlData[i].querySelector('dd').style.display = 'none';
        //   if(i === index){
        //     dlData[i].querySelector('dd').style.display = 'block'; 
        //   }
        // }
        setDataDt(dlData, index); //위에 포문 과 같은 함수
      });
    });// dlData.forEach 

    



  }); //ajax
}// window.load