document.getElementById("photo-form").addEventListener("submit", e=>{
  e.preventDefault();
 
  let where = document.forms["photo-form"]["where"];
  let when = document.forms["photo-form"]["when"];

  let error = 0;

  // Check if file path in form in form
  if (document.getElementById("image")){
    var image = document.forms["photo-form"]["image"];
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG)$/i;

    // Check image isn't empty
    if(!image.value.trim()){
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
  }

  // Check tags isn't empty
  if (checkedCheckboxes.length == 0){
    document.getElementById("selectbox").style.boxShadow = "0 0 8px 1px red";
    document.getElementById("tags-error").innerHTML = "At least 1 tag is required";
    error += 1;
  } else {
    document.getElementById("selectbox").style.boxShadow = "0 0 15px 4px rgba(0,0,0,0.06)";
    document.getElementById("tags-error").innerHTML = "";
  };
  
  
  // Check where isn't empty
  if(!where.value.trim()){
      where.style.boxShadow = "0 0 8px 1px red";
      document.getElementById("where-error").innerHTML = "Where is required";
      error += 1;
  } else {
      where.style.boxShadow = "0 0 15px 4px rgba(0,0,0,0.06)";
      document.getElementById("where-error").innerHTML = "";
  };

  // Check when isn't empty
  if(!when.value.trim()){
      when.style.boxShadow = "0 0 8px 1px red";
      document.getElementById("when-error").innerHTML = "When is required";
      error += 1;
  } else {
      when.style.boxShadow = "0 0 15px 4px rgba(0,0,0,0.06)";
      document.getElementById("when-error").innerHTML = "";
  };

  // If no errors, form submitted
  if (error == 0){
    document.getElementById("photo-form").submit();
  };
});


