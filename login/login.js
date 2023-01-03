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
let videoBtn = document.querySelectorAll('.btn-Vid');
let ticketTypeBtn1 = document.getElementById('1way');
let ticketTypeBtn2 = document.getElementById('2way');

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    //accountInfo.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

// accountBtn.addEventListener('click', ()=>{
//     accountInfo.classList.add('active');
// });

videoBtn.forEach(btn =>{
    btn.addEventListener('click', () =>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

ticketTypeBtn1.addEventListener('click', ()=>{
    document.querySelector('#need-or-not').classList.add('active');
    document.getElementById('NumGuest').value = 0;
});
ticketTypeBtn2.addEventListener('click', ()=>{
    document.querySelector('#need-or-not').classList.remove('active');
    document.getElementById('NumGuest').value = 0;
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoint: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoint: {
        450: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 5,
        },
    },
});





function ready() {
    var itemInputs = document.getElementsByClassName('numGuest')
    for (var i = 0; i < itemInputs.length; i++){
        var input1 = itemInputs[i]
        input1.addEventListener('change', itemChange)
    }
}

function itemChange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    if (ticketTypeBtn1.checked)
        document.getElementsByClassName('totalPrice')[0].value = '$' + totalPrice()
    else
    document.getElementsByClassName('totalPrice')[0].value = '$' + totalPrice() * 2
}

//function hien thi tong gia tien
function totalPrice() {
    var itemContainer = document.getElementsByClassName('booking-container')[0]
    var itemRows1 = itemContainer.getElementsByClassName('priceBox')
    var itemRows2 = itemContainer.getElementsByClassName('numBox')
    var total = 0
    for (var i = 0; i < itemRows1.length; i++) {
        itemRow1 = itemRows1[i];
        var priceElement = itemRow1.getElementsByClassName('price')[0]
        var price = parseInt(priceElement.innerText.replace('Price: $',''))
        for (var j = 0; j < itemRows2.length; j++) {
            itemRow2 = itemRows2[i]
            var numElement = itemRow2.getElementsByClassName('numGuest')[0]
            var numGuest = numElement.value
            total += price * numGuest
        }
    }
    return total
}




//book now
var book = document.getElementById("nonPackBook");
var place = document.getElementById("PlaceName");
var numofGuest =  document.getElementById("NumGuest");
var arrival = document.getElementById("Arrival");

$(document).ready(function () {
    function validateForm() {
        if (place.value == null || place.value == "") {
            alert("Nhap ten dia diem");
            place.focus();
            return false;
        } else if (numofGuest.value == "" ) {
            alert("Nhap so luong nguoi");
            numofGuest.focus();
            return false;
        } 
        else if (arrival.value == "" ) {
            alert("Nhap ngay di dien ");
            arrival.focus();
            return false;
        } 
        else if(ticketTypeBtn2.checked){
            if(document.getElementById("leaving").value == ""){
                alert("Nhap ngay roi di ");
                document.getElementById("leaving").focus();
                return false;
            }
        }
        return true;
    }
    function normalBook() {
        if (validateForm()) {
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
        normalBook();
    })

})


//contact to manager
const contact = document.getElementById("contact-form");
var contact_mess = document.getElementById("contact-mess");
function Contact() {
    if (contact_mess.value !="" && contact_mess.value != null) {
        let req_mess={
            mess : contact_mess.value,
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/user/contact",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(req_mess),
            success: function (data) {
                alert(data.message);
            },
            error: function (msg) {
                alert(msg.message);
            }
        });

    }     
}
contact.addEventListener('submit', function (event) {
    event.preventDefault();
    Contact();
})
