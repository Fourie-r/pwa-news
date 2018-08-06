const apiKey = 'fa983a95e9a44401aac791dad9262179'


const sourceUrl =  'https://newsapi.org/v2/sources?apiKey=fa983a95e9a44401aac791dad9262179';

const main = document.querySelector('main')
const sourcesSelector = document.querySelector('#sourcesSelector');
const defaultSource = 'bbc-news';

window.addEventListener('load', async e => {
  updateNews();
  await updateSource();
  sourcesSelector.value = defaultSource;
  sourcesSelector.addEventListener('change', e => {
      updateNews(e.target.value);
  })
})

async function updateNews ( source = defaultSource) {

  const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=fa983a95e9a44401aac791dad9262179`);
  const json = await res.json();
console.log(json)
  main.innerHTML = json.articles.map(article => createArticle(article)).join('\n');
}


async function updateSource() {

    const res = await fetch(sourceUrl);
    console.log(res)
    const json = await res.json();
    console.log(json)
    sourcesSelector.innerHTML = json.sources.map(source => createSource(source)).join("\n");
}


function createSource(source) {

    return `<option value="${source.id}">${source.name}</option>`

}
function createArticle (article) {
  return `
    <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}">
            <p>${article.description}</p>
        </a>
    </div>
    `
}
