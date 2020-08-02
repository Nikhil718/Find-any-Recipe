import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements , renderLoader ,  clearLoader} from './views/base';
/** global state of the app
 * - Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked Recipes
 */
const state = {};

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

        //4) Search for recipes
        await state.search.getResults();

        //5) Render results on UI
        clearLoader();
         searchView.renderResults(state.search.results);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});



