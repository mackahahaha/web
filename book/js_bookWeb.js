if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

let searchBtn = document.querySelector('#btn-Search');
let searchBar = document.querySelector('.search-bar-container');
// let accountBtn = document.querySelector('#btn-Account');
// let accountInfo = document.querySelector('.information');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');


window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    //accountInfo.remove('active');
}

// accountBtn.addEventListener('click', ()=>{
//     accountInfo.classList.add('active');
// });

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});


// function tinh toan gia tien roi dat vao total_price



function ready() {
    var itemInputs = document.getElementsByClassName('numOfAdult')
    for (var i = 0; i < itemInputs.length; i++){
        var input = itemInputs[i]
        input.addEventListener('change', itemChange)
    }
}

function itemChange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    sumPrice()
}


function sumPrice() {
    var itemContainer = document.getElementsByClassName('container')[0]
    var itemRows1 = itemContainer.getElementsByClassName('price-container')
    var itemRows2 = itemContainer.getElementsByClassName('main-information')
    var total = 0
    for (var i = 0; i < itemRows1.length; i++){
        itemRow1= itemRows1[i]
        var priceElement1 = itemRow1.getElementsByClassName('giaNguoiLon')[0]
        var priceAdult1 = parseFloat(priceElement1.innerText.replace('$',''))
        for (var i = 0; i < itemRows2.length; i++){
            itemRow2 = itemRows2[i]
            var numOfAdultElement = itemRow2.getElementsByClassName('numOfAdult')[0]
            
            // var numOfAdult = parseInt(numOfAdultElement.value)
            var numOfAdult = numOfAdultElement.value
            total = total + (priceAdult1 * numOfAdult)
        }
    }
    document.getElementsByClassName('price_adult')[0].innerText = total + '.00'
    document.getElementsByClassName('price_total')[0].innerText = total + '.00'
}





// book
var fullname = document.getElementById("fullname");
var date = document.getElementById("date");
var phonenumber= document.getElementById("phone");
var address = document.getElementById("address");
const book = document.getElementById('book')

$(document).ready(function () {
    function checkBox(){
        var checker = document.getElementById('checkme');
        return checker.checked;
    }
    function validateForm() {
        if (fullname.value == null || fullname.value == "") {
            alert("Nhap day du ho ten.");
            fullname.focus();
            return false;
        } else if (phonenumber.value == "" ) {
            alert("Nhap so dien thoai.");
            phonenumber.focus();
            return false;
        } 
        else if (date.value == "" ) {
            alert("Nhap ngay.");
            date.focus();
            return false;
        } 
        return true;
    }
    function Book() {
        if (validateForm() && checkBox()) {
            let req={

            }
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/api/user/book",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(req),
                success: function (data) {
                    alert(data.message);
                },
                error: function (msg) {
                    alert('Dat tour that bai.Vui long dat lai')
                }
            });

        }     
    }
    book.addEventListener('submit', function (event) {
        event.preventDefault();
        Book();
    })

})