const questionChoiceText = document.querySelector('#sentence-choice-text')
const textArrayWordChoice = Array.from(document.querySelectorAll('.choice_tword'));

const choiceResult = document.querySelector("#result_choice");
const textResultFinishChoice = document.querySelector("#text_result_choice");
const areaChoice = document.querySelector("#area_choice");
const showErrorAnswerChoice = document.querySelector("#wrap_answer_choice");

//btn sub, next, ....
const btnSubmitChoice = document.querySelector("#submit-choice");
const btnNextChoice = document.querySelector("#next-choice");
const btnFinishChoice = document.querySelector("#finish-choice");
const btnReplayChoice = document.querySelector("#replay-choice");
const iconCorrectChoice = document.querySelector("#khta_iconcor_choice");
const iconInCorrectChoice = document.querySelector("#khta_iconincor_choice");
//score and sentence footer
const scoreTextChoice = document.querySelector("#score_choice");
const maxScoreTextChoice = document.querySelector("#max_score_choice");
const numberQuestionChoice = document.querySelector("#number_question_choice");
const totalQuestionChoice = document.querySelector("#total_question_choice");
const currentSentenceChoice = document.querySelector("#current_sentence_choice");
const scoreWrapChoice = document.querySelector("#choice_score");
//score header
const scoreHeaderChoice = document.querySelector("#cscore_header_choice");
const totalScoreHeaderChoice = document.querySelector("#totalscore_header_choice");
const isDoingFalseChoice = document.querySelector("#is_doing_false_choice");
const isDoingTrueChoice = document.querySelector("#is_doing_true_choice");
//modal 
const modalChoice = document.querySelector("#modal_choice");
const boxCancelChoice = document.querySelector("#box_cancel_choice");
const boxExitChoice = document.querySelector("#box_exit_choice");
const boxOKChoice = document.querySelector("#box_ok_choice");
//
const scoreResultFinishChoice = document.querySelector("#result_yscore_choice");
const totalScoreResultFinishChoice = document.querySelector("#result_tscore_choice");

const urlCurrentChoice = window.location.href
//khai bao bien
let questionsChoice = []
let scoreJsonChoice = 0
let currentQuestionChoice = {};
let acceptingAnswersChoice = true;
let scoreChoice = 0;
let questionCounterChoice = 0;
let availableQuestionsChoice = [];
let quesIndexCurrentChoice = -1;
const SCORE_POINTS_CHOICE = 10;
let MAX_QUESTION_CHOICE = 3;

let isDoingChoice = 0 //Chưa làm
let isGetChoice = 0 // get du lieu

let disabledEvent = false

initExerciseChoice = () => {

    areaChoice.style.display = "block"
    choiceResult.style.display = "none"
    currentSentenceChoice.style.display = "block"
    scoreWrapChoice.style.display = "block"

    questionCounterChoice = 0;
    currentQuestionChoice = {};
    acceptingAnswersChoice = true;
    scoreChoice = 0;

    availableQuestionsChoice = [];
    quesIndexCurrentChoice = -1;
    disabledEvent = false

    for (let i = 0; i < questionsChoice.length; i++) {
        availableQuestionsChoice[i] = questionsChoice[i];
    }

    MAX_QUESTION_CHOICE = questionsChoice.length;
    totalQuestionChoice.innerHTML = MAX_QUESTION_CHOICE;
    scoreTextChoice.innerHTML = "0"

    maxScoreTextChoice.innerHTML = "/" + MAX_QUESTION_CHOICE * SCORE_POINTS_CHOICE;
    totalScoreHeaderChoice.innerHTML = MAX_QUESTION_CHOICE * SCORE_POINTS_CHOICE;
}



loadDataChoice = () => {
    questionsChoice = []

    $.ajax({
        type: 'GET',
        url: urlCurrentChoice + `exercise/1/${scoreJsonChoice}/${isDoingChoice}/${isGetChoice}/`,
        success: function (response) {
            if (response.status === 'Not exist detail exercise') {

                areaChoice.style.display = "none"
                choiceResult.style.display = "none"
                currentSentenceChoice.style.display = "none"
                scoreWrapChoice.style.display = "none"


            }
            else if (response.status === 'Not exist exercise') {

            }
            else {

                const data = response.data
                const scores = response.score
                const getIsDoing = response.is_doing
                const getIsGET = response.is_get
                isDoingChoice = parseInt(getIsDoing)
                scoreJsonChoice = parseInt(scores)
                isGetChoice = parseInt(getIsGET)

                scoreHeaderChoice.innerHTML = scoreJsonChoice

                data.forEach(element => {
                    item = {
                        question: element.question,
                        choice1: element.choice1,
                        choice2: element.choice2,
                        choice3: element.choice3,
                        choice4: element.choice4,
                        answer: parseInt(element.answer) 
                    }
                    questionsChoice.push(item)
                });
        
              
        
                if (isDoingChoice == 1) {
                    isDoingFalseChoice.style.display = "none"
                    isDoingTrueChoice.style.display = "block"
                }
                else {
                    isDoingFalseChoice.style.display = "block"
                    isDoingTrueChoice.style.display = "none"
                }
            }

        },
        error: function (error) {
            
        }
    })

}


