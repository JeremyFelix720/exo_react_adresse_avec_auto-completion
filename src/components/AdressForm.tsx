import { useCallback, useState } from "react"

export default function AdressForm(){

    const [inputValue, setInputValue] = useState("")

/*
const handlerChange = useCallback(() => {
    const rand = Math.ceil(Math.random()*6)
    props.onRoll(rand); // Pour faire remonter la nouvelle valeur au parent "App".
    setValue(rand) // Toujours modifier la valeur en dernier dans la fonction !
}, [props.onRoll])
*/

const handlerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value) // "e.target.value" récupère la valeur saisir par l'utilisateur dans l'input.
    console.log(e.target.value)
  }, [inputValue])

return (
    <>
        <div>
            <label htmlFor="adress">Adresse : </label>
            <input name="adress" type="text" onChange={handlerChange}></input>
        </div>
    </>
  )
}