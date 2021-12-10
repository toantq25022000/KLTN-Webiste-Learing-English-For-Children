const bgDrag = document.getElementsByClassName("bgdrag");
const bgDrop = document.getElementsByClassName("drop");

const arrangeDrag = document.querySelector("#ardrag");
const arrangeDrop = document.querySelector("#ardrop");
const arNote = document.querySelector("#arnote");
const bgArAns = document.querySelector("#bg_ar_ans");
const ArAns = document.querySelector("#ar_ans");

const btnSubmitArrange = document.querySelector("#submit-arrange");

const btnNextArrange = document.querySelector("#next-arrange");
const btnFinishArrange = document.querySelector("#finish-arrange");
const btnReplayArrange = document.querySelector("#replay-arrange");
const iconCorrectArrange = document.querySelector("#khta_iconcor_arrange");
const iconInCorrectArrange = document.querySelector("#khta_iconincor_arrange");

const scoreTextArrange = document.querySelector("#score_arr");
const maxScoreTextArrange = document.querySelector("#max_score_arr");
const numberQuestionArrange = document.querySelector("#number_question_arr");
const totalQuestionArrange = document.querySelector("#total_question_arr");
const currentSentenceArrange = document.querySelector("#current_sentence_arr");
const arrangeScore = document.querySelector("#arscore");

const arrangeResult = document.querySelector("#result_arrange");
const areaArrange = document.querySelector("#area_arrange");
const textResultFinishArrange = document.querySelector("#text_result_arr");

const modalArrange = document.querySelector("#modal_arr");
const boxCancelArrange = document.querySelector("#box_cancel_arr");
const boxExitArrange = document.querySelector("#box_exit_arr");
const boxOKArrange = document.querySelector("#box_ok_arr");

const scoreHeaderArrange = document.querySelector("#cscore_header_arr");
const totalScoreHeaderArrange = document.querySelector("#totalscore_header_arr");


const isDoingFalseArrange = document.querySelector("#is_doing_false_arr");
const isDoingTrueArrange = document.querySelector("#is_doing_true_arr");

const scoreResultFinishArrange = document.querySelector("#result_yscore_arr");
const totalScoreResultFinishArrange = document.querySelector("#result_tscore_arr");


// play pause audio text


const btnPlayAudioTextArrange = document.querySelector("#jp-play-arr");
const btnPauseAudioTextArrange = document.querySelector("#jp-pause-arr");
const progressSlideArrange = document.querySelector("#ui-slide-arr");

const urlCurrentArrange = window.location.href


let questionsArrange = []
let scoreJsonArrange = 0

let currentQuestionArrange = {};
let acceptingAnswersArrange = true;
let scoreArrange = 0;
let questionCounterArrange = 0;
let availableQuestionsArrange = [];
let quesIndexCurrentArrange = -1;
let textQuestionArrange = "";
let arrSubArrange = [];
const SCORE_POINTS_Arrange = 10;
let MAX_QUESTION_Arrange = 3;

let isDoingArrange = 0 //Chưa làm
let isGetArrange = 0 // get du lieu

initGameArrange = () => {

    areaArrange.style.display = "block"
    arrangeResult.style.display = "none"
    currentSentenceArrange.style.display = "block"
    arrangeScore.style.display = "block"

    questionCounterArrange = 0;
    currentQuestionArrange = {};
    acceptingAnswersArrange = true;
    scoreArrange = 0;

    availableQuestionsArrange = [];
    quesIndexCurrentArrange = -1;
    textQuestionArrange = "";
    arrSubArrange = [];


    for (let i = 0; i < questionsArrange.length; i++) {
        availableQuestionsArrange[i] = questionsArrange[i];
    }

    MAX_QUESTION_Arrange = questionsArrange.length;
    totalQuestionArrange.innerHTML = MAX_QUESTION_Arrange;
    scoreTextArrange.innerHTML = "0"

    maxScoreTextArrange.innerHTML = "/" + MAX_QUESTION_Arrange * SCORE_POINTS_Arrange;
    totalScoreHeaderArrange.innerHTML = MAX_QUESTION_Arrange * SCORE_POINTS_Arrange;
}



