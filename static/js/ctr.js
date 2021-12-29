
$('#ctr-header-member-info').mouseover(function(){
    $('#ctr-h-tooltip').removeClass('size-zero');
});

$('#ctr-header-member-info').mouseout(function(){
    $('#ctr-h-tooltip').addClass('size-zero');
});

//class click function click jquery ,play audio click

$('.click').on('click',function(){
    $('#cra_click')[0].play();
})
