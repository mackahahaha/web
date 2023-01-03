
const txtUsername = document.querySelector("#username");
const txtEmail = document.getElementById("email");
const txtPassword = document.querySelector("#password");
const txtConfirmPassword = document.querySelector("#confirm-password");
const myform = document.getElementById("signup");
//function kiem tra dieu kien buoc phai nhap cua bat cu truong nao
function isRequired(value) {
    if (value == null || value == "") return false;
    return true;
}
//function co kha nang kiem tra do dai toi thieu va toi da cua bat cu truong nao
function isBetween(length, min, max) {
    if (length < min || length > max) return false;
    return true;
}
//kiem tra xem email co dung dinh dang hay khong
function isEmail(emailAddress){
    //search email regular expression
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddress).toLowerCase());
}
function checkMatchPassword(password, confirmPassword){
    if(confirmPassword != password){
        
        return false;
    }
     
    return true;
}
//function thong bao loi
function showError(input, message){
    //lay ve the cha cua input
    const parentElement = input.parentElement;
    parentElement.classList.remove("success");
    parentElement.classList.add("error");
    const smallElement = parentElement.querySelector("small");
    smallElement.textContent = message;
}
//function thong bao thanh cong
function showSuccess(input){
    const parentElement = input.parentElement;
    parentElement.classList.remove("error");
    parentElement.classList.add("success");
    const smallElement = parentElement.querySelector("small");
    smallElement.textContent = '';
}
//kiem tra truong username
function checkUsername(){
    let valid = false;
    const min = 3;
    const max = 25;
    //kiem tra xem username co nhap hay khong
    if(!isRequired(txtUsername.value.trim())){
        
        showError(txtUsername,"Username must input.");
        txtUsername.focus();
    }else if(!isBetween(txtUsername.value.trim().length,min,max)){
        
        showError(txtUsername,"Username must be min 3 and max 25 charaters.");
        txtUsername.focus();
    }else{
        showSuccess(txtUsername);
        valid = true;
    }
    return valid;
}


function checkEmail(){
    //kiem tra email da nhap hay chua
    let valid = false;
    if(!isRequired(txtEmail.value.trim())){
        showError(txtEmail,"Email must be input.");
        txtEmail.focus();
    //kiem tra email dung dinh dang hay khong?
    }else if(!isEmail(txtEmail.value.trim())){
        showError(txtEmail,"Email must be correct form");
        txtEmail.focus();
    }else{
        showSuccess(txtEmail);
        valid = true;
    }
    return valid;    
}

function checkPass(){
    let valid = false;
    if(!isRequired(txtPassword.value.trim())){
        showError(txtPassword,"Password must be input.");
        txtPassword.focus();
    }else{
        showSuccess(txtPassword);
    }
    if(!isRequired(txtConfirmPassword.value.trim())){
        showError(txtConfirmPassword,"Confirm password must be input.");
        txtConfirmPassword.focus();
    }else{
        showSuccess(txtConfirmPassword);
    }
    if(!checkMatchPassword(txtPassword.value,txtConfirmPassword.value)){
        showError(txtConfirmPassword,"Password and confirm password not match");
        txtConfirmPassword.focus();
    }
    else{
        valid = true;
    }
    return valid;
}

//An hien mat khau
const showBtn1 = document.getElementById('eye1');
const showBtn2 = document.getElementById('eye2');

showBtn1.onclick = (()=>{
    if(txtPassword.type === 'password'){
        txtPassword.type = 'text';
        eye1.className = 'fas fa-eye-slash';
    }else{
        txtPassword.type = 'password';
        eye1.className = 'fas fa-eye';
    }
})

showBtn2.onclick = (()=>{
    if(txtConfirmPassword.type === 'password'){
        txtConfirmPassword.type = 'text';
        eye2.className = 'fas fa-eye-slash';
    }else{
        txtConfirmPassword.type = 'password';
        eye2.className = 'fas fa-eye';
    }
})


//dang ky 
myform.addEventListener("submit",function(e) {
    e.preventDefault();
    let usernameValid = checkUsername();
    let emailValid = checkEmail();
    let passwordValid = checkPass();
    if(usernameValid && emailValid && passwordValid){
        let req = {
            username: txtUsername.value,
            mail:txtEmail.value,
            password: txtPassword.value,
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/user/register",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(req),
            success: function (data) {
                console.log(data);
                
                if(data.valid == true){
                    alert(data.message);
                    window.location.href = "../login/login.html";
                }
                if(data.valid == false){
                    showError(txtEmail,"Email da duoc su dung");
                }
            },
            error: function (msg) {
                console.log(msg);
                alert("email nay da duoc su dung");
            }
        });
    }
})