loadDataArrange = () => {
    questionsArrange = []
    $.ajax({
        type: 'GET',
        url: urlCurrentArrange + `exercise/3/${scoreJsonArrange}/${isDoingArrange}/${isGetArrange}/`,
        success: function (response) {
            const data = response.data
            const scores = response.score
            const getIsDoing = response.is_doing
            const getIsGET = response.is_get
            isDoingArrange = parseInt(getIsDoing)
            scoreJsonArrange = parseInt(scores)
            isGetArrange = parseInt(getIsGET)

            scoreHeaderArrange.innerHTML = scoreJsonArrange

            data.forEach(element => {
                item = {
                    question: element.question
                }
                questionsArrange.push(item)
            });


            if (isDoingArrange == 1) {
                isDoingFalseArrange.style.display = "none"
                isDoingTrueArrange.style.display = "block"
            }
            else {
                isDoingFalseArrange.style.display = "block"
                isDoingTrueArrange.style.display = "none"
            }

        },
        error: function (error) {
            console.log('error', error)
        }
    })

}



animationTextChange = (val, start, rootElement) => {
    for (let i = start; i <= val; i++) {

        setTimeout(() => {
            rootElement.innerHTML = "" + i

        }, 50 * i);
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

speakerText = (t) => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = t;
    window.speechSynthesis.speak(msg);
}

disPlayElementBtnArrange = (btn) => {
    btnSubmitArrange.style.display = "none";
    btnNextArrange.style.display = "none";
    btnReplayArrange.style.display = "none";
    btnFinishArrange.style.display = "none";
    btn.style.display = "block";
}

getNewQuestionArrange = () => {

    if (availableQuestionsArrange.length === 0 || questionCounterArrange > MAX_QUESTION_Arrange) {

        disPlayElementBtnArrange(btnFinishArrange)
        return
    }
    //
    textQuestionArrange = ""
    arrSubArrange = []
    //
    disPlayElementBtnArrange(btnSubmitArrange)

    modalArrange.style.display = "none"

    arNote.style.display = "none";
    bgArAns.style.display = "none";
    //increase counter
    questionCounterArrange++
    quesIndexCurrentArrange++


    //set number question to html
    numberQuestionArrange.innerHTML = questionCounterArrange

    //get question next add to array available


    currentQuestionArrange = questionsArrange[quesIndexCurrentArrange]

    textQuestionArrange = currentQuestionArrange["question"];
    arrSubArrange = textQuestionArrange.split(" ");

    arrangeDrag.style.display = "block";

    //Tron cac phan tu trong mang
    shuffleArray(arrSubArrange);

    //default child in parent drag and drop
    arrangeDrag.textContent = ''
    arrangeDrop.textContent = ''
    //create element
    for (let i = 0; i < arrSubArrange.length; i++) {
        //Create element shadow

        //Create elemnet arrange drag
        const newDivBgDrag = document.createElement("div");
        newDivBgDrag.setAttribute("class", "bgdrag");
        //shadow
        const newDivShadow = document.createElement("div");
        newDivShadow.setAttribute("class", "shadow_");

        const newDivTextShadow = document.createElement("div");
        newDivTextShadow.setAttribute("class", "tshadow");
        newDivTextShadow.innerHTML = arrSubArrange[i];
        newDivShadow.appendChild(newDivTextShadow);
        //drag
        const newDivDrag = document.createElement("div");
        newDivDrag.setAttribute("class", "drag");
        newDivDrag.setAttribute("atstart", i);

        const newDivTextDrag = document.createElement("div");
        newDivTextDrag.setAttribute("class", "tdrag");
        newDivTextDrag.innerHTML = arrSubArrange[i];

        newDivDrag.appendChild(newDivTextDrag);
        //append child

        newDivBgDrag.appendChild(newDivDrag);
        newDivBgDrag.appendChild(newDivShadow);

        arrangeDrag.appendChild(newDivBgDrag);

        //Create elemnet arrange drop
        const newDivDrop = document.createElement("div");
        newDivDrop.setAttribute("class", "drop");
        arrangeDrop.appendChild(newDivDrop);

        //
    }
    //Click Drag in question
    
    for (let i = 0; i < bgDrag.length; i++) {
        bgDrag[i].addEventListener("click", (e) => {
            const child = bgDrag[i].querySelector(".drag");
            const childText = child.querySelector(".tdrag");

            if (bgDrag[i].querySelector(".drag") != null) {

                bgDrag[i].removeChild(bgDrag[i].querySelector(".drag"));
                for (let j = 0; j < bgDrop.length; j++) {
                    if (bgDrop[j].querySelector(".drag") === null) {
                        child.classList.add("dragged");

                        bgDrop[j].append(child);
                        break;
                    }
                }
            }
        });
    }
    //click drop
    for (let i = 0; i < bgDrop.length; i++) {
        bgDrop[i].addEventListener("click", (e) => {
            if (arrangeDrag.style.display === "none") {
            } else {
                const child1 = bgDrop[i].querySelector(".drag");

                if (bgDrop[i].querySelector(".drag") != null) {
                    //get child shadow in element drag at atstart at index == child1 on click
                    const childShadow = bgDrag[child1.getAttribute("atstart")].querySelector(".shadow_");
                    bgDrop[i].classList.remove("incorrect_ar");
                    bgDrop[i].removeChild(bgDrop[i].querySelector(".drag"));
                    child1.classList.remove("dragged");

                    for (let j = 0; j < bgDrag.length; j++) {
                        if (bgDrag[j].querySelector(".drag") === null) {
                            if (child1.getAttribute("atstart") === "" + j) {
                                bgDrag[j].removeChild(childShadow);
                                bgDrag[j].append(child1);
                                bgDrag[j].append(childShadow);
                                break;
                            }
                        }
                    }
                }
            }
        });
    }

    //Cat bo khoi mang avaiable question
    availableQuestionsArrange.splice(0, 1)

}

//promise data ajax

function baseGetPostDataArrange() {

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            url: urlCurrentArrange + `exercise/3/${scoreJsonArrange}/${isDoingArrange}/${isGetArrange}/`,
            success: function (response) {
                resolve(response);
            },
            error: function (xhr) {
                reject(xhr)
            }

        });
    });
}
//
baseGetPostDataArrange().then(function (response) {
    questionsArrange = []
    const data = response.data
    const scores = response.score
    const getIsDoing = response.is_doing
    const getIsGET = response.is_get
    isDoingArrange = parseInt(getIsDoing)
    scoreJsonArrange = parseInt(scores)
    isGetArrange = parseInt(getIsGET)

    scoreHeaderArrange.innerHTML = scoreJsonArrange

    data.forEach(element => {
        item = {
            question: element.question
        }
        questionsArrange.push(item)
    });


    if (isDoingArrange == 1) {
        isDoingFalseArrange.style.display = "none"
        isDoingTrueArrange.style.display = "block"
    }
    else {
        isDoingFalseArrange.style.display = "block"
        isDoingTrueArrange.style.display = "none"
    }


    initGameArrange()
    getNewQuestionArrange()
}).catch(function (reason) {
    console.log('reason for rejection', reason)
});


