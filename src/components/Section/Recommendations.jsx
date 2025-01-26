import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Recommendations(props) {
    const { recipeDetails } = props;
    const [visibleLines, setVisibleLines] = useState([]);

    useEffect(() => {
        if (recipeDetails) {
            const lines = recipeDetails.split("\n"); // Split text into lines
            setVisibleLines([]); // Reset previous state
            let index = 0;

            const interval = setInterval(() => {
                if (index < lines.length) {
                    setVisibleLines(prevLines => [...prevLines, lines[index]]);
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 500); // Adjust speed (in milliseconds) for rollout effect

            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [recipeDetails]);

    return (
        <section className="suggested-recipe-container">
            <h2>Chef Claude Recommends:</h2>
            {visibleLines.length > 0 ? (
                <ReactMarkdown>{visibleLines.join("\n")}</ReactMarkdown> // Join visible lines back together
            ) : (
                <p>Fetching recipe...</p>
            )}
        </section>
    );
}
