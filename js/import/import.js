// 기본적으로 사용자는 "Verbose"에서 "Info"로 로그 유형을 변경하는 것만으로도 모든 기본 위반을 제거할 수 있습니다.
// {passive:true}
// To remove the violation jquery-1.11.1.min.js:3 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. 
// Consider marking event handler as 'passive' to make the page more responsive.
// Remove violation code End
jQuery.event.special.touchstart = {
     setup: function (_, ns, handle) {
          if (ns.includes("noPreventDefault")) {
               this.addEventListener("touchstart", handle, {
                    passive: false
               });
          } else {
               this.addEventListener("touchstart", handle, {
                    passive: true
               });
          }
     }
};

(function ($) {
     var header = $('header');
     header.load('./headBox.html');
     var footer = $('footer');
     footer.load('./footBox.html');
})(jQuery);