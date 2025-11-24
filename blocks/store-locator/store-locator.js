/* eslint-disable */
export async function initMap() {
// eslint-disable-next-line no-undef
  const { Map } = await google.maps.importLibrary('maps');

  const map = new Map(document.getElementById('locator-map'), {
    center: { lat: 36.121, lng: -115.170 },
    zoom: 17,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    styles: [
      {
        featureType: 'all',
        stylers: [
          { lightness: -5 },
          { saturation: -100 },
          { visibility: 'simplified' },
        ],
      },
    ],
  });
  // eslint-disable-next-line no-undef
  const infoWindow = new google.maps.InfoWindow({
    map,
  });
}

export default function decorate(block) {
  const pText = block.querySelector('p').textContent;
  const subhead = block.querySelectorAll('p')[1].textContent;
  const searchplaceholder = block.querySelectorAll('p')[2].textContent;
  const buttontext = block.querySelectorAll('p')[3].textContent;
  block.textContent = '';  
  window.initMap = async () => {
    initMap();
  };

  const locatorDOM = document.createRange().createContextualFragment(`
  <div class="shopfinder">
    <div class="sidepanel">
      <h3 class="sidepanel__title">${pText}</h3>
    <div class="search">
      <p class="search__title">${subhead}</p>
      <div class="search__box">
        <input class="search__input" type="text" placeholder="${searchplaceholder}" name="search"></input>
        <button class="search__button">${buttontext}</button>
      </div>
    </div>
    </div>
      <div class="map" id="locator-map">
    </div>
  </div>
  `);

  block.append(locatorDOM);
}