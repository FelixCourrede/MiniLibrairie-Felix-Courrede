export default class Livre {
    constructor(id, titre, quantité, prix) {
      this._id=id;
      this._titre=titre;
      this._quantité=quantité;
      this._prix=prix;
    }
    get titre() {
      return this._titre;
    }
    get quantité() {
      return this._quantité;
    }
    get prix() {
      return this._prix;
    }
  
    // modifier fait / pas fait
    ajouterStock() {
      this._quantité = this._quantité+1;
    }
    // modifier le texte
    supprimerStock() {
      this._quantité = quantité-1;
    }
    afficherTitre(){
        return`${this._titre}`;
    }
    afficherQuantité(){
        return`${this._quantité}`;
    }
    afficherPrix(){ 
       return`${this._prix}`;
    }
    pourAfficher() {
        return `${this._titre} ${this._quantité} ${this._prix}`;
    }
  }