//Equal question and answer
let arrSumTextArrange = [];
btnSubmitArrange.addEventListener("click", () => {
    arrSumTextArrange = [];
    for (let i = 0; i < bgDrop.length; i++) {
        let childEle = bgDrop[i].querySelector(".drag");
        if (childEle != null) {
            arrSumTextArrange[i] = childEle.textContent;
        }
    }

    const joinArray = arrSumTextArrange.join("");
    const arrayText = textQuestionArrange.split(" ");
    const arrayTextJoin = textQuestionArrange.split(" ").join("");
    if (joinArray === arrayTextJoin) {
        arNote.style.display = "none";
        bgArAns.style.display = "none";
        //add score
        incrementScoreArrange(SCORE_POINTS_Arrange)
        //animation icon correct
        iconCorrectArrange.style.display = "block";
        setTimeout(() => {
            iconCorrectArrange.style.display = "none";
        }, 1000);

        //Next new question
        setTimeout(() => {
            getNewQuestionArrange()
        }, 500);

    } else {
        //Sai
        //incorrect_ar

        if (arrayText.length === arrSumTextArrange.length) {
            for (let i = 0; i < arrayText.length; i++) {
                let textDragOfDrop = bgDrop[i]
                    .querySelector(".drag")
                    .querySelector(".tdrag").textContent;
                if (arrayText[i] != textDragOfDrop) {
                    bgDrop[i].classList.add("incorrect_ar");
                }
            }

            iconInCorrectArrange.style.display = "block";
            setTimeout(() => {
                iconInCorrectArrange.style.display = "none";
            }, 1000);

            arNote.style.display = "block";
            bgArAns.style.display = "block";
            ArAns.innerHTML = textQuestionArrange;

            disPlayElementBtnArrange(btnNextArrange)


            arrangeDrag.style.display = "none";
        } else {
            //Chua sap xep het cua
            //Mo hop thoai Modal hoi co muon chuyen sang cau tiep theo
            modalArrange.style.display = "block";


        }
    }
});

