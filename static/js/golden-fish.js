// Create a div element
const fakeEleFish = document.createElement('div');

// Hide it completely
fakeEleFish.style.position = 'absolute';
fakeEleFish.style.top = '0';
fakeEleFish.style.left = '-9999px';
fakeEleFish.style.overflow = 'hidden';
fakeEleFish.style.visibility = 'hidden';
fakeEleFish.style.whiteSpace = 'nowrap';
fakeEleFish.style.height = '0';

// We copy some styles from the textbox that effect the width
const textboxEleGoldenFish = document.getElementById('text_input_fish');

// Get the styles
const stylesFish = window.getComputedStyle(textboxEleGoldenFish);

// Copy font stylesFish from the textbox
fakeEleFish.style.fontFamily = stylesFish.fontFamily;
fakeEleFish.style.fontSize = stylesFish.fontSize;
fakeEleFish.style.fontStyle = stylesFish.fontStyle;
fakeEleFish.style.fontWeight = stylesFish.fontWeight;
fakeEleFish.style.letterSpacing = stylesFish.letterSpacing;
fakeEleFish.style.textTransform = stylesFish.textTransform;

fakeEleFish.style.borderLeftWidth = stylesFish.borderLeftWidth;
fakeEleFish.style.borderRightWidth = stylesFish.borderRightWidth;
fakeEleFish.style.paddingLeft = stylesFish.paddingLeft;
fakeEleFish.style.paddingRight = stylesFish.paddingRight;

// Append the fake element to `body`
document.body.appendChild(fakeEleFish);

const setWidthFish = function () {
    const string = textboxEleGoldenFish.value || textboxEleGoldenFish.getAttribute('placeholder') || '';
    fakeEleFish.innerHTML = string.replace(/\s/g, '&' + 'nbsp;');

    const fakeEleStyles = window.getComputedStyle(fakeEleFish);
    textboxEleGoldenFish.style.width = fakeEleStyles.width;
};

setWidthFish();

textboxEleGoldenFish.addEventListener('input', function (e) {
    setWidthFish();
});

const areaBeforePlayFish = document.getElementById('khta_arins_fish')
const btnStartPlayFish = document.getElementById('khta_game2_bstart')
const areaPlayBgFish = document.getElementById('arplay_fish')
const fishBig = document.getElementById('gfb1_fish')
const listBubble = Array.from(document.querySelectorAll('.bubble_icon'))
const imgBgFish = document.getElementById('gfb1_bg_fish_i')

//
const answerBubbleTextOneGoldenFish = document.getElementById('gfb1_answer_bubble_02')
const answerBubbleTextTwoGoldenFish = document.getElementById('gfb1_answer_bubble_01')
const answerBubbleTextThreeGoldenFish = document.getElementById('gfb1_answer_bubble_00')
const textMissQuestionGoldenFish = document.getElementById('text-miss-fish')
const fishCorrectAnswerGoldenFish = document.getElementById('gfb1_fishs_i')

//
const currentScoreTextGoldenFish = document.getElementById('yscore_fish')
const totalScoreTextGoldenFish = document.getElementById('tscore_fish')

const areaResultFinishGoldenFish = document.getElementById('khta_arresult_game_fish')
const yScoreResultGoldenFish = document.getElementById('khtas_yscore_fish')
const totalScoreResultGoldenFish = document.getElementById('khtas_tscore_fish')
const percentResultGoldenFish = document.getElementById('khta_persent_fish')
const textNoteResultGoldenFish = document.getElementById('khta_tnote_fish')
const btnReplayGoldenFish = document.getElementById('khta_breplay_fish')

//

const isDoingFalseGoldenFish = document.getElementById('is_doing_false_fish')
const isDoingTrueGoldenFish = document.getElementById('is_doing_true_fish')

const scoreHeaderGoldenFish = document.getElementById('cscore_header_fish')
const totalScoreHeaderGoldenFish = document.getElementById('totalscore_header_fish')

const nullDataResponseGoldenFish = document.getElementById('error_data_game_fish')



//
const resultStartAnswerGoldenFish = document.getElementById('gfb1_result')
const areaScoreFooterGoldenFish = document.getElementById('khta_arscore__fish')
//

const widthImg = imgBgFish.width
const heightImg = imgBgFish.height

