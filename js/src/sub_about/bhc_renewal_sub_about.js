//jQuery ------------------------------
// flie name : bhc_renewal_sub_about
//-------------------------------------
// 헤드가 만들어지고 불러야되기 때문에 settimeout 으로 딜레이를 걸었다.
setTimeout(function () {
  (function ($) {

    var sideBox = $('#sideNav');
    var sidelink = sideBox.find('a');
    var speed = 300;
    var easing = 'linear'

    var top = $(window).scrollTop();
    var headBox = $('#headBox')
    var headHeight = headBox.outerHeight();
    var permission = true;

    // 기초 사이드메뉴 위치 지정
    sideBox.css({
      'position': 'absolute',
      'z-index': '1',
      'top': top + 100
    });
    // 스크롤 되었을 때 이벤트
    $(window).on('scroll', function () {
      // 스크롤 + 된값만큼 사이드 고정시키기위해
      var yPosition = $(window).scrollTop() + 200;

      // 이동되었을때값 
      if (yPosition < 0) {
        yPosition = 100;
      }
      // 움직일때 이벤트 
      sideBox.animate({
        "top": yPosition
      }, {
        duration: speed, //이동
        easing: easing,
        queue: false
      });
    });
    // 스크롤 이동
    function movescroll(i) {
      if (permission) {
        permission = false;
        var linkTarget = i.attr('href');
        var target = $(linkTarget);
        var targetOffset = target.offset().top;
        var moveScroll;
        var wrapOffset = $('.wrap').offset().top;
        (targetOffset === wrapOffset) ? moveScroll = targetOffset: moveScroll = targetOffset - headHeight;
        $('html,body').animate({
          scrollTop: moveScroll + 'px'
        }, 500, 'swing', function () {
          permission = true;
        });
      }
    }
    // 링크 클릭시 스크롤 이동 이벤트
    sidelink.on('click', function (e) {
      e.preventDefault();
      var _this = $(this);
      movescroll(_this);
      console.log(movescroll(_this));
    });

    var competitiveness = $('#competitiveness');
    var comp_link_box = competitiveness.find('.comp_link_box');
    var compLink = comp_link_box.find('a');
    comp_box = $('.comp_box');


    for (var i = 0; i < 4; i++) {
      eval("var comp"+i+ "= competitiveness.find('.comp" +i+"')");
    }

    // comp0 1 2 3
    // 클릭시 하나를 제외하고 나머지 display none
    compLink.on('click',function (e) {
      e.preventDefault();
      var _this = $(this).parent().index();
      comp_box.find('div').eq(_this).css({display : 'block'});
      comp_box.find('div').eq(_this).siblings().css({display : 'none'});
    })

    // 마우스 올릴때 같은 이벤트

    compLink.on('mouseenter',function (e) {
      e.preventDefault();
      var _this = $(this).parent().index();
      comp_box.find('div').eq(_this).css({display : 'block'});
      comp_box.find('div').eq(_this).siblings().css({display : 'none'});
    })


  })(jQuery); 
}, 100); //settimeout
