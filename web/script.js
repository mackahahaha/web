
let searchBtn = document.querySelector('#btn-Search');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#btn-Login');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.btn-Vid');
let passField = document.querySelector('.login-form-container form .password-input .password-input-field input');
let passBtn = document.querySelector('#show-pass');

let RequireBtn =document.querySelectorAll('#reqlogin');

let ticketTypeBtn1 = document.getElementById('1way');
let ticketTypeBtn2 = document.getElementById('2way');

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
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

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

for (let i =0;i<RequireBtn.length;i++){
    RequireBtn[i].addEventListener('click', () =>{
      loginForm.classList.add('active');
      alert("Ban phai dang nhap");
    });
}

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

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
});
ticketTypeBtn2.addEventListener('click', ()=>{
        document.querySelector('#need-or-not').classList.remove('active');
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

const bookreq = document.getElementById("bookreq");
bookreq.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Ban phai dang nhap');
    loginForm.classList.add('active');
})


const contact =document.getElementById("contact-form");
contact.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Ban phai dang nhap');
    loginForm.classList.add('active');
})



/* Day la fix */

// An, hien mat khau
passBtn.onclick = (() => {
    if (passField.type === 'password'){
        passField.type = "text";
        passBtn.className = "fas fa-eye-slash";
    }else{
        passField.type = "password";
        passBtn.className = "fas fa-eye";
    }
});

// login req
const login = document.getElementById("login");
var username = document.getElementById("email");
var password = document.getElementById("password");


$(document).ready(function () {
        function validateForm() {
            if (username.value == null || username.value == "") {
                alert("Nhap email ");
                username.focus();
                return false;
            } else if (password.value == null || password.value == "") {
                alert("Nhap mat khau");
                password.focus();
                return false;
            } 
            return true;
        }
        function signIn() {
            if (validateForm()) {
                let req = {
                    username: username.value,
                    password: password.value
                }
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/user/checklogin",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(req),
                    success: function (data) {                                                                                                                                                                                                                                                                                                                                                             
                        console.log(data);
                        alert("Dang nhap thanh cong.");
                        let homepage = "../login/login.html";
                        window.location.href = homepage;
                        
                    },
                    error: function (msg) {
                        console.log(msg);
                        alert('Dang nhap khong thanh cong, vui long dang nhap lai.')
                    }
                });

            }     
        }
        login.addEventListener('submit', function (event) {
            event.preventDefault();
            signIn();
        })

    })