const widthFishCorrect = fishCorrectAnswerGoldenFish.width

autoFishBig = () => {
    counterTime = setInterval(setTime, 500);
    function setTime() {

        po_left = parseFloat(fishBig.style.left.replace('px', ''))

        po_top = parseFloat(fishBig.style.top.replace('px', ''))

        let bgPositionY = parseFloat(fishBig.style.backgroundPositionY.replace('px', ''))
        if (po_top < 1) {


            if (bgPositionY === -149) {
                fishBig.style.backgroundPositionY = '0px';
            }
            else {
                fishBig.style.backgroundPositionY = '-149px';
            }

            let rdLeft = Math.floor(Math.random() * (45 - 10)) + 10;
            let rdTop = Math.floor(Math.random() * (50 - 30)) + 30;

            fishBig.style.top = (po_top + rdTop) + 'px'
            fishBig.style.left = (po_left + rdLeft) + 'px'


        }
        else if (po_top > heightImg) {

            if (bgPositionY === -149) {
                fishBig.style.backgroundPositionY = '0px';
            }
            else {
                fishBig.style.backgroundPositionY = '-149px';
            }
            let rdLeft = Math.floor(Math.random() * (2 - (-10))) + (-10);
            let rdTop = Math.floor(Math.random() * (2 - (-10))) + (-10);

            console.log(fishBig.style.top)
            console.log(fishBig.style.left)
            fishBig.style.top = (po_top + rdTop) + 'px'
            fishBig.style.left = (po_left + rdLeft) + 'px'
        }
        else if (po_left > widthImg) {


            if (bgPositionY === -149) {
                fishBig.style.backgroundPositionY = '0px';
            }
            else {
                fishBig.style.backgroundPositionY = '-149px';
            }
            let rdLeft = Math.floor(Math.random() * ((-10) - (-2))) + (-2);
            let rdTop = Math.floor(Math.random() * ((-4) - (-2))) + (-2);

            console.log(fishBig.style.top)
            console.log(fishBig.style.left)
            fishBig.style.top = (po_top + rdTop) + 'px'
            fishBig.style.left = (po_left + rdLeft) + 'px'

        }
        else if (po_left < 1) {
            if (bgPositionY === -149) {
                fishBig.style.backgroundPositionY = '0px';
            }
            else {
                fishBig.style.backgroundPositionY = '-149px';
            }
            let rdLeft = Math.floor(Math.random() * 10);
            let rdTop = Math.floor(Math.random() * ((7) - (-3))) + (-3);

            console.log(fishBig.style.top)
            console.log(fishBig.style.left)
            fishBig.style.top = (po_top + rdTop) + 'px'
            fishBig.style.left = (po_left + rdLeft) + 'px'
        }
        else {
            if (bgPositionY === -149) {
                fishBig.style.backgroundPositionY = '0px';
            }
            else {
                fishBig.style.backgroundPositionY = '-149px';
            }
            let rdLeft = Math.floor(Math.random() * (6 - 3)) + 3;
            let rdTop = Math.floor(Math.random() * ((-3) - (-6))) + (-6);

            console.log(fishBig.style.top)
            console.log(fishBig.style.left)
            fishBig.style.top = (po_top + rdTop) + 'px'
            fishBig.style.left = (po_left + rdLeft) + 'px'
        }
    }

}


autoRunBubble = () => {
    listBubble.forEach(item => {
        changePositionBubble(item);
    })
}

btnStartPlayFish.addEventListener('click', () => {
    areaBeforePlayFish.style.display = 'none'
    areaPlayBgFish.style.display = 'block'
    // autoFishBig()
    
    getNewQuestionGoldenFish();
    areaScoreFooterGoldenFish.style.display = 'block';
})

let questionsGoldenFish = [];
//
const urlCurrentGoldenFish = window.location.href
//
let currentQuestionGoldenFish = {};
let quesIndexCurrentGoldenFish = -1;
let acceptingAnswersGoldenFish = true
let scoreGoldenFish = 0;
let questionCounterGoldenFish = 0;
let availableQuestionsGoldenFish = []
const SCORE_POINTS_GoldenFish = 10
let MAX_QUESTION_GoldenFish = 3

let currentIndexGoldenFish = 0;
//get and send data

