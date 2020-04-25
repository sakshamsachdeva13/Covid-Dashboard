import * as actionType from '../actions/actionTypes'

const initialState = {
    SearchedCountries: [],
    AllCountries: [],
    MapData: []

}


function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case (actionType.SET_COUNTRIES_DETAILS):

            action.CountryData.data.sort(function (a, b) {
                var keyA = a.cases,
                    keyB = b.cases;
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });

            const OnlyRequiredData = action.CountryData.data.map((eachCountry) => {
                return {
                    TotalAffected: kFormatter(eachCountry.cases),
                    TotalRecovered: kFormatter(eachCountry.recovered),
                    flag: eachCountry.countryInfo.flag,
                    countryName: eachCountry.country,
                    todayCases: eachCountry.todayCases
                }
            })




            const Mapdata = action.CountryData.data.map((eachCountry) => {
                let str = new String(eachCountry.countryInfo.iso2)
                return [str.toLowerCase(), eachCountry.cases]
            })

            return {
                ...state,
                SearchedCountries: OnlyRequiredData,
                AllCountries: OnlyRequiredData,
                MapData: Mapdata
            }


        case (actionType.UPDATE_SEARCHED_COUNTRIES):
            return {
                ...state,
                SearchedCountries: action.SearchedCountries
            }

        default:
            return state
    }


}



export default reducer

