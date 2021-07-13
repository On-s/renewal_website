//jQuery ------------------------------
// flie name : header
//-------------------------------------
    var search_btn = $('.search_btn');


    console.log(search_btn);
    function ckStatus(searchbar) {
        var barwidth = searchbar.width();
        // var status = Boolean(searchbar.css('display') === 'none');
        if (barwidth < 100) {
            searchbar.animate({
                width : '150px'
            });
        } else {
            searchbar.animate({
                width : '0px'
            });
        }
    };

    // 만일 페이지 호출되고 자바스크립트로 직접만들었을때 문서에 이벤트를 걸어야한다.
    // 아래와 같이 사용시 반응이없음. 원인은 $(document).ready(function(){ 함수를 통해 페이지가 이미 로드 해오면서 진행이 됬기에 실행이 안되는것
    // search_btn.on('click',function() {
    //     console.log('click');
    // })
    $(document).on('click','.search_btn', function (e) {
        e.preventDefault();
        var searchbar = $('.searchbar');
        console.log('click search');
        ckStatus(searchbar);
    });
