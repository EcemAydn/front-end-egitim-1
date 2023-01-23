const urlParams = new URLSearchParams(window.location.search);
const myParam = Number(urlParams.get('id'));
let postId = document.querySelector('.postId');
let postTitle = document.querySelector('.postTitle');
let postBody = document.querySelector('.postBody');
let postUserId = document.querySelector('.postUserId');

let postArray =[];
if(localStorage.getItem('postArray')){
    postArray = JSON.parse(localStorage.getItem('postArray'));
}
postArray.forEach((arrayItem)=>{
    if(myParam === arrayItem.id){
        postId.value = arrayItem.id;
        postTitle.value = arrayItem.title;
        postBody.value = arrayItem.body;
        postUserId.value = arrayItem.userId;
    }
});

function updateButton(){
        if(postTitle.value === '' || postBody.value === '' || postUserId.value === ''){
            alert('boş bırakmayın');
        }else {
            fetch(`https://jsonplaceholder.typicode.com/posts/${myParam}`, {
                method: 'PUT',
                body: JSON.stringify({
                id: Number(postId.value),
                title: postTitle.value,
                body: postBody.value,
                userId: Number(postUserId.value),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            }).then(response => response.json())
                let postIndex = postArray.findIndex(arrayItem => myParam === arrayItem.id);
                postArray.splice(postIndex, 1, { id:myParam, title: postTitle.value, body: postBody.value, userId:Number(postUserId.value)});
                // postArray.push({...postItem, id: Number(postId.value) });
                localStorage.setItem('postArray', JSON.stringify(postArray));
                location.href ='../index.html';
        }    
}