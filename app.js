// chrome://inspect/#devices port-forwarding for the android emulator
// npm install --save @types/service_worker_ap


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
  });

  if ('serviceWorker' in navigator) {
    
    try {
        navigator.serviceWorker.register('sw_workbox.js');

        console.log('SW was registered')
        /* if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('HERE!')
            if (Notification.permission !== 'denied') {
        
                console.log('Permission!!')
            }
            navigator.serviceWorker.ready.then( sw => {
                sp.sw = sw;

                sw.pushManager.getSubscription()
                .then(s =>  {
                    let isSubscribed = s !== null;
                    if(isSubscribed) {
                        console.log('Subscribed')
                    }
                })
            })
        } */
    } catch (error) {
        console.log('Sw reg error')
        
    }
  }
});

async function updateNews ( source = defaultSource) {

  const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=fa983a95e9a44401aac791dad9262179`);
  const json = await res.json();

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

window.addEventListener('beforeinstallprompt', event => {
    event.userChoice.then(choice => {
        const message = choice.outcome === 'dismissed' ? 'User cancelled' : 'User installed';
        console.log(message);
    });
});

