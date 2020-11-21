import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";

import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

const controlRecipes = async function () {
    try {
        // render loadig spinner
        recipeView.renderSpinner();

        // get recipe id
        const id = window.location.hash.slice(1);

        if (!id) return;

        // mark current opened recipe as active
        resultsView.update(model.getSearchResultsPage());

        // load recipe
        await model.loadRecipe(id);
        let { recipe } = model.state;

        // render recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
        // render spinner
        resultsView.renderSpinner();

        // obtain query
        const query = searchView.getQuery();
        if (!query) return;

        // search if query is valid
        await model.loadSearchResults(query);

        // render first page of results
        resultsView.render(model.getSearchResultsPage());

        // render pagination buttons
        paginationView.render(model.state.search);
    } catch (error) {}
};

const controlChangePage = function (page) {
    // render new page of results
    resultsView.render(model.getSearchResultsPage(page));

    // render new pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = function (numServings) {
    // Update recipe servings (in state)
    model.updateServings(numServings);

    // Update the recipe view
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
    // Add or remove bookmarks
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    // update UI
    recipeView.update(model.state.recipe);
};

// Publisher - subscriber pattern. Nicely connect view and controller
const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerBookamrk(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlChangePage);
};
init();
