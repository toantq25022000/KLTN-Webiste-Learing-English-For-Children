
const btnStartGameWMCard = document.getElementById('khta_game1_bstart')
const areaStartWmCard = document.getElementById('khta_arins_card')
const areaPlayWmCard = document.getElementById('arplay_card')

//

const areaResultWmCard = document.getElementById('khta_arresult_game')
const resultYouScoreWmCard = document.getElementById('khtas_yscore_card')
const resultTotalScoreWmCard = document.getElementById('khtas_tscore_card')
const resultTimeFinishWmCard = document.getElementById('khtatr_type2_card')
const btnReplayWmCard = document.getElementById('khta_breplay_card')

//
const areaPieceCard = document.getElementById("areapiece_card");
let itemDivCard =  Array.from(document.querySelectorAll('.khta_game_card')); ;
const yScoreCard = document.getElementById("yscore_card");
const totalScoreCard = document.getElementById("tscore_card");
const numberTurnCard = document.getElementById("number_turn_card");
const wrapStartCard = document.getElementById("khta_arstar");
//
const nullDataReqWMCard = document.getElementById("error_data_game");
const areaScoreFooterWMCard = document.getElementById("khta_arscore__card");
//
const scoreHeaderWMCard = document.querySelector("#cscore_header_card");
const totalScoreHeaderWMCard = document.querySelector("#totalscore_header_card");

const isDoingFalseWMCard = document.querySelector("#is_doing_false_card");
const isDoingTrueWMCard = document.querySelector("#is_doing_true_card");

//
const urlCurrentWMCard = window.location.href;


const SCORE_POINTS_WMCard = 10;
let MAX_QUESTION_WMCard = 9;

let scoreJsonWMCard = 0;
let isDoingWMCard = 0; //Chưa làm
let isGetWMCard = 0; // get du lieu

let arrayContainerTwoCard = [];
let scoreWMCard = 0;
let countClickCard = 0;
let countSUMClickCard = 0;
let countCorrectItemCard = 0;
let ifDefaultClickWMCard = false;
var counterTime;

let arrayTempCard = [];
let index__WMCard = 0;

listCard = [];

initGameWordMemoryCard = () => {
    areaPieceCard.innerHTML = '';
    wrapStartCard.innerHTML = '';
    document.getElementById("kpt_minute").innerHTML = '00';
    document.getElementById("kpt_sec").innerHTML = '00';

    areaResultWmCard.style.display ='none';
    areaPlayWmCard.style.display = 'none'
    areaStartWmCard.style.display = 'block'

    areaScoreFooterWMCard.style.display = 'block'
    nullDataReqWMCard.style.display = 'none'

    arrayContainerTwoCard = [];
    scoreWMCard = 0;
    countClickCard = 0;
    countSUMClickCard = 0;
    countCorrectItemCard = 0;
    ifDefaultClickWMCard = false;

    arrayTempCard = [];
    index__WMCard = 0;

    MAX_QUESTION_WMCard = listCard.length;

    //tao mang tam
 
  //kich thuoc mang tam x2 lan mang du lieu
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < listCard.length; i++) {
      arrayTempCard[index__WMCard] = listCard[i];
      index__WMCard++;
    }
  }

    //tron mang tam
    shuffleArrayCard(arrayTempCard);
    

    numberTurnCard.innerHTML = "0";
    yScoreCard.innerHTML = "0";
    totalScoreCard.innerHTML = SCORE_POINTS_WMCard * MAX_QUESTION_WMCard;
    totalScoreHeaderWMCard.innerHTML = SCORE_POINTS_WMCard * MAX_QUESTION_WMCard;
}

