let postId = document.querySelector('.postId');
let postTitle = document.querySelector('.postTitle');
let postBody = document.querySelector('.postBody');
let postUserId = document.querySelector('.postUserId');

let postArray = [];

if(localStorage.getItem('postArray')){
  postArray = JSON.parse(localStorage.getItem('postArray'));
}

postId.value = postArray.length +1;

function saveButton(){
  fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: 'POST',
    body: JSON.stringify({
    userId: Number(postUserId.value),
    id: Number(postId.value),
    title: postTitle.value,
    body: postBody.value,
  }),
  headers: {
      'Content-type': 'application/json; charset=UTF-8'},
  })
    .then(res => res.json())
    .then(postItem => {
      /*
      ...postItem
      {
          body: postItem.body,
          title: postItem.title,
          userId: postItem.userId
      }
      */
      postArray.push({ ...postItem, id: Number(postId.value)});
      localStorage.setItem('postArray', JSON.stringify(postArray));
      postId.value = postArray.length + 1;
      alert('kayıt basarili');
      postTitle.value='';
      postBody.value='';
      postUserId.value = '';
    });
}