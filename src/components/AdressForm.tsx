import { useCallback, useState } from "react"

export default function AdressForm(){

    const [inputValue, setInputValue] = useState("")
    const [AdressList, setAdressList] = useState([] as Array<string>) // C'est le tableau affiné (dont certains éléments "label" seront affichés) du tableau features de l'API du gouvernement.

    const [isVisible, setVisible] = useState("false"); // Etat pour faire le toggleClass entre ".show" et ".hide"

const handlerChange = useCallback( async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value) // "e.target.value" récupère la valeur saisie par l'utilisateur dans l'input.
    console.log(e.target.value)

    if(e.target.value.length > 3) { // L'appel à l'API ne se fait pas quand la saisie de l'utilisateur est trop courte.

        //const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port`)
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${e.target.value}`)
        const data = await response.json(); // je transforme toutes mes données en chaine de carractères.
        const adressList = data.features.map( (adresseAPI: any) => 
            adresseAPI.properties.label // Je crée un 2nd tableau "adressList" de même taille que celui de l'API "data" mais en ne gardant que l'adresse du style "8 bb du port".
        );

        setVisible("true");
        setAdressList(adressList); // Je met à jour ma variable de composant "adressList" (pour pouvoir afficher son contenu dans la div).
        
        for (let index = 0; index < adressList.length; index++) {
            console.log("Suggestion d'adresse n°" + index + " : " + adressList[index]);
        }
        
    } else {
        setAdressList([]) // gérer le cas où je dépasse 3 carractères dans l'input puis que j'en efface pour passer en dessous de 3 carractères restants.
        setVisible("false");
    }

  }, [inputValue]) // la fonction handlerChange ne s'execute que lorsque la valeur "inputValue" change.

  const handlerClick = (label:string) => {
    console.log("Label cliqué : " + label)
    setInputValue(label)
    setAdressList([]) // Les propositions sont masquées après avoir cliqué sur l'une d'entre elles.
    setVisible("false")

  }

// La fonction anonyme "() =>" dans l'attribut "onClick" permet de conditionner l'execution du handlerClick lors de l'événement "click" de l'utilisateur. Si le HandlerClick (ou un autre handler) n'a pas d'argument, alors la fonction anomyne n'est pas nécessaire.
return (
    <>
        <div>
            <label htmlFor="adress">Adresse : </label>
            <input name="adress" type="text" onChange={handlerChange} value={inputValue}></input>

            <ul className={isVisible ? "show" : "hide"} >
                {AdressList.map((label) => (
                    <li onClick={() => handlerClick(label)}>{label}</li>
                ))}
            </ul>
        </div>

        
    </>
  )
}



/*

const ProfName = (props) => {
    return (
        <ul>
            {props.names.map((name) => (
                <li>{name}</li>
            ))}
        </ul>
    );
};

*/