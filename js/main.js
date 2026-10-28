"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Mariam Aljizawi
 */
// Hämta element från DOM
const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorParagraph = document.querySelector("#error");
const messageSection = document.querySelector("#message");
const recipeSection = document.querySelector("#recipe");

/**
 * Visar ett felmeddelande för sökformuläret.
 * @param {string} text
 */
function showError(text) {
  errorParagraph.textContent = text;
}

/**
 * Tar bort eventuellt felmeddelande från sökformuläret.
 */
function clearError() {
  errorParagraph.textContent = "";
}

/**
 * Kontrollerar att en sökfras har angetts.
 * @param {string} searchPhrase
 * @returns {boolean} true om sökfrasen är giltig
 */
function validateSearch(searchPhrase) {
  // Tomt fält ger felmeddelande och ingen sökning
  if (searchPhrase === "") {
    showError("Du måste ange en sökfras.");
    return false;
  }

  // Giltig sökfras: ta bort eventuellt tidigare felmeddelande
  clearError();
  return true;
}
/**
 * Hämtar recept från DummyJSON baserat på en sökfras.
 * @param {string} searchPhrase
 * @returns {Promise<Array>} Array med recept
 */
async function fetchRecipes(searchPhrase) {
  // Bygg URL:en och koda sökfrasen så att den fungerar i en adress
  const url =
    "https://dummyjson.com/recipes/search?q=" +
    encodeURIComponent(searchPhrase);

  // Gör anropet och vänta på svaret
  const response = await fetch(url);

  // Omvandla svaret från JSON till ett JavaScript-objekt
  const data = await response.json();

  // Receptlistan ligger i data.recipes
  return data.recipes;
}
/**
 * Hanterar när sökformuläret skickas.
 * @param {Event} event
 */

/**
 * Visar ett meddelande för användaren i message-sektionen.
 * @param {string} text
 */
function showMessage(text) {
  messageSection.textContent = text;
}

/**
 * Tar bort meddelandet från message-sektionen.
 */
function clearMessage() {
  messageSection.textContent = "";
}

/**
 * Tar bort det recept som visas just nu.
 */
function clearRecipe() {
  recipeSection.innerHTML = "";
}

/**
 * Skapar ett p-element med fet etikett och värde, t.ex. "Servings: 4".
 * @param {string} label
 * @param {string|number} value
 * @returns {HTMLParagraphElement}
 */
function createInfoParagraph(label, value) {
  const paragraph = document.createElement("p");

  // Etiketten skrivs med strong
  const strong = document.createElement("strong");
  strong.textContent = label + ":";

  // Lägg ihop etikett och värde
  paragraph.append(strong, " " + value);
  return paragraph;
}

/**
 * Skapar en lista (ul eller ol) utifrån en array med texter.
 * @param {string[]} items
 * @param {boolean} ordered true ger numrerad lista (ol), false ger punktlista (ul)
 * @returns {HTMLUListElement|HTMLOListElement}
 */
function createList(items, ordered) {
  const list = document.createElement(ordered ? "ol" : "ul");

  // Skapa ett li-element för varje text i arrayen
  for (const item of items) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  }

  return list;
}

/**
 * Skapar och visar ett recept i DOM.
 * @param {Object} recipe
 */
function displayRecipe(recipe) {
  // Huvudelementet för receptet
  const article = document.createElement("article");

  // Receptets namn
  const title = document.createElement("h3");
  title.textContent = recipe.name;

  // Receptets bild
  const image = document.createElement("img");
  image.src = recipe.image;
  image.alt = recipe.name;

  // Ruta med information om receptet
  const infoDiv = document.createElement("div");
  infoDiv.className = "recipe-info";
  infoDiv.append(
    createInfoParagraph("Servings", recipe.servings),
    createInfoParagraph("Prep time", recipe.prepTimeMinutes + " minutes"),
    createInfoParagraph("Cooking time", recipe.cookTimeMinutes + " minutes"),
    createInfoParagraph("Difficulty", recipe.difficulty),
  );

  // Rubrik och punktlista för ingredienser
  const ingredientsHeading = document.createElement("h4");
  ingredientsHeading.textContent = "Ingredients";
  const ingredientsList = createList(recipe.ingredients, false);

  // Rubrik och numrerad lista för instruktioner
  const instructionsHeading = document.createElement("h4");
  instructionsHeading.textContent = "Instructions";
  const instructionsList = createList(recipe.instructions, true);

  // Lägg ihop delarna och lägg till i DOM
  article.append(
    title,
    image,
    infoDiv,
    ingredientsHeading,
    ingredientsList,
    instructionsHeading,
    instructionsList,
  );
  recipeSection.appendChild(article);
}

async function handleSearch(event) {
  // Stoppa webbläsarens standardbeteende (omladdning av sidan)
  event.preventDefault();

  // Läs sökfrasen och ta bort mellanslag i början och slutet
  const searchPhrase = searchInput.value.trim();

  // Avbryt om sökfrasen inte är giltig
  if (!validateSearch(searchPhrase)) {
    return;
  }

  // Ta bort tidigare meddelande innan ny sökning
  clearMessage();

  // Hämta recept från API:t
  const recipes = await fetchRecipes(searchPhrase);

  // Ta bort tidigare recept
  clearRecipe();

  // Om inga recept hittades, visa ett meddelande och avbryt
  if (recipes.length === 0) {
    showMessage("Inget recept kunde hittas. Prova en annan sökfras.");
    return;
  }

  // Visa det första receptet i sökresultatet
  displayRecipe(recipes[0]);
}

// Eventlisteners
// När formuläret skickas
searchForm.addEventListener("submit", handleSearch);
