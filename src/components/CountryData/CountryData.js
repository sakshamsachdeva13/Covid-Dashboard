
import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Card from '../../hoc/Card/Card'
import classes from './CountryData.module.css'
import Searchbar from '../UI/SearchBar/Searchbar'
import down from '../../assets/images/Down.png'
import Up from '../../assets/images/Up.png'
import * as actions from '../../store/actions/index'



const Country = () => {

 
    const SearchedCountries = useSelector(state => state.countryWiseData.SearchedCountries)
    const AllCountries = useSelector(state => state.countryWiseData.AllCountries)
   
    

    const dispatch = useDispatch();
    const getCountryData = useCallback(() => dispatch(actions.getCountryWiseData()), [dispatch])
    const updateSearchedCountries = (SearchedCountries) => dispatch(actions.updateSearchedCountries(SearchedCountries))
    


    
    useEffect(() => {
        getCountryData()
    }, [getCountryData])




    const OnSearchFilterHandler = (event) => {

        const searchedValue = event.target.value.toLowerCase();
        const currStateData = AllCountries;
        const filteredCountries = currStateData.filter((eachCountry) => {
            const countryName = eachCountry.countryName.toLowerCase();
            return countryName.includes(searchedValue);
        })
        updateSearchedCountries(filteredCountries);
    }




    const CountryWiseData = SearchedCountries.map((eachCountry, i) => {
        return (
            <div key={i} className={classes.eachOuterCard}>
                <Card>
                    <div className={classes.eachCard}>
                        <div className = {classes.Left}>
                            <div className={classes.CountryInfo}>
                                <img className={classes.Img} src={eachCountry.flag} alt="countryflag" />
                                <h4>{eachCountry.countryName}</h4>
                            </div>
                            <div className={classes.Statistics}>
                                <p>{eachCountry.TotalAffected} Affected</p>
                                <p> | </p>
                                <p>{eachCountry.TotalRecovered} Recovered</p>
                            </div>
                        </div>
                        <div className={classes.Arrows}>
                            <img src={eachCountry.todayCases > 0 ? Up : down} />
                        </div>
                    </div>
                </Card>

            </div>)
    })



    return (<div className={classes.CountryDiv}>
        <Card>
            <div className={classes.InnerCard}>
                <div className={classes.searchbar}>
                    <Searchbar searchFilterHandler={OnSearchFilterHandler} />
                </div>
                <div className={classes.CountryList}>
                    {CountryWiseData}
                </div>
            </div>
        </Card>
    </div>)
}


export default Country