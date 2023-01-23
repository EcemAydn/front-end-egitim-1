let list = document.querySelector('.list');
let postArray = [];
if(localStorage.getItem('postArray')){
    postArray = JSON.parse(localStorage.getItem('postArray'));
} else {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(postItem => {
            postArray.push(...postItem);
            // postArray = postItem
            localStorage.setItem('postArray', JSON.stringify(postArray));
        });
}

postList();

function postList() {
    postArray.forEach(postItem => {
        let postId = document.createElement('div');
        let postLink = document.createElement('a');
        let posts = document.createElement('div');
        
        postLink.classList.add('postLink');
        postId.classList.add('postId');
        posts.classList.add('posts');

        postLink.href=`./detail/?id=${postItem.id}`;
        postLink.innerHTML = postItem.title;
        postId.innerHTML = postItem.id;

        posts.appendChild(postId);
        posts.appendChild(postLink);
        list.appendChild(posts);
    });
}

