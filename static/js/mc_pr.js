function click_audio_mc_pr(text){
    const intParseText = parseInt(text);
    const eText = currentQuestionCompete["question"+intParseText].replaceAll("'","")
    console.log(eText)
    speakerText(eText);
}
