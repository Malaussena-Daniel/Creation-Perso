import React, { Component } from 'react';
import axios from 'axios';
import Titre from "../../components/Titres/TitresH1";
import Personnage from "./Personnage/Personnage";

class ListePersonnage extends Component {
    state = {
        personnages : null,
        loading: false
    }

    //La fonction "loadData" a été créée pour que lorsque l'on créer un nouveau personnage,
    //celui-ci soit afficher directement dans la liste des personnages sans avoir à rafraichir la page,
    //car celle-ci sera automatiquement rafraichit à l'aide de la fonction "componentDidUpdate".
    loadData = () => {
        this.setState({loading:true});
        axios.get("https://creaperso-fda97-default-rtdb.europe-west1.firebasedatabase.app/persos.json")
                .then(reponse => {
                    const personnages = Object.values(reponse.data);
                    this.setState({
                        personnages,
                        loading:false
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({loading:false})
                })
    }

    componentDidMount = () => {
        this.loadData();
    }

    componentDidUpdate = (oldProps, oldstate) => {
        if(oldProps.refresh !== this.props.refresh) {
            this.loadData();
        }
    }

    render() {
        return (
            <>
                {this.state.loading && <div>Chargement...</div>}
                {!this.state.loading && this.state.personnages &&
                    <div className="row no-gutters">
                        {this.state.personnages.map((perso,indice) => {
                            return (
                                <div className="col-6" key={indice}>
                                    <Titre>{perso.nom}</Titre>
                                    <Personnage {...perso.perso}/>
                                </div>
                            );
                        })}
                    </div>
                }
            </>
        );
    }
}

export default ListePersonnage;