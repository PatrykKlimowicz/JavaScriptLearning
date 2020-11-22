import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import { MODAL_HIDE_TIMEOUT_SEC } from "./config.js";

import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

const controlRecipes = async function () {
    try {
        // get recipe id
        const id = window.location.hash.slice(1);
        if (!id) return;

        // render loadig spinner
        recipeView.renderSpinner();

        // mark current opened recipe as active
        resultsView.update(model.getSearchResultsPage());

        // mark current recipe that is in bookmark list as active in that list
        bookmarksView.update(model.state.bookmarks);

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
    // Add or remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    // update UI
    recipeView.update(model.state.recipe);

    // render bookmarks
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

const cotrolAddRecipe = async function (newRecipe) {
    try {
        await model.uploadRecipe(newRecipe);

        // render newly added recipe
        recipeView.render(model.state.recipe);

        // show success message
        addRecipeView.renderMessage();

        // hide the form
        setTimeout(function () {
            addRecipeView.toggleWindow();
        }, MODAL_HIDE_TIMEOUT_SEC * 1000);
    } catch (error) {
        addRecipeView.renderError(error.message);
    }
};

// Publisher - subscriber pattern. Nicely connect view and controller
const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerBookamrk(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlChangePage);
    addRecipeView.addHandlerUpload(cotrolAddRecipe);
};
init();
