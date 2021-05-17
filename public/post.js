var page = 0;

$(document).ready(() => {
    if(window.location.pathname == '/user') {
        loadPostFeed('posts/user/'+getUserIdUrl());
        $('#user_feed_load').on('click', (event) => {
            loadPostFeed('posts/user/'+getUserIdUrl());
        });
    } else {
        loadPostFeed('posts');
        $('#feed_load').on('click', (event) => {
            loadPostFeed('posts');
        });
    }
});

//#region Create Post / Repost
$('#createpostform').on('submit', (event) => {
    event.preventDefault();
    let fileelement = $('#create_image_post').val();
    // normal post
    if($('#create_repost_showcase').children().length == 0) {
        if(fileelement) {
            let formData = { postContent: $('#create_postcontent').val(), postById: UserIdCookie, repost: false, postImage: true};
            PostImage(formData);
            return false;
        }

        let formData = { postContent: $('#create_postcontent').val(), postById: UserIdCookie, repost: false};
        POSTpost(formData);
        location.href= `${window.location.protocol}//${window.location.host}`;
        return false;
    }
    // Repost with content
    let postid = $('#create_repost_showcase > div').attr('id');
    if(fileelement) {
        let formData = { postById: UserIdCookie,postContent: $('#create_postcontent').val(), repost: true, repostPostId: postid, postImage: true};
        PostImage(formData);
        return false;
    }

    let formData = {postById: UserIdCookie,postContent: $('#create_postcontent').val(), repost: true, repostPostId: postid};
    POSTpost(formData);
    location.href= `${window.location.protocol}//${window.location.host}`;
    return false;
});

function POSTpost(senddata) {
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/post/${UserIdCookie}`, 
        method: 'POST',
        async: false,
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${UserAuthCookie}`
        },
        data: JSON.stringify(senddata),
        success: function(){
            location.href= `${window.location.protocol}//${window.location.host}`;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}

function PostImage(formData) {
    let file = document.getElementById('create_image_post').files[0];
    let blob = file.slice(0, file.size, 'image/jpg'); 

    let response;
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/post/${UserIdCookie}`, 
        method: 'POST',
        async: false,
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${UserAuthCookie}`
        },
        data: JSON.stringify(formData),
        success: function(data){
            response = data;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
    let newFile = new File([blob], `${response.id}.jpg`, {type: 'image/jpg'});
    const fd = new FormData();
    fd.append("postimg", newFile)
    console.log(fd)
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/postimageupload`, 
        method: 'POST',
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        headers: {
            "Authorization": `Bearer ${UserAuthCookie}`
        },
        data: fd,
        success: function(data){
            // location.href = `${window.location.protocol}//${window.location.host}/postimages/${response.id}.jpg`;
            location.href= `${window.location.protocol}//${window.location.host}`;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}
// Send UI
function createrepostUI(repostpostid) {
    if(GETsinglePost(repostpostid).postById == UserIdCookie) return;
    $('#create_repost_showcase').html(genererateRepost(false, repostpostid));
    openSendModal();
}

function POSTrepost(postid) {
    if(GETsinglePost(postid).postById == UserIdCookie) return;
    POSTpost({postById: UserIdCookie, repost: true, repostPostId: postid});
}
//#endregion


//#region Create Post feed / Delete

// AJAX Calls
function loadPostFeed(url) {
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/${url}?page=${page++}`,
        method: 'GET',
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${UserAuthCookie}`
        },
        success: function(response){
            try {
                filterPosts(response);
            } catch (e) {
                console.log(e);
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}

function GETsinglePost(getpostindex) {
    let serverdata;
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/post/${getpostindex}`,
        method: 'GET',
        async: false,
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${UserAuthCookie}`
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
            serverdata = null;
        }
    }).done((v) => {serverdata = v});
    return serverdata;
}

function deletePost(postby, postid) {
    if(postby != UserIdCookie) return;

    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/post/${postid}/${UserIdCookie}`,
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${UserAuthCookie}`
        },
        success: function() {
            location.href= `${window.location.protocol}//${window.location.host}`;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}

