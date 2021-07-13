/* main_common */
/* c_smartphone-v ~479 */
/* d_smartphone-h 480~767*/
/* e_table 768~1279*/
/* f_laptop 1280~1599*/
/* g_pc 1600 ~ */


/*
  1. 브라우저의 가로 크기값 확인
  2. 내가 원하는 기준치로 설정된 범위(이름을 설정해서 처리)에 맞는지 파악(mobile, tablet, laptop, pc ...)
  3. 브라우저의 크기가 변경될때('resize') 기존 가로값과 변경된 가로값을 비교하여, 일치하지 않을경우에 일부 재처리
 */
var deviceSize = function () {

  var resultDevice;


  //jQuery ------------------------------
  // flie name : divice
  //-------------------------------------
  (function ($) {

    // 기준치를 설정
    // [ 480, 768, 1280, 1600];
    var deviceType = [{
        type: 'smartphone',
        size: 480
      },
      {
        type: 'tablet',
        size: 768
      },
      {
        type: 'laptop',
        size: 1280
      },
      {
        type: 'pc',
        size: 1600
      },
      {
        type: 'pcfull'
      }
    ];

    // 브라우저 최초크기값 확인
    var beforeWinW = $(window).outerWidth(true);

    var deviceCheck = function (winW) {
      // type 체크
      var myType;
      // 어느기준치에 걸리는지를 체크한다.
      for (var i = 0; i < deviceType.length; i++) {
        if (winW <= deviceType[i].size) {
          myType = deviceType[i].type;
          break;
        } else {
          myType = deviceType[deviceType.length - 1].type;
        }
      }
      // console.log(myType);
      return myType;
    } // deviceCheck();

    var winSize = deviceCheck(beforeWinW);
    resultDevice = winSize;

    // ------------------------------------------------------------------
    $(window).on('resize', function () {
      // 사이즈변경시 브라우저 크기값 재 확인
      var reWinW = $(window).outerWidth(true);
      var afterWinSize = deviceCheck(reWinW);

      // 기존 디바이스타입과 변경된 디바이스타입이 다른경우 새로고침
      if (winSize !== afterWinSize) {
        location.reload();
        console.log(afterWinSize);
      }
    });
    return resultDevice;
  })(jQuery);
  return resultDevice;
};

var browserSetFn = function(){

  // var browser = ['opr', 'edg', 'chrome', 'safari', 'firefox'];
  // 접속 브라우저를 파악하기 위해 표기된 용어와, 실제 확인용어 구분, 순서를 명확하게 파악
  var browser = [
    {type:'Opera', check:'opr'},
    {type:'Edge', check:'edg'},
    {type:'Chrome', check:'chrome'},
    {type:'Safari', check:'safari'},
    {type:'Fire fox', check:'firefox'}
  ];

  // 접속브라우저 체크(대소문자 구분없이 파악하기 위해 소문자로 설정)
  var checkDevice = navigator.userAgent.toLowerCase();
  var n = 0
  var ckIndex;
  var useRwd = false;
  // IE브라우저 체크(ms엔진인 Trident엔진이 있을경우 IE브라우저) : navigator.userAgent.search('Trident') 
  if(navigator.userAgent.search('Trident') !== -1){
    // '반응형웹이 불가능한 브라우저'; 
    useRwd = false;
    console.log('사용브라우저:', 'ie');
  }else{
    // IE외에 다른브라우저 기반체크 (위 변수 browser변수의 순서를 잘 작성해야 해당브라우저를 파악이 가능)
      for(; n < browser.length ; n++){
        // indexOf() 존재유무 판단 -> -1 값을 나타나면 없다, 이외의 수치가 나오면 해당하는 위치에 있다
        ckIndex = checkDevice.indexOf(browser[n].check);
        // console.log(ckIndex);
        if(ckIndex !== -1){
          //'반응형 웹 가능한 브라우저';
          useRwd = true;
          console.log('browser :  ', browser[n].type);
          // 체크된 상황에서 반복수행하지 않도록 처리
          break; 
        }
      }// for
  }// if:IE체크

  // 반응형웹 '제작가능여부(true or false)'를 반환
  return useRwd;
}
var rwdCheck = browserSetFn();
if(!rwdCheck){
  alert('접속 브라우저가 반응형구현 또는 flex 구조가 아니기 때문에 사용하기 불편할 수 있습니다.');
  // $('.device').hide(); 
  // $('.old').show();
} 




var url = '../js/src/';
var filename = ['bhc_main/', 'sub_ckmenu/', 'sub_stroe', 'sub_aboutbhc'];
var nowDevice = deviceSize();



console.log("device size : "+nowDevice);
var deviceType = ['smartphone', 'table', 'laptop', 'pc', 'pcfull'];

// function importJS(filePath) {
//   header.append("<script src='"+ url + filePath + "link_adress'></script>");
// };

// function checkdeviceType() {
//     if (nowDevice === deviceType[1] ) {

//     } else {

//     }
// };


//  연결 느낌 

/*(function($){

    // 현재의 디바이스 사이즈를 가져옴 그에따른 디바이스 링크 연결
    var nowW = deviceSize();
    var deviceType = ['mobile','table', 'laptop', 'pc', 'pcfull'];
  // ---------------------------------------------------------------------
    var url = './rwdTemp/';
    var headBox = $('#headBox');
    var viewBox = $('#viewBox');
  
  //----------------------------------------------------------------------
  // viewBox import file
  var viewImport = function(){
    viewBox.append('<script src="../js/src/temp_mobile.js"></script>');
  };
  //-------------------------------
    if(nowW === deviceType[0]){
  
      headBox.load( url + 'redTemp_headBox_mobile.html');
      viewBox.load( url+ 'rwdTemp_mobile.html' , viewImport);
  
    }else if(nowW === deviceType[1]){
      headBox.load( url + 'redTemp_headBox_tablet.html' );
      viewBox.load( url+ 'rwdTemp_tablet.html' , viewImport);
    }else{
      headBox.load( url + 'redTemp_headBox_pc.html' );
      viewBox.load( url+ 'rwdTemp_pc.html' , viewImport);
    }
  
  })(jQuery); */



