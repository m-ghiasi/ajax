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

        $(".co-table").addClass("display")
        getTicket();
        $(document).ajaxStart(function(){
            $("#wait").css("display", "block");
          });
          $(document).ajaxComplete(function(){
            $("#wait").css("display", "none");
          });
          $("button").click(function(){
            $("#txt").load("demo_ajax_load.asp");
          });


        $('.next-page').on('click', function() {
            skip += 10
            getTicket();
        })
        $('.prev-page').on('click', function() {
            skip -= 10
            getTicket();
        })

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

            console.log(data);
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
                <td id="status"class="material-icons "><a class="${statusicon}">${statusicon}</a></td>
                <td>${item.description}</td>
                <td id="operation"class="material-icons ">create</td>
                </tr>`

            });
            // window.location.assign('index.html');

            $('table tbody').html(trs);

            $('.geom').on('click', function() {
                window.open(`https://map.ir/lat/${$(this).attr('data-lat')}/lng/${$(this).attr('data-lon')}/z/17`);
            });
        });
    }

});
