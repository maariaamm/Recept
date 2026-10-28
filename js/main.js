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

  // Test: skriv ut det första receptet i konsolen
  console.log(recipes[0]);
}

// Eventlisteners
// När formuläret skickas
searchForm.addEventListener("submit", handleSearch);
