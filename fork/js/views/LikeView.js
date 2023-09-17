import { elements } from './base.js';
import * as searchView from '../views/SearchView.js';

export const toggleLike = isliked => {
    const iconString = isliked ? 'icon-heart' : 'icon-heart-outlined'
    document.querySelector('.recipe__likes use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = numLike => {
    elements.likesMenu.style.visibility = numLike > 0 ? 'visible' : 'hidden';
}

export const renderLikes = like => {
    const markup = `<li>
            <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                    <h4 class="likes__name">${searchView.limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
            </div>
            </a>
</li>  `

    elements.likesList.insertAdjacentHTML('beforebegin', markup)
}

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href="#${id}"`).parentElement
    if (el) el.parentElement.removeChild(el);
}

