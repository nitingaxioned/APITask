// variable Decleration
var data;
var user;
var index = 0;
var pointer = 0;

var apiRequest = new XMLHttpRequest();
apiRequest.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
apiRequest.onload = function(){
    if(this.status == 200)
        data = JSON.parse(this.response);
    else
        alert("somthing went weong");
    displayCards();
}
apiRequest.send();

// Event Listners
document.querySelector("a").addEventListener("click", function(){ displayCards(); });

// card to Display
function displayCards(){
    pointer = index + 6;
    (data.length < pointer) && (pointer=data.length);
    console.log(data.length);
    for(index; index < pointer; index++){
        var tempCard = document.querySelector(".dummy").cloneNode(true);
        tempCard.classList.remove("dummy","hide-me");
        tempCard.querySelector(".card-titel").innerHTML = data[index].title;
        tempCard.querySelector(".cart-txt").innerHTML = data[index].body;
        var tempColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
        tempCard.style.backgroundColor = tempColor;
        random(tempCard);
    }
    (pointer==data.length) && document.querySelector("a").classList.add("hide-me");
}

function random(tempCard){
    var randomRequest = new XMLHttpRequest();
    randomRequest.open("GET", "https://randomuser.me/api/", true);
    randomRequest.onload = function(){
        if(this.status == 200)
            user = JSON.parse(this.response);
        else
            alert("somthing went weong");
        tempCard.querySelector(".name").innerHTML = user.results[0].name.first+" "+user.results[0].name.last;
        tempCard.querySelector(".date").innerHTML = getDateFormat(user.results[0].dob.date);
        tempCard.querySelector("img").src = user.results[0].picture.medium;
        document.querySelector(".cards").appendChild(tempCard);
    }
    randomRequest.send();
}

function getDateFormat(str){
    var dateObj = new Date(str);
    var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return month[dateObj.getMonth()]+" "+dateObj.getDate()+", "+ dateObj.getFullYear();
}











