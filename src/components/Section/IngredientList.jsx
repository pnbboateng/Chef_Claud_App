import Recommendations from "./Recommendations"

export default function(props){
    console.log(props.onclick)

    return(
        <div className="get-recipe-container">
            <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients</p>
            </div>
            <div className="button-div">
                <button onClick={props.onclick} className="get-a-recipe" >Get a recipe</button>
            </div>
            


        </div>
    )
}