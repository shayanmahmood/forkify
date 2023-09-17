import Search from './models/Search.js';
import Recipe from './models/Recipe.js';
import List from './models/List.js';
import Likes from './models/Like.js';
import * as searchView from './views/SearchView.js';
import * as recipeView from './views/RecipeView.js';
import * as listView from './views/ListView.js';
import * as likeView from './views/LikeView.js';
import { elements, renderLoader, cleaeLoader } from './views/base.js';

const state = {};
window.state = state;


const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {
        state.search = new Search(query);
        searchView.clearResults();
        renderLoader(elements.searchResults);
        try {
            await state.search.getResult()
            cleaeLoader();
            searchView.renderResult(state.search.result);
        } catch (err) { alert('something went wrong with the search We R trying...') }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResultsPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goto = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResult(state.search.result, goto);
    }
})


const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '')
    if (id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe)
        if (state.search) {
            searchView.highlightSelected(id);
        }
        state.recipe = new Recipe(id);
        try {
            await state.recipe.getRecipe()
            state.recipe.praseIngrediants();
            state.recipe.calcTime();
            state.recipe.serving();
            cleaeLoader();
            recipeView.renderRecipe(state.recipe, state.likes.islike(id));
        } catch (err) {
            alert('something went wrong in processing the Recipes from DataBase(ApI) we R Trying...'
                + err)
                console.log(err)
        }
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


const controlShoppingList = () => {
    // Create a new list if none exits
    if (!state.List) state.list = new List();

    state.recipe.ingredients.forEach(el => {
        let item = state.list.addItem(el.count, el.unit, el.ingrediant)
        listView.renderList(item);
    })
};

elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.id;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id)
        listView.deleteItem(id)
    } else if (e.target.matches('.shopping-count__value')) {
        const value = parseFloat(e.target.value)
        state.list.updateCount(id, value);
    }
})

const controlLike = () => {
    if (!state.likes) state.likes = new Likes()
    const currentId = state.recipe.id;
    if (!state.likes.islike(currentId)) {
        const newLike = state.likes.addLike(currentId, state.recipe.author, state.recipe.title, state.recipe.img);
        likeView.toggleLike(true)
        likeView.renderLikes(newLike)
        console.log(state.likes)
    } else {
        state.likes.deleteLike(currentId)
        likeView.toggleLike(false)
        likeView.deleteLike(currentId);
        console.log(state.likes)
    }
    likeView.toggleLikeMenu(state.likes.getNumLikes());
}

window.addEventListener('load', () => {

    state.likes = new Likes()

    state.likes.readStor();

    likeView.toggleLikeMenu(state.likes.getNumLikes());

    state.likes.likes.forEach(el => likeView.renderLikes(el));

})

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServing('dec')
            recipeView.updateServing(state.recipe)
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServing('inc')
        recipeView.updateServing(state.recipe)
    }
    else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlShoppingList();
    } else if (e.target.matches('.recipe__likes, .recipe__likes *')) {
        controlLike();
    }
})

console.log(state)
