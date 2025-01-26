import "./Section.css"
import React from "react"
import Recommendations from "./Recommendations"
import IngredientList from "./IngredientList"
import { getRecipeFromMistral } from "../../ai"

export default function Section(){
    
    const[addIngredient, setAddIngredient] = React.useState([])
    const[isShown, setIsShown] = React.useState(false)
    const [recipe, setRecipe] = React.useState("") 

    const ingredientListItems = addIngredient.map(ingredient => (
        
        
        <li className="ingredient" key={ingredient}>{ingredient}</li>
        
    ))
    
  

    function handleClick(event){
        event.preventDefault()
        console.log("Form submitted")
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("form-input").trim()
        if(newIngredient){      
        console.log(newIngredient)

        setAddIngredient(prevAddIngredient => [...prevAddIngredient, newIngredient])
    }
    event.target.reset()
    }


    async function handleRecipe(){
        setIsShown(true) 
        try {
            const recipeResponse = await getRecipeFromMistral(addIngredient)
            console.log("API Response:", recipeResponse);
            setRecipe(recipeResponse[0].generated_text) 
        } catch (error) {
            console.error("Error fetching recipe:", error)
        }
    }
      

    return(
        <main>
        <form onSubmit={handleClick}>
            <input type="text" placeholder="e.g oregano" aria-label="Add ingredient" name="form-input"></input>
            <button type="submit"> + Add ingredient</button>
        </form>
        
        {addIngredient.length > 0 &&<article>
            <h2>Ingredients on hand:</h2>
        <ul>
            {ingredientListItems}
        </ul>

        {addIngredient.length > 3 && <IngredientList onclick={handleRecipe}/>}
        {isShown === true && addIngredient.length > 3 && <Recommendations recipeDetails={recipe}/>}
        </article>}
        
        
        
        </main>
    )
}