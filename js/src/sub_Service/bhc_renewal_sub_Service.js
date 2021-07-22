//javaScript------------------------------
// flie name : bhc_renewal_sub_Service
//----------------------------------------

// 받아오는 json 데이터
let jsonData;
let serviceData;

const qnaCon = document.querySelector('#qnaCon');
const qnaBox = qnaCon.querySelector('.qna_box');
const product = qnaBox.querySelector('.product');
const order = qnaBox.querySelector('.order');
const menuCon = document.querySelector('#menuCon');
const proBtn = menuCon.querySelector('.pro_btn');
const ordBtn = menuCon.querySelector('.ord_btn');


// IE 버전이낮으면 불러올수없기에 바꿔줌
if (window.XMLHttpRequest) {
  jsonData = new XMLHttpRequest();
} else {
  jsonData = new ActiveXObject("Microsoft.XMLHTTP");
}

// epdl
function mDl(data, position) {
  for (let i = 0; i < data.length; i++) {
    let mDl = document.createElement('dl');
    let con = `<dt>${data[i].question}</dt><dd>${data[i].answer}</dd>`;
    console.log(data[i].question);
    mDl.innerHTML = con;
    position.appendChild(mDl);
  }
}

// display 상태체크 함수 
function clickchange(data1, data2) {
  let data1st = data1.style;
  let data2st = data2.style;

  let getdata1attr = data1.getAttribute('display');
  let getdata2attr = data2.getAttribute('display');

  if (getdata1attr === 'none' && getdata2attr === 'block') {
    data1.style.display = 'block';
    data2.style.display = 'none';
  }
  data1st.display = 'none';
  data2st.display = 'block';
}


// Data 불러오기 
jsonData.onreadystatechange = function () {

  if (jsonData.readyState === 4 && jsonData.status === 200) {
    console.log('success');

    serviceData = JSON.parse(jsonData.responseText);

    const productData = serviceData.Product;
    const orderData = serviceData.Order;

    mDl(productData, product);
    mDl(orderData, order);

    proBtn.addEventListener('click',function(e) {
      e.preventDefault();
      clickchange(order, product);
    });

    ordBtn.addEventListener('click',function(e) {
      e.preventDefault();
      clickchange(product, order);
    });
  }
}

jsonData.open("GET", "../res/data/serviceData.json");
jsonData.send();





// console.log(jsonData.responseText);
// JSON.parse(jsonData.responseText);
// let serviceData;
// console.log(serviceData);