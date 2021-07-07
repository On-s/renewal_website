//jQuery ------------------------------
// flie name : renewal_main
//-------------------------------------
(function ($) {
  $.ajax({
    url: "../res/data/adData.json",
    context: document.body
  }).done(function (data) {

    var adData = data.ad;

    var wrap = $('.wrap');
    var adBox = wrap.find('#adBox');
    var ad_area = adBox.find('.ad_area');

    var ad_btn_before = ad_area.find('.ad_btn_before');
    var ad_btn_next = ad_area.find('.ad_btn_next');

    var adUl = ad_area.find('.adUl');
    var adLi;
    var adImgLink = '../res/image/';

    var adLen = adData.length;

    var indicator = ad_area.find('.indicator');
    var indiUl = indicator.find('ul');
    var indiLi;
    var indiLink;

    var n = 0;
    var timed = 500;

    console.log(adLen);

    // ad 세팅
    var setAD = function () {
      set_li(adLen);
      setUlLiWidth();
      add_li();
    }


    // li 생성
    var set_li = function (count) {
      for (var n = 0; n < count; n++) {
        var setli = '<li id="viewSelect' + n + '"><a href=""><span></span></a></li>';
        adUl.append(setli);
        adLi = adUl.find('li');
        adLi.eq(n).find('span').text(adData[n].adInfo);
        adLi.eq(n).find('a').css({
          'backgroundImage': 'url("' + adImgLink + adData[n].Img + '")'
        });
      };
    };
    // Ul 및 li 길이 변경
    var setUlLiWidth = function () {
      adUl.css({
        width: (100 * (adLen + 1)) + '%',
        left: -100 + '%',
        position: 'relative'
      });
      adLi.css({
        width: (100 / (adLen + 1)) + '%'
      });
    }

    // li 요소 복사
    var add_li = function () {
      var copyLi = adLi.last().clone();
      adLi.first().before(copyLi);
    };

    // indicator 생성 
    var set_indicator = function (count) {
      for (var n = 0; n < count; n++) {
        var setli = '<li><a href="#viewSelect' + n + '"><span></span></a></li>';
        indiUl.append(setli);
        indiLi = indiUl.find('li');
        indiLink = indiLi.find('a');
        indiLink.eq(n).find('span').text(adData[n].adInfo);
      };
    }

    setAD();
    set_indicator(adLen);


    // indicator 이벤트 부분
    // 함수 생성
    var slideMoveFn = function (n, interval) {
      // setInterval기능과 마지막 위치에서 처음으로 이동시
      if (n <= 0 && interval) {
        adUl.css({
          marginLeft: 100 + '%'
        });
      }
      // 광고이동
      adUl.stop().animate({
        marginLeft: (-100 * n) + '%'
      }, timed);
      // .act 처리    
      indiLi.eq(n).addClass('act');
      indiLi.eq(n).siblings().removeClass('act');
    };

    // 이벤트
    indiLink.on('click', function (e) {
      e.preventDefault();
      n = $(this).parent().index();
      slideMoveFn(n, false);
    });

    // 반복기능 -> clearInterval에서 제어하기위해 변수로 지정
    var autoMoveFn;
    var slideGoFn = function () {
      autoMoveFn = setInterval(function () {
        n += 1;
        if (n >= adLen) {
          n = 0;
        }
        slideMoveFn(n, true);
      }, timed * 3);
      return autoMoveFn;
    };
    // 멈춤
    var slideStopFn = function () {
      clearInterval(autoMoveFn);
    };
    slideGoFn();

    ad_area.on({
      'mouseenter': slideStopFn,
      'mouseleave': slideGoFn
    });


  });
})(jQuery);