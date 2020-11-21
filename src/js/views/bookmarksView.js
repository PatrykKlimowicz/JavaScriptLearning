import View from "./View.js";
import previewView from "./previewView.js";

class BookmarksView extends View {
    _parentEl = document.querySelector(".bookmarks__list");
    _errorMsg = "No bookmarks yet. Find nice recipe and bookmark it! :)";
    _successMsg = "";

    _generateMarkup() {
        const id = window.location.hash.slice(1);

        return this._data.map((bookmark) => previewView.render(bookmark, false)).join("");
    }
}

export default new BookmarksView();