loadDataWMCard = () => {
    $.ajax({
        type: 'GET',
        url:urlCurrentWMCard + `game/1/${scoreJsonWMCard}/${isDoingWMCard}/${isGetWMCard}/`,
        success: function (response) {
            
            listCard = []
            const data = response.data
            const scores = response.score
            const getIsDoing = response.is_doing
            const getIsGET = response.is_get
            isDoingWMCard = parseInt(getIsDoing)
            scoreJsonWMCard = parseInt(scores)
            isGetWMCard = parseInt(getIsGET) 

            data.forEach(element => {
                item = {
                    id: element.id,
                    img: element.img
                }
                listCard.push(item)
            });

           

            if (isDoingWMCard == 1) {
                isDoingFalseWMCard.style.display = "none"
                isDoingTrueWMCard.style.display = "block"
            }
            else {
                isDoingFalseWMCard.style.display = "block"
                isDoingTrueWMCard.style.display = "none"
            }
        },
        error: function (error) {
           
        }

    });
}
 

  // function tron mang
  function shuffleArrayCard(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  //fuction time count
  function timeCountCard(){
    var minutesLabel = document.getElementById("kpt_minute");
    var secondsLabel = document.getElementById("kpt_sec");
    var totalSeconds = 0;
    counterTime = setInterval(setTime, 1000);

    function setTime() {
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }
  }
  
createElementCard = () => {

  // render DOM element start
  //create element
  for (let i = 0; i < listCard.length; i++) {
    //Create elemnet div
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "khta_star");

    wrapStartCard.appendChild(newDiv);
    //
  }

  // render DOM element
  //create element
  for (let i = 0; i < arrayTempCard.length; i++) {
    //Create elemnet div
    const newDiv = document.createElement("div");
    newDiv.setAttribute(
      "class",
      "ge khta_game_card khta_game_card0 khta_game_card_small"
    );
    newDiv.setAttribute("atau", arrayTempCard[i].id);

    //Create element img
    const newImg = document.createElement("img");
    newImg.setAttribute("class", "ge2 khta_game1_img khta_game1_img_small");
    newImg.setAttribute("src", arrayTempCard[i].img);

    newDiv.appendChild(newImg);
    areaPieceCard.appendChild(newDiv);
    //
  }
 

}
 

  //function add start to list start
  function addStartCard() {
    for (
      let i = document.getElementsByClassName("khta_star").length - 1;
      i >= 0;
      i--
    ) {
      if (
        document
          .getElementsByClassName("khta_star")
          [i].classList.contains("khta_star_cor")
      ) {
        document
          .getElementsByClassName("khta_star")
          [i + 1].classList.add("khta_star_cor");
        break;
      } else {
        if (i === 0) {
          document
            .getElementsByClassName("khta_star")[0]
            .classList.add("khta_star_cor");
          break;
        }
      }
    }
  }

animationTextChangeWMCard = (val, start, rootElement) => {
    for (let i = start; i <= val; i++) {

        setTimeout(() => {
            rootElement.innerHTML = "" + i

        }, 50 * i);
    }
}

incrementScoreWMCard = num => {
    scoreWMCard += num
    animationTextChangeWMCard(scoreWMCard, parseInt(yScoreCard.textContent), yScoreCard)
}
function baseGetPostDataWMCard() {

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            url:urlCurrentWMCard + `game/1/${scoreJsonWMCard}/${isDoingWMCard}/${isGetWMCard}/`,
            success: function (response) {
                resolve(response);
            },
            error: function (xhr) {
                reject(xhr)
            }

        });
    });
}

baseGetPostDataWMCard().then(function (response) {
    if (response.data === undefined) {
     
        areaScoreFooterWMCard.style.display = 'none'
        nullDataReqWMCard.style.display = 'block'
        
        isDoingFalseWMCard.style.display = "block"
        isDoingTrueWMCard.style.display = "none"
    }
    else{
     
        listCard = []
        const data = response.data
        const scores = response.score
        const getIsDoing = response.is_doing
        const getIsGET = response.is_get
        isDoingWMCard = parseInt(getIsDoing)
        scoreJsonWMCard = parseInt(scores)
        isGetWMCard = parseInt(getIsGET) 


        scoreHeaderWMCard.innerHTML = scoreJsonWMCard
        

        data.forEach(element => {
            item = {
                id: element.id,
                img: element.img
            }
            listCard.push(item)
        });

        if (isDoingWMCard == 1) {
            isDoingFalseWMCard.style.display = "none"
            isDoingTrueWMCard.style.display = "block"
        }
        else {
            isDoingFalseWMCard.style.display = "block"
            isDoingTrueWMCard.style.display = "none"
        }

    
        initGameWordMemoryCard()
        createElementCard()
        clickItemCard()
    }
}).catch(function (reason) {
    
});

