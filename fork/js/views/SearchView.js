import { elements } from './base.js';
export const getInput = () => elements.searchInput.value


export const clearInput = () => {
	elements.searchInput.value = '';
};

export  const highlightSelected = id => {
	if (id) {
		const allRes = Array.from(document.querySelectorAll('.results__link'));
		allRes.forEach(el => el.classList.remove('results__link--active'))


		document.querySelector(`.results__link[href*="#${id}"`).classList.add('results__link--active')
	}
}

export const clearResults = () => {
	elements.searchResultsList.innerHTML = '';
	elements.searchResultsPages.innerHTML = '';
};


export const limitRecipeTitle = (title, limit = 17) => {
	let newLim = [];
	if (title.length >= limit) {
		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newLim.push(cur)
			}
			return acc + cur.length
		}, 0);

		return `${newLim.join(' ')} ...`
	}
	return title;
}




const renderRecipe = recipe => {
	const markUp = `
              <li>
			<a class="results__link" href="#${recipe.recipe_id}" title="${recipe.title}">
			<figure class="results__fig">
			<img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
			</figure>
			<div class="results__data">
			<h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
				<p class="results__author">${recipe.publisher}</p>			
						</div>
				</a>
		</li>
		`
	elements.searchResultsList.insertAdjacentHTML('beforeend', markUp);

}

const createBtn = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1
	}>
	<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
	<svg class="search__icon">
			<use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'
	}"></use>
	</svg>
</button>
`;

const renderBtn = (page, resResult = 30, receipePerPage) => {
	const pages = Math.ceil(resResult / receipePerPage)
	let btn;
	if (page === 1 && pages > 1) {
		btn = createBtn(page, 'next')
	} else if (page < pages) {
		btn = `${createBtn(page, 'prev')}
	         ${createBtn(page, 'next')}`
	}
	else if (page === pages && pages > 1) {
		btn = createBtn(page, 'prev')
	}
	elements.searchResultsPages.insertAdjacentHTML('afterbegin', btn);
}

export const renderResult = (recipes, page = 1, receipePerPage = 15) => {
	const start = (page - 1) * receipePerPage;
	const end = page * receipePerPage
	recipes.slice(start, end).forEach(renderRecipe);
	renderBtn(page, recipes.length, receipePerPage);
}


