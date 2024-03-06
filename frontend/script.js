function login() {
    var userName = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var data = { userName: userName, password: password };
  
    // Make AJAX request to Backend API
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/account/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
                if(responseData==true){
                    window.location.href = "adminscreen.html";
                }
                if(responseData==false){
                    console.log("Login failed");
                  document.getElementById("response").innerHTML = "Login failed";
                }
            }
        }
    };
    console.log(JSON.stringify(data));
    xhr.send(JSON.stringify(data));
  }