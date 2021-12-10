// Create a div element
const fakeEle = document.createElement('div');

// Hide it completely
fakeEle.style.position = 'absolute';
fakeEle.style.top = '0';
fakeEle.style.left = '-9999px';
fakeEle.style.overflow = 'hidden';
fakeEle.style.visibility = 'hidden';
fakeEle.style.whiteSpace = 'nowrap';
fakeEle.style.height = '0';

// We copy some styles from the textbox that effect the width
const textboxEle = document.querySelector('.text_input_word');

// Get the styles
const styles = window.getComputedStyle(textboxEle);

// Copy font styles from the textbox
fakeEle.style.fontFamily = styles.fontFamily;
fakeEle.style.fontSize = styles.fontSize;
fakeEle.style.fontStyle = styles.fontStyle;
fakeEle.style.fontWeight = styles.fontWeight;
fakeEle.style.letterSpacing = styles.letterSpacing;
fakeEle.style.textTransform = styles.textTransform;

fakeEle.style.borderLeftWidth = styles.borderLeftWidth;
fakeEle.style.borderRightWidth = styles.borderRightWidth;
fakeEle.style.paddingLeft = styles.paddingLeft;
fakeEle.style.paddingRight = styles.paddingRight;

// Append the fake element to `body`
document.body.appendChild(fakeEle);

const setWidth = function () {
    const string = textboxEle.value || textboxEle.getAttribute('placeholder') || '';
    fakeEle.innerHTML = string.replace(/\s/g, '&' + 'nbsp;');

    const fakeEleStyles = window.getComputedStyle(fakeEle);
    textboxEle.style.width = fakeEleStyles.width;
};

setWidth();

textboxEle.addEventListener('input', function (e) {
    setWidth();
});


const btnSubmitMissing = document.querySelector("#submit-missing");
const btnNextMissing = document.querySelector("#next-missing");
const btnFinishMissing = document.querySelector("#finish-missing");
const btnReplayMissing = document.querySelector("#replay-missing");

const textFirstMissing = document.querySelector('#text_first_miss');
const textFirstAnsMissing = document.querySelector('#text_first_ans_miss');
const textLastMissing = document.querySelector('#text_last_miss');
const textLastAnsMissing = document.querySelector('#text_last_ans_miss');

const controlExerciseMissing = document.querySelector("#controls-exe-eng-miss");

const footerScoreMissing = document.querySelector("#kta_miss_score");


const scoreTextMissing = document.querySelector("#score_missing");
const maxScoreTextMissing = document.querySelector("#max_score_missing");
const numberQuestionMissing = document.querySelector("#number_question_missing");
const totalQuestionMissing = document.querySelector("#total_question_missing");


const wrapAnswerMissing = document.querySelector("#wrap_answer_miss");
const bodyErrorAnswerMissing = document.querySelector("#body_error_answer_miss");
const answerTextMissing = document.querySelector("#answer-text-miss");

const hintWordMiss = document.querySelector("#hint-word-miss");
const hintNoteMissing = document.querySelector("#hint_note_miss");
const currentSentenceMissing = document.querySelector("#current_sentence_miss");

const iconCorrectMissing = document.querySelector("#khta_iconcor_miss");
const iconInCorrectMissing = document.querySelector("#khta_iconincor_miss");

//get ele modal missing
const modalMissing = document.querySelector("#modal_miss");
const boxCancelMissing = document.querySelector("#box_cancel_miss");
const boxExitMissing = document.querySelector("#box_exit_miss");
const boxOKMissing = document.querySelector("#box_ok_miss");

const scoreHeaderMissing = document.querySelector("#cscore_header_miss");
const totalScoreHeaderMissing = document.querySelector("#totalscore_header_miss");

const isDoingFalseMissing = document.querySelector("#is_doing_false_miss");
const isDoingTrueMissing = document.querySelector("#is_doing_true_miss");

//result finish sentence
const missResult = document.querySelector("#result_miss");
const areaMissing = document.querySelector("#area_miss");


const scoreResultFinishMissing = document.querySelector("#result_yscore_miss");
const totalScoreResultFinishMissing = document.querySelector("#result_tscore_miss");
const textResultFinishMissing = document.querySelector("#text_result_miss");

// play pause audio text


const btnPlayAudioTextMissing = document.querySelector("#jp-play-miss");
const btnPauseAudioTextMissing = document.querySelector("#jp-pause-miss");
const progressSlideMissing = document.querySelector("#ui-slide-miss");

//
const urlCurrentMiss = window.location.href
//
let currentQuestionMissing = {};
let quesIndexCurrentMissing = -1;
let acceptingAnswersMissing = true
let scoreMissing = 0;
let questionCounterMissing = 0;
let availableQuestionsMissing = []
const SCORE_POINTS_MISSING = 10
let MAX_QUESTION_MISSING = 3
let countHintWordMissing = 0


