import * as actionType from './actionTypes'
import axios from 'axios'


export const setAllStats = (StatisticalData) => {

    return {
        type: actionType.SET_STAT_DATA,
        StatisticalData: StatisticalData
    }

}


export const autoupdateStat = () => {

    return dispatch => {
        setInterval(() => {
            axios.get('https://corona.lmao.ninja/v2/all')
                .then(Response => {

                    dispatch(setAllStats(Response));
                })
        }, 5 * 60000)

    }
}


export const getAllStats = () => {

    return dispatch => {

        axios.get('https://corona.lmao.ninja/v2/all')
            .then(Response => {

                dispatch(setAllStats(Response));
                dispatch(autoupdateStat());
            })
    }
}
