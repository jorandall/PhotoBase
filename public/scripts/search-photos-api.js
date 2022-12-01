const photoView = (photo) => `

<div class="photo-outer-container">
    <div class="photo-inner-container">
        <div class="img-container" style="background: url(${photo.image_url}); background-size: cover; background-position: center;"></div>
        <div class="txt-container">
            <p><strong>tags:</strong><br/> 
            ${photo.tags.map((tag => { 
                return tag.name;
            })).join(" ")}
            </p>

            <p>
                <strong>where:</strong> ${photo.where}<br/>
                <strong>when:</strong> ${photo.when}<br/>
                ${photo.who && `
                    <strong>who:</strong> ${photo.who}<br/>
                `}
            </p>
            <br/>
            <a href="/display-photo/${photo._id}" class="btn-secondary" target="_blank">See Photo</a>
            <a href="/gallery/edit/${photo._id}" class="btn-secondary">Edit</a>
            <a href="/gallery/delete/${photo._id}" class="btn-secondary">Delete</a>
        </div>
    </div>
</div>
`;

const dropdownValue = () => {
    
    console.log(searchVal)
}

const handleSubmit = async (choice) => {
    var searchVal;

    // Sets the searchVal depending on search type
    if(choice == "keyword"){
        searchVal = document.querySelector("#keyword").value;
    }
    if(choice == "tag"){
        const select = document.getElementById("tag");
        searchVal = select.options[select.selectedIndex].value;
    }

    if(searchVal){
        try {
            const photoDomRef = document.querySelector('#photoItems');
            const messageDomRef = document.querySelector('#message');
            const ref = await fetch(`/api/search-photos/?type=${choice}&search=${searchVal}`);
            const searchResults = await ref.json();
            let photoHtml = [];
            if (searchResults){
                searchResults.forEach(photo => {
                    photoHtml.push(photoView(photo));
                });
                messageDomRef.innerHTML = "Results found: " + photoHtml.length;
                photoDomRef.innerHTML = photoHtml.join("");
            }
        } catch (e) {
            console.log(e);
            console.log('could not search api');
        }
    }
}
