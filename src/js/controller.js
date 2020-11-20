import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import searchView from "./views/searchView.js";

const controlRecipes = async function () {
    try {
        // render loadig spinner
        recipeView.renderSpinner();

        // get recipe id
        const id = window.location.hash.slice(1);

        if (!id) return;
        // test id: 5ed6604591c37cdc054bc886

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
        const query = searchView.getQuery();
        if (!query) return;

        await model.loadSearchResults(query);

        console.log(model.state);
    } catch (error) {}
};

// Publisher - subscriber pattern. Nicely connect view and controller
const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
};
init();