// Post / Feed UI
function filterPosts(postsdata) {
    for (let index = 0; index < postsdata.length; index++) {
        $('#feed').append(constructPost(postsdata[index]));
    }
}

function constructPost(serverdata) {
    let UserData = getUserData(serverdata.postById);
    if(serverdata.repost) {
        if(serverdata.postContent == null) {
            return `
            <div id="${serverdata._id}" class="card post" style="width: 100%;">
                <div>
                    <p style="cursor: pointer;" class="retweet" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postById}'"><span class="material-icons micon">repeat</span>retweet ${UserData.profileName}</p>
                </div>
                ${genererateRepost(true,serverdata.repostPostId)}
            </div>
            `;
        } else {
            return `
            <div id="${serverdata._id}" class="card post flex-row" style="width: 100%;">
                <div class="post-img" style="height:4em">
                <img src="${checkUserImage(UserData.profileName)}" style="height: 3em;width: 3em;border-radius: 100%;">
                </div>
                <div class="post-content" style="width: 100%;">
                    <div class="sr-profile-info post-info flex-row" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postById}'">
                        <p>${UserData.profileName} ${checkVerified(UserData.verified)}</p>
                        <p>@${UserData.userName}</p>
                        <p>&bull; ${calcTime(serverdata.postTime)}</p>
                    </div>
                    <div style="position: relative;top: -1.7em;">
                        <a onclick="OpenDropdown(this)" class="post-menu" style="margin-left: auto;order: 2;"><span class="material-icons paicon">more_horiz</span></a>
                        <div style="position: relative;float: right;top: 1.7em;right: 8em;">
                            ${generatePostActionsMore(serverdata)}
                        </div>
                    </div>
                    <p>${serverdata.postContent}</p>
                    ${generatePostImage(serverdata)}
                    ${genererateRepost(false, serverdata.repostPostId)}
                    ${generatePostActions(serverdata)}
                </div>
            </div>
            `;
        }
    } else {
        return `
        <div id="${serverdata._id}" class="card post flex-row" style="width: 100%;">
            <div class="post-img" style="height:4em">
                <img src="${checkUserImage(UserData.profileName)}" style="height: 3em;width: 3em;border-radius: 100%;">
            </div>
            <div class="post-content" style="width: 100%;">
                <div class="sr-profile-info post-info flex-row" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postById}'">
                    <p>${UserData.profileName} ${checkVerified(UserData.verified)}</p>
                    <p>@${UserData.userName}</p>
                    <p>&bull; ${calcTime(serverdata.postTime)}</p>
                </div>
                <div style="position: relative;top: -1.7em;">
                    <a onclick="OpenDropdown(this)" class="post-menu" style="margin-left: auto;order: 2;"><span class="material-icons paicon">more_horiz</span></a>
                    <div style="position: relative;float: right;top: 1.7em;right: 8em;">
                        ${generatePostActionsMore(serverdata)}
                    </div>
                </div>
                <p>${serverdata.postContent}</p>
                ${generatePostImage(serverdata)}
                ${generatePostActions(serverdata)}
            </div>
        </div>
        `;
    }
}

