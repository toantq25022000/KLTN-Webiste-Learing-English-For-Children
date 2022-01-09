function count_character(_self) {
    $('#ctr-irbfrn-character-left').html($(_self).val().length + '/' + $('#ctr-irbfrn-input').attr('maxlength'));
}

function selectType(_self){
    $('.ctr-irb-type').removeClass('active');
    $(_self).addClass('active');
}


function selectSkill(_self){
    if(!$(_self).find('input[name="skills"]').attr('disabled')){
        $('.ctr-irb-skill').removeClass('active');
        $(_self).addClass('active');
    }
}

//======================================================

// var socket = io.connect($node_host, {
//     reconnection: true,
// 	reconnectionAttempts: 3,
//     query: "type=init-room&member_data=" + JSON.stringify(member_data)
// });
// socket.on('connect', function() {

// });
// socket.on('message', function(data) {    
//     if($('.ctr-ml-content .ctr-m-row').length > 20){$('.ctr-ml-content .ctr-m-row:eq(0)').remove();}
//     $('.ctr-ml-content').append('<p class="ctr-m-row">' +
//         '<a target="_blank" href="' + $thidau_host + 'history/' + data.member_data.id + '" class="ctr-m-master' + ((data.member_data.username == member_data.username) ? ' ctr-m-self' : '') + '">' + data.member_data.username + ': </a>' +
//         '<span class="ctr-m-content">' + convert_emoji_to_string(data.msg) + '</span>' +
//         '</p>');
// });


// $("#ctr-irb-create-form").submit(function(event) {
//     event.preventDefault();
//     var _form = $(this);
//     if (!_form.attr('submit')) {
//         _form.attr({submit: true});
//         var res = { numq: $numq };
//         $.extend(res, { type: $('input[name=type]:checked').val(), class_ques: $('input[name=class_ques]:checked').val(), skill_id: $("input[name=skills]:checked").val(), private: $('input[name=private]:checked').val()||0});
//         if(!_.has(res, 'skill_id')){
//             alert('Hãy lựa chọn kỹ năng thi đấu!');
//             _form.removeAttr('submit');
//         }else{
//             socket.emit('init_room', res, function(data) {
//                 // console.log(data);
//                 switch (data.status) {
//                     case 201:{
//                         window.location.href = "/wait-" + data.room.id;
//                         break;
//                     }
//                     case 1062:{
//                         var r = confirm("Phòng thi bạn khởi tạo vẫn đang hoạt động vì vậy bạn không thể khởi tạo thêm phòng thim mới. Bạn có muốn trở lại phòng thi đó không?");
//                         if (r == true) {
//                             window.location.href = "/wait-" + data.room.id;
//                         } else {
//                             _form.removeAttr('submit');
//                         }
//                         break;
//                     }
//                     case 100:{
//                         var r = confirm("Phòng thi bạn khởi tạo vẫn đang hoạt động vì vậy bạn không thể khởi tạo thêm phòng thim mới. Bạn có muốn trở lại phòng thi đó không?");
//                         if (r == true) {
//                             window.location.href = "/play-" + data.room.id;
//                         } else {
//                             _form.removeAttr('submit');
//                         }
//                         break;
//                     }
//                     case 403:{
//                         switch (data.err) {
//                             case 'vip':{
//                                     $('#ctr-e-expired').removeClass('hide');
//                                     _form.removeAttr('submit');
//                                     break;
//                                 }
//                         }
//                         break;
//                     }
//                 }
//             });
//         }
//     }
// });


$("#ctr-irb-create-form").submit(function(event) {
    event.preventDefault();
    var _form = $(this);
    if (!_form.attr('submit')) {
        _form.attr({submit: true});
        console.log('submit')

        $.ajax({
            type: _form.attr("method"),
            url: _form.attr("action"),
            data: _form.serialize(),
            success: function (response) {
                console.log(response)
                const data =  response.data;
                switch (response.status) {
                     case 201:{
                        window.location.href = '/competition/wait-'+data[0].id_room + '/';
                        break;
                     }
                    case 1062:{
                        var r = confirm("Phòng thi bạn khởi tạo vẫn đang hoạt động vì vậy bạn không thể khởi tạo thêm phòng mới. Bạn có muốn trở lại phòng thi đó không?");
                        if (r == true) {
                             window.location.href = '/competition/wait-'+data[0].id_room + '/';
                        } else {
                            window.location.href = "/competition/";
                         }
                        break;
                    }
                    default:
                        var r = confirm("Method isn't POST!");
                        if (r == true) {
                            location.reload();
                        } else {
                            window.location.href = "/competition/";
                         }
                        break;       
                }

            }, 
            error: function (error) {
                console.log(error)
            },
        });

    }
});


$(function() {
    $('#ctr-irb-create-form .radio').on('click', function() {
        $('.radio').removeClass('active');
        $("input:radio[name='type']").prop("checked", false);
        $(this).addClass('active').find("input:radio[name='type']").prop("checked", true);
    });
});