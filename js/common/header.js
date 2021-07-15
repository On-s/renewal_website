//jQuery ------------------------------
// flie name : header
//-------------------------------------
// html 이 import 된 후에 불러져야 각각의 엘리먼트들을 찾을 수 있다.
setTimeout(() => {  //settimeout 
  var search_btn = $('.search_btn');

  console.log(search_btn);

  function ckStatus(searchbar) {
    var barwidth = searchbar.width();
    // var status = Boolean(searchbar.css('display') === 'none');
    if (barwidth < 100) {
      searchbar.animate({
        width: '300px'
      });
    } else {
      searchbar.val('');
      searchbar.animate({
        width: '0px'
      });
    }
  };
  // 만일 페이지 호출되고 자바스크립트로 직접만들었을때 문서에 이벤트를 걸어야한다.
  // 아래와 같이 사용시 반응이없음. 원인은 $(document).ready(function(){ 함수를 통해 페이지가 이미 로드 해오면서 진행이 됬기에 실행이 안되는것
  // search_btn.on('click',function() {
  //     console.log('click');
  // })
  $(document).on('click',('.search_btn'), function (e) {
    e.preventDefault();
    var searchbar = $('.searchbar');
    console.log('click search');
    ckStatus(searchbar);
  });

  // 로그인 버튼 누를 경우 팝업창 띄우기 
  // 팝업창 x 버튼 누르거나 밖에 누르면 끄기
  // 
  var userBtn = $('.login_ico');
  var userCon = $('.user_con');
  // var userID , PW 
  var userClose = $('.user_close');
  var userBg = $('.user_bg');

  // Fn check display status
  function ckStatusPopup(a,b) {

    var statusCon = Boolean(a.css('display') === 'none');
    var statusBg = Boolean(b.css('display') === 'none');

    if (statusCon && statusBg) {
      a.css('display', 'block');
      b.css('display', 'block');
    } else {
      a.css('display', 'none');
      b.css('display', 'none');
    }
  };

  // 로그인 버튼 이벤트
  userBtn.on('click', function (e) {
    e.preventDefault();
    ckStatusPopup(userCon,userBg);
  });

  userBg.on('click',function(e) {
    e.preventDefault();
    ckStatusPopup(userCon,userBg);
  });

  userClose.on('click',function(e) {
    e.preventDefault();
    ckStatusPopup(userCon,userBg);
  });

  var navSide = $('.nav_box_side');
  var navBtn = $('.nav_btn');
  var navBg = $('.navbg');

  // 네비버튼 이벤트
  navBtn.on('click',function(e) {
    e.preventDefault();
    ckStatusPopup(navSide,navBg);
    console.log('click');
  });
  navBg.on('click',function (e) {
    ckStatusPopup(navSide,navBg);
  })
// 1280 보다 커지면 none 처리
  $(window).on('resize',function () {
    var winwidth = window.innerWidth;
    console.log(winwidth);

    if (winwidth >= 1280) {
      navSide.css('display', 'none');
      navBg.css('display', 'none');
    }
  })
}, 50);
