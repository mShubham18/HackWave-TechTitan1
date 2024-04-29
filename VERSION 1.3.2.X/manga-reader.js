document.addEventListener('DOMContentLoaded', function () {
    // Extract manga ID from URL
    const mangaId = getMangaIdFromUrl();
    
    if (mangaId) {
        // Fetch manga details based on manga ID
        fetchMangaDetails(mangaId)
            .then(mangaDetails => {
                // Update manga details on the page
                updateMangaDetails(mangaDetails);
            })
            .catch(error => {
                console.error('Error fetching manga details:', error);
            });
    } else {
        console.error('No manga ID found in URL.');
    }
});

// Function to extract manga ID from URL
function getMangaIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = urlParams.get('id');
    return mangaId;
}

// Fetch manga details by ID
async function fetchMangaDetails(mangaId) {
    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query ($id: Int) {
                        Media(id: $id, type: MANGA) {
                            id
                            title {
                                romaji
                                english
                            }
                            chapters
                            volumes
                            description(asHtml: true)
                            coverImage {
                                large
                            }
                        }
                    }
                `,
                variables: {
                    id: mangaId
                }
            })
        });

        const data = await response.json();
        console.log('API response:', data); // Log API response for inspection
        return data.data.Media;
    } catch (error) {
        console.error('Error fetching manga details:', error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}


// Function to update manga details on the page
function updateMangaDetails(mangaDetails) {
    if (mangaDetails) {
        // Extract chapter details
        const chapters = mangaDetails.chapters;
        if (chapters && chapters.length > 0) {
            // Display chapter names on the page
            const chapterList = document.getElementById('chapter-list');
            chapters.forEach(chapter => {
                const chapterName = chapter.title;
                const listItem = document.createElement('li');
                listItem.textContent = chapterName;
                chapterList.appendChild(listItem);
            });
        } else {
            console.error('No chapters found in manga details.');
        }
    } else {
        console.error('No manga details found.');
    }
}
