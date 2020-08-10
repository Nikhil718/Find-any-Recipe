import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
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


    // Create new recipe object
      state.recipe = new Recipe(id);

      try{
    // Get recipe data
        await state.recipe.getRecipe();

        // Calculate servings and Time
    
         state.recipe.calcTime();
         state.recipe.calcServings();
    
    
        // Render recipe
           console.log(state.recipe);
    
      } catch (error)
         {
          alert('Error');
        }

    }
};

window.addEventListener('hashchange' , controlRecipe);
window.addEventListener('load' , controlRecipe);