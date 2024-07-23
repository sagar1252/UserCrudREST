document.getElementById("create-user").addEventListener("click", createUser);
document.getElementById("list-btn").addEventListener("click", listUser);



function createUser() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
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
                    <td>
                        <button class="update-btn" id="${user.id}">Update </button>
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

                var updateButton = document.getElementsByClassName("update-btn");
                for (var i = 0; i < updateButton.length; i++) {
                    updateButton[i].addEventListener("click", function () {
                        // alert("hii");
                        updateUser(this.id);
                    });
                }
            }
            //  document.getElementsByClassName("delete-btn").addEventListener("click",deleteUser);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
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


function updateUser(userId) {



}