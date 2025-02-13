export function request(ctx) {
    const { ingredients = [] } = ctx.args;

    // Construct the prompt with the provided ingredients
    const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(", ")}.`;

    // Return the request configuration
    return {
        resourcePath: `/model/meta.llama3-8b-instruct-v1/invoke`,  // Using Meta Llama 3
        method: "POST",
        params: {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputText: prompt,  // Meta Llama expects inputText
                maxTokens: 500,  // Reduce max tokens to avoid extra cost
            }),
        },
    };
}

export function response(ctx) {
    // Parse the response body
    const parsedBody = JSON.parse(ctx.result.body);
    
    // Extract the text content from the response
    const res = {
        body: parsedBody.generation,  // Meta Llama uses "generation" field
    };

    // Return the response
    return res;
}
