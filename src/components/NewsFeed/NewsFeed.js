import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Personimage from '../../assets/images/newsFeed.png'
import classes from './NewsFeed.module.css'
import Card from '../../hoc/Card/Card'
import { data } from './Local_response'
const NewsFeed = (props) => {


    const constants = {
        HEADLINE: "stay home, stay safe",
        DESCRIPTION: "we'll keep you updated",
        TIMER: 60000,
        URL: 'http://newsapi.org/v2/top-headlines?q=COVID&country=in&apiKey=519fb8fba3fe442ab5bdda7c5a3042ef',
        HLIMIT: 60,
        DLIMIT: 70
    }


    const [newsArticles, setnewsArticles] = useState({
        headline: constants.HEADLINE,
        description: constants.DESCRIPTION,
        ArticleLink: "",
        articleid: 0
    })




    useEffect(() => {
        axios.get(constants.URL)
            .then((Response) => {
                updateNews(Response.data);

                const interval = setInterval(() => {
                    updateNews(Response.data)
                }, constants.TIMER);

                return () => clearInterval(interval);
            })

    }, [])




    const updateNews = (data) => {
        setnewsArticles((state) => {

            const newsContent = { ...data.articles[state.articleid] };

            const headline = newsContent.title != null ?
                newsContent.title.length > constants.HLIMIT ? newsContent.title.slice(0, constants.HLIMIT) : newsContent.title
                : constants.HEADLINE

            const description = newsContent.description != null ?
                newsContent.description.length > constants.DLIMIT ? newsContent.description.slice(0, constants.DLIMIT) : newsContent.description
                : constants.DESCRIPTION

            const pageUrl = newsContent.url;
            let newsArticlesId;
            if (state.articleid <= data.articles.length) {
                newsArticlesId = state.articleid + 1;
            }
            else {
                newsArticlesId = 0
            }
            return { headline: headline, description: description, ArticleLink: pageUrl, articleid: newsArticlesId }
        })
    }



    return (
        <div className={classes.NewsFeed}>
            <Card>
                <div className={classes.title}><span>News and Updates</span></div>
                <div className={classes.Container}>
                    <div className={classes.NewsImage}>
                        <img src={Personimage} alt="news icon" />
                    </div>
                    <div className={classes.Content}>
                        <h2>{newsArticles.headline}...</h2>
                        <p>{newsArticles.description}...</p>
                        <button className={classes.newsButton}><a target="_blank" href={newsArticles.ArticleLink}>Read More..</a></button>
                    </div>
                </div>
            </Card>
        </div>
    )
}



export default NewsFeed