export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            const result = await res.json();
            this.title = result.recipe.title;
            this.author = result.recipe.publisher;
            this.img = result.recipe.image_url;
            this.url = result.recipe.source_url;
            this.ingredients = result.recipe.ingredients;
            this.authorSource = result.recipe.publisher_url;
            // console.log(result);
            // console.log(`title : ${this.title}, and authorName : ${this.author},  and img: ${this.img}, and url : ${this.url}, items :  ${this.ingredients}, auhorS: ${this.authorSource}`)
        } catch (error) {
            console.log(error)
        }
    }


    calcTime() {
        let numIng = this.ingredients.length;
        let periods = Math.ceil(numIng / 3);
        this.time = periods * 15
    }

    serving() {
        this.servings = 4;
    }

    praseIngrediants() {
        const unitLong = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'pound', 'ounces', 'ounce', 'kilograms', 'kilogram', 'grams', 'gram', 'liters', 'liter', 'milliliters', 'milliliter']
        const unitShort = ['tbsp', 'tbsp', 'tsp', 'tsp', 'cup', 'lbs', 'lb', 'oz', 'oz', 'kg', 'kg', 'g', 'g', 'l', 'l', 'ml', 'ml']

        const newIngrediants = this.ingredients.map(el => {

            let ingrediant = el.toLowerCase();
            unitLong.forEach((unit, i) => {
                ingrediant = ingrediant.replace(unit, unitShort[i]);
            })
            // ingrediant = ingrediant.replace(/[\])}[{(]/g, '');
            ingrediant = ingrediant.replace(/ \([^()]*?(oz|g|ml)\)/i, ' ')
            const arrIng = ingrediant.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitShort.includes(el2));
            let obj;
            if (unitIndex > -1) {
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'))
                }
                else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                obj = {
                    count,
                    unit: arrIng[unitIndex],
                    ingrediant: arrIng.slice(unitIndex + 1).join(' ')
                }
            }
            else if (parseInt(arrIng[0], 10)) {
                obj = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingrediant: arrIng.slice(1).join(' ')
                }
            }
            else if (unitIndex === -1) {
                obj = {
                    count: 1,
                    unit: '',
                    ingrediant
                }
            }


            // console.log(arrIng, unitIndex)
            return obj

            // ingredient.replace(/ \([^()]*?(oz|g|ml)\)/i, ''),
        })

        this.ingredients = newIngrediants;
    }
    updateServing(type) {
        const newServing = type === 'dec' ? this.servings - 1 : this.servings + 1;
 
        this.ingredients.forEach(el => {
            el.count *= (newServing / this.servings);
        })

        this.servings = newServing;
    }
}
/*
//    ['tablespoons', 'tbsp'],
//     ['tablespoon', 'tbsp'],
//     ['tbsp', 'tbsp'],
//     ['teaspoons', 'tsp'],
//     ['teaspoon', 'tsp'],
//     ['cups', 'cups'],
//     ['cup', 'cup'],
//     ['pounds', 'lbs'],
//     ['pound', 'lb'],
//     ['ounces', 'oz'],
//     ['ounce', 'oz'],
//     ['kilograms', 'kg'],
//     ['kilogram', 'kg'],
//     ['grams', 'g'],
//     ['gram', 'g'],
//     ['liters', 'l'],
//     ['liter', 'l'],
//     ['milliliters', 'ml'],
//     ['milliliter', 'ml']
// ]
*/