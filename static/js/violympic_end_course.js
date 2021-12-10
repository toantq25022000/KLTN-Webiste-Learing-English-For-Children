const btnUrlVioEndCourse = document.getElementById('btn-url-vio-end')
const btnStartVioEnd = document.getElementById('btn-start-vioend')
const headerLoadStartVioEnd = document.getElementById('header_load_start')
const sniperBoxVioEnd = document.getElementById('sniper-box')
const wrapperAreaBgVioEnd = document.getElementById('bg-wrap-vio-end')

const submissionVioEnd = document.getElementById('submission_vioend')
const timeCountDownVioEnd = document.getElementById('time_countdown_vioend')
const sliderProgressBarVioEnd = document.getElementById('slider_progress_ques')

const numberQuestionDoingHeaderVioEnd = document.getElementById('number_ques_doing_header')
const totalQuestionHeaderVioEnd = document.getElementById('total_ques_header')
const currentNumberQuestionVioEnd = document.getElementById('current_number_question')
const textQuestionVioEnd = document.getElementById('question_titile_vioend')

const btnPreviousVioEnd = document.getElementById('prev-vioend')
const btnNextVioEnd = document.getElementById('next-vioend')

const formCheckRadioVioEnd = Array.from(document.querySelectorAll('.form-check-vioend'))


//Modal 
const modalSubmissionVioEnd = document.getElementById('modalSubmission')
const btnOKSubmissionVioEnd = document.getElementById('btn_OK_submission')
const boxSuccessErrorNumberVioEnd = document.getElementById('render-suc-danger-number')

const btnListQuestionVioEnd = document.getElementById('btn_list_question_vioend')
const listBtnQuestionNavVioEnd = document.getElementById('list_btn_ques_vio')

//result submit submission

const modalResultSubMissionVioEnd = document.getElementById('modal__result_submission')
const textResultSubMissionVioEnd = document.getElementById('text-result-submission')
const btnSubmitExampleVioEnd = document.getElementById('btn_submit_example_vioend')

const iconCloseSubmissionVioEnd = document.getElementById('icon_close_submission')
const btnCloseSubmissionVioEnd = document.getElementById('btn_close_submission')

//history  example
const textHistoryExampleVioEnd = document.getElementById('text_history_example_vioend')




let timeStart;
let timeFinish;
let formatTimeStart;
let formatTimeFinish;
var counterTime;
var urlVioEnd = btnUrlVioEndCourse.dataset.url;
const urlCurrentVioEnd = window.location.href
let questionsVioEnd = []
let currentQuestionVioEnd = {};
let questionCounterVioEnd = 0;
let quesCounterDoingVioEnd = 0;
let availableQuestionsVioEnd = [];
let quesIndexCurrentVioEnd = -1;
const SCORE_POINTS_VIOEND = 10;
let MAX_QUESTION_VIOEND = 10;

let arrayBtnQuestionVioEnd = []; //defalut array list question 




initViolympicEndCourse = () => {
    currentQuestionVioEnd = {};
    questionCounterVioEnd = 0;
    quesCounterDoingVioEnd = 0;
    availableQuestionsVioEnd = [];
    arrayBtnQuestionVioEnd = []; 
    quesIndexCurrentVioEnd = -1;

    questionsVioEnd.forEach(element => {
        item = {
            question: element.question,
            choice1: element.choice1,
            choice2: element.choice2,
            choice3: element.choice3,
            choice4: element.choice4,
            answer: element.answer,
            answerChecked: "0"    //no check answer
        }
        availableQuestionsVioEnd.push(item);
    });


    MAX_QUESTION_VIOEND = questionsVioEnd.length;
    timeCountDownVioEnd.innerHTML = ''
    numberQuestionDoingHeaderVioEnd.innerHTML = '0'
    totalQuestionHeaderVioEnd.innerHTML = MAX_QUESTION_VIOEND;
    sliderProgressBarVioEnd.style.width = '0%';
}
roundToTwoVioEnd = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
}
updateProgressBarVioEnd = (number) => {
    var resultNum = (parseFloat(number) * 100) / MAX_QUESTION_VIOEND;
    sliderProgressBarVioEnd.style.width = roundToTwoVioEnd(resultNum) + '%';
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    counterTime = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(counterTime);
            return;  
        }
    }, 1000);
}