function genererateRepost(fullrepost,getpostindex) {
    let serverdata = GETsinglePost(getpostindex);
    if(serverdata == null || serverdata == undefined) {
        return `
        <div name="NoPostAvaible" class="card post" style="width: 100%;margin-bottom: 1em;">
            <div class="post-content" style="width: 100%;">
                <p>Post nicht mehr Verfügbar</p>
            </div>
        </div>
        `;
    }
    let UserData = getUserData(serverdata.postById);

    if(fullrepost) {
        return `
        <div class="flex-row" name="repost" id="${serverdata._id}">
            <div class="post-img" style="height:4em" onclick="MakePostBig(this)">
                <img src="${checkUserImage(UserData.profileName)}" style="height: 3em;width: 3em;border-radius: 100%;">
            </div>
            <div class="post-content" style="width: 100%;">
                <div class="sr-profile-info post-info flex-row" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postById}'">
                    <p>${UserData.profileName} ${checkVerified(UserData.verified)}</p>
                    <p>@${UserData.userName}</p>
                    <p>&bull; ${calcTime(serverdata.postTime)}</p>
                </div>
                <div style="position: relative;top: -1.7em;">
                    <a onclick="OpenDropdown(this)" class="post-menu" style="margin-left: auto;order: 2;"><span class="material-icons paicon">more_horiz</span></a>
                    <div style="position: relative;float: right;top: 1.7em;right: 8em;">
                        ${generatePostActionsMore(serverdata)}
                    </div>
                </div>
                <p>${serverdata.postContent}</p>
                ${generatePostImage(serverdata)}
                ${generatePostActions(serverdata)}
            </div>
        </div>
        `;
    } else {
        return `
        <div id="${serverdata._id}" name="repost" class="card post" style="width: 100%;margin-bottom: 1em;">
            <div class="post-content" style="width: 100%;">
                <div class="flex-row">
                    <div class="post-img" style="margin-right:0;width:2em;">
                        <img src="${checkUserImage(UserData.profileName)}" style="height: 1.5em;width: 1.5em;border-radius: 100%;">
                    </div>
                    <div class="sr-profile-info post-info flex-row" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postById}'">
                        <p>${UserData.profileName} ${checkVerified(UserData.verified)}</p>
                        <p>@${UserData.userName}</p>
                        <p>&bull; ${calcTime(serverdata.postTime)}</p>
                    </div>
                </div>
                <p>${serverdata.postContent}</p>
                ${generatePostImage(serverdata)}
            </div>
        </div>
        `;
    }
}

