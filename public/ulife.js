//Add colortheme
// addthemecolor('ulife');

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function getUserIdUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function btn_Impressum() {
    location.href=window.location.protocol + '//' + window.location.host + '/impressum';
}

function btn_Policy() {
    location.href=window.location.protocol + '//' + window.location.host + '/policy';
}

function btn_About() {
    location.href=window.location.protocol + '//' + window.location.host + '/about';
}

const UserIdCookie = getCookie('userid');
const UserAuthCookie = getCookie('auth');
const UserData = getUserData(UserIdCookie);
$(document).ready(() => {
    if(window.location.pathname == '/login' || window.location.pathname == '/impressum') return;
    $('#leftProfileClick').on('click', () => {location.href='/user?id=' + UserIdCookie});
    $('#myProfileName').html(UserData.profileName);
    $('#myUserName').html('@'+UserData.userName);
    if(UserData.verified) {
        $('#myProfileName').append(` <span style="font-size: 1em;" class="material-icons micon">verified</span>`);
    }
    $('#UserImageView').attr('src', checkUserImage(UserData.profileName));
    $('#create_post_img').attr('src', checkUserImage(UserData.profileName));
    $('#comments_user_img').attr('src', checkUserImage(UserData.profileName));
    $('#comments_user_img2').attr('src', checkUserImage(UserData.profileName));
    // TODO: Dont allways load all different Images
})

//#region Search

try {
    var a = document.getElementById('notifications_btn'); a.href = `/notifications?userid=${UserIdCookie}`;
} catch (e) {
    //console.log(e)
}

