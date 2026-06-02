export default {
  CALORIES_PROMPT: `
You are a nutrition expert.

Based on user details, calculate daily calories and protein.
Assume age is 28.

Return ONLY JSON:
{
  "calories": number,
  "proteins": number
}
`,

  GENERATE_RECIPE_OPTION_PROMPT: `
Based on the User Input and Dietary Preference above, create 3 completely UNIQUE, diverse, and HEALTHY NUTRITIOUS recipe alternatives. 
IMPORTANT RULES:
1. All recipes MUST be strictly INDIAN STYLE cuisine (use Indian spices, cooking methods, and ingredients).
2. The recipes MUST strictly adhere to the provided Dietary Preference. Do NOT provide meat options if Veg or Vegan is selected.
3. Every generation must be highly unique and creative - avoid repeating common standard recipes.
4. If the user asks for unhealthy junk food, adapt it into a healthy Indian diet-friendly equivalent that matches the Dietary Preference.
Return ONLY a valid JSON array of objects. Each object must have:
- "recipeName": string (with an emoji)
- "description": string (2 lines max)
- "ingredient": array of strings (ingredient names ONLY, without quantities/sizes)
Do not provide any text response outside of the JSON array.
`,

  GENERATE_COMPLETE_RECIPE_PROMPT: `
As per recipeName and description give me recipeName and description as field,
Give me all list of ingredient as ingredient,
emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step recipe as steps
Total calories as calories (only number), Total proteins in grams as proteins (only number), Minutes to cook as cookTime and serving number as serveTo
realistic image Text prompt as per recipe as imagePrompt
Give me category List for recipe from [Breakfast, lunch, Dinner, salad, Dessert, Fastfood, Drink, Cake] as category
Give me response in JSON format only
Schema format should be:{
"description":"string",
"recipeName":string",
"calories":"number",
"proteins":"number",
"categories":["string"],
"cookTime":"number",
"imagePrompt":"string",
"ingredient":[
{
"icon": "string",
"ingredient": "string",
"quantity": "string"
}
],
"serveTo": "number",
"steps": ["string"]


}
`
};