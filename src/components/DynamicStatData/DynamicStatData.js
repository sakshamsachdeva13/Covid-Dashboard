import React, { useEffect, useCallback } from 'react'
import Card from '../../hoc/Card/Card'
import classes from './DynamicStateData.module.css';
import Up from '../../assets/images/Up.png'
import Down from '../../assets/images/Down.png'
import { useSelector, useDispatch } from 'react-redux'
import { Area, AreaChart, Tooltip, XAxis } from 'recharts'
import * as actions from '../../store/actions/index'
const DynamicStatData = (props) => {

    // const [statData, setStateData] = useState({});
    const statData = {
        TotalCases: useSelector(state => state.TotalStat.TotalCases),
        ActiveCases: useSelector(state => state.TotalStat.ActiveCases),
        Recovered: useSelector(state => state.TotalStat.Recovered),
        Deaths: useSelector(state => state.TotalStat.Deaths),

    }
    const timelineData = useSelector(state => state.SpreadTrends.GraphData);

    const slicedData = timelineData.slice(-10)

    const editedData = slicedData.map((o) => {

        return {
            date: o.date,
            TotalCases: o.Affected,
            Recovered: o.Recovered,
            Deaths: o.Deaths,
            ActiveCases: o.Affected - (o.Recovered + o.Deaths)
        }
    })



    const dispatch = useDispatch();
    const getAllStats = useCallback(() => dispatch(actions.getAllStats()), [dispatch]);

    useEffect(() => {
        getAllStats()

    }, [getAllStats])

    const renderState = Object.keys(statData)
    const dailyCasereport = renderState.map((eachstate, i) => {
        const lastDateData = { ...editedData[editedData.length - 1] }
        const lastDateData_2 = { ...editedData[editedData.length - 2] }
        const lastDateData_3 = { ...editedData[editedData.length - 3] }
        const arrowstatus = (lastDateData[eachstate] - lastDateData_2[eachstate]) - (lastDateData_2[eachstate] - lastDateData_3[eachstate])

        if (eachstate !== "difference")
            return (
                <div key={i} className={classes.eachCard}>

                    <Card>
                        <div className={classes.dailyCasereport}>
                            <div>
                                <p>{eachstate} <img src={arrowstatus > 0 ? Up : Down} /></p>
                                <h3>{statData[eachstate]}</h3>

                            </div>
                            <div className={classes.Graph}>

                                <AreaChart width={72} height={60} data={editedData}>
                                    <Tooltip viewBox={{ width: 100, height: 100 }} />
                                    <defs>
                                        <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#06BA90" stopOpacity={0.8} />
                                            <stop offset="60%" stopColor="#06BA90" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#FF6C75" stopOpacity={0.8} />
                                            <stop offset="60%" stopColor="#FF6C75" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="linear"
                                        dataKey={eachstate}
                                        stroke={eachstate === "Recovered" ? "#06BA90" : "#FF6C75"}
                                        strokeWidth={3}
                                        dot={false}
                                        fill={
                                            eachstate === "Recovered"
                                                ? "url(#colorGreen)"
                                                : "url(#colorRed)"
                                        }
                                    />
                                    <XAxis dataKey="date" hide={true} />
                                </AreaChart>
                            </div>
                        </div>
                    </Card>

                </div>
            )
    })

    return (
        <div className={classes.dailyCasereportSection}>{dailyCasereport}</div>
    )
}


export default DynamicStatData