const post_container=document.getElementById("post-container");
const loading=document.querySelector(".loader");
const filter=document.getElementById("filter");


var limit=5;
var page=1;

// Fetch post from API
async function getPosts(){
    
    const res=await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    
    const data=await res.json();

    return data;
}

// Show Posts in DOM
async function showPosts(){
    const posts=await getPosts();

    posts.forEach(function(post){
        const postEl=document.createElement("div");
        postEl.classList.add("post");

        postEl.innerHTML=`
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
        `;

        post_container.appendChild(postEl);
    });

}
// Show loader and fetch more posts
function showLoading(){
    loading.classList.add("show");

    setTimeout(function(){
        loading.classList.remove("show");

        setTimeout(function(){
            page++;
            showPosts();
        },300);
    },1000);    
}
function filterPosts(e){
    const term=e.target.value.toUpperCase();

    const posts=document.querySelectorAll('.post');
    posts.forEach(post=>{
        const title=post.querySelector(".post-title").innerText.toUpperCase();
        const body=post.querySelector(".post-body").innerText.toUpperCase();

        if(title.indexOf(term) >-1 ||body.indexOf(term) >-1){
            post.style.display="flex";
        }
        else{
            post.style.display="none";
        }
    });

}

showPosts();

window.addEventListener("scroll",function(){
    const {scrollTop,scrollHeight,clientHeight}=document.documentElement;

    if(scrollTop+clientHeight>=scrollHeight-5){
        showLoading();
    }
});


filter.addEventListener('input',filterPosts);
