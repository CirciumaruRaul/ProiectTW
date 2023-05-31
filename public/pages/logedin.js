const wrapper = document.querySelector('.wrapper');
const iconClose = document.querySelector('.icon-close');
const posteaza = document.querySelector('.posteaza');
const p = document.querySelector(".postari");

var contor = 0;
var postari = {'titlu' : 'descriere'};

iconClose.addEventListener('click', () => {
    wrapper.classList.add('inactive');
    p.classList.remove('inactive');
});

posteaza.addEventListener('click', () => {
    wrapper.classList.remove('inactive');
    p.classList.add('inactive');
});

function addContent(){
    event.preventDefault();
    const titlu = document.getElementById('t').value;
    const descriere = document.getElementById('d').value;
    postari[titlu] = descriere;
    createNode(titlu, descriere);
    // window.location.reload;
}

function fetchPostari(){
    if(contor === 0){
    const h = document.createElement("h1");
    p.appendChild(h);
    const postare = document.getElementById("content");

    fetch("http://localhost:3100/postari",{method: 'get',})
        .then((response) =>{
            response.json()
            .then((data) =>{
                if(data.length){
                    p.removeChild(h);
                }
                for (let i = 0; i<data.length; i++){
                    const elm = document.createElement("h1");
                    const elm2 = document.createElement("p");
                    elm.innerText = data[i].titlu;
                    elm2.innerText = data[i].descriere;
                    p.appendChild(elm);
                    p.appendChild(elm2);
                }
            })
    });
    
    contor++;
}
else{
    return;
}
}

function addPostare(){
    event.preventDefault();
    const t = document.getElementById("t").value;
    const d = document.getElementById("d").value;
    if (!t || !d) {
        alert("invalid data");
        return;
    }
    const newPostare = {titlu: t, descriere : d};
    fetch('http://localhost:3100/postari', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPostare)
    })
        .then(response => {
            console.log(response);
            window.location.reload();
        });
}