let questionsMissing = []
let scoreJsonMiss = 0

let isDoingMissing = 0 //Chưa làm
let isGetMissing = 0 // get du lieu


loadDataMissing = () => {
    questionsMissing = []

    $.ajax({
        type: 'GET',
        url: urlCurrentMiss + `exercise/2/${scoreJsonMiss}/${isDoingMissing}/${isGetMissing}/`,
        success: function (response) {
            console.log(response)
            const data = response.data
            const scores = response.score
            const getIsDoing = response.is_doing
            const getIsGET = response.is_get
            isDoingMissing = parseInt(getIsDoing)
            scoreJsonMiss = parseInt(scores)
            isGetMissing = parseInt(getIsGET)

            scoreHeaderMissing.innerHTML = scoreJsonMiss

            data.forEach(element => {
                item = {
                    question: element.question,
                    answer: element.answer
                }
                questionsMissing.push(item)
            });
            if (isDoingMissing == 1) {
                isDoingFalseMissing.style.display = "none"
                isDoingTrueMissing.style.display = "block"
            }
            else {
                isDoingFalseMissing.style.display = "block"
                isDoingTrueMissing.style.display = "none"
            }
        },
        error: function (error) {
            console.log('error', error)
        }
    })
}

initGameMissing = () => {
    areaMissing.style.display = "block"
    missResult.style.display = "none"

    hintWordMiss.style.display = "block"
    currentSentenceMissing.style.display = "block"
    footerScoreMissing.style.display = "block"

    questionCounterMissing = 0
    currentQuestionMissing = {}
    acceptingAnswersMissing = true
    scoreMissing = 0
    availableQuestionsMissing = []
    quesIndexCurrentMissing = -1;
    countHintWordMissing = 0

    //dua vao mang tam
    for (let i = 0; i < questionsMissing.length; i++) {
        availableQuestionsMissing[i] = questionsMissing[i];
    }

    MAX_QUESTION_MISSING = questionsMissing.length
    totalQuestionMissing.innerHTML = MAX_QUESTION_MISSING
    maxScoreTextMissing.innerHTML = "/" + MAX_QUESTION_MISSING * SCORE_POINTS_MISSING
    scoreTextMissing.innerHTML = "0"
    hintNoteMissing.innerHTML = "Em có 2 lượt trợ giúp."
    hintWordMiss.classList.remove('klmcb_hint_disable')
    totalScoreHeaderMissing.innerHTML = MAX_QUESTION_MISSING * SCORE_POINTS_MISSING

}


var speakerText = (text) => {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10];
    msg.voiceURI = "native";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0.8;
    msg.text = text;
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
}


animationTextChangeMiss = (val, start, rootElement) => {
    for (let i = start; i <= val; i++) {

        setTimeout(() => {
            rootElement.innerHTML = "" + i

        }, 50 * i);
    }
}

disPlayElementBtnMissing = (btn) => {
    btnSubmitMissing.style.display = "none";
    btnNextMissing.style.display = "none";
    btnReplayMissing.style.display = "none";
    btnFinishMissing.style.display = "none";
    btn.style.display = "block";
}

getNewQuestionMissing = () => {

    wrapAnswerMissing.classList.remove('hide')
    wrapAnswerMissing.classList.add('hide')

    if (availableQuestionsMissing.length === 0 || questionCounterMissing > MAX_QUESTION_MISSING) {
        hintWordMiss.style.display = "none"
        disPlayElementBtnMissing(btnFinishMissing)
        return
    }
    //
    disPlayElementBtnMissing(btnSubmitMissing)
    modalMissing.style.display = "none"
    //init text

    textboxEle.value = ""
    textFirstAnsMissing.innerHTML = ""
    textLastAnsMissing.innerHTML = ""
    //increase counter
    questionCounterMissing++
    // 
    quesIndexCurrentMissing++

    //set number question to html
    numberQuestionMissing.innerHTML = questionCounterMissing

    //get question next add to array available
    currentQuestionMissing = questionsMissing[quesIndexCurrentMissing]



    //set text and data
    const indexValMissing = currentQuestionMissing['question'].indexOf(currentQuestionMissing['answer'])
    let arrayStringMissing = []
    arrayStringMissing = currentQuestionMissing['question'].split(currentQuestionMissing['answer'])

    textFirstMissing.innerHTML = arrayStringMissing[0]
    textFirstAnsMissing.innerHTML = arrayStringMissing[0]
    //
    if (indexValMissing === -1) {
        textboxEle.style.display = "none"
        textLastMissing.innerHTML = ""
        textLastAnsMissing.innerHTML = ""
    }
    else {
        textboxEle.style.display = "block"
        textLastMissing.innerHTML = arrayStringMissing[1]
        textLastAnsMissing.innerHTML = arrayStringMissing[1]
    }
    //set answer text missing html
    answerTextMissing.innerHTML = currentQuestionMissing["answer"]
    //focus input
    textboxEle.focus();

    availableQuestionsMissing.splice(0, 1)
    acceptingAnswersMissing = true

}

