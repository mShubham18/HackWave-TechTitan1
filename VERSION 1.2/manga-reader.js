// Sample manga data
const mangaPages = [
    "page1.jpg",
    "page2.jpg",
    "page3.jpg",
    // Add more page URLs as needed
];

let currentPageIndex = 0;

// Elements
const mangaNameElement = document.getElementById('manga-name');
const mangaPageElement = document.getElementById('manga-page');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

// Function to update manga page
function updateMangaPage() {
    mangaPageElement.src = mangaPages[currentPageIndex];
}

// Function to update manga name
function updateMangaName() {
    mangaNameElement.textContent = "Manga Name"; // Set manga name here
}

// Function to go to the previous page
function goToPreviousPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        updateMangaPage();
    }
}

// Function to go to the next page
function goToNextPage() {
    if (currentPageIndex < mangaPages.length - 1) {
        currentPageIndex++;
        updateMangaPage();
    }
}

// Event listeners for navigation buttons
prevButton.addEventListener('click', goToPreviousPage);
nextButton.addEventListener('click', goToNextPage);

// Initial setup
updateMangaName();
updateMangaPage();
