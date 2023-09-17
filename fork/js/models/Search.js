export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            const recipe = await res.json();
            this.result = recipe.recipes
        }
        catch (error) {
            alert(error);
        }
    }
}
// const key = "8d488d17-fae0-474f-a48f-b7eab7d8c578"
