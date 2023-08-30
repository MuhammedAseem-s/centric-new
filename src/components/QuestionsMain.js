import React, { useEffect, useState } from 'react'
import data from './data'

const QuestionMain = () => {
    console.log("Data", data)
    const [qno, setqno] = useState(0)
    const [qn, setQn] = useState('')
    const [options, setOptions] = useState([])
    const [visibility, setVisiblility] = useState(null)
    const [isCorrect, setIscorrect] = useState({
        Status: ''
    })

    console.log("render check")

    function fetchQns(nos) {

        setQn(data[nos].question) //statefunc  to set questions
        setOptions(data[qno].options) // state func to set options to questions
    }
    let finalData = []

    useEffect(() => {
        if (qno < data.length) {
            fetchQns(qno) // function to set data to local state
        }
        else {
            setqno(0) //once all qns are covered this function rstarts to first qns that is id:0
        }
        setIscorrect({
            // modalOpen: false,
            Status: ''
        } 

        )
        setVisiblility(null)
    }, [qno])


    function checkAnswer(dt) {
        if (dt?.isCorrect) {
            setVisiblility(true)
            setIscorrect({
                // modalOpen: true,
                Status: 'CORRECT'
            }
            )
        }
        else {
            setIscorrect({
                // modalOpen: true,
                Status: 'WRONG'
            }
            )
            setVisiblility(true)
            let tempdata = [...data] //duplication of data 
            const Index = tempdata[qno].options?.findIndex((itemId)=> itemId?.id === dt?.id)
            finalData = tempdata[qno].options.map((item)=>
            item.id === Index ? (
                {
                    id : item?.id,
                    label : item?.label,
                    isCorrect : true
                } 
            ) : 
            (
                    {
                        id : item?.id,
                        label : item?.label,
                        isCorrect : false
                    } 
            )

            )
            setOptions(finalData)
        }
        setTimeout(() => {
            setqno(qno + 1)
        }, 3000);
    }

    return (
        <div>
            <div>

            </div>
            <div className='bg-purple-900'>
                <div className='flex flex-wrap flex-col items-center'>
                    <p className='text-white font-black  pt-[7rem] p-4'>{qn}</p>
                    <div>
                        {
                            options.length > 0 && options.map((optItem) => {
                                 console.log("Optitme",optItem)
                                return (
                                        <div className= 'bg-blue-800 h-[300px] w-[300px] flex items-center justify-center card-item' style={visibility && !optItem.isCorrect ? { visibility: 'hidden' } :  { visibility: 'visible' }  } onClick={() => checkAnswer(optItem)}>
                                            <span className='text-white'>{optItem?.label}</span>
                                        </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    <div>
                        {isCorrect?.Status}
                    </div>
                }
            </div>
        </div>
    )
}

export default QuestionMain