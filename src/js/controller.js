import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

// API DOCS PATH: https://forkify-api.herokuapp.com/v2

const controllRecipes = async function () {
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
        console.log(error);
    }
};

const events = ["hashchange", "load"];
events.forEach((ev) => window.addEventListener(ev, controllRecipes));
