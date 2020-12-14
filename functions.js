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

    database.ref("users").orderByChild("userid").equalTo(userId.value).once("value",snapshot => {
        if (snapshot.exists()){
          alert("User Already Exists!!");
        }
        else{
            database.ref('/users/'+userId.value).set({
                userid : userId.value,
                user_name : userName.value,
                email : emailId.value,
                DOB : dob.value,
            });
        
            console.log("User Created Successfully!!");
        }
    });

};

function deleteUser(){

    if(userId.value == '')
    {
        alert("Please Enter ID");
        return;
    }
    
    database.ref("users").orderByChild("userid").equalTo(userId.value).once("value",snapshot => {
        if (snapshot.exists()){
            database.ref('/users/'+userId.value).remove();
            console.log("User Deleted Successfully");
        }
        else{        
            alert("User Does Not Exist!!");
        }
    });
}

function updateUser(){

    if(userId.value == '')
    {
        alert("Please Enter ID");
        return;
    }
    
    database.ref("users").orderByChild("userid").equalTo(userId.value).once("value",snapshot => {
        if (snapshot.exists()){
            database.ref('/users/'+userId.value).update({
                user_name : userName.value,
                email : emailId.value,
                DOB : dob.value,
            });
            console.log("User Updated Successfully");
        }
        else{        
            alert("User Does Not Exist!!");
        }
    });

    
}

function readUser() {
    
    database.ref('/users/').orderByChild("DOB").once('value', (function (snapshot) {
        snapshot.forEach(function (users) {
            var name = users.val().user_name;
            var id = users.val().userid;
            var db = users.val().DOB;
            var mail = users.val().email;
            var content="";
            console.log("Name: " + name + " ID: " + id + " DOB: " + db + " Mail: " + mail);
            content+='<tr>';
            content+='<td>'+name+'</td>';
            content+='<td>'+mail+'</td>';
            content+='<td>'+id+'</td>';
            content+='<td>'+db+'</td>';
            content+='</tr>';
            $('table').append(content);
        });
    }
    )
    )
    console.log("User Read");}
function sendEmail() {
    database.ref('/users/').once('value', (function (snapshot) {
        snapshot.forEach(function (users) {
            var list = "";
            let name = users.val().user_name;
            let db = new Date(users.val().DOB);
            let today = new Date();
            let mail = users.val().email;
            let daystogo = new Date(today.getFullYear(), db.getMonth(), db.getDate());
            if (today.getMonth() == db.getMonth() && today.getDate() > db.getDate()) 
            {
                daystogo.setFullYear(daystogo.getFullYear() + 1);
            }
            let one_day = 1000 * 60 * 60 * 24;
            let result = Math.ceil((daystogo.getTime() - today.getTime()) / (one_day));
            let numdaystogo = Math.abs(result);
            if (numdaystogo == 0) {
                Email.send({
                    Host: "smtp.gmail.com",
                    Username: 'trctt2020@gmail.com',
                    Password: "ctttr2020$",
                    To: mail,
                    From: 'trctt2020@gmail.com',
                    Subject: `Hey ${name},Greetings from ThomsonReuters`,
                    // Cc: 'ctt@thomsonreuters.com',
                    Body: `Hi ${name}, We Wish you a many many happy returns of the day. May God bless you with health, wealth and prosperity in your life. HAPPY BIRTHDAY`,
                })
            }
        });
    }))
}
function havingbirthdaytoday() {
    database.ref('/users/').once('value', (function (snapshot) {
        snapshot.forEach(function (users) {
            var list = "";
            let name = users.val().user_name;
            let db = new Date(users.val().DOB);
            let today = new Date();
            let daystogo = new Date(today.getFullYear(), db.getMonth(), db.getDate());
            if (today.getMonth() == db.getMonth() && today.getDate() > db.getDate()) {
                daystogo.setFullYear(daystogo.getFullYear() + 1);
            }
            let one_day = 1000 * 60 * 60 * 24;
            let result = Math.ceil((daystogo.getTime() - today.getTime()) / (one_day));
            let numdaystogo = Math.abs(result);
            if (numdaystogo == 0) {
                list += '<tr>';
                list += '<td>' + '<h1>' + name + '</h1>' + '</td>';
                list += '</tr>';
                $('table').append(list);
            }
        });
    }))
}
