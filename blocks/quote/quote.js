  import $ from 'jquery';

export default function decorate(block) {
  const [quoteWrapper] = block.children;
  console.log('', $(block));
  debugger
  const blockquote = document.createElement('blockquote');
  blockquote.textContent = quoteWrapper.textContent.trim();
  quoteWrapper.replaceChildren(blockquote);
}
