const show = document.querySelector(".show");
const create = document.querySelector(".create");
const read = document.querySelector(".read");
const update = document.querySelector(".update");
const username = document.querySelector(".usr");
const email = document.querySelector(".eml");
const password = document.querySelector(".pas");
const date = document.querySelector(".date");
const trimite = document.querySelector(".trimite");
const ur = document.querySelector(".ur");
const dl = document.querySelector(".dl");

var contor = 0;


read.addEventListener('click', () => {
    show.classList.remove('inactive');
    email.classList.add('inactive');
    username.classList.add('inactive');
    password.classList.add('inactive');
    trimite.classList.add('inactive');
    ur.classList.add('inactive');

});

create.addEventListener('click',()=>{
    show.classList.remove('inactive');
    email.classList.remove('inactive');
    username.classList.remove('inactive');
    password.classList.remove('inactive');
    trimite.classList.remove('inactive');
    ur.classList.add('inactive');
});

update.addEventListener('click', () =>{
    ur.classList.remove('inactive');
    email.classList.add('inactive');
    username.classList.add('inactive');
    password.classList.add('inactive');
    trimite.classList.add('inactive');
});
function addUser() {
    // preventDefault();
    const u = username.value;
    const e = email.value;
    const p = password.value;
    if (!username || !email || !password) {
        alert("invalid data");
        return;
    }
    const newUser = {username: u, email : e, password: p};
    fetch('http://localhost:3100/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(response => {
            console.log(response);
            window.location.reload();
        });
}


function fetchUser(){
    if(contor === 0){
    const h = document.createElement("h1");
    show.appendChild(h);
    const content = document.getElementById("content");

    fetch("http://localhost:3100/login",{method: 'get',})
        .then((response) =>{
            response.json()
            .then((data) =>{
                if(data.length){
                    show.removeChild(h);
                }
                for (let i = 0; i<data.length; i++){
                    const elm = document.createElement("h1");
                    elm.innerText = "email:" + data[i].email + '--->' + "username:" + data[i].username;
                    content.appendChild(elm);
                    elm.classList.add('text');
                    elm.style.cssText = `
                        background: transparent;
                        border: 2px solid rgba(255, 255 , 255, 0.5);
                        border-radius: 20px;  
                        backdrop-filter: blur(20px);  
                        box-shadow: 0 0 30px rgba(0,0,0,0.5);
                        margin-bottom: 15px;
                        margin-top: 15px;
                    `;
                    const buttonDel = document.createElement("button");
				    buttonDel.innerText = "Delete";
                    buttonDel.style.cssText = `background: transparent;
                    border: 2px solid rgba(255, 255 , 255, 0.5);
                    border-radius: 20px;  
                    backdrop-filter: blur(20px);  
                    box-shadow: 0 0 30px rgba(0,0,0,0.5);
                    margin-bottom: 15px;
                    margin-top: 15px;`;
                    buttonDel.classList.add("delete");
				    buttonDel.onclick = function() {
                        console.log(data[i].id)
					    deleteUser(data[i].id);
				    }
                    content.appendChild(buttonDel);
                }
            })
    });
    
    contor++;
}
else{
    return;
}
}

function editUser() {
    const username = document.getElementById("username").value;
	const email = document.getElementById("email-nou").value;
	const parola = document.getElementById("parola-noua").value;
	if (!email || !parola) {
		alert("Invalid data!");
		return;
	}
	const newUser = {username: username, email: email, password: parola };
	fetch("http://localhost:3100/register/", 
		  {method: 'put', 
		   headers: 
		   {
			   'Content-Type' : 'application/json'
		   },
		   body: JSON.stringify(newUser)
		  }).then(function(response)
				  {
					console.log(response);
                    window.location.reload(); 
                });
}

function deleteUser(id){
    fetch("http://localhost:3100/register/" + id, 
    {
        method:'delete',
    }).then(function(response){
        console.log(response);
        window.location.reload();
    })
}

