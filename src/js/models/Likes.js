export default class Likes {
    constructor(){
        this.likes = [];
    }



    addLikes(id, title,author,img){
        const like = {id,title,author,img};
        this.likes.push(like);

        // Perist data in localStorage
         this.parsisData();

        return like;
    }

    deleteLikes(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index,1);

         // Perist data in localStorage
         this.parsisData();
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }

    parsisData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        //restore likes
        if (storage) this.likes = storage;
    }
}