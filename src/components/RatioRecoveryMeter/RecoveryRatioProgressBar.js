import React from 'react'
import classes from './RecoveryProgressBar.module.css'
import Card from '../../hoc/Card/Card'
import { useSelector } from 'react-redux'
const RecoveryBar = (props) => {

    const percentage = useSelector(state => state.TotalStat.percentage);
    const statData = useSelector(state => state.TotalStat.RFormatted);
    const Cases = useSelector(state => state.TotalStat.TCFormatted);



    const percent = 565 - (565 * percentage) / 100;


    return (
        <div className={classes.pt}>
            <Card>
                <h4>Ratio of Recovery</h4>
                <div className={classes.ProgressBar}>
                    <svg className={classes.ProgressSvg}>
                        <defs>
                            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="10%" stopColor="#06BA90" />
                                <stop offset="90%" stopColor="#BAFAEB" />
                            </linearGradient>
                        </defs>
                        <circle className={classes.ProgressBar_path} cx="50%" cy="50%" r="90px"></circle>
                        <circle className={classes.ProgressBar_thumb} style={{ strokeDashoffset: percent, stroke: "url('#linear')" }}
                            cx="50%" cy="50%" r="90px"></circle>
                    </svg>
                    <div className={classes.AnalogData}>{percentage}%</div>
                </div>
                <div className={classes.Statistics}>
                    <p>{Cases} Affected</p>
                    <p>|</p>
                    <p>{statData} Recovered</p>
                </div>
            </Card>
        </div>
    )
}

export default RecoveryBar 