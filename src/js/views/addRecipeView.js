import View from "./View.js";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
    _parentEl = document.querySelector(".upload");
    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal");
    _successMsg = "Recipe added successfully! :)";

    constructor() {
        super();
        this._addHandlerShowForm();
        this._addHandlerHideForm();
    }

    _addHandlerShowForm() {
        this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
        this._overlay.addEventListener("click", this.toggleWindow.bind(this));
    }

    _addHandlerHideForm() {
        this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this._parentEl.addEventListener("click", function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

    toggleWindow() {
        this._overlay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");
    }

    _generateMarkup() {}
}

export default new AddRecipeView();