function baseGetPostDataMissing() {

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            url: urlCurrentMiss + `exercise/2/${scoreJsonMiss}/${isDoingMissing}/${isGetMissing}/`,
            success: function (response) {
                resolve(response);
            },
            error: function (xhr) {
                reject(xhr)
            }

        });
    });
}

baseGetPostDataMissing().then(function (response) {
    questionsMissing = []
    const data = response.data
    const scores = response.score
    const getIsDoing = response.is_doing
    const getIsGET = response.is_get
    isDoingMissing = parseInt(getIsDoing)
    scoreJsonMiss = parseInt(scores)
    isGetMissing = parseInt(getIsGET)

    scoreHeaderMissing.innerHTML = scoreJsonMiss

    data.forEach(element => {
        item = {
            question: element.question,
            answer: element.answer
        }
        questionsMissing.push(item)
    });

    if (isDoingMissing == 1) {
        isDoingFalseMissing.style.display = "none"
        isDoingTrueMissing.style.display = "block"
    }
    else {
        isDoingFalseMissing.style.display = "block"
        isDoingTrueMissing.style.display = "none"
    }


    initGameMissing()
    getNewQuestionMissing()
}).catch(function (reason) {
    console.log('reason for rejection', reason)
});


//play pause aduio

btnPlayAudioTextMissing.addEventListener("click", () => {
    btnPlayAudioTextMissing.style.display = "none"
    btnPauseAudioTextMissing.style.display = "block"

    progressSlideMissing.style.width = '0%'
    speakerText(currentQuestionMissing['question'])

    setTimeout(() => {
        var i = 0;

        if (i == 0) {
            i = 1;

            var width = 2;
            var id = setInterval(frame, 10);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width += 2;
                    progressSlideMissing.style.width = width + "%";
                }
            }
        }

    }, 500)
    setTimeout(() => {
        btnPlayAudioTextMissing.style.display = "block"
        btnPauseAudioTextMissing.style.display = "none"
        progressSlideMissing.style.width = '0%'
    }, 1700)

})


// function when click button submit or key: enter input

submitAnswerInputMissing = () => {

    if (textboxEle.value == "") { // input empty
        //Mo hop thoai Modal hoi co muon chuyen sang cau tiep theo
        modalMissing.style.display = "block";
    }
    else {
        const indexValMissing = currentQuestionMissing['question'].indexOf(currentQuestionMissing['answer'])
        if (indexValMissing === -1) {

        } else {
            let isResultAnswer = textboxEle.value.toLowerCase() == currentQuestionMissing.answer.toLowerCase()

            if (isResultAnswer) {
                incrementScoreMissing(SCORE_POINTS_MISSING)

                //animation icon correct
                iconCorrectMissing.style.display = "block";
                setTimeout(() => {
                    iconCorrectMissing.style.display = "none";
                }, 1000);
                //new question
                setTimeout(() => {
                    getNewQuestionMissing()
                }, 500)
            } else {
                iconInCorrectMissing.style.display = "block";
                setTimeout(() => {
                    iconInCorrectMissing.style.display = "none";
                }, 1000);

                wrapAnswerMissing.classList.remove('hide')

                disPlayElementBtnMissing(btnNextMissing)
            }
        }
    }
}
//click btn finish 
finishSentenceAllMissing = () => {

    modalMissing.style.display = "none"
    areaMissing.style.display = "none"

    missResult.style.display = "block"

    hintWordMiss.style.display = "none"
    currentSentenceMissing.style.display = "none"
    footerScoreMissing.style.display = "none"

    disPlayElementBtnMissing(btnReplayMissing)

    totalScoreResultFinishMissing.innerHTML = MAX_QUESTION_MISSING * SCORE_POINTS_MISSING

    textResultFinishMissing.style.display = "none"
    if (scoreMissing != 0) {
        animationTextChange(scoreMissing, 0, scoreResultFinishMissing)
        textResultFinishMissing.style.display = "block"
    }
    else {
        scoreResultFinishMissing.innerHTML = scoreMissing
        textResultFinishMissing.style.display = "block"
    }
    scoreJsonMiss = scoreMissing
    isDoingMissing = 1
    isGetMissing = 1 // post du lieu
    loadDataMissing()
    document.querySelector("#persent_miss").innerHTML = roundToTwo((scoreMissing * 1.0 / (MAX_QUESTION_MISSING * SCORE_POINTS_MISSING)) * 100) + "%"

}