if(document.getElementById('headersearch') != null) {
    var search = document.getElementById('headersearch');
    
    search.addEventListener('click', (event) => {
        if(search.value == '') return
        OpenDropdown(search);
    });
    
    search.addEventListener('search', (event) => {
        if(search.value == '') return
        OpenDropdown(search);

        search.parentNode.children[1].children[0].innerHTML = '';
        GetSearch(search.value);
    });
    
    // search.addEventListener('keydown', (event) => {
    //     if(event.keyCode === 13) {
    //         console.log(search.value);
    //     }
    // });
    
    // function headersearch() {
    //     search.parentNode.children[1].style.display = 'block';
    
    //     // Declare variables
    //     var input, filter, ul, li, a, i, txtValue;
    //     input = document.getElementById('headersearch');
    //     filter = input.value.toUpperCase();
    //     ul = document.getElementsByClassName("search-recommendation")[0];
    //     li = ul.getElementsByTagName('li');
    
    //     // Loop through all list items, and hide those who don't match the search query
    //     for (i = 0; i < li.length; i++) {
    //         // a = li[i].getElementsByTagName("p")[0];
    //         // txtValue = a.textContent || a.innerText;
    //         a = li[i].getElementsByTagName("input")[0];
    //         txtValue = a.value;
    //         if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //             li[i].style.display = "";
    //         } else {
    //             li[i].style.display = "none";
    //         }
    //     }
    //}

    function GetSearch(search) {
        $.ajax({
            url: `${window.location.protocol}//${window.location.host}/users/searchname/${search}`,
            method: 'GET',
            contentType: 'application/json',
            headers: {
                "Authorization": `Bearer ${UserAuthCookie}`
            },
            success: function(response){
                constructSearch(response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }

}


function constructSearch(serverdata) {
    if(serverdata == null || serverdata == undefined) return;
    //console.log(serverdata.length)
    for (let i = 0; i < serverdata.length; i++) {
        if(i == 6) return; // dont make list long (just 6 items)
        let cUserData = getUserData(serverdata[i]._id);
        $('#search-recom').append(`
        <li onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata[i]._id}'">
            <input type="hidden">
            <div class="sr-profile-item">
                <div class="sr-profile-img vertical-center">
                    <img src="${checkUserImage(cUserData.userName)}" style="border-radius: 100%;width: 2.5em;height:2.5em">
                </div>
                <div class="sr-profile-info">
                    <p>${cUserData.profileName} ${checkVerified(cUserData.verified)}</p>
                    <p>@${cUserData.userName}</p>
                </div>
            </div>
            <hr>
        </li>
        `);
    }
}

//#endregion


//#region Modals

// Custom

var activmodal = false;

function openModal(id) {
    lastscrollheight = window.scrollY;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.getElementById(id).style.display = 'block';
    document.body.style.overflow = 'hidden';
    activmodal = true;
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    document.body.style.overflow = 'visible';
    window.scrollBy(0, lastscrollheight); // scroll to last postion when post window closes
    activmodal = false;
}

// SEND MODAL
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
    activmodal = false;
}

function openSendModal() {
    lastscrollheight = window.scrollY;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    sendmodal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    activmodal = true;
}


// IMAGE VIEW MODAL
try {
    var imageviewer = document.getElementsByClassName('image-viewer')[0];
    var img = imageviewer.getElementsByTagName('img')[0];
} catch(e) {
    //console.log(e);
}

var lookingattweet;
function closeImageViewer() {
    imageviewer.style.display = 'none';
    if(activmodal) return;
    document.body.style.overflow = 'visible';
    document.getElementById(lookingattweet).scrollIntoView();
    window.scrollBy(0,-100); //to see complete post (not covered by header)
}

function openimageviewer(imgurl, element) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    lookingattweet = element.parentNode.parentNode.parentNode.id;
    // console.log(lookingattweet)
    imageviewer.style.display = 'block';
    document.body.style.overflow = 'hidden';
    img.src = imgurl;
}


// POST MODAL
try {
    var postmodal = document.getElementById('postmodal');
} catch(e) {
    //console.log(e);
}

var lastscrollheight;
function closePostModal() {
    postmodal.style.display = 'none';
    document.body.style.overflow = 'visible';
    window.scrollBy(0, lastscrollheight); // scroll to last postion when post window closes
    activmodal = false;
}

function ShowPostModal() {
    lastscrollheight = window.scrollY;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    postmodal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    activmodal = true;
}




// DESIGN MODAL
try {
    var designmodal = document.getElementById('designmodal');
} catch(e) {
    //console.log(e);
}

var lastscrollheight;
function closeDesignModal() {
    designmodal.style.display = 'none';
    document.body.style.overflow = 'visible';
    window.scrollBy(0, lastscrollheight); // scroll to last postion when post window closes
}

function openDesignModal() {
    lastscrollheight = window.scrollY;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    designmodal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

//#endregion


//#region Calc Time

var DateDiff = {
    inSeconds: function(d1, d2) {
        return Math.floor((d2 - d1) / (1000));
    },
    inMinutes: function(d1, d2) {
        return Math.floor((d2 - d1) / (1000 * 60));
    },
    inHours: function(d1, d2) {
        return Math.floor((d2 - d1) / (1000 * 60 * 60));
    },
    inDays: function(d1, d2) {
        return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
    },
    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    },
    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },
    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}

function calcTime(posttime) {
    try {
        let date1 = new Date(posttime);
        let date2 =  new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/London"}));
        // console.log(date2);

        //console.log(`${DateDiff.inSeconds(date1,date2)} | ${DateDiff.inMinutes(date1,date2)} | ${DateDiff.inHours(date1,date2)} | ${DateDiff.inDays(date1,date2)} | ${DateDiff.inMonths(date1,date2)} | ${DateDiff.inYears(date1,date2)}`);
        let dt = new Date();
        if(DateDiff.inHours(date1,date2) < 24) {
            return msToTime(Math.floor((date2 - date1)));
        } else if(date1.getFullYear() == dt.getFullYear()) { // && DateDiff.inDays(date1,date2) > new Date(dt.getFullYear(), dt.getMonth(), 0).getDate()
            return date1.toLocaleDateString("en-US", {  month: 'long', day: 'numeric' }).toString();
        } else {
            return date1.toLocaleDateString("en-US", {  year: 'numeric', month: 'long', day: 'numeric' }).toString();
        }
    } catch (e) {
        console.log(e);
        return 'NA'; 
    }
}

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    if(mins == 0) {
        return secs + 's';
    } else if (mins < 60 && hrs == 0) {
        return mins + 'm ' + secs + 's';
    } else {
        return hrs + 'h ' + mins + 'm ';
    }
  }

//#endregion



function checkVerified(checkboolean) {
    if(checkboolean) {
        return `<span style="font-size: 1em;" class="material-icons micon">verified</span>`;
    } else {
        return '';
    }
}

function checkUserImage(username) {
    var iamgesrc = `${window.location.protocol}//${window.location.host}/userimages/${username}.jpg`;
    $.ajax({
        url: iamgesrc,
        method: 'GET',
        async: false
      }).fail(() => {iamgesrc = `${window.location.protocol}//${window.location.host}/userimages/default.jpg`;});
    return iamgesrc;
}

// var num = 0;
function getUserData(userid) {
    // console.log((num++) + ": " + userid)
    var output;
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/users/public/${String(userid)}`, 
        async: false,
        method: 'GET',
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${UserAuthCookie}`
        }
        // success: function(response){
        //     console.log(response);
        // },
        // error: function(xhr, ajaxOptions, thrownError) {
        //     console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        // }
    }).done((v) => {output = v;});
    return output;
}