animationTextChangeChoice = (val, start, rootElement) => {
    for (let i = start; i <= val; i++) {

        setTimeout(() => {
            rootElement.innerHTML = "" + i

        }, 50 * i);
    }
}

disPlayElementBtnChoice = (btn) => {
    btnSubmitChoice.style.display = "none";
    btnNextChoice.style.display = "none";
    btnReplayChoice.style.display = "none";
    btnFinishChoice.style.display = "none";
    btn.style.display = "block";
}
displayAllBtnChoice = () => {
    btnSubmitChoice.style.display = "none";
    btnNextChoice.style.display = "none";
    btnReplayChoice.style.display = "none";
    btnFinishChoice.style.display = "none";

}

removeBaseClassChoiceAnswer = () => {
    textArrayWordChoice.forEach(choice => {

        choice.parentElement.classList.remove('choice_correct')
        choice.parentElement.classList.remove('choice_incorrect')
        choice.parentElement.classList.remove('choice_arworded')

    })
}

getNewQuestionChoice = () => {

    if (availableQuestionsChoice.length === 0 || questionCounterChoice > MAX_QUESTION_CHOICE) {
        disPlayElementBtnChoice(btnFinishChoice)
        return
    }
    //
    removeBaseClassChoiceAnswer()
    //
    disPlayElementBtnChoice(btnSubmitChoice)
    //
    disabledEvent = false
    //
    showErrorAnswerChoice.classList.add('hide')
    modalChoice.style.display = "none"
    //increase counter
    questionCounterChoice++
    quesIndexCurrentChoice++
    //set number question to html
    numberQuestionChoice.innerHTML = questionCounterChoice

    //get question next add to array available


    currentQuestionChoice = questionsChoice[quesIndexCurrentChoice]
  

    questionChoiceText.innerHTML = 'Để trả lời cho câu hỏi "' + currentQuestionChoice["question"] + '"'

    textArrayWordChoice.forEach(choice => {
        const number = choice.dataset['number']

        choice.innerHTML = currentQuestionChoice['choice' + number]
    })
    availableQuestionsChoice.splice(0, 1)

}


textArrayWordChoice.forEach(choice => {
    choice.addEventListener('click', () => {
        if (!disabledEvent) {

            textArrayWordChoice.forEach(c => {
                c.parentElement.classList.remove('choice_arworded')
            })
            choice.parentElement.classList.add('choice_arworded')
        }
        else {
            return
        }
    })
})

btnNextChoice.addEventListener("click", () => {
    getNewQuestionChoice()
})

btnSubmitChoice.addEventListener('click', () => {
    countSelectClassArworded = 0
    textArrayWordChoice.forEach(choice => {
        const choiceContainerSelected = choice.parentNode.className === 'choice-container_arword choice_arworded'
        if (choiceContainerSelected === true) // co ton tai class name
        {

            const selectedChoice = choice
            const selectedAnswer = selectedChoice.dataset.number

            let classToApply = selectedAnswer == currentQuestionChoice.answer ? 'choice_correct' :
                'choice_incorrect'
            
            if (classToApply == 'choice_correct') {
                // set score and innertHTML score
                incrementScoreChoice(SCORE_POINTS_CHOICE)
                //add class correct 
                selectedChoice.parentElement.classList.add(classToApply)
                disabledEvent = true // no event click answer

                displayAllBtnChoice()
                iconCorrectChoice.style.display = "block";
                setTimeout(() => {
                    iconCorrectChoice.style.display = "none";
                }, 1000);
                setTimeout(() => {
                    getNewQuestionChoice()
                }, 1500)
            }
            else {
                //add class choice_incorrect with selected choice answer
                selectedChoice.parentElement.classList.add('choice_incorrect')
                //show error
                showErrorAnswerChoice.classList.remove('hide')
                disabledEvent = true // no event click answer
                //find answer is true then add class choice_correct
                textArrayWordChoice.forEach(choiceAns => {
                    if (choiceAns.dataset.number == currentQuestionChoice.answer) {
                        choiceAns.parentElement.classList.add('choice_correct')
                    }
                })
                //show btn Next
                disPlayElementBtnChoice(btnNextChoice)
                iconInCorrectChoice.style.display = "block";
                setTimeout(() => {
                    iconInCorrectChoice.style.display = "none";
                }, 1000);

            }

        }
        else {

            countSelectClassArworded++
        }
    })
    //Chua chon dap an
    //Mo hop thoai Modal hoi co muon chuyen sang cau tiep theo

    if (countSelectClassArworded === 4) {
        modalChoice.style.display = "block";
    }

})

