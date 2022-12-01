// Displays appropriate search option depending on button click
const onClick = (choice) => {
    let keyword = document.getElementById("keyword-search");
    let tag = document.getElementById("tag-search");

    if (choice == "keyword"){
        tag.style.display = "none";
        keyword.style.display = "flex";
    }

    if (choice == "tag"){
        keyword.style.display = "none";
        tag.style.display = "flex";
    }
}