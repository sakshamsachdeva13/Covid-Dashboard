import * as actionType from './actionTypes'
import axios from 'axios'

export const setCountriesData = (CountryData) => {


    return {
        type: actionType.SET_COUNTRIES_DETAILS,
        CountryData: CountryData
    }
}


export const updateSearchedCountries = (searchedCountriesData) => {

    return {
        type: actionType.UPDATE_SEARCHED_COUNTRIES,
        SearchedCountries: searchedCountriesData
    }
}

export const autoUpdateCountriesData = () => {
    return dispatch => {
        setInterval(() => {
            axios.get('https://corona.lmao.ninja/v2/countries?sort=country')
                .then(Response => {

                    dispatch(setCountriesData(Response));

                })
                .catch(err => {

                })
        }, 2 * 60 * 60000)

    }

}


export const getCountryWiseData = () => {

    return dispatch => {

        axios.get('https://corona.lmao.ninja/v2/countries?sort=country')
            .then(Response => {

                dispatch(setCountriesData(Response));
                dispatch(autoUpdateCountriesData())
            })
            .catch(err => {

            })
    }
}