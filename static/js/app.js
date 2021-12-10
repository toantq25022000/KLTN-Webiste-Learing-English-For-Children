//Js onmouse btn info
// const nameUser = document.querySelector(".info_vip_user")
// const lstChoiceInfo = document.querySelector(".lst-choice-info")


// nameUser.addEventListener("mouseover", mouseOverInfo);
// nameUser.addEventListener("mouseout", mouseOutInfo);

// function mouseOverInfo() {

//     lstChoiceInfo.style.display ="block"


// }

// function mouseOutInfo() {
//         lstChoiceInfo.style.display ="none"


// }
//js panel an/hien

 
const labelAccordion = document.querySelectorAll('.label_accord')

for (let i = 0; i < labelAccordion.length; i++) {

  labelAccordion[i].addEventListener('click', function () {

    var isThis = this

    var panel = isThis.nextElementSibling;

    var result = isThis.classList.contains("active_accord")
    for (let j = 0; j < labelAccordion.length; j++) {
      labelAccordion[j].classList.remove('active_accord')
      labelAccordion[j].nextElementSibling.style.display = "none"
    }
    if (result) {
      panel.style.display = "none"

      isThis.classList.remove('active_accord')
    }
    else {
      panel.style.display = "block"
      isThis.classList.add('active_accord')
    }
  })
}
// Search box js
$(document).ready(function(){
  $("#search").focus(function() {
    $(".search-box").addClass("border-searching");
    $(".search-icon").addClass("si-rotate");
  });
  $("#search").blur(function() {
    $(".search-box").removeClass("border-searching");
    $(".search-icon").removeClass("si-rotate");
  });
  $("#search").keyup(function() {
      if($(this).val().length > 0) {
        $(".go-icon").addClass("go-in");
      }
      else {
        $(".go-icon").removeClass("go-in");
      }
  });
  $(".go-icon").click(function(){
    $(".search-form").submit();
  });
});