let scoreJsonGoldenFish = 0;
let isDoingGoldenFish = 0; //Chưa làm
let isGetGoldenFish = 0; // get du lieu
//

speakerTextGoldenFish = (text) => {
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

remove2LetterQuestionGF = (text) => {
    let arr_split = text.split('')
    let resultText = ''
    if (arr_split.length >= 2) {
        for (let i = 2; i < arr_split.length; i++) {
            resultText += arr_split[i];
        }
    }
    return resultText
}

get2LetterQuestionGF = (text) => {
    let arr_split = text.split('')
    let resultText = ''
    if (arr_split.length >= 2) {
        for (let i = 0; i < 2; i++) {
            resultText += arr_split[i];
        }
    }
    return resultText
}


//
addStartGF = (result=true) =>{
    const lstStartGF = document.getElementsByClassName("gfb1_result_icon");
   
    for (i = 0;i < lstStartGF.length;i++) 
    {
        if (!lstStartGF[i].classList.contains("gfb1_result_icon_correct") 
            && !lstStartGF[i].classList.contains('gfb1_result_icon_incorrect')) 
        {
            if(result === true)
            { 
                lstStartGF[i].classList.add("gfb1_result_icon_correct");
            }else{
                lstStartGF[i].classList.add("gfb1_result_icon_incorrect");
            }
            break;
        }
    }
}
//
createElementResultFish = () => {
    resultStartAnswerGoldenFish.innerHTML = ''
    // render DOM element start
    //create element
    for (let i = 0; i < questionsGoldenFish.length; i++) {
        //Create element div
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "gfb1_result_icon");

        resultStartAnswerGoldenFish.appendChild(newDiv);
        //
    }
}

setOpacityBtnGf = () =>{
    answerBubbleTextOneGoldenFish.style.opacity = '0';
    answerBubbleTextTwoGoldenFish.style.opacity = '0';
    answerBubbleTextThreeGoldenFish.style.opacity = '0';
}

animationSetPositionBtnAnswerGF = (element) =>{
    const leftElement = parseFloat(element.style.left.replace('px', ''))
    const topElement = parseFloat(element.style.top.replace('px', ''))

    element.style.opacity = '1';
    element.style.top = (heightImg + 74) + 'px';
    let counterTimeGFish = setInterval(setTimeGFish, 100);
    function setTimeGFish() {
        let positionLeft = parseFloat(element.style.left.replace('px', ''))

        let positionTop = parseFloat(element.style.top.replace('px', ''))

        if (positionTop > topElement) {
            element.style.top = (positionTop - 40) + 'px';
        }

    }
}

animationAllBtnGetNewGF = () =>{
    setTimeout(()=>{
        animationSetPositionBtnAnswerGF(answerBubbleTextOneGoldenFish);
    },300)
    setTimeout(()=>{
        animationSetPositionBtnAnswerGF(answerBubbleTextTwoGoldenFish);
    },1000)
    setTimeout(()=>{
        animationSetPositionBtnAnswerGF(answerBubbleTextThreeGoldenFish);
    },1500)
}

initGameGoldenFish = () =>{
    currentQuestionGoldenFish = {};
    quesIndexCurrentGoldenFish = -1;
    acceptingAnswersGoldenFish = true
    scoreGoldenFish = 0;
    questionCounterGoldenFish = 0;
    availableQuestionsGoldenFish = []
    currentIndexGoldenFish = 0;


    MAX_QUESTION_GoldenFish = questionsGoldenFish.length;
    currentScoreTextGoldenFish.innerHTML = '0';
    totalScoreTextGoldenFish.innerHTML = MAX_QUESTION_GoldenFish * SCORE_POINTS_GoldenFish;
    totalScoreHeaderGoldenFish.innerHTML = MAX_QUESTION_GoldenFish * SCORE_POINTS_GoldenFish;
}

