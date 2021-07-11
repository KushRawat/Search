const form = document.getElementById("searchForm");
const resultsDiv = document.querySelector("#results");

form.addEventListener("input", async function (e) {
  e.preventDefault(); //PREVENTING THE FORM FROM REQUESTING ACTION
  resultsDiv.innerHTML = ""; // TO CLEAR PREVIOUS SEARCHED RESULT
  // document.getElementById("quoteTop").style.display = "none";
  document.getElementById("quoteBottom").style.display = "none";

  console.dir(form.elements[0].value);
  // console.dir(form) GIVES ALL ELEMENTS AND DETAILS OF FORM
  // console.dir(form.elements.query.value) WHAT USER SEARCHES FOR
  // const searchTerm = form.elements.query.value;
  const searchTerm = form.elements[0].value;

  // API CALL USING AXIOS
  const config = { params: { q: searchTerm } }; // to add multiple things as query string instead of adding it to the url
  // const config = {params: {q: searchTerm, isFunny: 'Kush'}} // to add multiple things as query string instead of adding it to the url
  const res = await axios.get(`http://api.tvmaze.com/search/shows`, config); // config is an axios object
  // const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`)
  showData(res.data);
  // console.log(res.data);
  // console.log(res.data[0].show.genres);
  // console.log(res.data[0].show.name);
  // console.log(res.data[0].show.network.name);
  // console.log(res.data[0].show.officialSite);
  // console.log(res.data[0].show.rating.average);
  // console.log(res.data[0].show.premiered);
  // console.log(res.data[0].show.schedule);
  // console.log(res.data[0].show.schedule.time);
  // console.log(res.data[0].show.schedule.days);
  // console.log(res.data[0].show.status);
  // console.log(res.data[0].show.summary);
  // console.log(res.data) // SEARCHED SHOW DATA
  // console.log(res.data[0].show.image.medium) // SHOWS SHOW IMAGE
  // form.elements.query.value = ''
});

const showData = (shows) => {
  for (let result of shows) {
    // console.log(result) //testing
    // document.getElementById("quoteTop").style.display = "block";
    document.getElementById("quoteBottom").style.display = "block";
    const cardd = document.createElement("div");
    cardd.setAttribute(
      "class",
      "cardd m-2 shadow-lg col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 border border-success"
    );
    resultsDiv.append(cardd);

    // const br = document.createElement("br");
    // cardd.append(br);

    if (result.show.image) {
      const img = document.createElement("IMG");
      img.src = result.show.image.medium;
      cardd.append(img);
    }
    if (!result.show.image) {
      const img = document.createElement("IMG");
      // img.src = "https://tinyurl.com/tv-missing";
      img.src =
        "https://camo.githubusercontent.com/2515d63ed9f010c45188fb16aa813f67c886fcb713f8395964abcbd22bd791ef/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f41394563427a64367438445a652f67697068792e676966";
      img.setAttribute("class", "img-fluid");
      // img.src ="https://i.pinimg.com/originals/13/7c/a9/137ca9e2a4de70b11d0ae475997e8004.gif";
      // img.src ="https://media2.giphy.com/media/J6DKSSrTUoSqiCuT8Z/200w.gif?cid=82a1493b3526hdoeuh4a4ak6d66gsry7fuvff387iu88yh2j&rid=200w.gif&ct=g";
      cardd.append(img);
    }
    if (result.show.name) {
      const name = document.createElement("h2");
      name.setAttribute("class", "title");
      name.innerHTML = result.show.name;
      cardd.append(name);
    }
    if (result.show.genres) {
      const genres = document.createElement("div");
      genres.innerHTML = result.show.genres;
      // genres.innerHTML =`Genres: ${result.show.genres}`;
      cardd.append(genres);
    }
    // if (result.show.network.name) {
    //   const networkName = document.createElement("div");
    //   networkName.innerHTML = result.show.network.name;
    //   cardd.append(networkName);
    // }
    if (result.show.officialSite) {
      const site = document.createElement("a");
      site.setAttribute("href", result.show.officialSite);
      site.setAttribute("class", "link");
      site.innerHTML = result.show.network.name;
      cardd.append(site);
    }
    if (result.show.status) {
      const status = document.createElement("div");
      status.innerHTML = result.show.status;
      cardd.append(status);
    }
    if (result.show.rating.average) {
      const ratings = document.createElement("div");
      ratings.innerHTML = result.show.rating.average;
      cardd.append(ratings);
    }
    // if (result.show.premiered) {
    //   const premiered = document.createElement("div");
    //   premiered.innerHTML = result.show.premiered;
    //   cardd.append(premiered);
    // }
    if (result.show.summary) {
      const summary = document.createElement("div");
      summary.setAttribute("class", "summary");
      summary.innerHTML = result.show.summary;
      cardd.append(summary);
    }
    // const b = document.createElement("br");
    // resultsDiv.append(b);
  }
};
