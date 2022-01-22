// script to find number of tasks left

var li = document.getElementById("uList").getElementsByTagName("li");
var la = li.length;
var popupElement = document.getElementById("popup");

if(la > 1){
    document.getElementById('tasksLeft').innerHTML = la + " tasks left";
}else{
    document.getElementById('tasksLeft').innerHTML = la + " task left";
}

// function to fetch msg from server and display
function deleteTask(important,id){
    let fetchRes = fetch("/delete-task/?important="+important+"&id="+id);
    fetchRes.then(res =>
        res.json()).then(data => {
            if(data.status == "success"){
                location.reload();
            }else{
                openPopup(data.msg);
                setTimeout(closePopup, 2000);
            }
    });
}

// function to display and close popup
function openPopup(msg){
   popupElement.innerHTML = msg;
   popupElement.style.display="block"
}
function closePopup(){
    popupElement.innerHTML = "";
    popupElement.style.display="none"
}