getCurrentQuestionVioEnd = () => {
    if (quesIndexCurrentVioEnd === 0) {
        btnPreviousVioEnd.style.display = "none"

    }
    else {
        btnPreviousVioEnd.style.display = "block"

    }

    if (quesIndexCurrentVioEnd === MAX_QUESTION_VIOEND - 1) {
        btnNextVioEnd.style.display = "none"
    }
    else {
        btnNextVioEnd.style.display = "block"
    }
    currentNumberQuestionVioEnd.innerHTML = questionCounterVioEnd;
    currentQuestionVioEnd = availableQuestionsVioEnd[quesIndexCurrentVioEnd];
    // check checked radio in data
    if (currentQuestionVioEnd['answerChecked'] === "0") {
        $('.form-check-input').prop('checked', false);
    }

    formCheckRadioVioEnd.forEach(check => {
        let cChecked = check.querySelector('.form-check-input');

        if (cChecked != null) {
            if (cChecked.value === currentQuestionVioEnd['answerChecked']) {
                cChecked.checked = true;
            }
        }
        else {
            
        }
    })

    textQuestionVioEnd.innerHTML = currentQuestionVioEnd['question'];
    let numberChoice = 0;
    formCheckRadioVioEnd.forEach(choice => {
        numberChoice++;
        const labelAns = choice.querySelector('.text-answer-vioend');
        if (labelAns != null) {
            labelAns.innerHTML = currentQuestionVioEnd['choice' + numberChoice];
        }
    })
}

getNewQuestionVioEnd = () => {
    //Neu dang o cau dau tien
    if (quesIndexCurrentVioEnd === MAX_QUESTION_VIOEND - 1) {
        btnNextVioEnd.style.display = "none"
        return
    } else {

        questionCounterVioEnd++;
        quesIndexCurrentVioEnd++;

        getCurrentQuestionVioEnd()
    }
}
// 
getPreviousQuestionVioEnd = () => {
    if (quesIndexCurrentVioEnd === 0) {
        btnPreviousVioEnd.style.display = "none"
        return
    }
    else {

        questionCounterVioEnd--;
        quesIndexCurrentVioEnd--;

        getCurrentQuestionVioEnd()
    }
}

//Change radio button
function myChangeRadioVioEnd(event) {
    if (currentQuestionVioEnd['answerChecked'] === "0") {
        currentQuestionVioEnd['answerChecked'] = event.target.value;
        quesCounterDoingVioEnd++;
        numberQuestionDoingHeaderVioEnd.innerHTML = quesCounterDoingVioEnd;
        updateProgressBarVioEnd(quesCounterDoingVioEnd)
    }
    else {
        currentQuestionVioEnd['answerChecked'] = event.target.value;
    }
}
document.querySelectorAll("input[name='ansVioEnd']").forEach((input) => {
    input.addEventListener('change', myChangeRadioVioEnd);
});

//click btn next 
btnNextVioEnd.addEventListener('click', () => {
    getNewQuestionVioEnd()
})
//click btn previous 
btnPreviousVioEnd.addEventListener('click', () => {
    getPreviousQuestionVioEnd()
})
//click btn sunmission
submissionVioEnd.addEventListener('click', () => {
    modalSubmissionVioEnd.style.display = 'block'
    let countTrue = 0;
    let countFalse = 0;
    let countNotDoing = 0;
    
    availableQuestionsVioEnd.forEach(item => {
        if (String(item.answer) === item.answerChecked) {
            countTrue++;
        } else {
            if (item.answerChecked === "0") {
                countNotDoing++;
            }
            else {
                countFalse++;
            }
        }
    })
    if (countNotDoing != 0) {
        boxSuccessErrorNumberVioEnd.innerHTML = `Có <span class="text-danger">${countNotDoing} câu hỏi</span> chưa trả lời.`;
    } else {
        boxSuccessErrorNumberVioEnd.innerHTML = `Đã hoàn thành <span class="text-success">tất cả câu hỏi</span>.`;
    }
})

