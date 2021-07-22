//javaScript------------------------------
// flie name : bhc_renewal_sub_Service
//----------------------------------------

// 받아오는 json 데이터
let jsonData;
let serviceData;

const qnaCon = document.querySelector('#qnaCon');
const qnaBox = qnaCon.querySelector('.qna_box');
const product = qnaBox.querySelector('.product');
const order = qnaBox.querySelector('.qnaBox');

// IE 버전이낮으면 불러올수없기에 바꿔줌
if (window.XMLHttpRequest) {
  jsonData = new XMLHttpRequest();
} else {
  jsonData = new ActiveXObject("Microsoft.XMLHTTP");
}


function mDl(data,position,count) {
  for (let i in data) {
    let mDl = document.createElement('dl');
    datatitle = Object.keys(data)[count]; 
    a = data.Product[i].question;
    console.log(a);
    let con = `<dt>${data.Product[i].question}</dt><dd>${data.Product.answer}</dd>`;
    mDl.innerHTML = con;
    position.appendChild(mDl);
  }
}

// Data 불러오기 
jsonData.onreadystatechange = function () {
  
  if (jsonData.readyState === 4 && jsonData.status === 200) {
    console.log('success');
    serviceData = JSON.parse(jsonData.responseText);

    console.log(serviceData.Product[0].question);
    console.log(serviceData.Product[0].answer);

    // let mDl = document.createElement('dl');
    // let con = `<dt>${serviceData.Order[0].question}</dt><dd>${serviceData.Order[0].answer}</dd>`
    // mDl.innerHTML = con;
    // product.appendChild(mDl);

    mDl(serviceData,product,0)
  }
}

jsonData.open("GET", "../res/data/serviceData.json");
jsonData.send();


// console.log(jsonData.responseText);
// JSON.parse(jsonData.responseText);
// let serviceData;
// console.log(serviceData);