// Basic Post components
function generatePostImage(serverdata) {
    if(serverdata.postImage) {
        return `
        <div class="pointer post-img-view">
            <img class="post-img-view-img" src="${`${window.location.protocol}//${window.location.host}/postimages/${serverdata._id}.jpg`}" onclick="openimageviewer('${`${window.location.protocol}//${window.location.host}/postimages/${serverdata._id}.jpg`}', this)">
        </div>
        `;
    } else {
        return ``;
    }
}

function generatePostActions(serverdata) {
    return `
    <div class="sr-profile-info flex-row post-actions">
        ${checkLiked(serverdata)}
        <a onclick="OpenDropdown(this)" class="post-menu"><span class="material-icons paicon">repeat</span></a>
        <div style="position: relative;top: 1.7em;right: 6em;">
            <div class="dropdown-content">
                <div onclick="POSTrepost('${serverdata._id}')"><div style="position: relative;top: -0.5em;"><span class="material-icons micon">repeat</span><span>Repost</span></div></div>
                <div onclick="createrepostUI('${serverdata._id}')"><div style="position: relative;top: -0.5em;"><span class="material-icons micon">edit_note</span><span>Zitieren</span></div></div>
            </div>
        </div>
        <a name="postcommentsbtn" onclick="openComments('${serverdata._id}')"><span class="material-icons paicon">chat_bubble_outline</span></a>
    </div>
    `;
    // <p style="line-height:2.1em;margin-right:0.5em;">${(serverdata.postComments.length - 1)}</p>
}

function generatePostActionsMore(serverdata) {
    return `
    <div class="dropdown-content">
        ${CheckPostDelete(serverdata)}
        <div><div style="position: relative;top: -0.5em;"><span class="material-icons micon">info</span><span>Soon more</span></div></div>
    </div>
    `;
    // <div><div style="position: relative;top: -0.5em;"><span class="material-icons micon">block</span><span>Block</span></div></div>
    // <div><div style="position: relative;top: -0.5em;"><span class="material-icons micon">report</span><span>Report</span></div></div>
}

function CheckPostDelete(serverdata) {
    if(serverdata.postById == UserIdCookie) {
        return `
        <div><div onclick="deletePost('${serverdata.postById}', '${serverdata._id}')" style="position: relative;top: -0.5em;color:red"><span class="material-icons micon">delete</span><span>Löschen</span></div></div>
        `;
    } else {
        return ``;
    }
}

function checkLiked(serverdata) {
    for (let index = 0; index < serverdata.postLikes.length; index++) {
        if(serverdata.postLikes[index] == UserIdCookie) {
            return `<a onclick="unlikePost(this)" class="post-liked"><span class="material-icons paicon">favorite</span></a><p style="font-size: 0.8em;line-height:2.8em;margin-right:0.5em;">${serverdata.postLikes.length}</p>`;
        }
    }
    return `
    <a onclick="likePost(this)"><span class="material-icons paicon">favorite_border</span></a><p style="font-size: 0.8em;line-height:2.8em;margin-right:0.5em;">${serverdata.postLikes.length}</p>
    `;
}
//#endregion


//#region Like / Dislike
function likePost(element) {
    let postid = element.parentNode.parentNode.parentNode.id;
    let icon = element.children[0];
    // console.log(postid, element.children[0]);
    // if(element.classList.contains('post-liked')) {
    //     icon.innerHTML = "favorite_border";
    //     element.classList.remove('post-liked');
    // } else {
    //     icon.innerHTML = "favorite";
    //     element.classList.add('post-liked');
    // }

    icon.innerHTML = "favorite";
    element.classList.add('post-liked');
    element.setAttribute('onclick','unlikePost(this)');

    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/post/${UserIdCookie}/like/${postid}`, 
        method: 'POST',
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${UserAuthCookie}`
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}

function unlikePost(element) {
    let postid = element.parentNode.parentNode.parentNode.id;
    let icon = element.children[0];
    icon.innerHTML = "favorite_border";
    element.classList.remove('post-liked');
    element.setAttribute('onclick','likePost(this)');

    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/post/${UserIdCookie}/dislike/${postid}`, 
        method: 'POST',
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${UserAuthCookie}`
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}
//#endregion


//#region Post_View / Comments

$('#create_commentbutton').on('click', () => {
    let postid = $('#commentsfeed').children(":first").attr('id');
    let formData = {message: $('#create_commentcontent').val()};
    POSTcreateComment(postid, formData);
    location.href = location.href;
});

$('#ccreate_comment2button').on('click', (e) => {
    let postid = $('#Post_view > div').attr('id');
    let formData = {message: $('#create_comment2content').val()};
    POSTcreateComment(postid, formData);
    location.href = location.href;
});

function POSTcreateComment(postid, formData) {
    console.log(postid);
    console.log(formData);
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/post/${postid}/comment/${UserIdCookie}`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        headers: {
            "Authorization": `Bearer ${UserAuthCookie}`
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}

function deleteComment(postid, commentid, commentby) {
    if(commentby != UserIdCookie) return;

    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/post/${postid}/comment/${commentid}/${UserIdCookie}`,
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${UserAuthCookie}`
        },
        success: function() {
            location.href = location.href;;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}

function loadPostComments(serverdata) {
    $('#commentsfeed').html('');
    $('#commentsfeed').append(`<div id="${serverdata._id}"></div>`);
    if(serverdata.postComments == null || !serverdata.postComments || serverdata.postComments.length == 0) {
        $('#commentsfeed').append(`<p>Keine Kommentare!</p>`);
        return;
    } 
    for (let index = 0; index < serverdata.postComments.length; index++) {
        let UserData = getUserData(serverdata.postComments[index].userid);
        $('#commentsfeed').append(`
        <div id="${serverdata.postComments[index]._id}" class="flex-row" style="width: 100%;">
            <div class="post-img" style="height:4em">
                <img src="${checkUserImage(UserData.profileName)}" style="height: 3em;width: 3em;border-radius: 100%;">
            </div>
            <div class="post-content" style="width: 100%;">
                <div class="sr-profile-info post-info flex-row" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postComments[index].userid}'">
                    <p>${UserData.profileName} ${checkVerified(UserData.verified)}</p>
                    <p>@${UserData.userName}</p>
                    <p>&bull; ${calcTime(serverdata.postComments[index].commentTime)}</p>
                </div>
                <p>${serverdata.postComments[index].message}</p>
            </div>
            <div style="position: relative;top: -1em;">
                <a onclick="OpenDropdown(this)" class="post-menu" style="margin-left: auto;order: 2;"><span class="material-icons paicon">more_horiz</span></a>
                <div style="position: relative;float: right;top: 1.7em;right: 8em;">
                    ${generateCommentActionsMore(serverdata.postComments[index], serverdata._id)}
                </div>
            </div>
        </div>
        `);
    }
}

function loadPostComments2(serverdata) {
    $('#commentsfeed2').html('');
    if(serverdata.postComments == null || !serverdata.postComments || serverdata.postComments.length == 0) {
        $('#commentsfeed2').append(`<p>Keine Kommentare!</p>`);
        return;
    } 
    for (let index = 0; index < serverdata.postComments.length; index++) {
        let UserData = getUserData(serverdata.postComments[index].userid);
        $('#commentsfeed2').append(`
        <div id="${serverdata.postComments[index]._id}" class="flex-row" style="width: 100%;">
            <div class="post-img" style="height:4em">
                <img src="${checkUserImage(UserData.profileName)}" style="height: 3em;width: 3em;border-radius: 100%;">
            </div>
            <div class="post-content" style="width: 100%;">
                <div class="sr-profile-info post-info flex-row" onclick="location.href=window.location.protocol + '//' + window.location.host + '/user?id=${serverdata.postComments[index].userid}'">
                    <p>${UserData.profileName} ${checkVerified(UserData.verified)}</p>
                    <p>@${UserData.userName}</p>
                    <p>&bull; ${calcTime(serverdata.postComments[index].commentTime)}</p>
                </div>
                <p>${serverdata.postComments[index].message}</p>
            </div>
            <div style="position: relative;top: -1em;">
                <a onclick="OpenDropdown(this)" class="post-menu" style="margin-left: auto;order: 2;"><span class="material-icons paicon">more_horiz</span></a>
                <div style="position: relative;float: right;top: 1.7em;right: 8em;">
                    ${generateCommentActionsMore(serverdata.postComments[index], serverdata._id)}
                </div>
            </div>
        </div>
        `);
    }
}

function generateCommentActionsMore(serverdata, postid) {
    return `
    <div class="dropdown-content">
        ${CheckCommentDelete(serverdata, postid)}
        <div><div onclick="CloseDropdown()" style="position: relative;top: -0.5em;"><span class="material-icons micon">menu</span><span>Close Menu</span></div></div>
    </div>
    `;
    // <div><div style="position: relative;top: -0.5em;"><span class="material-icons micon">block</span><span>Block</span></div></div>
    // <div><div style="position: relative;top: -0.5em;"><span class="material-icons micon">report</span><span>Report</span></div></div>
}

function CheckCommentDelete(serverdata, postid) {
    if(serverdata.userid == UserIdCookie) {
        return `
        <div><div onclick="deleteComment('${postid}', '${serverdata.id}', '${serverdata.userid}')" style="position: relative;top: -0.5em;color:red"><span class="material-icons micon">delete</span><span>Löschen</span></div></div>
        `;
    } else {
        return ``;
    }
}

function openComments(postid) {
    let serverdata = GETsinglePost(postid);
    loadPostComments(serverdata);
    openModal('commentsmodal');
}

function PostView(postid) {
    let serverdata = GETsinglePost(postid);
    $('#Post_view').html('');
    $('#Post_view').append(constructPost(serverdata));
    $("#Post_view").find("[name='postcommentsbtn']").remove();
    loadPostComments2(serverdata);
}

function MakePostBig(el) {
    if(el.target !== el.currentTarget) return;
    if(el.target.getAttribute('name') == 'NoPostAvaible') return;
    PostView(el.id);
    openModal('postmodal');
}

$(document).on('click', (el) => {
    if(!el.target.classList.contains('post')) return;
    if(el.target.getAttribute('name') == 'NoPostAvaible') return;
    PostView(el.target.id);
    openModal('postmodal');
});
//#endregion