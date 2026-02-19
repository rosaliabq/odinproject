const createAccForm = document.getElementById('createAccount');
const password = document.getElementById('password');
const confirm = document.getElementById('passwordConf');
const firstNameIn= document.getElementById('firstName');
const emailIn = document.getElementById('email');
const phoneIn = document.getElementById('phoneNumber');

createAccForm.addEventListener('submit', function (e) {
  e.preventDefault();

  firstNameIn.setCustomValidity("");
  emailIn.setCustomValidity("");
  password.setCustomValidity("");
  confirm.setCustomValidity("");
  // Check all required fields (HTML5)
  if (!createAccForm.checkValidity()) {
    createAccForm.reportValidity(); // shows browser tooltips
    return;
  }

  if (firstNameIn.value.trim() == ""){
    firstNameIn.setCustomValidity("First name is empty");
    firstNameIn.reportValidity();
    return;
  } else {
    firstNameIn.setCustomValidity("");
  }

  if (emailIn.value.trim() == "" || !emailIn.value.includes('@') || !emailIn.value.includes('.')){
    emailIn.setCustomValidity("Email is empty or invalid");
    emailIn.reportValidity();
    return
  } else {
    emailIn.setCustomValidity("");
  }

  if (password.value == ""){
    password.setCustomValidity("Password is empty");
    password.reportValidity();
    return
  } else {
    password.setCustomValidity("")
  }

  if (confirm.value==""){
    confirm.setCustomValidity("Password Confirmation is empty")
    confirm.reportValidity();
    return
  } else {
    confirm.setCustomValidity("")
  }

  // Custom: password match
  if (password.value !== confirm.value) {
    confirm.setCustomValidity("Passwords don't match.");
    confirm.reportValidity();
    return;
  } else {
    confirm.setCustomValidity(''); // clear the error
  }

  // ✅ All good — submit your form
  console.log('Form is valid!');
  alert("Form sent!")
});

// Reset the custom error live as the user types
confirm.addEventListener('input', () => {
  confirm.setCustomValidity('');
});