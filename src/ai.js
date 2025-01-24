import { HfInference } from '@huggingface/inference'

const accessToken = import.meta.env.VITE_ACCESS_TOKEN

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

const hf = new HfInference(accessToken)

export async function getRecipeFromMistral(ingredientsArr) {
    try {
        const response = await fetch("http://localhost:5000/api/get-recipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        });

        if (!response.ok) throw new Error("Failed to fetch recipe");

        const data = await response.json();
        return data.recipe;
    } catch (err) {
        console.error("Error:", err);
        return "Could not fetch recipe. Try again.";
    }
}

