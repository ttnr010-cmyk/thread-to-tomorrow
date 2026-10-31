
// =====================================
// THREAD TO TOMORROW - WEBSITE SEARCH
// =====================================

// 1. Get the search elements from the HTML

const searchToggle = document.getElementById("searchToggle");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");


// 2. Store information about all website pages

const pages = [
    {
        name: "Home",
        url: "index.html",
        description: "Explore the complete journey of a cotton T-shirt.",
        keywords: "home clothing journey cotton t-shirt lifecycle"
    },
    {
        name: "Raw Materials",
        url: "raw-materials.html",
        description: "Discover cotton farming, growing, harvesting and ginning.",
        keywords: "cotton farming growing harvesting ginning water land"
    },
    {
        name: "Processing",
        url: "processing.html",
        description: "Learn how cotton is cleaned, carded and spun into yarn.",
        keywords: "cleaning carding spinning yarn fibres energy"
    },
    {
        name: "Manufacturing",
        url: "manufacturing.html",
        description: "Explore fabric making, dyeing, cutting and sewing.",
        keywords: "fabric dyeing sewing cutting factories chemicals"
    },
    {
        name: "Transportation",
        url: "transportation.html",
        description: "Discover how clothing travels by sea, air and land.",
        keywords: "shipping sea air land trucks fuel emissions pollution"
    },
    {
        name: "The Journey in Kenya",
        url: "kenya.html",
        description: "Explore cotton production and the textile industry in Kenya.",
        keywords: "kenya local cotton textile industry garment production"
    },
    {
        name: "Use",
        url: "use.html",
        description: "Understand the effects of wearing, washing and caring for clothes.",
        keywords: "wearing washing drying caring clothes water detergent"
    },
    {
        name: "End of Life",
        url: "end-of-life.html",
        description: "Discover what happens when clothing is reused, recycled or discarded.",
        keywords: "recycling reuse donation landfill textile waste disposal"
    }
];


// 3. Open and close the search panel

if (searchToggle && searchPanel) {

    searchToggle.addEventListener("click", function () {

        searchPanel.classList.toggle("show");

        if (searchPanel.classList.contains("show")) {
            searchInput.focus();
        }

    });

}


// 4. Search through the website pages

if (searchInput && searchResults) {

    searchInput.addEventListener("input", function () {

        const searchTerm = searchInput.value.toLowerCase().trim();

        // Clear previous results
        searchResults.innerHTML = "";

        // Do not show results if the search is empty
        if (searchTerm === "") {
            return;
        }

        // Find pages that match the search
        const matchingPages = pages.filter(function (page) {

            const searchableText =
                page.name + " " +
                page.description + " " +
                page.keywords;

            return searchableText.toLowerCase().includes(searchTerm);

        });


        // Display a message if nothing matches
        if (matchingPages.length === 0) {

            searchResults.innerHTML =
                '<p class="search-message">No matching results found.</p>';

            return;
        }


        // Display matching pages with descriptions
        matchingPages.forEach(function (page) {

            const link = document.createElement("a");

            link.href = page.url;
            link.className = "search-result";

            const title = document.createElement("strong");
            title.textContent = page.name;

            const description = document.createElement("span");
            description.textContent = page.description;

            link.appendChild(title);
            link.appendChild(description);

            searchResults.appendChild(link);

        });

    });

}

// =====================================
// KENYA INTERACTIVE JOURNEY MAP
// =====================================

const mapStops = [
    {
        title: "Cotton Farming",
        location: "Eastern and Coastal Kenya",
        image: "images/kenya-farming.jpg",
        description: "Cotton is grown by farmers in parts of Eastern and Coastal Kenya. After harvesting, the cotton is collected and prepared for processing."
    },

    {
        title: "Cotton Processing",
        location: "Cotton ginneries in Kenya",
        image: "images/kenya-processing.jpg",
        description: "At a ginnery, cotton fibres are separated from their seeds. The fibres can then be prepared for spinning into yarn."
    },

    {
        title: "Textile Manufacturing",
        location: "Eldoret, Uasin Gishu County",
        image: "images/kenya-textile.jpg",
        description: "Rivatex East Africa is based in Eldoret. Textile production involves turning fibres or yarn into fabric and preparing materials for clothing."
    },

    {
        title: "Clothing Markets",
        location: "Nairobi, Kenya",
        image: "images/kenya-market.jpg",
        description: "Clothing reaches consumers through shops and markets in Nairobi. The market includes locally made garments and imported clothing, including second-hand clothes."
    }
];

const mapButtons = document.querySelectorAll(".map-stop");
const mapImage = document.getElementById("mapImage");
const mapNumber = document.getElementById("mapNumber");
const mapTitle = document.getElementById("mapTitle");
const mapLocation = document.getElementById("mapLocation");
const mapDescription = document.getElementById("mapDescription");
const previousStop = document.getElementById("previousStop");
const nextStop = document.getElementById("nextStop");

let currentStop = 0;

function showMapStop(index) {

    if (!mapStops[index]) {
        return;
    }

    currentStop = index;

    const stop = mapStops[index];

    mapImage.src = stop.image;
    mapImage.alt = stop.title;

    mapNumber.textContent =
        "STOP " + String(index + 1).padStart(2, "0");

    mapTitle.textContent = stop.title;
    mapLocation.textContent = stop.location;
    mapDescription.textContent = stop.description;

    mapButtons.forEach(function(button, buttonIndex) {
        button.classList.toggle("active", buttonIndex === index);
    });

    previousStop.disabled = index === 0;
    nextStop.disabled = index === mapStops.length - 1;
}


// CLICK NUMBERED MAP MARKERS

mapButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const index = Number(button.dataset.stop);

        showMapStop(index);

    });

});


// PREVIOUS AND NEXT BUTTONS

if (previousStop && nextStop) {

    previousStop.addEventListener("click", function() {

        if (currentStop > 0) {
            showMapStop(currentStop - 1);
        }

    });

    nextStop.addEventListener("click", function() {

        if (currentStop < mapStops.length - 1) {
            showMapStop(currentStop + 1);
        }

    });

}


// SHOW FIRST STOP WHEN PAGE OPENS

if (mapButtons.length > 0) {
    showMapStop(0);
}
