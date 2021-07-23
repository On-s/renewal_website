// https://apis.map.kakao.com/web/guide/

 $.ajax({
        url: "'https://dapi.kakao.com/v2/local/search/address.json?query='+encodeURIComponent('제주')",
        type : "GET",
        context: document.body,
        headers: {'Authorization' : 'KakaoAK a188dbedef505e9b3ea738775ed9f6c2'},
        success:function(data){
            console.log(data);
        },
        error : function(e){
            console.log(e);
        }
    }).done(function (data) {

        console.log(data);
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        
        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        

});
