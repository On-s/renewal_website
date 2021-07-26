//jQuery ------------------------------
// flie name : bhc_renewal_sub_ckmenu
//-------------------------------------
for (var n = -3; n >= 0; n++) {
  console.log(n);
}

(function ($) {
  $.ajax({
    url: "../res/data/bhcData.json",
    context: document.body
  }).done(function (data) {

    var bhcdata = data.hot;
    var linkdata;

    linkdata = document.location.href.split("#")[1];
    //  처음 시작할때 주소값에 따른 data set
    function checklinkdata(linkdata) {
      switch (linkdata) {
        case "hotMenu":
          bhcdata = data.hot;
          ckImgLink = '../res/image/beerzone/';
          break;
        case "ckMenu":
          bhcdata = data.ck;
          ckImgLink = '../res/image/chicken/';
          break;
        case "sideMenu":
          bhcdata = data.side;
          ckImgLink = '../res/image/side/';
          break;
        case "beerMenu":
          bhcdata = data.beerzone;
          ckImgLink = '../res/image/beerzone/';
          break;
        default:
          bhcdata = data.hot;
          ckImgLink = '../res/image/beerzone/';
          break;
      }
    }


    // 중복실행 제어 하기위한 퍼미션값 = true
    var permission = true;

    var menu_part = $('.menu_part');
    var menuList = $('#menuList');
    var list_box = menuList.find('.list_box');

    // 리스트박스안에있는 링크 
    var hotMenu = list_box.find('.hotMenu');
    var ckMenu = list_box.find('.ckMenu');
    var sideMenu = list_box.find('.sideMenu');
    var beerMenu = list_box.find('.beerMenu');

    var alink;


    var menuCk = menu_part.find('#menuCk');

    // 큰이미지
    var main_img = menu_part.find('.main_img');
    // 상품명 구역
    var mainP = main_img.find('.product');
    // 상품 가격 구역
    var mainPrice = main_img.find('.pirce');
    // 상품정보 구역
    var mainInfo = main_img.find('.info');
    // 상품 링크 구역
    var minImg = main_img.find('.img').find('a');

    // 서브이미지 Ul/Li/가로값
    var sub_img = menu_part.find('.sub_img');
    var subUl;
    var subLi;
    var widthSubimg;


    // 객체에들어있는 치킨정보
    var ckCon = menu_part.find('.ck_con');
    var ckClose = ckCon.find('.ck_close');
    var ckImg = ckCon.find('.ck_img');
    var ckBg = menu_part.find('.ck_bg');

    var ckconP = ckCon.find('.product');
    var ckconPrice = ckCon.find('.pirce');
    var ckconInfo = ckCon.find('.info');

    //sub menu 버튼 
    var btn_next = menuCk.find('.next');
    var btn_pre = menuCk.find('.previous');
    //이미지 링크
    var ckImgLink;

    // 데이터 길이

    // index var
    var count = 0;
    var i;


    // 서브페이지에있을때 해더에있는 a 값을 눌렀을때 아래 이벤트 재실행 
    function setheaderevent() {
      $('.menuinfo').find('a').on('click', function (e) {
        if(permission){
        e.preventDefault();
        permission = false;
        var link = $(this).attr('href');
        var linka = link.split("#")[1];
        checklinkdata(linka);
        setlist();
        clikcenvet(0);
        console.log('c');
      }
      permission = true;
      });
    }



    var ckListLen = bhcdata.length;

    // 메뉴 리스트 이동-----------------------------------------
    var setlist = function () {
      cleanLi();
      set_li(bhcdata.length); // 길이만큼 li 생성
      add_li(); // 맨뒤에있는 li 복사
      subLi = subUl.find('li'); // li 설정 
      setUlLiWidth(); //Ul 과 Li길이를 늘림
      widthSubimg = sub_img.width(); // li 길이 구함
      shiftleft(); //늘린길이만큼 다시 쉬프트 
      reLinkConnected(); //이벤트 다시 연결
    }


    // 치킨메뉴를 눌렀을경우 
    ckMenu.on('click', function (e) {
      e.preventDefault();
      // 치킨메뉴랑 같으면 
      if (bhcdata === data.ck) {
        // 스탑
        e.stopPropagation();
      } else { //치킨메뉴랑 다를경우
        // 실행
        bhcdata = data.ck;
        ckImgLink = '../res/image/chicken/';
        setlist();
        clikcenvet(0);
        setheaderevent();
      }
    });

    // 사이드 메뉴를 눌렀을경우
    sideMenu.on('click', function (e) {
      e.preventDefault();
      if (bhcdata === data.side) {
        e.stopPropagation();
      } else {
        bhcdata = data.side;
        ckImgLink = '../res/image/side/';
        setlist();
        clikcenvet(0);
        setheaderevent();
      }
    });

    // 비어존 메뉴를 눌렀을 경우
    beerMenu.on('click', function (e) {
      e.preventDefault();
      if (bhcdata === data.beerzone) {
        e.stopPropagation();
      } else {
        bhcdata = data.beerzone;
        ckImgLink = '../res/image/beerzone/';
        setlist();
        clikcenvet(0);
        setheaderevent();
      }
    })

    // 핫 & 뉴 메뉴를 눌렀을경우 
    hotMenu.on('click', function (e) {
      e.preventDefault();
      if (bhcdata === data.beerzone) {
        e.stopPropagation();
      } else {
        bhcdata = data.beerzone;
        ckImgLink = '../res/image/beerzone/';
        setlist();
        clikcenvet(0);
        setheaderevent();
      }
    });


    //객체길이만큼 li 생성----------------------------------
    var set_li = function (count) {
      sub_img.append('<ul></ul>');
      subUl = sub_img.find('ul');
      for (var n = 0; n < count; n++) {
        var setli = '<li><a href=""><span></span></a></li>';
        subUl.append(setli);
        subLi = subUl.find('li');
        subLi.eq(n).find('span').text(bhcdata[n].name);
        subLi.eq(n).find('a').css({
          'backgroundImage': 'url("' + ckImgLink + bhcdata[n].Img + '")'
        });
      };

    }
    // 마지막 li 요소를 첫번째 li 이전에 삽입------------
    var add_li = function () {
      var copyLi = subLi.eq(-4).nextAll().clone();
      subLi.first().before(copyLi);
    };

    // main 에 ckdata 삽입----------------------------------
    function clikcenvet(i) {
      mainP.text(bhcdata[i].name);
      mainPrice.text('가격 : '+bhcdata[i].price);
      mainInfo.text(bhcdata[i].Info);
      minImg.attr('href', bhcdata[i].PopupLink);
      minImg.css({
        'backgroundImage': 'url("' + ckImgLink + bhcdata[i].Img + '")'
      });
    } //--------------------------------------------------
    // Li 요소 제거 
    function cleanLi() {
      sub_img.empty('ul');
    }

    // Ul 과 Li 값을 늘림
    function setUlLiWidth() {
      subUl.css({
        width: (((ckListLen + 3) * 100) / 3) + '%'
      });
      subLi.css({
        width: 100 / (ckListLen + 3) + '%'
      });
    }

    function shiftleft() {
      // subimg 의 width 값을 가져옴
      widthSubimg = sub_img.width();
      // 세칸 옆으로 쉬프트
      subUl.css({
        marginLeft: -(widthSubimg * 1) + 'px'
      });
      // 초기값을 3칸 옆으로 옮긴만큼 설정
      count = 3;
    }

    // 이벤트에서 permssion으로 중복실행을 제어한다.
    // 다음버튼 이벤트----------------------------------------------
    btn_next.on('click', function (e) {
      e.preventDefault();
      // 마지막 li 일때 맨처음으로 초기화
      if (permission) {
        permission = false;
        if (count >= ckListLen) {
          count = 0;
          subUl.stop().css({
            marginLeft: -(widthSubimg * count) + 'px'
          });
        }
        count++;
        // 오른쪽으로 한칸이동
        subUl.stop().animate({
          marginLeft: -(widthSubimg * count) / 3 + 'px'
        }, function () {
          permission = true;
        });
      }
    });

    // 이전버튼 이벤트-----------------------------------------------
    btn_pre.on('click', function (e) {
      e.preventDefault();
      if (permission) {
        permission = false;
        count--;
        // 왼쪽으로 한칸이동
        subUl.stop().animate({
          marginLeft: -(widthSubimg * count) / 3 + 'px'
        }, function () {
          // 첫번째 li 일때 맨마지막으로 초기화
          if (count <= 0) {
            subUl.stop().css({
              marginLeft: -(widthSubimg * ckListLen) / 3 + 'px'
            });
            count = ckListLen;
          }
          permission = true;
        });
      }
    });

    // 링크이벤트 --------------------------------------------------
    function reLinkConnected() {

      alink = sub_img.find('a');
      // 마우스 클릭시 이벤트

      alink.on('click', function (e) {
        e.preventDefault();
        console.log(i);
        i = $(this).parent().index();
        if (i === 2) {
          i = ckListLen + 2
        } else if (i === 1) {
          i = ckListLen + 1
        }
        clikcenvet(i - 3);
      });

      // mouse 올렸을때/내렸을때 class 추가 제거
      var checkmouse = function (i, ck) {
        if (ck) {
          subLi.eq(i).find('a').addClass('menter');
        } else {
          subLi.eq(i).find('a').removeClass('menter');
        }
      }
      // 포커스 했을때/나갔을때
      var checkfocus = function (i, ck) {
        if (ck) {
          subLi.eq(i).find('a').addClass('act');
        } else {
          subLi.eq(i).find('a').removeClass('act');
        }
      }
      // 마우스 올랬을떄 내렸을떄
      alink.on('mouseenter', function (e) {
        i = $(this).parent().index();
        checkmouse(i, true);
      }).on('mouseleave', function (e) {
        i = $(this).parent().index();
        checkmouse(i, false);
      });


      alink.on('focus', function (e) {
        i = $(this).parent().index();
        checkfocus(i, true)
      }).on('focusout', function (e) {
        i = $(this).parent().index();
        checkfocus(i, false)
      });

    }

    // 팝업창 이벤트 -------------------------------------------------
    //display 상태확인
    function ckStatus() {
      var statusCon = Boolean(ckCon.css('display') === 'none');
      var statusBg = Boolean(ckCon.css('display') === 'none');

      if (statusCon && statusBg) {
        ckCon.css('display', 'block');
        ckBg.css('display', 'block');
      } else {
        ckCon.css('display', 'none');
        ckBg.css('display', 'none');
      }
    }
    // 현재 메인 이미지 데이터 받아오기
    function ckData() {
      ckImg.attr('style', minImg.attr('style'));
      ckconP.text(mainP.text());
      ckconPrice.text(mainPrice.text());
      ckconInfo.text(mainInfo.text());
    }


    //  메인이미지 클릭시 이벤트
    minImg.on('click', function (e) {
      e.preventDefault();
      // ckImg.attr('style', minImg.attr('style'));
      ckStatus();
      ckData();
    });

    // 닫기
    ckClose.on('click', function (e) {
      e.preventDefault();
      ckStatus();
    });
    // 닫기
    ckBg.on('click', function (e) {
      e.preventDefault();
      ckStatus();
    });
    // 최초의 한번 실행
    checklinkdata(linkdata);
    setlist();
    clikcenvet(0);
    setheaderevent();
  });

})(jQuery);