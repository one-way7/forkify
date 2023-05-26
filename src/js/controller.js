import * as model from '../js/model';
import recipeView from '../js/views/recipeView';
import searchView from '../js/views/searchView';
import resultsView from '../js/views/resultsView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
    module.hot.accept();
}

const controlRecipes = async () => {
    try {
        const id = window.location.hash.slice(1);

        recipeView.renderSpinner();

        await model.loadRecipe(id);

        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
    }
};

const controlSearchResults = async () => {
    try {
        resultsView.renderSpinner();

        const query = searchView.getQuery();
        if (!query) return;

        await model.loadSearchResults(query);

        resultsView.render(model.state.search.results);
    } catch (err) {}
};

const init = () => {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
};
init();
