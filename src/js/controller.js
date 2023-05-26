import * as model from '../js/model';
import recipeView from '../js/views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
    try {
        recipeView.renderSpinner();

        await model.loadRecipe();

        recipeView.render(model.state.recipe);
    } catch (err) {
        alert(err);
    }
};

const init = () => {
    recipeView.addHandlerRender(controlRecipes);
};
init();