getDataResponseGF = (response) =>{
    if (response.data === undefined) {
        areaScoreFooterGoldenFish.style.display = 'none'
        areaBeforePlayFish.style.display = 'none'
                
         //hidden result finish and play, score footer
         areaResultFinishGoldenFish.style.display = 'none';
         areaPlayBgFish.style.display = 'none';
         
         nullDataResponseGoldenFish.style.display = 'block';

         isDoingFalseGoldenFIsh.style.display = "block";
         isDoingTrueGoldenFIsh.style.display = "none";
    }
    else{
       
        questionsGoldenFish = []
        const data = response.data
        const scores = response.score
        const getIsDoing = response.is_doing
        const getIsGET = response.is_get

        isDoingGoldenFish = parseInt(getIsDoing)
        scoreJsonGoldenFish = parseInt(scores)
        isGetGoldenFish = parseInt(getIsGET) 


        scoreHeaderGoldenFish.innerHTML = scoreJsonGoldenFish
        

        data.forEach(value => {
            item = {
                'question':value.question,
                'answer1':value.answer1,
                'answer2':value.answer2,
                'answer3':value.answer3
            }
            questionsGoldenFish.push(item)
        });
      

        if (isDoingGoldenFish == 1) {
            isDoingFalseGoldenFish.style.display = "none"
            isDoingTrueGoldenFish.style.display = "block"
        }
        else {
            isDoingFalseGoldenFish.style.display = "block"
            isDoingTrueGoldenFish.style.display = "none"
        }

    
        initGameGoldenFish();
        createElementResultFish();
    }
}


loadDataGoldenFish = () => {
    $.ajax({
        type: 'GET',
        url:urlCurrentGoldenFish + `game/2/${scoreJsonGoldenFish}/${isDoingGoldenFish}/${isGetGoldenFish}/`,
        success: function (response) {         
            getDataResponseGF(response);
        },
        error: function (error) {
           
        }
    });
}

// lam tron 2 chu so thap phan
roundToTwoGoldenFish = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
}

//
resultGameWGoldenFish = () => {
    //hidden area before play and play, score footer
    areaBeforePlayFish.style.display = 'none';
    areaPlayBgFish.style.display = 'none';
    areaScoreFooterGoldenFish.style.display = 'none';

    //show result finish
    areaResultFinishGoldenFish.style.display = 'block';
    //
    totalScoreResultGoldenFish.innerHTML = SCORE_POINTS_GoldenFish * MAX_QUESTION_GoldenFish;
    if (scoreGoldenFish != 0) {
        setTimeout(() =>{
            animationTextChangeGFish(scoreGoldenFish, 0, yScoreResultGoldenFish);
        },1000)
    }
    else {
        yScoreResultGoldenFish.innerHTML = 0;
    }
    //
    let percentScore = (scoreGoldenFish * 1.0 / (MAX_QUESTION_GoldenFish * SCORE_POINTS_GoldenFish)) * 100;
    percentResultGoldenFish.innerHTML =  roundToTwoGoldenFish(percentScore) + "%";
    if (percentScore < 41)
    {
        textNoteResultGoldenFish.innerHTML = ' Kết quả không tốt!';
    }
    else if (percentScore < 71){
        textNoteResultGoldenFish.innerHTML = ' Kết quả trung bình!';
    }
    else if (percentScore < 91){
        textNoteResultGoldenFish.innerHTML = ' Kết quả tốt!';
    }
    else{
        textNoteResultGoldenFish.innerHTML = ' Kết quả rất tốt!';
    }

    scoreJsonGoldenFish = scoreGoldenFish
    isDoingGoldenFish = 1
    isGetGoldenFish = 1 // post du lieu
    loadDataGoldenFish();
}


getNewQuestionGoldenFish = () => {
    if (questionCounterGoldenFish >= MAX_QUESTION_GoldenFish) {
        resultGameWGoldenFish()
    }
    else{

        setOpacityBtnGf();
        // default value textbox
        textboxEleGoldenFish.value = '';
        //
        animationAllBtnGetNewGF();
        // clear all display is none of btn answer
        clearDisplayBtnGF();
        //
        clearEventBtnGF();
        //
        removeCorrectElementGF()
        //increase counter
        questionCounterGoldenFish++;
        // 
        quesIndexCurrentGoldenFish++;
        //get current question
        currentQuestionGoldenFish = questionsGoldenFish[quesIndexCurrentGoldenFish]
        
        textMissQuestionGoldenFish.innerHTML = remove2LetterQuestionGF(currentQuestionGoldenFish['question'])
        //speak text
        speakerTextGoldenFish(currentQuestionGoldenFish['question']);
        //set attribute value
        answerBubbleTextOneGoldenFish.setAttribute('value', currentQuestionGoldenFish['answer1']);
        answerBubbleTextTwoGoldenFish.setAttribute('value', currentQuestionGoldenFish['answer2']);
        answerBubbleTextThreeGoldenFish.setAttribute('value', currentQuestionGoldenFish['answer3']);
        //set answer 
        answerBubbleTextOneGoldenFish.querySelector(".gfb1_answer_ct").innerHTML = currentQuestionGoldenFish['answer1']
        answerBubbleTextTwoGoldenFish.querySelector(".gfb1_answer_ct").innerHTML = currentQuestionGoldenFish['answer2']
        answerBubbleTextThreeGoldenFish.querySelector(".gfb1_answer_ct").innerHTML = currentQuestionGoldenFish['answer3']
    }
}