showListQuestionNavVioEnd = () => {
    listBtnQuestionNavVioEnd.innerHTML = ""
    availableQuestionsVioEnd.forEach((element, index) => {
        let btnElement = ``
        if (String(element.answerChecked) === "0") {
            btnElement = `<button type="button" class="btn-item-ques-vioend t-bg-secondary" data-index="${index}">${index + 1}</button>`

        }
        else {
           
            let ansNum = String(element.answerChecked)
            let strAnsABCD = ansNum == "1" ? "A" : ansNum == "2" ? "B" : ansNum == "3" ? "C" : "D"
            btnElement = `<button type="button" class="btn-item-ques-vioend t-bg-success" data-index="${index}">${index + 1} ${strAnsABCD}</button>`

        }
        listBtnQuestionNavVioEnd.innerHTML += btnElement
    })
    arrayBtnQuestionVioEnd = Array.from(document.querySelectorAll('.btn-item-ques-vioend'))
    
    arrayBtnQuestionVioEnd.forEach(item => item.addEventListener('click', e => {
        let indexElement = item.dataset.index;
        questionCounterVioEnd = parseInt(indexElement) + 1;
        quesIndexCurrentVioEnd = parseInt(indexElement);

        getCurrentQuestionVioEnd()
    })
)
}
//function close modal submisson
closeModalSubmissonVioEnd = () => {
    modalSubmissionVioEnd.style.display = 'none'
}

iconCloseSubmissionVioEnd.addEventListener('click', () => {
    closeModalSubmissonVioEnd()
})
btnCloseSubmissionVioEnd.addEventListener('click', () => {
    closeModalSubmissonVioEnd()
})

//click btn list question in header
btnListQuestionVioEnd.addEventListener('click', () => {
    showListQuestionNavVioEnd()
})
formatDateTimeToString = () => {
    var date = new Date().toLocaleString('en-US',{hour12:false}).split(" ");
    // Now we can access our time at date[1], and monthdayyear @ date[0]
    var time = date[1];
    var mdy = date[0];

    // We then parse  the mdy into parts
    mdy = mdy.split('/');
    var month = parseInt(mdy[0]);
    var day = parseInt(mdy[1]);
    var year = parseInt(mdy[2]);

    // Putting it all together
    var formattedDate = year + '-' + month + '-' + day + ' ' + time;
    return formattedDate
}
// click  btn Ok in submission
btnOKSubmissionVioEnd.addEventListener('click', () => {
    modalSubmissionVioEnd.style.display = 'none'
    modalResultSubMissionVioEnd.style.display = 'block'
    //stop timer
    clearInterval(counterTime);
  
    //count answer is true
    let countTrue = 0; 
    availableQuestionsVioEnd.forEach(item => {
        if (String(item.answer) === item.answerChecked) {
            countTrue++;
        }
    })
    let sumScore = countTrue * SCORE_POINTS_VIOEND;
    timeFinish = new Date().toLocaleString('en-US',{hour12:false})
    
    formatTimeFinish = formatDateTimeToString()
    
    let sumTime = (Date.parse(formatTimeFinish) - Date.parse(formatTimeStart))/1000;
  
    
    textResultSubMissionVioEnd.innerHTML = `Điểm số: ${sumScore}. Thời gian: ${sumTime} giây.`;
})


