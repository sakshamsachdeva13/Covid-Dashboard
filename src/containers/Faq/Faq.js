import React, { useState } from 'react'
import classes from './Faq.module.css'
import { data } from './staticFaq'

const Faq = () => {


    let initialstate = data.map((o) => {
        return { display: false }
    })

    let [displayArray, setDisplayArray] = useState(initialstate);



    let show = (index) => {
        setDisplayArray((state) => {
            let newstate = [...state];
            newstate[index] = { display: !state[index].display };
            return [...newstate]
        })
    }



    let faqs = data.map((eachEle, i) => {
        return (
            <div key={i} className={classes.eachFaq} >
                <div className={classes.Question}>
                    <h2>{eachEle.question}</h2>
                    <button className={classes.btn} onClick={() => show(i)}>{displayArray[i].display ? "Hide" : "Show"}</button>
                </div>
                <div className={displayArray[i].display ? classes.show : classes.hide}>
                    <p>{eachEle.answer}</p>
                </div>
            </div>
        )
    })



    return (
        <div className={classes.Faq}>
            {faqs}
        </div>
    )
}

export default Faq;
