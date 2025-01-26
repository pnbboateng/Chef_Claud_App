


export default function Recommendations(props){
    console.log(props)
    const { recipeDetails } = props;
    return(
        <section className="suggested-recipe-container">
    <h2>Chef Claude Recommends:</h2>
    {recipeDetails ? <p>{recipeDetails}</p> : <p>Fetching recipe...</p>}
    
</section>
    )
}