animationTextChangeGFish = (val, start, rootElement) => {
    for (let i = start; i <= val; i++) {
        setTimeout(() => {
            rootElement.innerHTML = "" + i

        }, 50 * i);
    }
}

incrementScoreGoldenFish = num => {
    scoreGoldenFish += num
    animationTextChangeGFish(scoreGoldenFish, parseInt(currentScoreTextGoldenFish.textContent), currentScoreTextGoldenFish)
}

correctAnswerFishGF = () => {
    fishCorrectAnswerGoldenFish.style.left = '-188px';
    let handleTime = setInterval(setTimeCorrectFish, 80);
    function setTimeCorrectFish() {
        let poLeftFishCr = parseFloat(fishCorrectAnswerGoldenFish.style.left.replace('px', ''))
        if (poLeftFishCr < widthFishCorrect + widthImg) {

            fishCorrectAnswerGoldenFish.style.left = (poLeftFishCr + 50) + 'px';
        }
        else {
            fishCorrectAnswerGoldenFish.style.left = '-188px';
            clearInterval(handleTime);
        }
    }
    speakerTextGoldenFish(currentQuestionGoldenFish['question']);
    incrementScoreGoldenFish(SCORE_POINTS_GoldenFish);
    addStartGF(true);
}

addCorrectElementGF = (ele) =>{
    const newDivEle = document.createElement("div");
    newDivEle.setAttribute("class", "ge2 gfb_icor");
    ele.appendChild(newDivEle);
}

removeCorrectElementGF = () =>{
    const childQS1 = answerBubbleTextOneGoldenFish.querySelector('.gfb_icor')
    const childQS2 = answerBubbleTextTwoGoldenFish.querySelector('.gfb_icor')
    const childQS3 = answerBubbleTextThreeGoldenFish.querySelector('.gfb_icor')

    if (childQS1 != null) {
        answerBubbleTextOneGoldenFish.removeChild(childQS1);
    }
    if (childQS2 != null) {
        answerBubbleTextTwoGoldenFish.removeChild(childQS2);
    }
    if (childQS3 != null) {
        answerBubbleTextThreeGoldenFish.removeChild(childQS3);
    }
}

clearEventBtnGF = () => {
    answerBubbleTextOneGoldenFish.style.removeProperty('pointer-events');
    answerBubbleTextTwoGoldenFish.style.removeProperty('pointer-events');
    answerBubbleTextThreeGoldenFish.style.removeProperty('pointer-events');
}
removeEventAllBtnGF =  () =>{
    answerBubbleTextOneGoldenFish.style.pointerEvents = 'none'
    answerBubbleTextTwoGoldenFish.style.pointerEvents = 'none'
    answerBubbleTextThreeGoldenFish.style.pointerEvents = 'none'
}
removeEventBtnGF =  (ele) =>{
    answerBubbleTextOneGoldenFish.style.pointerEvents = 'none'
    answerBubbleTextTwoGoldenFish.style.pointerEvents = 'none'
    answerBubbleTextThreeGoldenFish.style.pointerEvents = 'none'
    ele.style.removeProperty('pointer-events');
}
clearDisplayBtnGF =  (ele) =>{
    answerBubbleTextOneGoldenFish.style.display = 'block'
    answerBubbleTextTwoGoldenFish.style.display = 'block'
    answerBubbleTextThreeGoldenFish.style.display = 'block'
}

