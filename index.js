import './style.css';

const app = document.getElementById('root')

var modal = document.getElementById('modal');
var wrapper = document.getElementById('wrapper');

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container);

var movieList;
var arr = [];
var request = new XMLHttpRequest()
request.open('GET', 'https://swapi.co/api/films', true)
request.onload = function () {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        movieList = data.results;
    }
    if (request.status >= 200 && request.status < 400) {
        data.results.forEach(movie => {
            const card = document.createElement('div')
            card.setAttribute('class', 'card')
            card.setAttribute('id', movie.episode_id)
            card.addEventListener("click", function (e) {
                modal.style.display = 'block';
                wrapper.style.display = 'block';
                const movies = movieList;
                var result = movies.filter(movies => movies.episode_id == movie.episode_id);
                var linkList = result[0].characters;
                for (let i = 0; i < linkList.length; i++) {
                    fetch(linkList[i])
                        .then(response => response.json())
                        .then(data => {
                                    const nameGender = document.createElement('h4')
                                    nameGender.textContent = `Name: ${data.name}, Gender: ${data.gender}`;

                                    modal.appendChild(nameGender)
                        })
                }
            })
            const h1 = document.createElement('h1')
            h1.textContent = movie.title

            const h1E = document.createElement('h3')
            h1E.textContent = `Film episode: ${movie.episode_id}`;

            const h1D = document.createElement('h3')
            h1D.textContent = movie.director

            const p = document.createElement('p')
            movie.opening_crawl = movie.opening_crawl.substring(0, 600)
            p.textContent = movie.opening_crawl

            const p2 = document.createElement('h3')
            p2.textContent = `Release date: ${movie.release_date}`;

            container.appendChild(card)
            card.appendChild(h1)
            card.appendChild(h1E)
            card.appendChild(h1D)
            card.appendChild(p)
            card.appendChild(p2)
        })
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Oh, it's not working!`
        app.appendChild(errorMessage)
    }
}
request.send()

wrapper.onclick = function () {
    document.getElementById("modal").innerHTML = " ";
    modal.style.display = 'none';
    wrapper.style.display = 'none';

}
