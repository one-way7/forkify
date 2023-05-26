import * as model from '../js/model';
import recipeView from '../js/views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`),
            );
        }, s * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
    try {
        // const id = window.location.has.slice(1);

        recipeView.renderSpinner();

        await model.loadRecipe();

        recipeView.render(model.state.recipe);
    } catch (err) {
        alert(err);
    }
};

controlRecipes();