btnSubmitExampleVioEnd.addEventListener('click', () => {
    let countTrue = 0; 
    availableQuestionsVioEnd.forEach(item => {
        if (String(item.answer) === item.answerChecked) {
            countTrue++;
        }
    })
    let sumScore = countTrue * SCORE_POINTS_VIOEND; // tong diem
    

    $.ajax({
        type: "POST",
        url: `${urlCurrentVioEnd}`,
        data: {
            'score': sumScore,
            'time_start':formatTimeStart,
            'time_finish':formatTimeFinish
        },
        success: function (response) {
            
            data = response.data_post
            dataHistory = response.list_history
            if(response.status == "Your Post Success Data")
            {
                modalResultSubMissionVioEnd.style.display ='none';
                $('#bg-wrap-vio-end').hide();
                $('#table_result_post tbody').empty();
                var toUTC_timeStart = new Date(data.time_start).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                var toUTC_timeFinish = new Date(data.time_finish).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                let sumTimeResult = (Date.parse(toUTC_timeFinish) - Date.parse(toUTC_timeStart))/1000;
                $('#table_result_post tbody').append(
                        `
                        <tr>
                            <th>1</th>
                            <td>Hoàn thành</td>
                            <td>${data.score}/${SCORE_POINTS_VIOEND*MAX_QUESTION_VIOEND}</td>
                            <td>${sumTimeResult} giây</td>
                            <td>Bắt đầu : ${toUTC_timeStart}<br >Kết thúc : ${toUTC_timeFinish}</td>
                        </tr>
                        `
                )
                //render data history example
                
                $('#table_history_example_vioend tbody').empty();
                for(i = 0; i < dataHistory.length; i++)
                {
                    let toUTC_timeStartHistory = new Date(dataHistory[i].time_start).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                    let toUTC_timeFinishHistory = new Date(dataHistory[i].time_finish).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                    let sumTimeItemHistory = (Date.parse(toUTC_timeFinishHistory) - Date.parse(toUTC_timeStartHistory))/1000;
                    $('#table_history_example_vioend tbody').append(
                        `
                        <tr>
                            <th>${i+1}</th>
                            <td>Hoàn thành</td>
                            <td>${dataHistory[i].score}</td>
                            <td>${i+1}</td>
                            <td>${sumTimeItemHistory} giây</td>
                            <td>Bắt đầu : ${toUTC_timeStartHistory}<br >Kết thúc : ${toUTC_timeFinishHistory}</td>
                        </tr>
                        `
                    )
                }
                //show btn start
                btnStartVioEnd.style.display = 'block'
                //show header start
                $('#header_load_start').show(200);
                $('#wrap_tb_result_vioend').show(500);
            }
        },error:function(error)
        {
            console.log(error)
        }
      });
    
})

textHistoryExampleVioEnd.addEventListener('click',() =>{
    $('#wrap_tb_result_vioend').hide();
    $('#wrap_tb_history_exam_vioend').show(500);
})

/* set up XMLHttpRequest */
fetch(`${urlVioEnd}`).then(function (res) {
    /* get the data */
    if (!res.ok) throw new Error("fetch failed");
    return res.arrayBuffer();
})
    .then(function (ab) {
        /* parse the data when it is received */
        var data = new Uint8Array(ab);
        var workbook = XLSX.read(data, {
            type: "array"
        });

        /* *****************************************************************
        * DO SOMETHING WITH workbook: Converting Excel value to Json       *
        ********************************************************************/
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        var _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        /************************ End of conversion ************************/

        questionsVioEnd = []
        _JsonData.forEach(element => {
            item = {
                question: element.question,
                choice1: element.choice1,
                choice2: element.choice2,
                choice3: element.choice3,
                choice4: element.choice4,
                answer: element.answer
            }
            questionsVioEnd.push(item)
        });
        initViolympicEndCourse()
        getNewQuestionVioEnd()
    });
btnStartVioEnd.addEventListener('click', () => {
    btnStartVioEnd.style.display = "none";
    sniperBoxVioEnd.style.display = "block";
    $('#wrap_tb_result_vioend').hide();
    $('#wrap_tb_history_exam_vioend').hide();
    // table_history_example_vioend
    myVar = setTimeout(showPageVioEndCourse, 2000);
})


function getInitAndNewQuestionVioEnd() {
    return new Promise((resolve, reject) => {
        initViolympicEndCourse();
        getNewQuestionVioEnd();
        resolve();
         
      })    
}


function showPageVioEndCourse() {
    getInitAndNewQuestionVioEnd().then(() => {
        sniperBoxVioEnd.style.display = "none";
        headerLoadStartVioEnd.style.display = "none";
        wrapperAreaBgVioEnd.style.display = "block";
        
        startTimer(30*60, timeCountDownVioEnd)
        timeStart = new Date().toLocaleString('en-US',{hour12:false})
        formatTimeStart = formatDateTimeToString()
        
    })
}