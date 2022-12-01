document.getElementById("frm-register").addEventListener("submit", e=>{
    e.preventDefault();

    let forename = document.forms["frm-register"]["firstName"];
    let surname = document.forms["frm-register"]["lastName"];
    let email = document.forms["frm-register"]["email"];
    let password = document.forms["frm-register"]["password"];

    let error = 0;

    // Check first name isn't empty
    if(!forename.value.trim()){
        forename.style.boxShadow = "0 0 8px 1px red";
        document.getElementById("firstName-error").innerHTML = "First name required";
        error += 1;
    } else {
        forename.style.boxShadow = "0 0 15px 4px rgba(0,0,0,0.06)";
        document.getElementById("firstName-error").innerHTML = "";

    };

    // Check last name isn't empty
    if(!surname.value.trim()){
        surname.style.boxShadow = "0 0 8px 1px red";
        document.getElementById("lastName-error").innerHTML = "Last name required";
        error += 1;
    } else {
        surname.style.boxShadow = "0 0 15px 4px rgba(0,0,0,0.06)";
        document.getElementById("lastName-error").innerHTML = "";

    };

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

    // If no errors, submit the form
    if (error == 0){
        document.getElementById("frm-register").submit();
        
    };
});