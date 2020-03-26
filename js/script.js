let APIKey = 'F2eDGj2ZE5kLM9ukx5gnpBUG7BwOHk7l';

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault(); //prevents reloading page on submit

    //Clear previous results if exists
    const gridItems = document.querySelector('.grid__items');
    if (gridItems.hasChildNodes()) {
        while (gridItems.firstChild) {
            gridItems.removeChild(gridItems.firstChild);
        }
    }

    getGif().then(data => {
            let result = data.data; //array of results
            for (const e of result) {
                addGifDom(e);
            }
            document.querySelector('input').value = ""; //clear the search bar
        })
        .catch(error => {
            console.error(error)
        })
})

async function getGif() {
    let query = document.getElementById('input').value;
    let limit = 18;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${query}&limit=${limit}`
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

function addGifDom(...array) {
    let fig = document.createElement('figure');
    let img = document.createElement('img');
    let cap = document.createElement('figcaption')
    img.src = array[0].images.downsized.url;
    cap.textContent = array[0].title;
    fig.appendChild(img);
    fig.appendChild(cap);
    let dom = document.querySelector('.grid__items')
    dom.insertAdjacentHTML('beforeend', fig.outerHTML);
}