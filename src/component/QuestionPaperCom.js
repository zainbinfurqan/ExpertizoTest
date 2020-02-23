import React, { Component } from 'react';
import './QuestionPaper.css'
import QuestionPaperData from '../questions.json'
export default class QuestionPaperCom extends Component {
    constructor() {
        super()
        this.state = {
            questionNo: 1,
            questionData: QuestionPaperData,
            correctAns: 0,
            incorrectAns: 0,
            maxScore: 100,
            questionAttemp: 0,
            questoinRemaning: QuestionPaperData.length
        }
    }
    componentDidMount() {
        let { questionNo, questionData } = this.state;
        console.log(QuestionPaperData)
        // let data = JSON.parse(QuestionPaperData);
        console.log(questionData.length)
        console.log(questionNo)
        console.log((questionNo / (questionData.length)) * 100)
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

    boolenQue = (type = 'boolen') => {
        if (type = 'boolen') {
            return (
                <>
                    <div>
                        <button>
                            True
                        </button>
                        <button>
                            False
                        </button>
                    </div>
                </>
            )
        }
    }

    multiQue = (type, wrongAnsData, rightAns) => {
        if (type = 'multiple') {
            return (
                <>
                    <div>
                        <button>
                            {rightAns.split("%20").join(" ")}
                        </button>
                        {wrongAnsData.map(itm => {
                            return (
                                <button>
                                    {itm.split("%20").join(" ")}
                                </button>
                            )
                        })}
                    </div>
                </>
            )
        }
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
                        {/* <p>{questionData[questionNo == 1 ? 0 : questionNo].question}</p> */}
                        <p>{str.split("%20").join(" ").split("%27").join(" ").split("%3F").join(" ")}</p>
                    </div>
                    <div>
                        {questionData[questionNo].type == "multiple" ?
                            this.multiQue("multiple", questionData[questionNo == 1 ? 0 : questionNo].incorrect_answers,
                                questionData[questionNo == 1 ? 0 : questionNo].correct_answer) :
                            this.boolenQue("multiple")}
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