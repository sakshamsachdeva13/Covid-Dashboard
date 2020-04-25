import React from 'react'
import classes from './HelpfulLinks.module.css'
import { data } from './helpfulLinkStatic'
const HelpfulLinks = (props) => {

    const links = data.map((eachLink, i) => {

        return (
            <div key={i} className={classes.linkCard}>
                <a className={classes.link} href={eachLink.link} target="_blank">{eachLink.heading}</a>
            </div>
        )
    })

    return (
        <div className={classes.PageBody}>
            <div className={classes.linkSection}>
                {links}
            </div>
            <div className={classes.Video}>
                <iframe width="800" height="315" src="https://www.youtube.com/embed/Trt7VIMV7jU"
                    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            </div>

        </div>
    )

}

export default HelpfulLinks;