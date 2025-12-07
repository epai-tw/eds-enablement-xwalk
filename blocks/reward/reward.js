/* eslint-disable no-underscore-dangle */
export default async function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const [, , title, longDescr, , firstCta] = props;

  block.innerHTML = `
  <div class='reward-content'>
      <div class='reward-left'>
          <h4 data-aue-prop="headline" data-aue-label="headline" data-aue-type="text" class='headline'>${title.innerHTML}</h4>
          <p data-aue-prop="detail" data-aue-label="detail" data-aue-type="richtext" class='detail'>${longDescr.innerHTML}</p>
      </div>
      <div class='reward-right'>
         <a href="/signup" data-aue-prop="callToAction" data-aue-label="Call to Action" data-aue-type="text" class='button secondary'>${firstCta.innerText}</a>
      </div>
  </div>
`;
}
