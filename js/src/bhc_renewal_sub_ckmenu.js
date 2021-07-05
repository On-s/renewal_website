//jQuery ------------------------------
// flie name : bhc_renewal_sub_ckmenu
//-------------------------------------


(function ($) {
    $.ajax({
        url: "../res/data/chicken.json",
        context: document.body
    }).done(function (data) {
        var ckImgList;
        ckImgList = data;

        var menu_part = $('.menu_part');
        var menuList = $('#menuList');
        var list_box = menuList.find('.list_box');

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


        var sub_img = menu_part.find('.sub_img');
        sub_img.append('<ul></ul>');
        var subUl = sub_img.find('ul');;
        var subLi;

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
        var ckImgLink = '../res/image/chicken/';

        // 데이터 길이
        var ckListLen = ckImgList.length;

        // index var
        var count = 0;
        var i;

        // 중복실행 제어 하기위한 퍼미션값 = true
        var permission = true;



        //객체길이만큼 li 생성----------------------------------
        var set_li = function (count) {

            for (var n = 0; n < count; n++) {
                var setli = '<li><a href=""><span></span></a></li>';
                subUl.append(setli);
                subLi = subUl.find('li');
                subLi.eq(n).find('span').text(ckImgList[n].ckname);
                subLi.eq(n).find('a').css({
                    'backgroundImage': 'url("' + ckImgLink + ckImgList[n].ckImg + '")'
                });
            }
            // 마지막 li 요소를 첫번째 li 이전에 삽입

            subLi.first().before(subLi.clone().eq(-3));
            subLi.first().before(subLi.clone().eq(-2));
            subLi.first().before(subLi.clone().eq(-1));

        } //----------------------------------------------------

        // main 에 ckdata 삽입----------------------------------
        function clikcenvet(i) {
            mainP.text(ckImgList[i].ckname);
            mainPrice.text(ckImgList[i].ckprice);
            mainInfo.text(ckImgList[i].ckInfo);
            minImg.attr('href', ckImgList[i].ckPopupLink);
            minImg.css({
                'backgroundImage': 'url("' + ckImgLink + ckImgList[i].ckImg + '")'
            });
        } //--------------------------------------------------
        // li생성
        set_li(ckListLen);
        // 최초의 main 생성
        clikcenvet(0);

        // 생성한 Li 를 다시 가져옴
        subLi = subUl.find('li');

        // ul 의 길이를 늘림
        subUl.css({
            width: (((ckListLen + 3) * 100) / 3) + '%'
        });
        subLi.css({
            width: 100 / (ckListLen + 3) + '%'
        });

        // subimg 의 width 값을 가져옴
        var widthSubimg = sub_img.width();
        // 세칸 옆으로 쉬프트
        subUl.css({
            marginLeft: -(widthSubimg * 1) + 'px'
        });

        // 초기값을 3칸 옆으로 옮긴만큼 설정
        count = 3;

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
        // 링크 설정 
        alink = subUl.find('li').children('a');
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


        // var checkmouse = function (i, bool) {
        //     var ck = bool || true;
        //     if (ck) {
        //         subLi.eq(i).find('a').addClass('menter');
        //     } else {
        //         subLi.eq(i).find('a').removeClass('menter');
        //     }
        // }

        // var checkfocus = function (i, bool) {
        //     var ck = bool || true;
        //     if (ck) {
        //         subLi.eq(i).find('a').addClass('act');
        //     } else {
        //         subLi.eq(i).find('a').removeClass('act');
        //     }
        // }

        // 마우스 올렸을때 이벤트
        alink.on('mouseenter', function (e) {
            e.preventDefault();
            i = $(this).parent().index();
            subLi.eq(i).find('a').addClass('menter');
            // checkmouse(i);
        });


        // 마우스 내렸을때 이벤트
        alink.on('mouseleave', function (e) {
            e.preventDefault();
            i = $(this).parent().index();
            subLi.eq(i).find('a').removeClass('menter');
            // checkmouse(i, false);
        });


        // 포커스 했을때 이벤트
        alink.on('focus', function (e) {
            e.preventDefault();
            i = $(this).parent().index();
            subLi.eq(i).find('a').addClass('act');
            // checkfocus(i);
        });


        // 포커스 나갔을때 이벤트
        alink.on('focusout', function (e) {
            e.preventDefault();
            i = $(this).parent().index();
            subLi.eq(i).find('a').removeClass('act');
            // checkfocus(i, false);
        });

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
    });
})(jQuery);