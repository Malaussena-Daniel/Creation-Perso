import React, { Component } from 'react';
import TitreH1 from '../../components/Titres/TitresH1';
import Bouton from '../../components/Bouton/Bouton';
import Personnage from './Personnage/Personnage';
import Armes from './Armes/Armes';
import axios from "axios";

class CreateurPersonnage extends Component {
    state ={
        personnage : {
            image : 1,
            force : 0,
            agilite : 0,
            intelligence : 0,
            arme : null
        },
        nbPointsDisponibles : 7,
        armes : null,
        loading : false,
        nom: ""
    }

    componentDidMount = () => {
        this.setState({loading:true});
        axios.get("https://creaperso-fda97-default-rtdb.europe-west1.firebasedatabase.app/armes.json")
                .then(reponse => {
                    const armesArray = Object.values(reponse.data);
                    this.setState({
                        armes:armesArray,
                        loading:false,
                    })
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        loading:false,
                    });
                })
    }

    handleEnleverPoint = (carac) => {
        this.setState((oldstate,props) => {
            if(oldstate.personnage[carac] <= 0 || oldstate.nbPointsDisponibles >= 7) return null;
            const newPointCarac = oldstate.personnage[carac] - 1;
            const newPerso = {...oldstate.personnage};
            const newNbPointsDisponible = oldstate.nbPointsDisponibles + 1;
            newPerso[carac] = newPointCarac;
            return {
                personnage : newPerso,
                nbPointsDisponibles : newNbPointsDisponible
            }
        })
    }

    handleAjouterPoint = (carac) => {
        this.setState((oldstate,props) => {
            if(oldstate.personnage[carac] >= 5 || oldstate.nbPointsDisponibles <= 0) return null;
            const newPointCarac = oldstate.personnage[carac] + 1;
            const newPerso = {...oldstate.personnage};
            const newNbPointsDisponible = oldstate.nbPointsDisponibles - 1;
            newPerso[carac] = newPointCarac;
            return {
                personnage : newPerso,
                nbPointsDisponibles : newNbPointsDisponible
            }
        })
    }

    handleImagePrecedente = () => {
        this.setState(oldstate => {
            const newPersonnage = {...oldstate.personnage}
            if(oldstate.personnage.image <= 1) newPersonnage.image = 3;
            else newPersonnage.image --;
            return {personnage:newPersonnage}
        })
    }

    handleImageSuivante = () => {
        this.setState(oldstate => {
            const newPersonnage = {...oldstate.personnage}
            if(oldstate.personnage.image >= 3) newPersonnage.image = 1;
            else newPersonnage.image ++;
            return {personnage:newPersonnage}
        })
    }

    handleChangeArmePersonnage = (arme) => {
        const newPerso = {...this.state.personnage};
        newPerso.arme = arme;
        this.setState({personnage:newPerso})
    }

    handleReinitialisation = () => {
        this.setState({
            personnage : {
                image : 1,
                force : 0,
                agilite : 0,
                intelligence : 0,
                arme : null
            },
        nbPointsDisponibles : 7,
        armes : ["epee","fleau","arc","hache"],
        nom:""
        })
    }

    handleValidation = () => {
        this.setState({loading:true});
        const player = {
            perso: {...this.state.personnage},
            nom: this.state.nom
        }
        axios.post("https://creaperso-fda97-default-rtdb.europe-west1.firebasedatabase.app/persos.json", player)
                .then(reponse => {
                    console.log(reponse)
                    this.setState({loading:false});
                    this.handleReinitialisation();
                    this.props.refresh();
                })
                .catch(error => {
                    console.log(error)
                    this.setState({loading:false});
                    this.handleReinitialisation();
                })
    }

    render() {
        return (
            <div className="container">
            <TitreH1>Créateur de personnage</TitreH1>
            {
                this.state.loading && <div>Chargement...</div>
            }
            <div className="mb-3">
                <label htmlFor="inputName">Nom: </label>
                <input type="text" className="form-control" id="inputName" value={this.state.nom} onChange={event => this.setState({nom:event.target.value})}/>
            </div>
            <Personnage                
                {...this.state.personnage}
                precedente={this.handleImagePrecedente}
                suivante={this.handleImageSuivante}
                nbPointsDisponibles={this.state.nbPointsDisponibles}
                enleverPoint = {this.handleEnleverPoint}
                ajouterPoint = {this.handleAjouterPoint}
            />
            {
                this.state.armes &&
                <Armes
                    listeArmes = {this.state.armes}
                    changeArme = {this.handleChangeArmePersonnage}
                    currentArme= {this.state.personnage.arme}
                />
            }
            <div className="row no-gutters">
              <Bouton typeBtn="btn-danger" css={"col-6"} clic={this.handleReinitialisation}>Réinitialiser</Bouton>
              <Bouton typeBtn="btn-success" css={"col-6"} clic={this.handleValidation}>Créer</Bouton>
            </div>
          </div>
        );
    }
}

export default CreateurPersonnage;