//click btn finish
btnFinishMissing.addEventListener('click', () => finishSentenceAllMissing())

//click btn replay
btnReplayMissing.addEventListener('click', () => {
    initGameMissing()
    getNewQuestionMissing()
})

//click btn modal
//click Ok modal
boxOKMissing.addEventListener('click', () => {
    if (availableQuestionsMissing.length === 0 || questionCounterMissing > MAX_QUESTION_MISSING) {
        finishSentenceAllMissing()
    }
    else {
        setTimeout(() => {
            getNewQuestionMissing()
        }, 500);
    }

})

//click cancel Modal
boxCancelMissing.addEventListener('click', () => {
    modalMissing.style.display = "none"
})
//click exit
boxExitMissing.addEventListener('click', () => {
    modalMissing.style.display = "none"
})
//lan tron so thap phan 2 chu so thap phan
roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
}

//btn next question
btnNextMissing.addEventListener("click", () => {
    getNewQuestionMissing()
})

btnSubmitMissing.addEventListener('click', submitAnswerInputMissing)

textboxEle.addEventListener("keydown", e => {
    if (e.keyCode === 13) {
        submitAnswerInputMissing()
    }
});



hintWordMiss.addEventListener('click', () => {

    let arrayAns = currentQuestionMissing['answer'].split('')
    let arrayAnsLower = currentQuestionMissing['answer'].toLowerCase().split('')

    let arrayInput = textboxEle.value.split('')

    let arrayInputLower = textboxEle.value.toLowerCase().split('')
    if (countHintWordMissing < 2) {
        if (arrayInput.length < arrayAns.length) {
            if (arrayInput.length === 0) {
                textboxEle.value = arrayAns[0]
                countHintWordMissing++
            }
            else {
                for (let i = 0; i < arrayInput.length; i++) {
                    //Kiem tra tung tu cua arr input va arr ans


                    if (arrayInput[i] == arrayAns[i]) {
                        if (i === arrayInput.length - 1) {
                            textboxEle.value += arrayAnsLower[++i]
                            countHintWordMissing++
                        }
                    } else {
                        arrayInput[i] = arrayAns[i]
                        textboxEle.value = ""
                        textboxEle.value = arrayInput.join('')
                        countHintWordMissing++
                        break
                    }
                }
            }

        } else if (arrayInput.length >= arrayAns.length) {
            for (let i = 0; i < arrayInput.length; i++) {
                //Kiem tra tung tu cua arr input va arr ans
                if (arrayAns[i] == arrayInput[i]) {
                    if (i === arrayInput.length - 1) {

                    }
                } else {
                    if (arrayInput.length > arrayAns.length) {
                        let count00 = 0
                        for (let i = 0; i < arrayAns.length; i++) {
                            if (arrayAns[i] == arrayInput[i]) {
                                count00++
                            }
                        }
                        if (count00 === arrayAns.length) {
                            arrayInput.length -= 1
                            textboxEle.value = ""
                            textboxEle.value = arrayInput.join('')

                        } else {
                            arrayInput[i] = arrayAns[i]
                            textboxEle.value = ""
                            textboxEle.value = arrayInput.join('')
                        }
                        countHintWordMissing++
                    }
                    else {
                        arrayInput[i] = arrayAns[i]

                        textboxEle.value = ""
                        textboxEle.value = arrayInput.join('')
                        countHintWordMissing++
                    }

                    break
                }

            }
        }
        if (countHintWordMissing == 2) {
            hintWordMiss.classList.add('klmcb_hint_disable')
        }
    }
    else {

    }
})

hintWordMiss.addEventListener("mouseover", function (e) {
    hintNoteMissing.style.display = "block"
    if (countHintWordMissing == 0) {
        hintNoteMissing.innerHTML = "Em có 2 lượt trợ giúp."
    } else if (countHintWordMissing == 1) {
        hintNoteMissing.innerHTML = "Em còn 1 lượt trợ giúp."
    } else {
        e.preventDefault()
        hintNoteMissing.innerHTML = "Em đã hết lượt được trợ giúp."
    }
})

hintWordMiss.addEventListener("mouseout", function (e) {
    hintNoteMissing.style.display = "none"
})
//increase score
incrementScoreMissing = num => {
    scoreMissing += num
    animationTextChangeMiss(scoreMissing, parseInt(scoreTextMissing.textContent), scoreTextMissing)
}





