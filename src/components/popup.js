import React, {useState} from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Popup = () => {
    const [popupShow, setPopupShow] = useState(1);
    let popClasses = ['popup', !popupShow ? 'hide' : ''].join(' ');
    const data = useStaticQuery(graphql`
        query {
            shfImage: file(relativePath: { eq: "SHF.jpg" }) {
                childImageSharp {
                    fixed(width: 158, quality: 100) {
                        ...GatsbyImageSharpFixed_tracedSVG
                    }
                }
            }
            
        }
    `)

    const handlePopup = (e) => {
        e.preventDefault();
        setPopupShow(0);
        const popupElem = document.querySelector('.popup');
        popupElem.classList.add('hide');
    }



    return (
        <div className={popClasses}>
            <div className="popup--wrapper">
                <p>In support of</p>
                <Img fixed={data.shfImage.childImageSharp.fixed} alt="In support of Singapore Heart Foundation, Your Heart We Care" />
                <button onClick={handlePopup} tabIndex="0" aria-label="Close Popup"></button>
            </div>      
        </div>
    )
}

export default Popup
