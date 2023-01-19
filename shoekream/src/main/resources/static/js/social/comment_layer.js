function comment_more(idx, sessionUserIdx){
    fetch("http://localhost:8889/api/social/comments_more/" + idx)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            document.getElementById('now_boardIdx').value=idx;
            console.log(document.getElementById('now_boardIdx').value)
            document.getElementById('layer_board_member_profile').src = data.memberDTO.imgUrl;
            document.getElementById('layer_board_nickname').innerHTML = data.memberDTO.nickname;
            document.getElementById('layer_board_content').innerHTML = data.content+`
            <br><a><span class="hashtag" id="layer_board_hashtag">` + '#' + data.hashtag + `</span></a>`;
            dt = new Date(data.createdAt);
            document.getElementById('layer_board_time').innerText =
                dt.getFullYear() + '년 ' + dt.getMonth()+1 + '월 ' + dt.getDate() + '일'
            fetch("http://localhost:8889/api/social/comments_more/getSessionUser/" + idx)
                .then((response2) => response2.json())
                .then((user)=>{
                    // console.log(user.imgUrl)
                    document.getElementById('layer_commment_create_profile').src = user.imgUrl;
                })
            let commentList = "";
            for(let i=0; i<data.replies.length;i++){
                // console.log(data.replies[i].memberDTO.imgUrl);
                cdt = new Date(data.replies[i].createdAt);
                let ymd = cdt.getFullYear() + '년 ' + cdt.getMonth()+1 + '월 ' + cdt.getDate() + '일';
                commentList +=
                    `<div class="comment_unit">
                    <div class="comment_box">
                        <a href="#" class="profile_link">
                            <img src="${data.replies[i].memberDTO.imgUrl}" alt="KREAM 프로필 이미지" class="profile_img">
                        </a>
                        <div class="comment_detail">
                            <div class="main">
                                <span class="user_name">${data.replies[i].memberDTO.nickname}</span>
                                <span class="comment_txt">${data.replies[i].content}</span>
                            </div>
                            <div class="sub">
                                <span class="upload_time">${ymd}</span>
                                <a href="#" class="delete">삭제</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
            // console.log(commentList);
            document.getElementById('comment_group').innerHTML = commentList;
        })
    const popup = document.getElementById('comment_more');
    popup.style.display = "block";
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

    // reply_input = document.querySelector('input_txt origin')
    // reply_input.addEventListener('keypress', function (
    //
    // ))
}

function inputReply(input){
    // dummy = document.querySelector('dummy');
    // dummy.innerHTML = input.innerHTML;
    replySubmit = document.getElementById('reply_submit_btn');
    replySubmit.style.display = "block";
    input.style.color='black';
}

function isNull(input){
    const btn = document.getElementById('reply_submit_btn');
    if(input.innerHTML==""){
        btn.style.display = "none"
    }
}

function comment_submit(){
    const replyContent = document.getElementById('layer_reply_content').innerText;
    console.log(replyContent)
    const currentBoardIdx = document.getElementById('now_boardIdx').value;
    console.log(currentBoardIdx)
    fetch('http://localhost:8889/api/social/comment_create',{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            "transaction_time": `${new Date()}`,
            "resultCode": "ok",
            "description": "정상",
            "data":{
                "content": `${replyContent}`,
                "boardIdx": `${currentBoardIdx}`,
            }
        })
    })
        .then((res) => {
            alert("댓글 등록 성공!")
            location.reload();
            return;
        })

}

function comment_close(){
    const popdown = document.getElementById('comment_more');
    popdown.style.display = "none"
    const body = document.querySelector('body');
    body.style.overflow = 'unset'
}
