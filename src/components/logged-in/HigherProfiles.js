import React from 'react';
import HigherArtists from "./HigherArtists.js"
import { db } from "../../config/fbConfig.js";
import {Card, CardTitle, CardText, Media, MediaOverlay } from 'react-md';

const HigherProfiles = () => {
 
    
    
    function renderProfile(doc)
    {
        <Card className="cards__example md-cell md-cell--6 md-cell--8-tablet">
                    <Media>
                        <img src={me} alt="Nature from lorempixel" className="me1"/>
                    
                    </Media>
                    <CardText>
                        <p> { doc.username }</p>
                    <p>
                        {doc.profession1}/ {doc.profession2}
                    </p>

                    <p>
                        3 mi
                    </p>
                    </CardText>
            </Card>
    }
    
    
    
    db.collection("users").where("address", "==", "boston").get().then((snapshot) => {
        snapshot.docs.forEach( doc => {
            renderProfile(doc)}
            )
    });


    const higherArtists = numbers.map((number) =>
        <li>{number}</li>
    );
    
    return (
            
             <ul>higherArtists</ul>
    )
    
}

export default HigherProfiles;