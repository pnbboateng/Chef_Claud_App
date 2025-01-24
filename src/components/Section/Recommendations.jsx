


export default function Recommendations(props){
    console.log(props)
    const { recipeDetails } = props;
    return(
        <section>
    <h2>Chef Claude Recommends:</h2>
    {recipeDetails ? <p>{recipeDetails}</p> : <p>No recipe available</p>}
    
</section>
    )
}