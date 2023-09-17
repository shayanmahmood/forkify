import { elements } from './base.js';

export const renderList = item => {
	console.log(item.id, item.count, item.ingredients, item.unit)
	const markup = `
        <li class="shopping__item" data-id=${item.id}>
            <div class="shopping__count">
		     	<input  type="number" value="${item.count}" step="${item.count}" class="shopping-count__value">
			    <p>${item.unit}</p>
		     </div>   
			<p class="shopping__description">${item.inrediants}</p>
			<button class="shopping__delete btn-tiny">
				<svg>
					<use href="img/icons.svg#icon-circle-with-cross"></use>
				</svg>
			</button>
		</li>
	`
	elements.shoppingList.insertAdjacentHTML('beforeend', markup)
}


export const deleteItem = id => {
	const item = document.querySelector(`[data-id="${id}"]`);
	item.parentElement.removeChild(item);
}