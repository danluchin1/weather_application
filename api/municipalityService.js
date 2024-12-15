import "jsr:@std/dotenv/load";

const huggingFaceApiKey = Deno.env.get("HUGGINGFACE_API_KEY");

const getCityInfo = async (city) => {
    const model = "microsoft/Phi-3-mini-4k-instruct";
    const apiUrl = `https://api-inference.huggingface.co/models/${model}`;

    const prompt = `Make a short description about ${city}, including the most interesting facts.`;

    const data = {
        inputs: prompt,
        options: {
            wait_for_model: true,
        },
    };
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${huggingFaceApiKey}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            const rawText = responseData[0]?.generated_text ||
                "No information available.";
            return cleanGeneratedText(rawText, prompt);
        } else {
            console.error("Error: ", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return "An error occurred.";
    }
};

const cleanGeneratedText = (text, prompt) => {
    // Remove the input prompt from the generated text
    text = text.replace(prompt, "").trim();

    // Clean up unwanted symbols (e.g., ##, extra whitespace)
    text = text.replace(/##+/g, "").replace(/[^\x20-\x7E]+/g, "").trim();

    return text;
};

export { getCityInfo };
