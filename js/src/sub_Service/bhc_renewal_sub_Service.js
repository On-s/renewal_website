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
    data1st.display = 'block';
    data2st.display = 'none';
  }
  data1st.display = 'none';
  data2st.display = 'block';
}

function sibilings(temp) {
  let children = temp.parentElement.children;
  let tempArr = [];
  for (let i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }
  return tempArr.filter(function (e) {
    return e != temp;
  });
}

function setEventDt(len, positon) {
  for (let i = 0; i < len.length; i++) {
    let dlEvent = positon.getElementsByTagName('dl')[i];
    let sibilingDl = new sibilings(dlEvent);
    dlEvent.querySelector('dt').addEventListener('click', function (e) {

      let ddstatus = dlEvent.querySelector('dd').getAttribute('display');
      // console.log(e.getAttribute('display'));
      dlEvent.querySelector('dd').style.display = 'block';
      sibilingDl.forEach(function (data) {
        data.querySelector('dd').style.display = 'none';
      });
    });
  }
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

    const proDl = product.getElementsByTagName('dl')[1];
    const ordDl = order.getElementsByTagName('dl')[0];

    proBtn.addEventListener('click', function (e) {
      e.preventDefault();
      clickchange(order, product);
      console.log('pro');
    });

    ordBtn.addEventListener('click', function (e) {
      e.preventDefault();
      clickchange(product, order);
      console.log('ord');
    });

    setEventDt(productData, product);
    setEventDt(orderData, order);
  } //if
} //jsonData.onreadystatechange


jsonData.open("GET", "../res/data/serviceData.json");
jsonData.send();
