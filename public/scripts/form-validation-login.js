document.getElementById("frm-login").addEventListener("submit", e=>{
    e.preventDefault();

    let email = document.forms["frm-login"]["email"];
    let password = document.forms["frm-login"]["password"];

    let error = 0;

    // Check email isn't empty
    if(!email.value.trim()){
        email.style.boxShadow = "0 0 8px 1px red";
        document.getElementById("email-error").innerHTML = "Email is required";
        error += 1;
    } else {
        email.style.boxShadow = "0 0 15px 4px rgba(0,0,0,0.06)";
        document.getElementById("email-error").innerHTML = "";

    };

    // Check password isn't empty
    if(!password.value.trim()){
        password.style.boxShadow = "0 0 8px 1px red";
        document.getElementById("password-error").innerHTML = "Password is required";
        error += 1;
    } else {
        password.style.boxShadow = "0 0 15px 4px rgba(0,0,0,0.06)";
        document.getElementById("password-error").innerHTML = "";
    };

    if (error == 0){
        document.getElementById("frm-login").submit();
    };
});