// Function to fetch manga details from Jikan API
async function fetchMangaDetails(mangaId) {
    const response = await fetch(`https://api.jikan.moe/v3/manga/${mangaId}`);
    const mangaDetails = await response.json();
    return mangaDetails;
}

// Function to extract manga ID from URL parameter
function getMangaIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Elements
const mangaNameElement = document.getElementById('manga-name');
const mangaPageElement = document.getElementById('manga-page');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let mangaData = null; // Initialize mangaData as null

// Function to update manga page
function updateMangaPage() {
    if (mangaData && mangaData.pages.length > 0) {
        mangaPageElement.src = mangaData.pages[currentPageIndex];
    }
}

// Function to update manga name
function updateMangaName() {
    if (mangaData) {
        mangaNameElement.textContent = mangaData.mangaName;
    }
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
    if (currentPageIndex < mangaData.pages.length - 1) {
        currentPageIndex++;
        updateMangaPage();
    }
}

// Event listeners for navigation buttons
prevButton.addEventListener('click', goToPreviousPage);
nextButton.addEventListener('click', goToNextPage);

// Event listener for keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        goToPreviousPage();
    } else if (event.key === 'ArrowRight') {
        goToNextPage();
    }
});

// Fetch manga ID from URL
const mangaId = getMangaIdFromUrl();

if (mangaId) {
    // Fetch manga details based on manga ID
    fetchMangaDetails(mangaId)
        .then(mangaDetails => {
            // Extract manga name and pages from manga details
            const mangaName = mangaDetails.title;
            const pages = mangaDetails.chapters.map(chapter => chapter.chapter_image_url);

            // Update mangaData
            mangaData = {
                mangaName: mangaName,
                pages: pages
            };

            // Update manga name and page
            updateMangaName();
            updateMangaPage();
        })
        .catch(error => {
            console.error('Error fetching manga details:', error);
        });
} else {
    console.error('No manga ID found in URL.');
}
