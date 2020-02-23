import React, { Component } from 'react';
import './QuestionPaper.css'
import QuestionPaperData from '../questions.json'
export default class QuestionPaperCom extends Component {
    constructor() {
        super()
        this.state = {
            questionNo: 10,
            questionData: QuestionPaperData,
            correctAns: 0,
            incorrectAns: 0,
            maxScore: 100,
            questionAttemp: 0,
            questoinRemaning: QuestionPaperData.length
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
        let { questionNo, questionData, correctAns, questionAttemp } = this.state;
        console.log(questionNo, questionData.length -1)
        if (questionNo != questionData.length-1) {
            if (questionData[questionNo].correct_answer == ans) {
                console.log(questionNo++)
                this.setState({
                    questionNo: questionNo++,
                    correctAns: correctAns++,
                    questionAttemp: questionAttemp++
                })
            } else {
                console.log("wrong")
            }
        } else {

        }
        // questionData[questionNo].correct_answer == ans ?
        //     console.log(questionNo++) : console.log("wrong")
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
                <div>
                    <button onClick={() => this.checkAnswer(rightAns)}>
                        {strFor_2}
                    </button>
                    {wrongAnsData.map(itm => {
                        strFor_2 = itm.split("%20").join(" ").split("%2C").join(" ")

                        return (
                            <>
                                < button onClick={() => this.checkAnswer(itm)}>
                                    {strFor_2}
                                </button>
                            </>
                        )
                    })}
                </div>
            </>
        )
    }

    render() {
        let { questionNo, questionData, maxScore, correctAns, questionAttemp } = this.state;
        let str = questionData[questionNo == 1 ? 0 : questionNo].question;
        return (
            <>
                <div className="">
                    <div className='header-progressbar' style={{
                        height: 10, backgroundColor: 'red',
                        width: `${(questionNo / (questionData.length)) * 100}%`
                    }}>

                    </div>
                    <div className="question_text w-75 ">
                        <h1>Question {questionNo == 1 ? 1 : questionNo} of {questionData.length}</h1>
                        <p>{questionData[questionNo == 1 ? 0 : questionNo].category}</p>
                        <p>{}</p>
                    </div>
                    <div>
                        <p>{str.split("%20").join(" ").split("%27").join(" ").split("%3F").join(" ").split("%22").join(" ").split("%2").join(" ")}</p>
                    </div>
                    <div>
                        {questionData[questionNo].type == "multiple" ?
                            this.multiQue(questionData[questionNo == 1 ? 0 : questionNo].incorrect_answers,
                                questionData[questionNo == 1 ? 0 : questionNo].correct_answer) :
                            this.boolenQue(questionData[questionNo == 1 ? 0 : questionNo].incorrect_answers,
                                questionData[questionNo == 1 ? 0 : questionNo].correct_answer)}
                    </div>
                </div>
                <div className='bottom-progressbar d-flex flex-row"'>
                    <p className='d-flex justify-content-start'>{(correctAns && questionAttemp) == 0 ? '0' : (correctAns / questionAttemp) * 100}</p>
                    <p className='d-flex  justify-content-end'>Max Score{maxScore}%</p>

                </div>

            </>
        )
    }
}