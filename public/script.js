const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btn-Login-popup');
const iconCLose = document.querySelector('.icon-close');
const container = document.querySelector(".container");
const contact = document.getElementById("contact");
const aditional = document.getElementById("aditional");
const textcont = document.querySelector(".contact");

var originalContent;

window.onload = function () {
    originalContent = document.getElementById("text").innerHTML;
}

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    container.classList.add('inactive');
    textcont.classList.remove('active');
});

iconCLose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    container.classList.remove('inactive');
    aditional.style.pointerEvents = '';
    aditional.style.color = '';
});

contact.addEventListener('click', () => {
    container.classList.add('inactive');
    aditional.style.pointerEvents = 'none';
    aditional.style.color = '#696969';
    textcont.classList.add('active');
    wrapper.classList.remove('active-popup');

});

var contor = 0;
var i = 0;
const lista = ["Donec mattis elit erat, efficitur interdum metus mollis a. Nullam rutrum dolor id placerat posuere. Cras et leo lacinia, suscipit nunc vel, pulvinar dolor. Aenean hendrerit metus nec massa aliquet, at tincidunt est commodo. Cras sit amet neque vel dui aliquet mattis at eu neque. Nullam", "Suspendisse tincidunt ultrices ipsum ut rhoncus. Pellentesque et enim lorem. Sed sapien tellus, lobortis eu viverra et, semper gravida dolor. Sed ex turpis, vestibulum in velit sit amet, molestie cursus mi. Maecenas non auctor nibh, et porta dui. Curabitur blandit ex velit, et malesuada orci viverra efficitur. Quisque ut dictum felis. Donec in massa ullamcorper, lacinia lacus et, ultrices sapien. Fusce imperdiet tortor vitae ipsum", "Duis ultricies non mi id scelerisque. Maecenas augue quam, condimentum quis massa sit amet, dignissim dictum nibh. Phasellus finibus sapien a ante laoreet varius. Maecenas pharetra non ex in blandit. Sed ac tortor arcu. Nunc vehicula quam quis volutpat faucibus. Maecenas tincidunt enim id aliquam elementum. Phasellus interdum, nunc id viverra interdum, ante orci ornare justo, id efficitur diam mauris ac ante. Nunc et facilisis orci"];
var indexListaInformatiiAditionale = lista.length;

function editNode() {
    textcont.classList.remove('active');
    container.classList.remove('inactive');
    aditional.style.pointerEvents = '';
    aditional.style.color = '';
    wrapper.classList.remove('active-popup');
    container.classList.remove('inactive');
    while (contor !== 0) {
        deleteNode();
    }
    i = 0;
    indexListaInformatiiAditionale = lista.length;
    var content = document.getElementById("text");
    content.innerHTML = "In suscipit lacus tellus, non ullamcorper ante placerat a. Nam bibendum purus sit amet odio rhoncus malesuada. Curabitur vel risus et ipsum iaculis cursus. Donec euismod, erat at scelerisque condimentum, tortor lacus lobortis augue, pulvinar vehicula eros orci ut nulla. Nunc et mattis dui. Integer sit amet lacus quam. Mauris nisi purus, malesuada at magna quis, facilisis volutpat arcu. Proin non urna congue, ultrices turpis sit amet, congue lectus. Curabitur at risus nisi. Aliquam egestas quam quis nisl dignissim varius. Donec sed leo non orci lacinia efficitur. Aenean in metus at risus feugiat sollicitudin in porta orci. Nulla egestas hendrerit lacus, eget tempus elit accumsan nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris nisl sem, vulputate commodo vestibulum in, pulvinar vel nibh. Vestibulum ligula elit, hendrerit vitae tortor et, bibendum tincidunt ex.";
}

function revertChanges() {
    while (contor !== 0) {
        deleteNode();
    }
    i = 0;
    indexListaInformatiiAditionale = lista.length;
    var content = document.getElementById("text");
    content.innerHTML = originalContent;
    textcont.classList.remove('active');
    container.classList.remove('inactive');
    aditional.style.pointerEvents = '';
    aditional.style.color = '';
    wrapper.classList.remove('active-popup');
    container.classList.remove('inactive');
}

if (i < lista.length) {
    function createNode() {
        contor++;
        var container = document.getElementById("container");
        var newDiv = document.createElement("h1");
        if (i === lista.length) {
            newDiv.innerHTML = "!!NU MAI SUNT INFORMATII ADITIONALE!!";
            newDiv.classList.add("text");
            newDiv.classList.add("rosu");
            container.appendChild(newDiv);
            i++;
        }
        if (indexListaInformatiiAditionale !== 0) {
            var aux = lista[i];
            newDiv.innerHTML = aux;
            indexListaInformatiiAditionale--;
            i++;
        }
        newDiv.classList.add("text")
        container.appendChild(newDiv);
    }
}
function deleteNode() {
    var container = document.getElementById("container");
    i--;
    var divToRemove = container.lastChild;
    container.removeChild(divToRemove);
    contor--;
}

function logSend()
{
    // event.preventDefault();
    const email = document.getElementById("email-log").value;
    const password = document.getElementById("password-log").value;
    if (!email || !password) {
        alert("invalid creds");
        return;
    }
    const newUser = {email : email, password: password};
    fetch('http://localhost:3100/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(function(response){
        console.log(response);
        if(response.status === 201)
        {
            window.location.href = "pages/dashboard.html";
        }
        else if(response.status === 200)
        {
            window.location.href = "pages/LogedIn.html";
        }
        else{
            alert("Invalid Credis");
        }
    })
}

function addUser() {
    // preventDefault();
    const username = document.getElementById("username-reg").value;
    const email = document.getElementById("email-reg").value;
    const password = document.getElementById("password-reg").value;
    if (!username || !email || !password) {
        alert("invalid data");
        return;
    }
    const newUser = {username: username, email : email, password: password};
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
