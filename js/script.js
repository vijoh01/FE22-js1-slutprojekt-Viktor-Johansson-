$(() => {
    let searchField = document.querySelector('#search-input');
    
    $('#search button').click((e) => { 
        e.preventDefault();
        let container = document.querySelector('#search-container');
        container.innerHTML = "";
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9feba22bfaebe544497d5cea5fae9664&tags=${searchField.value}&format=json&nojsoncallback=1`)
        .then((response) => response.json())
        .then((data) => {
            let imgContainer = document.createElement('div');
            data.photos.photo.forEach(element => {
                fetch(`https://live.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`).then((res) => {
                    let placeholder = document.createElement('div');
                    let img = document.createElement('img');
                    img.src = res.url;
                    placeholder.append(img);
                    imgContainer.append(placeholder);
                    console.log(res);
                }) 
                imgContainer.id = "img-container";
                container.append(imgContainer);
            });
        });
    });
});