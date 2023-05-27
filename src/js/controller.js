import * as model from '../js/model';
import recipeView from '../js/views/recipeView';
import searchView from '../js/views/searchView';
import resultsView from '../js/views/resultsView';
import paginationView from '../js/views/paginationView';
import bookmarksView from '../js/views/bookmarksView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async () => {
    try {
        const id = window.location.hash.slice(1);

        recipeView.renderSpinner();

        resultsView.update(model.getSearchResultsPage());
        bookmarksView.update(model.state.bookmarks);

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

        controlPagination();
    } catch (err) {}
};

const controlPagination = (goToPage = 1) => {
    resultsView.render(model.getSearchResultsPage(goToPage));

    paginationView.render(model.state.search);
};

const controlServings = newServing => {
    model.updateServings(newServing);

    recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
    if (!model.state.recipe.bookmarked) {
        model.addBookmark(model.state.recipe);
    } else {
        model.deleteBookmark(model.state.recipe.id);
    }

    recipeView.update(model.state.recipe);

    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
    bookmarksView.render(model.state.bookmarks);
};

const init = () => {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();
