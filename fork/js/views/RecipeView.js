import { elements } from './base.js';
// import { Fraction } from './helper.js';

// let Fraction = 3;



function getlowestfraction(x0) {


    var eps = 1.0E-15;
    var h, h1, h2, k, k1, k2, a, x;

    x = x0;
    a = Math.floor(x);
    h1 = 1;
    k1 = 0;
    h = a;
    k = 1;

    while (x - a > eps * k * k) {
        x = 1 / (x - a);
        a = Math.floor(x);
        h2 = h1; h1 = h;
        k2 = k1; k1 = k;
        h = h2 + a * h1;
        k = k2 + a * k1;
    }

    if (k === 1) {
        return h;
    }

    return h + "/" + k;
}

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}

const createIngredients = ingrediens => ` 
<li class="recipe__item">
   <svg class="recipe__icon">
       <use href="./img/icons.svg#icon-check"></use>
  </svg>
  <div class="recipe__count">${getlowestfraction(ingrediens.count)}</div>
  <div class="recipe__ingredient">
   <span class="recipe__unit">${ingrediens.unit}</span>
   ${ingrediens.ingrediant}</div>
</li>`

export const renderRecipe = (recipe, isliked) => {
    const markUp = `<figure class="recipe__fig">
    <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title"><span>${recipe.title}</span></h1>
</figure>
<div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
        <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
            <button class="btn-tiny btn-decrease">
                <svg><use href="img/icons.svg#icon-circle-with-minus"></use></svg>
            </button>
            <button class="btn-tiny btn-increase">
                <svg><use href="img/icons.svg#icon-circle-with-plus"></use></svg>
            </button>
        </div>
    </div>
    <button class="recipe__likes">
        <svg class="header__likes">
            <use href="img/icons.svg#icon-heart${isliked ? '' : '-outlined'}"></use>
        </svg>
    </button>
</div>

<div class="recipe__ingredients">
    <ul class="recipe__ingredient-list">
      ${recipe.ingredients.map(el => createIngredients(el)).join('')}
    </ul>

    <button class="btn-small recipe__btn recipe__btn--add">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
    </button>
</div >

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.author}</span>. Please check out directions at
            their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </a>
    </div>
`
    elements.recipe.insertAdjacentHTML('afterbegin', markUp)
}


export const updateServing = recipe => {
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    const newIng = Array.from(document.querySelectorAll('.recipe__count'));
    newIng.forEach((ing, i) => {
        ing.textContent = getlowestfraction(recipe.ingredients[i].count);
    })
}