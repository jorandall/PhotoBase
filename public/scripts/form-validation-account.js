// Update password form validation
document.getElementById("frm-account").addEventListener("submit", e=>{
    e.preventDefault();

    let oldPassword = document.forms["frm-account"]["oldPassword"];
    let newPassword = document.forms["frm-account"]["newPassword"];

    let error = 0;

    // Check current password isn't empty
    if(!oldPassword.value.trim()){
        oldPassword.style.boxShadow = "0 0 8px 1px red";
        document.getElementById("oldPassword-error").innerHTML = "Current password is required";
        error += 1;
    } else {
        oldPassword.style.boxShadow = "0 0 15px 4px rgba(0,0,0,0.06)";
        document.getElementById("oldPassword-error").innerHTML = "";
    };

    // Check new pasword isn't empty
    if(!newPassword.value.trim()){
        newPassword.style.boxShadow = "0 0 8px 1px red";
        document.getElementById("newPassword-error").innerHTML = "New password is required";
        error += 1;
    // Check new password doesn't match current password
    } else if (newPassword.value.toLowerCase().trim() == oldPassword.value.toLowerCase().trim()){
        newPassword.style.boxShadow = "0 0 8px 1px red";
        document.getElementById("newPassword-error").innerHTML = "New password cannot be the same as current password";
        error += 1;
    } else {
        newPassword.style.boxShadow = "0 0 15px 4px rgba(0,0,0,0.06)";
        document.getElementById("newPassword-error").innerHTML = "";
    };

    // If no errors, form submitted
    if (error == 0){
        document.getElementById("frm-account").submit();
    };
});

// Profile picture form validation
document.getElementById("frm-picture").addEventListener("submit", e=>{
    e.preventDefault();

    let image = document.forms["frm-picture"]["image"];
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG)$/i;

    let error = 0;

    // Check image isn't empty
    if(image.value.trim() == ""){
        image.style.boxShadow = "0 0 8px 1px red";
        document.getElementById("image-error").innerHTML = "File is required";
        error += 1;
    } else if (!allowedExtensions.exec(image.value)) {
        // Check file type is supported (matches utils/multer)
        image.style.boxShadow = "0 0 8px 1px red";
        document.getElementById("image-error").innerHTML = "File type must be .jpg, .jpeg, or .png";
        error += 1;
    } else {
        image.style.boxShadow = "0 0 15px 4px rgba(0,0,0,0.06)";
        document.getElementById("image-error").innerHTML = "";
    };

    // If no errors, form submitted
    if (error == 0){
        document.getElementById("frm-picture").submit();
    };
});

// Tag form validation
document.getElementById("frm-tag").addEventListener("submit", e=>{
    e.preventDefault();

    let name = document.forms["frm-tag"]["name"];

    let error = 0;

    // Check name isn't empty
    if(name.value.trim() == ""){
        name.style.boxShadow = "0 0 8px 1px red";
        document.getElementById("tag-error").innerHTML = "Name is required";
        error += 1;
    } else if (!name.value.startsWith("#")){
        // Check input starts with a hashtag
        name.style.boxShadow = "0 0 8px 1px red";
        document.getElementById("tag-error").innerHTML = "Names must start with # (hashtag)";
        error += 1;
    } else {
        name.style.boxShadow = "0 0 15px 4px rgba(0,0,0,0.06)";
        document.getElementById("tag-error").innerHTML = "";
    };

    // If no errors, form submitted
    if (error == 0){
        document.getElementById("frm-tag").submit();
    };
});
