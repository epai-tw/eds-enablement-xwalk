// export default function decorate(block) {
//   const [wrapper] = block.children;
//   const carousel = document.createElement('carousel');
//   const container = `<div class="cmp-advantage-card">
//   <div class="cmp-advantage-card__image-wrapper">
//     <img
//       src="/content/dam/eds-enablement-xwalk/asus-cto-sites/advantage.jpg"
//       alt="Ultimate Gaming Experience"
//       class="cmp-advantage-card__image"
//     />
//     <video class="cmp-advantage-card__video" playsinline controls>
//       <source src="/content/dam/eds-enablement-xwalk/asus-cto-sites/videos/hero-banner-video-1.mp4" type="video/mp4">
//       Your browser does not support the video tag.
//     </video>
//   </div>
//   <div class="cmp-advantage-card__overlay">
//     <div class="cmp-advantage-card__content">
//       <h3 class="cmp-advantage-card__title">Ultimate Gaming Experience</h3>
//       <p class="cmp-advantage-card__desc">
//         Our systems are engineered to enhance both performance and noise control, guaranteeing
//         stability and an unparalleled gaming experience.
//       </p>
//       <button class="cmp-advantage-card__btn btn">Watch now <img src="/content/dam/eds-enablement-xwalk/asus-cto-sites/icon-play-filled.svg" alt="play-icon" /></button>
//     </div>
//   </div>
// </div>`;
//   carousel.innerHTML = `<div class='container'>
//     <div class="carousel panelcontainer">
//       <div class="section-heading content-center">
//         <h2>Carousel 3D effect</h2>
//       </div>
//       <div
//         id="carousel-4e80c7e13a"
//         class="cmp-carousel"
//         role="group"
//         aria-live="polite"
//         aria-roledescription="carousel"
//         data-cmp-is="carousel"
//         data-cmp-delay="5000"
//         data-carousel-effect="creative"
//       >
//         <div class="cmp-carousel__content">
//           <div id="carousel-4e80c7e13a-item-30704e84cd-tabpanel" class="cmp-carousel__item cmp-carousel__item--active">
//             ${container}
//           </div>
//           <div id="carousel-4e80c7e13a-item-645fc67b90-tabpanel" class="cmp-carousel__item">
//             ${container}
//           </div>
//           <div id="carousel-4e80c7e13a-item-85d21a3332-tabpanel" class="cmp-carousel__item">
//             ${container}
//           </div>
//           <div id="carousel-4e80c7e13a-item-85d21a3334-tabpanel" class="cmp-carousel__item">
//             ${container}
//           </div>
//           <div id="carousel-4e80c7e13a-item-85d21a3335-tabpanel" class="cmp-carousel__item">
//             ${container}
//           </div>
//         </div>
//
//         <!-- Carousel actions - Previous/Next -->
//         <div class="cmp-carousel__actions">
//           <button class="cmp-carousel__action cmp-carousel__action--previous" type="button" aria-label="Previous">
//             <span class="icon icon--arrow-left"></span>
//           </button>
//           <button class="cmp-carousel__action cmp-carousel__action--next" type="button" aria-label="Next">
//             <span class="icon icon--arrow-right"></span>
//           </button>
//         </div>
//
//         <!-- Pagination indicatoors -->
//         <ol class="cmp-carousel__indicators" role="tablist" aria-label="Choose a slide to display"></ol>
//       </div>
//     </div>
//   </div>`;
//   wrapper.replaceChildren(carousel);
//
//   import $ from 'jquery';
//
//   // 在這裡使用 jQuery
//   $(document).ready(() => {
//     console.log('jQuery 已經成功載入！');
//     $('body').css('background-color', 'lightgray');
//   });
//
//   // /blocks/carousel/index.js
//
// // 定義 Swiper 初始化的函式
//   function initSwiper(block) {
//     // 確保 Swiper 函式已經載入
//     if (window.Swiper) {
//       // 使用 Swiper 函式來建立一個新的實例
//       new Swiper(block.querySelector('.swiper'), {
//         // 在這裡設定 Swiper 的參數
//         loop: true,
//         pagination: {
//           el: '.swiper-pagination',
//         },
//         navigation: {
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         },
//       });
//     } else {
//       // 如果 Swiper 還沒載入，可以延遲執行，直到載入完成
//       setTimeout(() => initSwiper(block), 100);
//     }
//   }
// }

export default function decorate(block) {
  // 在這個函式中，你可以動態建立你的 Swiper HTML 結構
  // 例如：
  block.innerHTML = `
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  `;
debugger
      if (window.Swiper) {
      // 使用 Swiper 函式來建立一個新的實例
      new Swiper(block.querySelector('.swiper'), {
        // 在這裡設定 Swiper 的參數
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    } else {
      // 如果 Swiper 還沒載入，可以延遲執行，直到載入完成
      setTimeout(() => initSwiper(block), 100);
    }
  }
}
