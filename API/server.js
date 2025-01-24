import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: '../.env' });

const apiKey = process.env.HUGGINGFACE_API_KEY;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/get-recipe", async (req, res) => {
    const { ingredients } = req.body;

    if (!ingredients || ingredients.length === 0) {
        return res.status(400).json({ error: "No ingredients provided" });
    }

    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
            {
                inputs: `I have ${ingredients.join(", ")}. What can I make?`,
                parameters: { max_tokens: 512 },
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("API Response:", response.data); // Inspect structure

        res.json({ recipe: response.data });
    } catch (error) {
        console.error("Error fetching recipe:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch recipe" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
