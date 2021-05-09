$(document).ready(() => {
    $('#notifications_feed_load').on('click', (event) => {
        $.ajax({
            url: `${window.location.protocol}//${window.location.host}/notifcations?userid=${getCookie('userid')}`,
            method: 'GET',
            contentType: 'application/json',
            headers: {
                "Authorization": `Bearer ${getCookie('auth')}`
            },
            success: function(response){
                try {
                    // console.log(response);
                    filterPosts(response);
                } catch (e) {
                    console.log(e);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    });
    $('#leftProfileClick').on('click', () => {location.href='/user?id=' + getCookie('userid')});
    $('#myProfileName').html(getUserData(getCookie('userid')).profileName);
    $('#myUserName').html('@'+getUserData(getCookie('userid')).userName);
    if(getUserData(getCookie('userid')).verified) {
        $('#myProfileName').append(` <span style="font-size: 1em;" class="material-icons micon">verified</span>`);
    }
});

function getUserData(userid) {
    var output;
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/users/public/${String(userid)}`, 
        async: false,
        method: 'GET',
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${getCookie('auth')}`
        }
        // success: function(response){
        //     console.log(response);
        // },
        // error: function(xhr, ajaxOptions, thrownError) {
        //     alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        // }
    }).done((v) => {output = v;});
    return output;
}

//${getUserData(serverdata.postbyid).profileimage}

function filterPosts(postsdata) {
    for (let index = 0; index < postsdata.length; index++) {
        constructPost(postsdata[index]);
    }
}

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
        let date2 = new Date(new Date().toISOString());
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
  
    if(s < 60) {
        return secs + 's';
    } else if (mins < 60 && hrs > 24) {
        return mins + 'm ' + secs + 's';
    } else {
        return hrs + 'h ' + mins + 'm ';
    }
  }

function checkVerified(userid) {
    if(getUserData(userid).verified) {
        return `<span style="font-size: 1em;" class="material-icons micon">verified</span>`;
    } else {
        return '';
    }
}

