export default function decorate(block) {
  const [wrapper] = block.children;
  const carousel = document.createElement('carousel');
  carousel.innerHTML = `<div class="cmp-advantage-card">
  <div class="cmp-advantage-card__image-wrapper">
    <img
      src="/content/dam/eds-enablement-xwalk/asus-cto-sites/advantage.jpg"
      alt="Ultimate Gaming Experience"
      class="cmp-advantage-card__image"
    />
    <video class="cmp-advantage-card__video" playsinline controls>
      <source src="/content/dam/eds-enablement-xwalk/asus-cto-sites/videos/hero-banner-video-1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
  <div class="cmp-advantage-card__overlay">
    <div class="cmp-advantage-card__content">
      <h3 class="cmp-advantage-card__title">Ultimate Gaming Experience</h3>
      <p class="cmp-advantage-card__desc">
        Our systems are engineered to enhance both performance and noise control, guaranteeing
        stability and an unparalleled gaming experience.
      </p>
      <button class="cmp-advantage-card__btn btn">Watch now <img src="/content/dam/eds-enablement-xwalk/asus-cto-sites/icon-play-filled.svg" alt="play-icon" /></button>
    </div>
  </div>
</div>`;
  wrapper.replaceChildren(carousel);
}
