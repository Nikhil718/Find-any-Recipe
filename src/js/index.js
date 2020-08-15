import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements , renderLoader ,  clearLoader} from './views/base';

/** global state of the app
 * - Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked Recipes
 */
const state = {};


/* Search Controller */

const controlSearch = async () => {
    //1) get query from view
    const query = searchView.getinput();
    

    if(query) {
        //2) New Search object and add to state
        state.search = new Search(query);

        //3) prepare UI for results
          searchView.clearInput();
          searchView.clearResults();
          renderLoader(elements.searchRes);
try{

  //4) Search for recipes
  await state.search.getResults();

  //5) Render results on UI
  clearLoader();
   searchView.renderResults(state.search.results);

} catch(error){

    alert('Something went wrong');
    clearLoader();
}
      
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchForm.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click' , e => {
     const btn = e.target.closest('.btn-inline');
     
     if (btn) {
         const goToPage = parseInt(btn.dataset.goto , 10);
         searchView.clearResults();
         searchView.renderResults(state.search.results,goToPage);
     }     
});

/* Recipe Controller */

const controlRecipe = async () => {

    const id = window.location.hash.replace('#' , '');
   
    

    if (id) {
         
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    //highlight selected search item
   if (state.search) searchView.highlightSelected(id);

    // Create new recipe object
      state.recipe = new Recipe(id);

      try{
    // Get recipe data and parse ingridients
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
      
        // Calculate servings and Time
    
         state.recipe.calcTime();
         state.recipe.calcServings();
    
    
        // Render recipe
           clearLoader();
           recipeView.renderRecipe(
               state.recipe,
               state.likes.isLiked(id)
               );
    
      } catch (err) {
       
        alert('Error processing recipe!');
        }

    }
};

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));



const controlList = () => {
    // create a new list if there is none yet
    if (!state.list) state.list = new List();

    // Add each ingredients
    state.recipe.ingredients.forEach(el => {
       const item = state.list.addItem(el.count, el.unit, el.ingredient)
       listView.renderItem(item);

    })
}

//Handle delete and update list item events
elements.shopping.addEventListener('click',e=> {
     const id = e.target.closest('.shopping__item').dataset.itemid;

     // Handel the delete button
     if (e.target.matches('.shopping__delete, .shopping__delete *')){
         // Delete from state
         state.list.deleteItem(id);

         //Delete from UI
         listView.deleteItem(id);

         // Handel the count
     }else if (e.target.matches('.shopping__count--value')){
         const val = parseFloat(e.target.value, 10);
         state.list.updateCount(id, val);
     }
});


/**List controller */




const controlLike = ()=>{
 if(!state.likes) state.likes = new Likes();
 const currentID = state.recipe.id;

 //User has not yet liked current recipe
 if (!state.likes.isLiked(currentID)){
   // Add like to the state
   const newLike = state.likes.addLikes(
       currentID,
       state.recipe.title,
       state.recipe.author,
       state.recipe.img
   );
  
   //Toggle the like button
   likesView.toggleLikeBtn(true);
    

   // Add like to UI
   likesView.renderLike(newLike);


  // User has liked current recipe  
 }else {

      // Remove  like to the state
      state.likes.deleteLikes(currentID);
      
  
   //Toggle the like button
   likesView.toggleLikeBtn(false);


   // Remove like from UI
   likesView.deleteLike(currentID);

 }

 likesView.toggleLikeMenu(state.likes.getNumLikes());
};



// Restore like recipe on page load
window.addEventListener('load', ()=> {
    state.likes = new Likes();
    // Restore likes
    state.likes.readStorage();
    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));

});




// Handling recipe button clicks
elements.recipe.addEventListener('click', e =>{
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button is clicked
        if(state.recipe.servings > 1){
       state.recipe.updateServings('dec');
       recipeView.updateServingsIngredients(state.recipe);
        }

    }else  if (e.target.matches('.btn-increase, .btn-increase *')){
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //Add ingredients to list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__ *')){
        // Like controller
        controlLike();
    }

});

