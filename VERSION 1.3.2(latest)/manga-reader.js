// Function to extract manga ID from URL parameter
function getMangaIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fetch manga details by ID
// Function to update manga name and pages
function updateMangaDetails(mangaDetails) {
    if (mangaDetails) {
        // Extract manga name
        const mangaName = mangaDetails.title;

        // Check if chapters are available
        if (mangaDetails.chapters) {
            // Extract chapter details
            const pages = mangaDetails.chapters.map(chapter => chapter.chapter_image_url);

            // Update mangaData
            mangaData = {
                mangaName: mangaName,
                pages: pages
            };

            // Update manga name and page
            updateMangaName();
            updateMangaPage();
        } else {
            // Display message indicating no chapters available
            const message = 'No chapters available for this manga.';
            console.error(message);
            // You can display this message on the manga reader page or handle it in any other way you prefer
        }
    } else {
        console.error('No manga details found.');
    }
}



// Function to update manga name and pages
// Function to update manga name and pages
function updateMangaDetails(mangaDetails) {
    console.log('Received manga details:', mangaDetails); // Log manga details

    if (mangaDetails && mangaDetails.data) {
        // Log the structure of the data object
        console.log('Structure of manga data:', mangaDetails.data);

        // Log each property of the data object
        for (let prop in mangaDetails.data) {
            console.log(`Property "${prop}":`, mangaDetails.data[prop]);
        }

        // Extract manga name
        const mangaName = mangaDetails.data.title;

        // Check if chapters exist
        if (mangaDetails.data.chapters && mangaDetails.data.chapters.length > 0) {
            // Extract chapter details
            const chapters = mangaDetails.data.chapters;
            console.log('Found chapters:', chapters); // Log chapters

            // Extract chapter image URLs
            const pages = chapters.map(chapter => chapter.chapter_image_url);

            // Update mangaData
            mangaData = {
                mangaName: mangaName,
                pages: pages
            };

            // Update manga name and page
            updateMangaName();
            updateMangaPage();
        } else {
            console.error('No chapters found in manga details.');
        }
    } else {
        console.error('No manga details found.');
    }
}


// Fetch manga ID from URL
const mangaId = getMangaIdFromUrl();

if (mangaId) {
    // Fetch manga details based on manga ID
    fetchMangaDetails(mangaId)
        .then(mangaDetails => {
            // Update manga details
            updateMangaDetails(mangaDetails);
        })
        .catch(error => {
            console.error('Error fetching manga details:', error);
        });
} else {
    console.error('No manga ID found in URL.');
}
