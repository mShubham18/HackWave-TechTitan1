document.addEventListener('DOMContentLoaded', function () {
    displayRecentlyAddedManga();
});

// Fetch manga data by ID
async function fetchMangaDataById(mangaId) {
    const response = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}`);
    const mangaData = await response.json();
    return mangaData;
}

// Function to get the image URL from manga data
function getImageUrl(data) {
    if (data && data.main_picture && data.main_picture.large) {
        return data.main_picture.large;
    } else if (data && data.images) {
        if (data.images.jpg && data.images.jpg.large_image_url) {
            return data.images.jpg.large_image_url;
        } else if (data.images.webp && data.images.webp.large_image_url) {
            return data.images.webp.large_image_url;
        }
    }
    return undefined;
}

// Fetch recently added manga data
async function fetchRecentlyAddedManga() {
    const response = await fetch('https://api.jikan.moe/v4/manga');
    const mangaData = await response.json();
    return mangaData;
}

// Function to display recently added manga on the webpage
async function displayRecentlyAddedManga() {
    const mangaContainer = document.getElementById('manga-container');

    // Fetch recently added manga data
    const recentlyAddedManga = await fetchRecentlyAddedManga();

    // Check if manga data is valid
    if (recentlyAddedManga && recentlyAddedManga.data && recentlyAddedManga.data.length > 0) {
        // Clear previous content in the manga container
        mangaContainer.innerHTML = '';

        // Loop through the recently added manga data and display each manga card
        recentlyAddedManga.data.slice(0, 6).forEach((manga) => {
            const imageUrl = getImageUrl(manga);
            const title = manga.title;
            const synopsis = manga.synopsis;

            // Create a new manga card element
            const mangaCard = document.createElement('div');
            mangaCard.classList.add('manga-x');
            mangaCard.innerHTML = `
                <img class="manga-x-image" src="${imageUrl}" alt="${title}">
                <h5 class="manga-x-title">${title}</h5>
                <p class="manga-x-content">${synopsis.substring(0, 100)}...</p>
            `;

            // Create a "Read now" button
            const readNowButton = document.createElement('a');
            readNowButton.classList.add('btn');
            readNowButton.textContent = 'Read now';
            readNowButton.href = manga.url;
            readNowButton.target = '_blank'; // Open link in a new tab

            // Add event listener to "Read now" button
            readNowButton.addEventListener('click', function(event) {
                // Prevent default behavior of anchor tag
                event.preventDefault();
                // Redirect to manga URL
                window.location.href = manga.url;
            });

            // Append the "Read now" button to the manga card
            mangaCard.appendChild(readNowButton);

            // Append the manga card to the manga container
            mangaContainer.appendChild(mangaCard);
        });
    } else {
        // Display an error message if no manga data is available
        mangaContainer.innerHTML = '<p>No recently added manga found.</p>';
    }
}
