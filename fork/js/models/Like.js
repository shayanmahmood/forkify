export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, author, title, img) {
        let like = { id, author, title, img };
        this.likes.push(like)
        this.presistData()
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.presistData()
        this.likes.splice(index, 1);
    }

    islike(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length
    }

    presistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStor() {
        let data = JSON.parse(localStorage.getItem('likes'))
        if (data) this.likes = data;
    }
}