eventErrorAnswerGF = () => {
    const value1 = currentQuestionGoldenFish['answer1'];
    const value2 = currentQuestionGoldenFish['answer2'];
    const value3 = currentQuestionGoldenFish['answer3'];
    const answerLetterGF = get2LetterQuestionGF(currentQuestionGoldenFish['question']);

    if (value1 === answerLetterGF) {   
        addCorrectElementGF(answerBubbleTextOneGoldenFish);  
    }
    else if (value2 === answerLetterGF) {
        addCorrectElementGF(answerBubbleTextTwoGoldenFish);   
    }
    else if (value3 === answerLetterGF) {
        addCorrectElementGF(answerBubbleTextThreeGoldenFish);  
    }
    addStartGF(false);
}

sameEventBeforeAnswerGF = (ele) => {
    removeEventBtnGF(ele);
    ele.style.display = 'none';
    textboxEleGoldenFish.value = ele.getAttribute('value');  
}


answerBubbleTextOneGoldenFish.addEventListener('click', () => {
    let result2Text = answerBubbleTextOneGoldenFish.getAttribute('value') + remove2LetterQuestionGF(currentQuestionGoldenFish['question'])

    if (result2Text === currentQuestionGoldenFish['question']) {
        correctAnswerFishGF();
    }
    else {
        eventErrorAnswerGF();
    }
    sameEventBeforeAnswerGF(answerBubbleTextOneGoldenFish)
    setTimeout(()=>{
        getNewQuestionGoldenFish();
    },3000)
    
});


answerBubbleTextTwoGoldenFish.addEventListener('click', () => {
    let result2Text = answerBubbleTextTwoGoldenFish.getAttribute('value') + remove2LetterQuestionGF(currentQuestionGoldenFish['question'])

    if (result2Text === currentQuestionGoldenFish['question']) {
        correctAnswerFishGF();
    }
    else {
        eventErrorAnswerGF();
    }
    sameEventBeforeAnswerGF(answerBubbleTextTwoGoldenFish)    
    setTimeout(()=>{
        getNewQuestionGoldenFish();
    },3000)
});

answerBubbleTextThreeGoldenFish.addEventListener('click', () => {
    let result2Text = answerBubbleTextThreeGoldenFish.getAttribute('value') + remove2LetterQuestionGF(currentQuestionGoldenFish['question'])

    if (result2Text === currentQuestionGoldenFish['question']) {
        correctAnswerFishGF();
    }
    else {
        eventErrorAnswerGF();
    }
    sameEventBeforeAnswerGF(answerBubbleTextThreeGoldenFish)    
    setTimeout(()=>{
        getNewQuestionGoldenFish();
    },3000)
});

successFishCorrectAnswerGoldenFish = (ele) =>{

    
    let counterTimeFish = setInterval(setTime, 500);


    function setTime() {

        let poLeftFish = parseFloat(fishBig.style.left.replace('px', ''))

        let poTopFish = parseFloat(fishBig.style.top.replace('px', ''))


    }
}

btnReplayGoldenFish.addEventListener('click', () => {
     //show area before play 
     areaBeforePlayFish.style.display = 'block';
     
     //hidden result finish and play, score footer
     areaResultFinishGoldenFish.style.display = 'none';
     areaPlayBgFish.style.display = 'none';
     areaScoreFooterGoldenFish.style.display = 'none';

});


submitAnswerInputGoldenFish = () =>{
    const valueInput = textboxEleGoldenFish.value;
    const arrInputText = valueInput.split('')

    if(arrInputText.length < 2)
    {

    }
    else{
        let resultT = valueInput + remove2LetterQuestionGF(currentQuestionGoldenFish['question']);
        if(resultT === currentQuestionGoldenFish['question'])
        {
            correctAnswerFishGF();
        }
        else{
            eventErrorAnswerGF();
        }
        removeEventAllBtnGF()
        setTimeout(()=>{
            getNewQuestionGoldenFish();
        },3000)
    }
}
textboxEleGoldenFish.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        submitAnswerInputGoldenFish();
    }
});

function baseGetPostDataGoldenFish() {

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            url:urlCurrentGoldenFish + `game/2/${scoreJsonGoldenFish}/${isDoingGoldenFish}/${isGetGoldenFish}/`,
            success: function (response) {
                resolve(response);
            },
            error: function (xhr) {
                reject(xhr)
            }
        });
    });
}



baseGetPostDataGoldenFish().then(function (response) {
    getDataResponseGF(response);
}).catch(function (reason) {
    
});