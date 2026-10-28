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
 * Hanterar när sökformuläret skickas.
 * @param {Event} event
 */
async function handleSearch(event) {
  // Stoppa webbläsarens standardbeteende (omladdning av sidan)
  event.preventDefault();

  // Läs sökfrasen och ta bort mellanslag i början och slutet
  const searchPhrase = searchInput.value.trim();
  console.log("Sökfras:", searchPhrase);
}

// När formuläret skickas
searchForm.addEventListener("submit", handleSearch);
