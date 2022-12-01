var checkedCheckboxes;

window.onload = (event) => {
    initMultiselect();
  };
  
  function initMultiselect() {
    value = checkboxStatusChange();
  
    document.addEventListener("click", function(evt) {
      var flyoutElement = document.getElementById('Multiselect'),
        targetElement = evt.target; // clicked element
  
      do {
        if (targetElement == flyoutElement) {
          return;
        }

        targetElement = targetElement.parentNode;
      } while (targetElement);
  
      toggleCheckboxArea(true);
    });
  }
  
  function checkboxStatusChange() {
    var multiselect = document.getElementById("SelectLabel");
    var multiselectOption = multiselect.getElementsByTagName('option')[0];

    var tagNames = [];
    var checkboxes = document.getElementById("dropdown");
    checkedCheckboxes = checkboxes.querySelectorAll('input[type=checkbox]:checked');
  
    for (const item of checkedCheckboxes) {
        var checkboxName = item.getAttribute('id');
        tagNames.push(checkboxName);
    }
  
    var dropdownName = "Select tags...";
    
    if (tagNames.length > 0) {
        dropdownName = tagNames.join(', ');
    }
    
    multiselectOption.innerText = dropdownName;
  }
  
  function toggleCheckboxArea(onlyHide = false) {
    var checkboxes = document.getElementById("dropdown");
    var displayValue = checkboxes.style.display;
  
    if (displayValue != "block") {
      if (onlyHide == false) {
        checkboxes.style.display = "block";
      }
    } else {
      checkboxes.style.display = "none";
    }
  }
