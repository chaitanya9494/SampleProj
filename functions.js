const userId = document.getElementById('uId');
const userName = document.getElementById('uname');
const emailId = document.getElementById('email');
const dob = document.getElementById('dob');
const createBtn = document.getElementById('createBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const readBtn = document.getElementById('readBtn');

const database = firebase.database();

function createUser(){
    database.ref('/users/'+userId.value).set({
        user_name : userName.value,
        email : emailId.value,
        DOB : dob.value,
    });
    console.log("User Created Successfully");
};

function deleteUser(){
    database.ref('/users/'+userId.value).remove();
    console.log("User Deleted Successfully");
}

function updateUser(){
    database.ref('/users/'+userId.value).update({
        user_name : userName.value,
        email : emailId.value,
        DOB : dob.value,
    });
    console.log("User Updated Successfully");
}

/*function readUser(){
    database.ref('/users/'+userId.value).on('child_added',(snap)=>{
        console.log(snap.val().uName+":"+snap.val().email);

        $('#userList').append(
        
            <tr>
                <td>${snap.val().uname}</td>
                <td>${snap.val().email}</td>
            </tr>

            )
    });
}*/