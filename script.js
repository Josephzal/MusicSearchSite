const form = document.querySelector("#searchForm");
const bioText = document.querySelector("#bioText");
const artistImg = document.querySelector("#artistImg");
const imgLink = document.querySelector("#imgLink");
artistImg.style.display = "none";

// Access theaudiodb api when user submits information
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    document.body.clear;
    const searchTerm = form.elements.query.value;
    const config = { params: { s: searchTerm } };
    try {
        const res = await axios.get(`https://theaudiodb.com/api/v1/json/1/search.php`, config);
        makeContent(res.data.artists[0]);
    } catch (e) {
        bioText.innerHTML = "";
        artistImg.style.display = "none";
        bioText.append(`"${form.elements.query.value}" not found.`)
    }
    form.elements.query.value = "";
})

// Retrieve and display content found from api
const makeContent = (artistName) => {
    bioText.innerHTML = "";
    artistImg.style.display = "inline";
    artistImg.src = artistName.strArtistBanner;
    if (artistName.strWebsite) {
        imgLink.href = `https://${artistName.strWebsite}`;
    }
    else {
        imgLink.href = "javascript: void(0)"
    }
    if (artistName.strBiographyEN)
        bioText.append(artistName.strBiographyEN);
}