btnNextArrange.addEventListener("click", () => {
    getNewQuestionArrange()
})

roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
}

//play pause aduio

btnPlayAudioTextArrange.addEventListener("click", () => {
    btnPlayAudioTextArrange.style.display = "none"
    btnPauseAudioTextArrange.style.display = "block"

    progressSlideArrange.style.width = '0%'
    speakerText(currentQuestionArrange['question'])

    setTimeout(() => {
        var i = 0;

        if (i == 0) {
            i = 1;

            var width = 1;
            var id = setInterval(frame, 10);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width++
                    progressSlideArrange.style.width = width + "%";
                }
            }
        }

    }, 500)
    setTimeout(() => {
        btnPlayAudioTextArrange.style.display = "block"
        btnPauseAudioTextArrange.style.display = "none"
        progressSlideArrange.style.width = '0%'
    }, 2900)

})

finishSentenceAllArrange = () => {
    modalArrange.style.display = "none"
    areaArrange.style.display = "none"
    arrangeResult.style.display = "block"
    currentSentenceArrange.style.display = "none"
    arrangeScore.style.display = "none"

    disPlayElementBtnArrange(btnReplayArrange)
    totalScoreResultFinishArrange.innerHTML = MAX_QUESTION_Arrange * SCORE_POINTS_Arrange
    textResultFinishArrange.style.display = "none"
    if (scoreArrange != 0) {
        animationTextChange(scoreArrange, 0, scoreResultFinishArrange)
        textResultFinishArrange.style.display = "block"
    }
    else {
        scoreResultFinishArrange.innerHTML = scoreArrange
        textResultFinishArrange.style.display = "block"
    }
    scoreJsonArrange = scoreArrange
    isDoingArrange = 1
    isGetArrange = 1 // post dlieu
    loadDataArrange()

    document.querySelector("#persent_arr").innerHTML = roundToTwo((scoreArrange * 1.0 / (MAX_QUESTION_Arrange * SCORE_POINTS_Arrange)) * 100) + "%"

}
//click btn finish
btnFinishArrange.addEventListener('click', () => finishSentenceAllArrange())
//click Ok modal
boxOKArrange.addEventListener('click', () => {
    if (availableQuestionsArrange.length === 0 || questionCounterArrange > MAX_QUESTION_Arrange) {
        finishSentenceAllArrange()
    }
    else {
        setTimeout(() => {
            getNewQuestionArrange()
        }, 500);
    }

})

//click cancel Modal
boxCancelArrange.addEventListener('click', () => {
    modalArrange.style.display = "none"
})
boxExitArrange.addEventListener('click', () => {
    modalArrange.style.display = "none"
})
//click replay end all sentence 
btnReplayArrange.addEventListener('click', () => {
    initGameArrange()
    getNewQuestionArrange()
})
incrementScoreArrange = num => {
    scoreArrange += num
    animationTextChange(scoreArrange, parseInt(scoreTextArrange.textContent), scoreTextArrange)
}



