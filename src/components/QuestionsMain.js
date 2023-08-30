import React, { useEffect, useState } from 'react'
import data from './data'
// import './question.css'

const QuestionsMain = () => {
    console.log("Data", data)
    const [qno, setqno] = useState(0)
    const [qn, setQn] = useState('')
    const [options, setOptions] = useState([])
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
    }, [qno])

    
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
                                        <div>
                                            <span className='text-white'>{optItem?.label}</span>
                                        </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionsMain