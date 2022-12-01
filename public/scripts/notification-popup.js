// Closes popup window when button clicked
if(document.getElementById("popup")){
    document.getElementById("btn-close").addEventListener("click", e=>{
        document.getElementById("popup").style.display = "none";
    });
}