function constructPost(serverdata) {
    if(serverdata.repost) {
        if(serverdata.repostContent == null) {
            $('#feed').append(`
                <div name="postid${serverdata.postById}" class="card post" style="width: 100%;">
                <div>
                    <p class="retweet" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postById}'"><span class="material-icons micon">repeat</span>retweet ${serverdata.repostByProfileName}</p>
                </div>
                <div class="flex-row">
                    <div class="post-img">
                        <img src="https://picsum.photos/50?random=3" style="border-radius: 100%;">
                    </div>
                    <div class="post-content" style="width: 100%;">
                        <div class="sr-profile-info post-info flex-row" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.repostByPostId}'">
                            <p>${getUserData(serverdata.repostByPostId).profileName} ${checkVerified(serverdata.postById)}</p>
                            <p>@${getUserData(serverdata.repostByPostId).userName}</p>
                            <p>&bull; ${calcTime(serverdata.postTime)}</p>
                        </div>
                        <div style="position: relative;top: -1.7em;">
                            <a onclick="OpenDropdown(this)" class="post-menu" style="margin-left: auto;order: 2;"><span class="material-icons paicon">more_horiz</span></a>
                            <div style="position: relative;float: right;top: 1.7em;right: 8em;">
                                <div class="dropdown-content">
                                    <div><div style="position: relative;top: -0.5em;"><span class="material-icons micon">block</span><span>Block</span></div></div>
                                    <div><div style="position: relative;top: -0.5em;"><span class="material-icons micon">report</span><span>Report</span></div></div>
                                </div>
                            </div>
                        </div>
                        <p>${serverdata.postContent}</p>
                        <div class="sr-profile-info flex-row post-actions">
                            <a onclick="likePost(this)"><span class="material-icons paicon">favorite_border</span></a>
                            <a><span class="material-icons paicon">repeat</span></a>
                            <a><span class="material-icons paicon">chat_bubble_outline</span></a>
                        </div>
                    </div>
                </div>
                </div>
            `);
        } else {
            $('#feed').append(`
            <div name="postid${serverdata.postById}" class="card post flex-row" style="width: 100%;">
                <div class="post-img">
                    <img src="https://picsum.photos/50?random=5" style="border-radius: 100%;">
                </div>
                <div class="post-content" style="width: 100%;">
                    <div class="sr-profile-info post-info flex-row" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postById}'">
                        <p>${getUserData(serverdata.postById).profileName} ${checkVerified(serverdata.postById)}</p>
                        <p>@${getUserData(serverdata.postById).userName}</p>
                        <p>&bull; ${calcTime(serverdata.postTime)}</p>
                    </div>
                    <div style="position: relative;top: -1.7em;">
                        <a onclick="OpenDropdown(this)" class="post-menu" style="margin-left: auto;order: 2;"><span class="material-icons paicon">more_horiz</span></a>
                        <div style="position: relative;float: right;top: 1.7em;right: 8em;">
                            <div class="dropdown-content">
                                <div><div style="position: relative;top: -0.5em;"><span class="material-icons micon">block</span><span>Block</span></div></div>
                                <div><div style="position: relative;top: -0.5em;"><span class="material-icons micon">report</span><span>Report</span></div></div>
                            </div>
                        </div>
                    </div>
                    <p>${serverdata.repostContent}</p>
                    ${NormalPost(serverdata.repostPostId)}
                    <div class="sr-profile-info flex-row post-actions">
                        <a onclick="likePost(this)"><span class="material-icons paicon">favorite_border</span></a>
                        <a><span class="material-icons paicon">repeat</span></a>
                        <a><span class="material-icons paicon">chat_bubble_outline</span></a>
                    </div>
                </div>
            </div>
            `);
        }
    } else {
        $('#feed').append(`
        <div name="postid${serverdata.postById}" class="card post flex-row" style="width: 100%;">
            <div class="post-img">
                <img src="https://picsum.photos/50?random=1" style="border-radius: 100%;">
            </div>
            <div class="post-content" style="width: 100%;">
                <div class="sr-profile-info post-info flex-row" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postById}'">
                    <p>${getUserData(serverdata.postById).profileName} ${checkVerified(serverdata.postById)}</p>
                    <p>@${getUserData(serverdata.postById).userName}</p>
                    <p>&bull; ${calcTime(serverdata.postTime)}</p>
                </div>
                <div style="position: relative;top: -1.7em;">
                    <a onclick="OpenDropdown(this)" class="post-menu" style="margin-left: auto;order: 2;"><span class="material-icons paicon">more_horiz</span></a>
                    <div style="position: relative;float: right;top: 1.7em;right: 8em;">
                        <div class="dropdown-content">
                            <div><div style="position: relative;top: -0.5em;"><span class="material-icons micon">block</span><span>Block</span></div></div>
                            <div><div style="position: relative;top: -0.5em;"><span class="material-icons micon">report</span><span>Report</span></div></div>
                        </div>
                    </div>
                </div>
                <p>${serverdata.postContent}</p>
                <div class="sr-profile-info flex-row post-actions">
                    <a onclick="likePost(this)"><span class="material-icons paicon">favorite_border</span></a>
                    <a><span class="material-icons paicon">repeat</span></a>
                    <a><span class="material-icons paicon">chat_bubble_outline</span></a>
                </div>
            </div>
        </div>
        `);
    }
}

//Get One Posts Data {"postById":"6095eea2658e082708ed41e0","repost":"true","repostContent":"Nice Post","repostByPostId":"6095ffc25bcd332a243cecd8"}
function NormalPost(getpostindex) {
    let serverdata;
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/post/${getpostindex}`,
        method: 'GET',
        async: false,
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${getCookie('auth')}`
        },
        success: function(response){
            try {
                serverdata = response;
            } catch (e) {
                console.log(e);
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });

    return `
    <div id="repostinpostid${serverdata.postById}" class="card post" style="width: 100%;margin-bottom: 1em;">
        <div class="post-content" style="width: 100%;">
            <div class="flex-row">
                <div class="post-img" style="margin-right:0;width:2em;">
                    <img src="https://picsum.photos/50?random=6" style="border-radius: 100%;width: 1.5em;">
                </div>
                <div class="sr-profile-info post-info flex-row" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postById}'">
                    <p>${getUserData(serverdata.postById).profileName} ${checkVerified(serverdata.postById)}</p>
                    <p>@${getUserData(serverdata.postById).userName}</p>
                    <p>&bull; ${calcTime(serverdata.postTime)}</p>
                </div>
            </div>
            <p>${serverdata.postContent}</p>
        </div>
    </div>
    `;
}
