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

    if(userId.value == ''|| userName.value == '' || emailId.value=='' ||dob.value == '')
    {
        alert("Please Enter All Values");
        return;
    }

    database.ref('/users/'+userId.value).set({
        userid : userId.value,
        user_name : userName.value,
        email : emailId.value,
        DOB : dob.value,
    });
    console.log("User Created Successfully");
};

function deleteUser(){

    if(userId.value == '')
    {
        alert("Please Enter ID");
        return;
    }
    database.ref('/users/'+userId.value).remove();
    console.log("User Deleted Successfully");
}

function updateUser(){

    if(userId.value == '')
    {
        alert("Please Enter ID");
        return;
    }
    database.ref('/users/'+userId.value).update({
        user_name : userName.value,
        email : emailId.value,
        DOB : dob.value,
    });
    console.log("User Updated Successfully");
}

function readUser(){
    database.ref('/users/').once('value',(function(snapshot){
        snapshot.forEach(function(users){
            
            var name = users.val().user_name;
            var id = users.val().userid;
            var db = users.val().DOB;
            var mail = users.val().email;

            console.log("Name: "+name+" ID: "+id+" DOB: "+db+" Mail: "+mail);
        });
    }
)
    
)
console.log("User Read");}

