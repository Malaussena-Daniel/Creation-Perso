import React from "react";
import ImagePerso1 from "../../../../assets/images/persos/player1.png";
import ImagePerso2 from "../../../../assets/images/persos/player2.png";
import ImagePerso3 from "../../../../assets/images/persos/player3.png";

import classes from "./ImagePerso.module.css"

const imagePerso = (props) => {
    let imageToPrint="";
    if(props.numImage === 1) imageToPrint = ImagePerso1;
    else if(props.numImage === 2) imageToPrint = ImagePerso2;
    else if(props.numImage === 3) imageToPrint = ImagePerso3;

    return (        
        //.join permet de joindre des classes CSS de maniere dynamique par un espace (par exemple) pour eviter de créer des constantes affin d'appeller les classes
        <div className="row no-gutters text-center align-items-center"> 
            <div className={["col-1",classes.fleche,classes.gauche].join(" ")} onClick={props.flecheGauche}></div>
            <div className="col">
            <img src={imageToPrint} alt="perso" /></div>
            <div className={["col-1",classes.fleche,classes.droite].join(" ")} onClick={props.flecheDroite}></div>
        </div>
    );
};

export default imagePerso;