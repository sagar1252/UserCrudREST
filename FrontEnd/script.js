//var createUser=document.getElementById("create-user");

listUser();

document.getElementById("create-user").addEventListener("click", createUpdateUser);
//document.getElementById("list-btn").addEventListener("click", listUser);

function createUpdateUser() {

    var IdTextBox = document.getElementById("User_id").value;


    if (IdTextBox === "") {
        createUser();
        listUser();

    }
    else {
        updateUser();
        listUser();
    }
}

function updateUser() {

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var IdTextBox = document.getElementById("User_id").value;
    var password = document.getElementById("password").value;


    fetch("http://localhost/UserCrud-main/Backend/api.php", {



        method: "PUT",
        body: JSON.stringify({
            id: IdTextBox,
            name: name,
            email: email,
            password: password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.json())
        .then((json) => console.log(json));
}


function createUser() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var IdTextBox = document.getElementById("User_id").value;
    var password = document.getElementById("password").value;


    fetch("http://localhost/UserCrud-main/Backend/api.php", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.json())
        .then((json) => console.log(json));

    // document.getElementsByClassName("user-message").style.visibility="visible";

    console.log("ac");
    // document.getElementsByClassName("user-message").style.visibility="visible";
    document.getElementById("hide").style.visibility = "visible";

}


function listUser() {

    fetch('http://localhost/UserCrud-main/Backend/api.php')
        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        //.then((response) => response.json())
        .then(data => {
            let li = `<tr><th>ID</th><th>Name</th><th>Email</th><th>Delete</th> <th>Update</th></tr>`;
            data.forEach((user) => {
                li += `<tr>    
          <td>${user.id}</td>
          <td>${user.name} </td>
          <td>${user.email}</td>
<td>
                        <button class="delete-btn" id="${user.id}">Delete </button>
                    </td>         
                    <td class="update-btn">
                        <button onclick="editUser(${user.id})" id="update-btn" >Edit user</button>
                    </td>
                   
        
        </tr>`;
            });

            // 4. DOM Display result
            document.getElementById("users").innerHTML = li;
            //alert('Data received:', data);
            //   console.log(data);
            var deleteButtons = document.getElementsByClassName("delete-btn");

            for (var i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener("click", function () {
                    deleteUser(this.id);
                });


            }
            //  document.getElementsByClassName("delete-btn").addEventListener("click",deleteUser);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    //  document.getElementById("list-btn").addEventListener("click", function () {
    //  document.getElementById("User_id").style.visibility = "visible";
    //  });
}


function deleteUser(userId) {
    // alert("hi");
    fetch(`http://localhost/UserCrud-main/Backend/api.php?id=${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("Deleted data: " + JSON.stringify(data));
            listUser(); // Refresh the user list after deletion
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function editUser(id) {



    fetch(`http://localhost/UserCrud-main/Backend/api.php?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {

            //    console.log(data.name);
            document.getElementById("name").value = data.name;
            document.getElementById("email").value = data.email;
            document.getElementById("User_id")
                .value = data.id;
            document.getElementById("password").value = data.password;
        })

}