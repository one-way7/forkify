export const state = {
    recipe: {},
};

export const loadRecipe = async id => {
    const res = await fetch(
        'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886',
    );

    if (!res.ok) throw new Error(`${res.status}`);

    const data = await res.json();

    const { recipe } = data.data;
    state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
    };
};
