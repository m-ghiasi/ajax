$(document).ready(function() {

    var token = '';
    $('.button').on('click', function() {
        var username = $(".uname").val();
        var password = $(".pass").val();



        $.ajax({
            url: 'https://dev.map.ir/auth/authenticate',
            type: 'post',
            data: {
                user: username,
                pass: password,
            }
        }).done(function(data) {
            window.location.replace('index.html');

            token = data.tokenId;
            localStorage.setItem("token", token)

            console.log(token);



        }).fail(function() {
            alert("error");
        })
    });

});
