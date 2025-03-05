var password = document.getElementById("passwordInput")
  , confirm_password = document.getElementById("passwordConfirmInput");
  
function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("As senhas não se coincidem!");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;