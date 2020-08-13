import {elements} from './base';


const createIngredient = ingredient => `
<li class="recipe__item">
          
<div class="recipe__count">${ingredient.count}</div>
<div class="recipe__ingredient">
    <span class="recipe__unit">${ingredient.unit}</span>
    ${ingredient.ingredient}
</div>
</li>
`;


export const renderRecipe = recipe => {
  const marup = `
  <figure class="recipe__fig">
  <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
  <h1 class="recipe__title">
      <span>${recipe.title}</span>
  </h1>
</figure>
<div class="recipe__details">
  <div class="recipe__info">
      
      <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
      <span class="recipe__info-text"> minutes</span>
  </div>
  <div class="recipe__info">
      
      <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
      <span class="recipe__info-text"> servings</span>

      <div class="recipe__info-buttons">
          <button class="btn-tiny">
              <i class="fa fa-info-circle" aria-hidden="true"></i>

          </button>
          <button class="btn-tiny">
              
          </button>
      </div>

  </div>
  <button class="recipe__love">
      <i class="fa fa-heart-o" aria-hidden="true"></i>

  </button>
</div>



<div class="recipe__ingredients">
  <ul class="recipe__ingredient-list">
    ${recipe.ingridents.map(el => createIngredient(el)).join('')}  
  </ul>

  <button class="btn-small recipe__btn">
      <i class="fa fa-plus-circle" aria-hidden="true"></i>
      <span>Add to shopping list</span>
  </button>
</div>

<div class="recipe__directions">
  <h2 class="heading-2">How to cook it</h2>
  <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
  </p>
  <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
      <span>Directions</span>
      

  </a>
</div>

  `;
  elements.recipe.insertAdjacentHTML('afterbegin',marup);
};