resultGameWMCard = () => {
    areaStartWmCard.style.display = 'none';
    areaPlayWmCard.style.display = 'none';
    clearInterval(counterTime);

    areaResultWmCard.style.display ='block';

    resultTotalScoreWmCard.innerHTML = SCORE_POINTS_WMCard * MAX_QUESTION_WMCard;
    if (scoreWMCard != 0) {
        setTimeout(() =>{
            animationTextChangeWMCard(scoreWMCard, 0, resultYouScoreWmCard);
        },1000)
    }
    else {
      resultYouScoreWmCard.innerHTML = 0;
    }
    var minutesLabel = document.getElementById("kpt_minute").textContent;
    var secondsLabel = document.getElementById("kpt_sec").textContent;
    document.getElementById("khtat_time_card").innerHTML = minutesLabel + ':' + secondsLabel;

    scoreJsonWMCard = scoreWMCard
    isDoingWMCard = 1
    isGetWMCard = 1 // post du lieu
    loadDataWMCard()

}

btnReplayWmCard.addEventListener('click',() => {
    initGameWordMemoryCard()
    createElementCard()
    clickItemCard()
})

clickItemCard = () => {
    Array.from(document.querySelectorAll('.khta_game_card')).forEach(card  => {
        card.addEventListener("click", () => {
          
          if (ifDefaultClickWMCard) {
            return;
          }
          if (countClickCard < 2) {
            if (card.classList.contains("khta_piece_act")) {
              return;
            } else if (card.classList.contains("khta_piece_cor")) {
              return;
            } else {
              countSUMClickCard++;
              countClickCard += 1;
             
              const dataId = card.getAttribute("atau");
              const childImg = card.querySelector(".khta_game1_img");
    
              card.classList.add("transform1");
              card.classList.add("khta_piece_act");
    
              childImg.style.display = "block";
              childImg.classList.add("transform2");
    
              numberTurnCard.innerHTML = countSUMClickCard;
    
              if (countClickCard === 2) {
                // dang lat card thu 2
                if (arrayContainerTwoCard[0] === dataId) {
                
                  addStartCard();
                  arrayContainerTwoCard = [];
                  countCorrectItemCard++;
                  incrementScoreWMCard(SCORE_POINTS_WMCard)
                 
    
                  for (let k = 0; k < itemDivCard.length; k++) {
                    if (
                      itemDivCard[k].getAttribute("atau") ==
                      arrayContainerTwoCard[0]
                    ) {
                      if (itemDivCard[k].classList.contains("khta_piece_act")) {
                        itemDivCard[k].classList.remove("khta_piece_act");
                        itemDivCard[k].classList.add("khta_piece_cor");
    
                        card.classList.remove("khta_piece_act");
                        card.classList.add("khta_piece_cor");
    
                        countClickCard = 0;
                        arrayContainerTwoCard = [];
                        break;
                      }
                    }
                  }
                  if (countCorrectItemCard === listCard.length) {
                    ifDefaultClickWMCard = false;
                    setTimeout(() => {
                        resultGameWMCard()
            
                    }, 1000);
                  }
                } else {
                  ifDefaultClickWMCard = true;
                 
                  setTimeout(() => {
                    for (let k = 0; k < itemDivCard.length; k++) {
                      if (
                        itemDivCard[k].getAttribute("atau") ==
                        arrayContainerTwoCard[0]
                      ) {
                        if (itemDivCard[k].classList.contains("khta_piece_act")) {
                          itemDivCard[k].classList.remove("transform1");
                          itemDivCard[k].classList.remove("khta_piece_act");
                          const childImgActive0 =
                            itemDivCard[k].querySelector(".khta_game1_img");
                          childImgActive0.style.display = "none";
                          childImgActive0.classList.remove("transform2");
    
                          card.classList.remove("transform1");
                          card.classList.remove("khta_piece_act");
    
                          childImg.style.display = "none";
                          childImg.classList.remove("transform2");
                          countClickCard = 0;
                          arrayContainerTwoCard = [];
                          break;
                        }
                      }
                    }
                    ifDefaultClickWMCard = false;
                    
                    return;
                  }, 1000);
                }
              }
              if (ifDefaultClickWMCard) {
              } else {
                arrayContainerTwoCard.push(dataId);
              
              }
            }
          } else {
            // da lat 2 card, lat card tiep theo se khong duoc
            
            arrayContainerTwoCard = [];
            countClickCard = 0;
          }
        });
    })
}

btnStartGameWMCard.addEventListener('click',() => {
    areaStartWmCard.style.display = 'none'
    areaPlayWmCard.style.display = 'block'
    if (nullDataReqWMCard.style.display != 'block')
    {
        timeCountCard()
    }
})


