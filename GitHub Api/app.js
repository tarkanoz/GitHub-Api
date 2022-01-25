const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");

const lastUusers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched)
    
}

function getData(e){
   let username = nameInput.value.trim();

   if(username === ""){
       alert("Lütfen geçerli bir kullanıcı adı girin");
   }
   else{
       github.getGithubData(username)
       .then(response => {
           if(response.user.message === "Not Found"){
               
            ui.showError("Kullanıcı Bulunamadı")
               
           }
           else{
               ui.addSearchedUserToUI(username);
               Storage.addSearchedUserToStorage(username);
               ui.showUserInfo(response.user);
               ui.showRepoInfo(response.repo);
           }
       })
       .catch(err => ui.showError(err));

   }
    
   
    e.preventDefault();
    ui.clearInput();

}
function clearAllSearched(){

//tüm aramaları temizle

if(confirm("emin misiniz ?")){
    Storage.clearAllSearchedUsersFromStorage(); //storagedan temizleme
    ui.clearAllSearchedFromUI();
}

}

function getAllSearched(){
    //arananları storageden al ve uiye ekle

    let users = Storage.getSearchedUsersFromStorage();
    
    let result = "";
    users.forEach(user  => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li> 
        result += ` <li class="list-group-item">${user}</li>`
    });

    lastUusers.innerHTML = result;
}