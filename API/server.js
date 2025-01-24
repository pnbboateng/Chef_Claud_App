import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

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
                messages: [
                    { role: "system", content: "You are an AI chef that provides recipes..." },
                    { role: "user", content: `I have ${ingredients.join(", ")}. What can I make?` }
                ],
                max_tokens: 1024,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ recipe: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ error: "Failed to fetch recipe" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));