roundToTwoChoice = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
}

function baseGetPostDataChoice() {

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            url: urlCurrentChoice + `exercise/1/${scoreJsonChoice}/${isDoingChoice}/${isGetChoice}/`,
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
baseGetPostDataChoice().then(function (response) {
    if (response.status === 'Not exist detail exercise') {

    }
    else if (response.status === 'Not exist exercise') {

    }
    else {
        questionsChoice = []
        const data = response.data
        const scores = response.score
        const getIsDoing = response.is_doing
        const getIsGET = response.is_get
        isDoingChoice = parseInt(getIsDoing)
        scoreJsonChoice = parseInt(scores)
        isGetChoice = parseInt(getIsGET)

        scoreHeaderChoice.innerHTML = scoreJsonChoice

       
        data.forEach(element => {
            item = {
                question: element.question,
                choice1: element.choice1,
                choice2: element.choice2,
                choice3: element.choice3,
                choice4: element.choice4,
                answer: parseInt(element.answer)
            }
            questionsChoice.push(item)
        });

    

        if (isDoingChoice == 1) {
            isDoingFalseChoice.style.display = "none"
            isDoingTrueChoice.style.display = "block"
        }
        else {
            isDoingFalseChoice.style.display = "block"
            isDoingTrueChoice.style.display = "none"
        }
        initExerciseChoice()
        getNewQuestionChoice()
    }
}).catch(function (reason) {
   
});

//function finish sentence choice
finishSentenceAllChoice = () => {
    modalChoice.style.display = "none"
    areaChoice.style.display = "none"
    choiceResult.style.display = "block"
    currentSentenceChoice.style.display = "none"
    scoreWrapChoice.style.display = "none"

    disPlayElementBtnChoice(btnReplayChoice)

    totalScoreResultFinishChoice.innerHTML = MAX_QUESTION_CHOICE * SCORE_POINTS_CHOICE
    //show text result persent
    textResultFinishChoice.style.display = "none"
    if (scoreChoice != 0) {
        animationTextChangeChoice(scoreChoice, 0, scoreResultFinishChoice)
        textResultFinishChoice.style.display = "block"
    }
    else {
        scoreResultFinishChoice.innerHTML = scoreChoice
        textResultFinishChoice.style.display = "block"
    }
    scoreJsonChoice = scoreChoice
    isDoingChoice = 1
    isGetChoice = 1 // post dlieu
    loadDataChoice()

    document.querySelector("#persent_choice").innerHTML = roundToTwoChoice((scoreChoice * 1.0 / (MAX_QUESTION_CHOICE * SCORE_POINTS_CHOICE)) * 100) + "%"

}


//click btn finish
btnFinishChoice.addEventListener('click', () => finishSentenceAllChoice())


//click Ok modal
boxOKChoice.addEventListener('click', () => {
    if (availableQuestionsChoice.length === 0 || questionCounterChoice > MAX_QUESTION_CHOICE) {
        finishSentenceAllChoice()
    }
    else {
        setTimeout(() => {
            getNewQuestionChoice()
        }, 500);
    }

})

//click cancel Modal
boxCancelChoice.addEventListener('click', () => {
    modalChoice.style.display = "none"
})
boxExitChoice.addEventListener('click', () => {
    modalChoice.style.display = "none"
})
//click replay end all sentence 
btnReplayChoice.addEventListener('click', () => {
    initExerciseChoice()
    getNewQuestionChoice()
})

incrementScoreChoice = num => {
    scoreChoice += num
    animationTextChangeChoice(scoreChoice, parseInt(scoreTextChoice.textContent), scoreTextChoice)
}



