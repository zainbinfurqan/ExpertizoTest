import React, { Component } from 'react';
import './QuestionPaper.css'
import QuestionPaperData from '../questions.json'
export default class QuestionPaperCom extends Component {
    constructor() {
        super()
        this.state = {
            questionNo: 10,
            questionData: QuestionPaperData,
            correctAns: 6,
            incorrectAns: 3,
            maxScore: 100,
            questionAttemp: 9,
            // questoinRemaning: QuestionPaperData.length,
            currentScore: 0,
            expectedRemaningCorrectScore: 0,
            expectedRemaningWrongScore: 0,
            remaningQuestion: 11,

        }
    }


    getRateFN = (ind) => {
        // let val_ = questionData[ind].difficulty
        // let status = val_ == "hard" ? 3 : val_ == "medium" ? 2 : 1


        // for (var i = 1; i <= 5; i++) {

        // }
        // return (
        //     < div > </div>
        // )
    }
    checkAnswer(ans) {
        let { questionNo,
            questionData,
            correctAns,
            questionAttemp,
            incorrectAns,
            currentScore,
            remaningQuestion } = this.state;
        console.log(questionNo, questionData.length - 1)
        if (questionNo != questionData.length - 1) {
            if (questionData[questionNo].correct_answer == ans) {
                this.setState({
                    questionNo: questionNo + 1,
                    correctAns: correctAns + 1,
                    questionAttemp: questionAttemp + 1,
                    remaningQuestion: remaningQuestion - 1
                })
            } else {
                this.setState({
                    questionNo: questionNo + 1,
                    // correctAns: correctAns + 1,
                    incorrectAns: incorrectAns + 1,
                    questionAttemp: questionAttemp + 1,
                    remaningQuestion: remaningQuestion - 1
                })
            }
        } else {

        }
    }



    boolenQue = () => {
        return (
            <>
                <div>
                    <button onClick={() => this.checkAnswer("True")}>
                        True
                        </button>
                    <button onClick={() => this.checkAnswer("False")}>
                        False
                        </button>
                </div>
            </>
        )
    }

    multiQue = (wrongAnsData, rightAns) => {
        let strFor_2 = rightAns.split("%20").join(" ")
        return (
            <>
                <div className='row'>
                    <div className='col-6  mt-5'>
                        <button onClick={() => this.checkAnswer(rightAns)}>
                            {strFor_2}
                        </button>
                    </div>
                    {wrongAnsData.map(itm => {
                        strFor_2 = itm.split("%20").join(" ").split("%2C").join(" ")
                        return (
                            <>
                                <div className='col-6 mt-5'>
                                    < button onClick={() => this.checkAnswer(itm)}>
                                        {strFor_2}
                                    </button>
                                </div>
                            </>
                        )
                    })}
                </div>
            </>
        )
    }

    render() {
        let { questionNo, questionData, incorrectAns, maxScore, correctAns, questionAttemp, remaningQuestion } = this.state;
        let str = questionData[questionNo == 1 ? 0 : questionNo].question.split("%20").join(" ").split("%27").join(" ").split("%3A").join(" ").split("%22").join(" ").split("%2").join(" ").split("%3F").join(" ");
        questionAttemp = questionNo - 1
        console.log(correctAns, incorrectAns, questionNo, questionAttemp)
        let currentScore = (correctAns / questionNo) * 100
        let expectedRemaningCorrectScore = ((correctAns + remaningQuestion) / questionData.length) * 100
        let expectedRemaningWrongScore = (correctAns / questionData.length) * 100
        return (
            <>
                <div className="container-fluid">
                    <div className='question-panel'>

                        <div className='header-progressbar' style={{
                            height: 10, backgroundColor: 'red',
                            width: `${(questionNo / (questionData.length)) * 100}%`
                        }}>

                        </div>
                        <div className="question_text w-75 mt-5 ">
                            <h1>Question {questionNo == 1 ? 1 : questionNo} of {questionData.length}</h1>
                            <p>{questionData[questionNo == 1 ? 0 : questionNo].category.split("%20").join(" ").split("%3A").join(" ")}</p>
                            <p>{}</p>
                        </div>
                        <div>
                            <p>{str}</p>
                            {/* <p>{str.split("%20").join(" ").split("%27").join(" ").split("%3A").join(" ").split("%22").join(" ").split("%2").join(" ")}</p> */}
                        </div>
                        <div>
                            {questionData[questionNo].type == "multiple" ?
                                this.multiQue(questionData[questionNo == 1 ? 0 : questionNo].incorrect_answers,
                                    questionData[questionNo == 1 ? 0 : questionNo].correct_answer) :
                                this.boolenQue(questionData[questionNo == 1 ? 0 : questionNo].incorrect_answers,
                                    questionData[questionNo == 1 ? 0 : questionNo].correct_answer)}
                        </div>
                        <div className='bottom-progressbar'>
                            <div className='d-flex '>
                                <p className='mr-auto p-2' >current Score{currentScore}%</p>
                                <p className='' > expected Score{expectedRemaningCorrectScore}%</p>
                            </div>
                            {/* <p className='d-flex  justify-content-end'>Max Score{maxScore}%</p> */}
                            {/* <p className='d-flex justify-content-start'>{(correctAns && questionAttemp) == 0 ? '0' : (correctAns / questionAttemp) * 100}</p> */}

                            <div>
                                <div className='' style={{ height: 20, backgroundColor: 'blue', width: `${expectedRemaningWrongScore}%` }}></div>
                                <div className='' style={{ height: 20, backgroundColor: 'red', width: `${currentScore}%` }}></div>
                                <div className='' style={{ height: 10, backgroundColor: 'green', width: `${expectedRemaningCorrectScore}%` }}></div>

                            </div>

                        </div>
                    </div>
                </div>


            </>
        )
    }
}