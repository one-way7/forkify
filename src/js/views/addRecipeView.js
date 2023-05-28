import View from './View';
import icons from 'url:../../img/icons.svg';

import { MODAL_CLOSE_SEC } from '.././services/config';

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded :)';

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    removeWindow = () => {
        this._overlay.classList.add('hidden');
        this._window.classList.add('hidden');
    };

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', () => {
            this._overlay.classList.remove('hidden');
            this._window.classList.remove('hidden');
        });
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.removeWindow);
        this._overlay.addEventListener('click', this.removeWindow);
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();

            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);

            setTimeout(() => {
                // addRecipeView.removeWindow();
                location.reload();
            }, MODAL_CLOSE_SEC * 1000);
        });
    }

    _generateMarkup() {}
}

export default new AddRecipeView();
