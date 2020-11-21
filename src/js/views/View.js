import icons from "url:../../img/icons.svg";

export default class View {
    _data;

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentEl.insertAdjacentHTML("afterbegin", markup);
    }

    renderSpinner() {
        const html = `
            <div class="spinner">
                  <svg>
                    <use href="${icons}#icon-loader"></use>
                  </svg>
            </div> `;

        this._clear();
        this._parentEl.insertAdjacentHTML("afterbegin", html);
    }

    renderMessage(message = this._successMsg) {
        const html = `
		<div class="message">
			<div>
				<svg>
					<use href="${icons}#icon-smile"></use>
		  		</svg>
			</div>
			<p>${message}</p>
		</div>`;

        this._clear();
        this._parentEl.insertAdjacentHTML("afterbegin", html);
    }

    renderError(message = this._errorMsg) {
        const html = `
		<div class="error">
			<div>
				<svg>
					<use href="${icons}#icon-alert-triangle"></use>
		  		</svg>
			</div>
			<p>${message}</p>
		</div>`;

        this._clear();
        this._parentEl.insertAdjacentHTML("afterbegin", html);
    }

    _clear() {
        this._parentEl.innerHTML = "";
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        // create DOM object
        const newDOM = document.createRange().createContextualFragment(newMarkup);

        // Select all elements
        const newElements = Array.from(newDOM.querySelectorAll("*"));

        // Select all current elements
        const currentElements = Array.from(this._parentEl.querySelectorAll("*"));

        // find diffrences and update elements
        newElements.forEach((newEl, i) => {
            const curEl = currentElements[i];

            // update text
            if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") curEl.textContent = newEl.textContent;

            // update attributes
            if (!newEl.isEqualNode(curEl)) Array.from(newEl.attributes).forEach((attr) => curEl.setAttribute(attr.name, attr.value));
        });
    }
}
