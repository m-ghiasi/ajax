$(document).ready(function() {
    var skip = 0;
    $('.dashboard').addClass("select");
    $(".dashboard a span").addClass("white");
    $('.list-item li').on('click', function() {
        $('.list-item li').removeClass("select");
        $('.list-item li a span').removeClass("white");
        $('.co-table').removeClass("display");
        $(this).addClass('select');
        $(this).find('span').addClass('white');

    });


    $(".local_offer").on('click', function() {

        $(".co-table").addClass('display');

        loading();

        getTicket();


        $('.next-page').on('click', function() {
            skip += 10
            loading();
            getTicket();
        })
        $('.prev-page').on('click', function() {
            skip -= 10
            getTicket();
        });



    });


    function getTicket() {
        $.ajax({
            url: 'https://dev.map.ir/tbt/tickets',
            type: 'get',
            headers: {
                "token": localStorage["token"]
            },
            data: {
                $top: 10,
                $skip: skip
            }


        }).done(function(data) {

            // console.log(data);
            var statusicon = '';


            var trs = '';
            // console.log(data);
            $.each(data, function(index, item) {

                if (item.status === 'open') {
                    statusicon = 'lock_open';
                } else if (item.status === 'close') {
                    statusicon = 'lock';
                } else {
                    statusicon = 'restore';
                }

                trs +=
                    `<tr>
                <td>${skip + index + 1}</td>
                <td class="geom" data-lat="${item.geom.coordinates[0]}" data-lon="${item.geom.coordinates[1]}"> <a class="material-icons">room</a> </td>
                <td id"status" class="wraper-status material-icons "><a class="${statusicon}">${statusicon}</a><div class="grupeicon"><div class="change-status"><a class="restore">restore</a><a class="lock_open">lock_open</a><a class="lock">lock</a></div></div></div></td>
                <td>${item.description}</td>
                <td id="operation"class="material-icons ">create</td>
                </tr>`

            });



            $('table tbody').html(trs);

            $('.wraper-status').on('click', function() {
                $(this).find('.grupeicon').addClass('display')
            });

            $('.change-status a').on('click', function(){
                console.table("jkk");
                $('.grupeicon').removeClass('display');
                // $(this).attr('class');
                // $('#status a').removeClass();
                //
                //

                // console.log($(this).attr('class'));
            });

            $('.geom').on('click', function() {
                window.open(`https://map.ir/lat/${$(this).attr('data-lat')}/lng/${$(this).attr('data-lon')}/z/17`);
            });
        }).fail(function(error) {
            if (error.status === 401)
                // console.log(error);
                window.location.assign('index-login.html');

        });
    }

    function loading() {
        jQuery.ajaxSetup({
            beforeSend: function() {
                $('.loadig').show();
            },
            complete: function() {
                $('.loadig').hide();
            },

        });

    }

});
