$(() => {
    let searchField = document.querySelector('#search-input');
    
    $('#search button').click((e) => { 
        e.preventDefault();
        let container = document.querySelector('#search-container');
        let size = document.querySelector('#img-size');
        let sort = document.querySelector('#sort');
        let imgAmount = document.querySelector('#display-amount');
        container.innerHTML = "";
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9feba22bfaebe544497d5cea5fae9664&tags=${searchField.value}&sort=${sort.value}&per_page=${imgAmount.value}&format=json&nojsoncallback=1`)
        .then((response) => response.json())
        .then((data) => {
            let imgContainer = document.createElement('div');
            let column = document.createElement('div');

            let arr = data.photos.photo;

            arr.forEach((element, index) => {

                let img = document.createElement('img');
                img.src = `https://live.staticflickr.com/${element.server}/${element.id}_${element.secret}_${size.value}.jpg`;
                column.id = "column";
                column.append(img);
                

                        if (index % (Math.ceil(arr.length / 3)) === 0) {
                            column = document.createElement('div');
                            column.id = "column";
                            column.append(img);
                            imgContainer.append(column);
                            console.log("test" + index);
                           
                        }
                console.log(Math.floor(arr.length / 22));
                imgContainer.id = "img-container";
                container.append(imgContainer);
            });
        });
    });
});