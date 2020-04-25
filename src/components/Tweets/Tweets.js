import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import Card from '../../hoc/Card/Card';
import classes from './Tweets.module.css';
import { FaTwitter } from 'react-icons/fa'

const Tweets = (props) => {


    
    const sources = ["WHO", "timesofindia", "PMOIndia", "realDonaldTrump"]




    const tweets = sources.map((eachTweet, i) => {
        return (<TwitterTimelineEmbed
            key={i}
            sourceType="profile"
            screenName={eachTweet}
            options={{ tweetLimit: 1 }}
            noHeader
            noFooter
            noBorders
        />)
    })




    return (
        <div className={classes.OuterTweetsBox}>
            <Card>
                <h4>Latest tweets <FaTwitter color="#54b5f5" /></h4>
                <div className={classes.InnerTweetBox}>
                    {tweets}
                </div>
            </Card>

        </div>

    )
}



export default Tweets
