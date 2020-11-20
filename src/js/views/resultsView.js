import View from "./View.js";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
    _parentEl = document.querySelector(".results");
    _errorMsg = "No recipes found. Please, try again ;)";
    _successMsg = "";

    _generateMarkup() {
        console.log(this._data);
        return this._data
            .map(
                (recipe) =>
                    `
            <li class="preview">
                <a class="preview__link" href="#${recipe.id}">
                <figure class="preview__fig">
                    <img src="${recipe.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${recipe.title}</h4>
                    <p class="preview__publisher">${recipe.publisher}</p>
                </div>
                </a>
            </li>`
            )
            .join("");
    }
}

export default new ResultsView();
