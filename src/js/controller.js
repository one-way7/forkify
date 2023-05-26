import * as model from '../js/model';
import recipeView from '../js/views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async () => {
    try {
        recipeView.renderSpinner();

        await model.loadRecipe();

        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
    }
};

const init = () => {
    recipeView.addHandlerRender(controlRecipes);
};
init();
