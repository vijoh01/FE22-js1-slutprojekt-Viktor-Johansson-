$(() => {
    $('#search button').click((e) => {
        $.fn.loading(true);

        e.preventDefault();
        $('.search-container').html("");
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9feba22bfaebe544497d5cea5fae9664&tags=${$('#search-input').val()}&sort=${$('#sort').val()}&per_page=${$('#display-amount').val()}&format=json&nojsoncallback=1`)
            .then((response) => response.json())
            .then((data) => {
                $.fn.loading(false);
                let imgContainer = document.createElement('div');
                let column = document.createElement('div');

                let photos = data.photos.photo;
                photos.forEach((element, index) => {
                    let img = document.createElement('img');
                    
                    img.src = `https://live.staticflickr.com/${element.server}/${element.id}_${element.secret}_${$('#img-size').val()}.jpg`;
                    img.className = "list-img";
                    $(img).attr('draggable', 'false');
                    column.className = "column";
                    column.append(img);
                    if (index % (Math.ceil(photos.length / 3)) === 0) {
                        column = document.createElement('div');
                        imgContainer.append(column);
                        column.className = "column";
                        column.append(img);
                    }
                    imgContainer.className = "img-container";
                    $('.search-container').append(imgContainer);
                });
        
                $('.list-img').hover((e) => {
                    
                    const target = $(e.target).parent();
                    if (e.target instanceof Image) {
                        if (!$(target).data().selected === 0) return;
                        e.target.animate({filter: 'blur(6px)' }, 150, target.css('z-index', 101));
                        
                    }
                }, () => $('.column').css('z-index', 1));

                $(window).mouseup((e) => {
                    e.stopPropagation();
                    const tar = e.target;
                    if (!$('.img-popup-container').is(tar) && !$('.img-popup-container').has(e.target).length) {
                        $('.img-popup-container').css('display', 'none');
                    }
                });
                
                $('img').click((e) => { 
                    if (!$('.img-popup-container').is(e.target) && !$('.img-popup-container').has(e.target).length) 
                    e.target.animate({transform: 'scale(1.1)', filter: 'blur(6px)' }, 150, $(e.target).css('z-index', 101));
                    $('.img-popup-container').css('display', 'block');
                    $('.img-display').attr("src", $(e.target).attr('src'));
                    
                });
            });
    });

    $.fn.loading = (show) => {
        if (!show) {
            $('.loading-container').css('visibility', 'hidden');
            return;
        }
        $('.loading-container').css('display', 'block');
        $('.loading-container').css('visibility', 'visible');
        let times = 0;
        setInterval(function() {
            times++;
        $('.loading').animate({rotate: times + '360deg'}, {duration: 1500});
        }, 100);
    }

});