$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userid = urlParams.get('userid');
    $('#notifications_feed_load').on('click', (event) => {
        $.ajax({
            url: `${window.location.protocol}//${window.location.host}/users/${userid}`,
            method: 'GET',
            contentType: 'application/json',
            headers: {
                "Authorization": `Bearer ${getCookie('auth')}`
            },
            success: function(response){
                try {
                    filterNotifications(response.notifications);
                } catch (e) {
                    console.log(e);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    });
});

function filterNotifications(notificationsdata) {
    for (let index = 0; index < notificationsdata.length; index++) {
        constructNotifications(notificationsdata[index]);
    }
}

function constructNotifications(serverdata) {
    if(serverdata.action == 'like') {
        $('#notifications_feed').append(`
        <div class="card flex-row">
            <p style="margin-right:1em">Like</p>
            <p style="margin-right:1em">${getUserData(serverdata.userid).profileName} ${checkVerified(serverdata.userid)}</p>
            <p>${calcTime(serverdata.timestamp)}</p>
        </div>
        `);
    } else if(serverdata.action == "mention") {
        $('#notifications_feed').append(`
        <div class="card flex-row" style="width: 100%;">
            <div class="post-img">
                <img src="" style="border-radius: 100%;">
            </div>
            <div class="post-content" style="width: 100%;">
                <div class="sr-profile-info post-info flex-row" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postById}'">
                    <p>${getUserData(serverdata.postById).profileName} ${checkVerified(serverdata.postById)}</p>
                    <p>@${getUserData(serverdata.postById).userName}</p>
                    <p>&bull; ${calcTime(serverdata.postTime)}</p>
                </div>
            </div>
        </div>
        `);
    } else if(serverdata.action == "momment") {
        $('#notifications_feed').append(`
        <div>
            <p>${getUserData(serverdata.userid).profileName}</p>
            <p>${calcTime(serverdata.userid)}</p>
        </div>
        `);
    } else if(serverdata.action == "news") {
        $('#notifications_feed').append(`
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
function NormalPost(getnotificationindex) {
    let serverdata;
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/post/${getnotificationindex}`,
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