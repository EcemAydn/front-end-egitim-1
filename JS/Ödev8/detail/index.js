
// localdeki idiyi getir commentin icindeki postidye eşitle 


const urlParams = new URLSearchParams(window.location.search);
const myParam = Number(urlParams.get('id'));
let list = document.querySelector('.list');
let pTitle = document.querySelector('.postTitle');

let postArray = [];


if (localStorage.getItem('postArray')){
    postArray = JSON.parse(localStorage.getItem('postArray'));
}

postArray.forEach(arrayItem => {
    if(myParam === arrayItem.id){
        let arrayTitle = document.createElement('div');
        let arrayId = document.createElement('div');

        arrayId.innerHTML = arrayItem.id;
        arrayTitle.innerHTML = arrayItem.title;

        arrayId.classList.add('id');
        pTitle.appendChild(arrayId);
        pTitle.appendChild(arrayTitle);
   };

})

fetch(`https://jsonplaceholder.typicode.com/comments?postId=${myParam}`).then(response => response.json())
.then(comments => {
    comments.forEach(commentsItem => {
        let commentControl = document.createElement('div');
        let commentName = document.createElement('div');
        let bmControl = document.createElement('div');
        let commentBody = document.createElement('div');
        let commentMail = document.createElement('div');

        bmControl.classList.add('bmControl');
        commentControl.classList.add('commentControl');
        commentName.classList.add('commentName');

        commentName.innerHTML = commentsItem.name;
        commentBody.innerHTML = commentsItem.body;
        commentMail.innerHTML = commentsItem.email;

        commentControl.appendChild(commentName);
        commentControl.appendChild(bmControl);
        bmControl.appendChild(commentBody);
        bmControl.appendChild(commentMail);
        list.appendChild(commentControl);
        })
})

function editButton(){
    location.href = `../edit/?id=${myParam}`;
}

function deleteButton(){
    let del = confirm(`${myParam}. post silinecek. Onaylıyorsanız 'Tamam' butonuna tıklayın. `);
    if(del){
        fetch(`https://jsonplaceholder.typicode.com/posts/${myParam}`, {
            method: 'DELETE',
        }).then(response => {});

        let postIndex = postArray.findIndex(postItem =>{
            return postItem.id === myParam;
        })
        postArray.splice(postIndex, 1);  
        localStorage.setItem('postArray', JSON.stringify(postArray));
        location.href ='../index.html';
    }
}


// function deleteButton(){
//     let del = confirm(`${myParam}. post silinecek. Onaylıyorsanız 'Tamam' butonuna tıklayın.`);
//     if(del === true){
//         fetch(`https://jsonplaceholder.typicode.com/posts/${myParam}`, {
//                 method: 'PUT',
//                 body: JSON.stringify({
//                 id: myParam,
//                 title: title.value,
//                 body: body.value,
//                 userId: Number(userId.value),
//             }),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 },
//             })
//         .then(res => res.json())
//         .then(a => {
//             console.log(a);
//             a.forEach(e => {
//                 let bla = a[myParam - 1];
//                 if( bla > -1){
//                     array.splice(bla, 1);
//                 }
//                 console.log(bla);
//             })
            
//         })
//     }else{
//         console.log('okeymeto');
//     }
// }

