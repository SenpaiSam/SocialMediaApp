//Add colortheme
addthemecolor('ulife');

// function setCookie(cookiename,cookievalue){
//     document.cookie = cookiename + "=" + cookievalue;
// }

if(document.getElementById('headersearch') != null) {
    var search = document.getElementById('headersearch');
    
    search.addEventListener('focusout', (event) => {
        search.parentNode.children[1].style.display = 'none';
    });
    
    search.addEventListener('search', (event) => {
        search.parentNode.children[1].style.display = 'none';
    });
    
    search.addEventListener('keydown', (event) => {
        if(event.keyCode === 13) {
            console.log(search.value);
        }
        headersearch();
    });
    
    function headersearch() {
        search.parentNode.children[1].style.display = 'block';
    
        // Declare variables
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('headersearch');
        filter = input.value.toUpperCase();
        ul = document.getElementsByClassName("search-recommendation")[0];
        li = ul.getElementsByTagName('li');
    
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            // a = li[i].getElementsByTagName("p")[0];
            // txtValue = a.textContent || a.innerText;
            a = li[i].getElementsByTagName("input")[0];
            txtValue = a.value;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
}

try {
    var sendmodal = document.getElementById('sendmodal');
} catch(e) {
    //console.log(e);
}

var lastscrollheight;
function closeSendModal() {
    sendmodal.style.display = 'none';
    document.body.style.overflow = 'visible';
    window.scrollBy(0, lastscrollheight); // scroll to last postion when post window closes
}

function openSendModal() {
    lastscrollheight = window.scrollY;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    sendmodal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

try {
    var imageviewer = document.getElementsByClassName('image-viewer')[0];
    var img = imageviewer.getElementsByTagName('img')[0];
} catch(e) {
    //console.log(e);
}

var lookingattweet;
function closeImageViewer() {
    imageviewer.style.display = 'none';
    document.body.style.overflow = 'visible';
    document.getElementById(lookingattweet).scrollIntoView();
    window.scrollBy(0,-100); //to see complete post (not covered by header)
}

function openimageviewer(imgurl, element) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    lookingattweet = element.parentNode.parentNode.parentNode.id;
    console.log(lookingattweet)
    imageviewer.style.display = 'block';
    document.body.style.overflow = 'hidden';
    img.src = imgurl;
}

function likePost(element) {
    let postid = element.parentNode.parentNode.parentNode.id;
    let icon = element.children[0];
    // console.log(postid, element.children[0]);
    if(element.classList.contains('post-liked')) {
        icon.innerHTML = "favorite_border";
        element.classList.remove('post-liked');
    } else {
        icon.innerHTML = "favorite";
        element.classList.add('post-liked');
    }
}