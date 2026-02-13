function getUsers(){return JSON.parse(localStorage.getItem("users"))||[]}
function saveUsers(u){localStorage.setItem("users",JSON.stringify(u))}
function setCurrentUser(u){localStorage.setItem("currentUser",JSON.stringify(u))}
function getCurrentUser(){return JSON.parse(localStorage.getItem("currentUser"))}
function logout(){localStorage.removeItem("currentUser");location.href="index.html"}
function protectPage(){if(!getCurrentUser())location.href="index.html"}

function register(){
 let p=phone.value,ps=password.value,c=confirm.value;
 if(ps!==c)return alert("Mot de passe incorrect");
 let u=getUsers();
 if(u.find(x=>x.phone===p))return alert("Numéro existe");
 let user={phone:p,password:ps,balance:0,invested:false};
 u.push(user);saveUsers(u);setCurrentUser(user);
 location.href="dashboard.html";
}

function login(){
 let u=getUsers().find(x=>x.phone===phone.value&&x.password===password.value);
 if(!u)return alert("Erreur");
 setCurrentUser(u);location.href="dashboard.html";
}

function loadDashboard(){
 protectPage();
 let u=getCurrentUser();
 userPhone.innerText=u.phone;
 balance.innerText=u.balance;
}

function recharge(){
 let a=+amount.value;
 if(a<=0)return alert("Montant invalide");
 let u=getCurrentUser();u.balance+=a;
 let users=getUsers().map(x=>x.phone===u.phone?u:x);
 saveUsers(users);setCurrentUser(u);
 alert("Recharge envoyée");location.href="dashboard.html";
}

function buyVIP(price){
 let u=getCurrentUser();
 if(u.balance<price)return alert("Solde insuffisant");
 u.balance-=price;u.invested=true;
 let users=getUsers().map(x=>x.phone===u.phone?u:x);
 saveUsers(users);setCurrentUser(u);
 alert("VIP activé");location.href="dashboard.html";
}

function withdraw(){
 let a=+amount.value,u=getCurrentUser();
 if(!u.invested)return alert("Investissez d'abord");
 if(a<5000)return alert("Minimum 5000 FC");
 if(a>u.balance)return alert("Solde insuffisant");
 u.balance-=a;
 let users=getUsers().map(x=>x.phone===u.phone?u:x);
 saveUsers(users);setCurrentUser(u);
 alert("Retrait demandé");location.href="dashboard.html";
}
