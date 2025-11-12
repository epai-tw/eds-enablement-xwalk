// Constants
const CUSTOM_EFFECT_NAME = 'creative';
const CAROUSEL_SELECTOR = '.carousel:has(.cmp-carousel:not([data-init="false"]))';

// Custom effect settings
const customEffectSettings = {
  effect: CUSTOM_EFFECT_NAME,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  loop: true,
  loopedSlides: 3,
  grabCursor: true,
  watchSlidesProgress: true,
  initialSlide: 0,
  preventInteractionOnTransition: true,
  creativeEffect: {
    limitProgress: 1,
    prev: { translate: [-250, 0, 0], scale: 0.8 },
    next: { translate: [250, 0, 0], scale: 0.8 },
  },
  breakpoints: {
    768: {
      creativeEffect: {
        limitProgress: 1,
        prev: { translate: [-400, 0, 0], scale: 0.51 },
        next: { translate: [400, 0, 0], scale: 0.51 },
      },
    },
    1280: {
      creativeEffect: {
        limitProgress: 1,
        perspective: false,
        prev: { translate: [-740, 0, 0], scale: 0.621 },
        next: { translate: [740, 0, 0], scale: 0.621 },
      },
    },
  },
};

/**
 * Manages video playback (play/pause) and handles promises to avoid uncaught errors.
 * @param {HTMLVideoElement} video - The video element to control.
 * @param {'play' | 'pause'} action - The action to perform.
 */
const manageVideoPlayback = (video, action) => {
  if (!video) {
    return;
  }

  let promise;
  if (action === 'play') {
    if (typeof video.play === 'function') {
      promise = video.play();
    }
  } else if (action === 'pause') {
    if (typeof video.pause === 'function') {
      promise = video.pause();
    }
  } else {
    console.error('Invalid video action:', action);
    return;
  }

  if (promise !== undefined) {
    promise.catch((e) => console.error(`Video ${action} failed:`, e));
  }
};

/**
 * Waits for the first user interaction (click, keydown, touchstart, mousemove).
 * Falls back to a timeout of 5 seconds if no interaction is detected.
 * @returns {Promise<void>}
 */
const waitForFirstUserInteraction = () => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve();
    }, 5000);

    const startEvents = ['click', 'keydown', 'touchstart', 'mousemove'];
    const handler = () => {
      startEvents.forEach((event) => window.removeEventListener(event, handler));
      clearTimeout(timeout);
      resolve();
    };
    startEvents.forEach((event) => window.addEventListener(event, handler, { once: true }));
  });
};

/**
 * Updates the focusability of interactive elements within a slide.
 * @param {HTMLElement} slide - The slide element.
 * @param {boolean} isActive - Whether the slide is currently active.
 */
const updateSlideFocusability = (slide, isActive) => {
  if (!slide) {
    return;
  }

  slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
  const focusables = slide.querySelectorAll('button, [href], input, select, textarea, [tabindex]');
  focusables.forEach((el) => {
    el.tabIndex = isActive ? 0 : -1;
  });
};

/**
 * Loads a video by transferring the URL from a data attribute to the src attribute.
 * This prevents the video from loading on page load.
 * @param {HTMLVideoElement} video - The video element to load.
 */
const loadVideo = (video) => {
  if (video?.dataset?.src) {
    video.src = video.dataset.src;
    video.removeAttribute('data-src');
    video.load();
  }
};

// Video playback handler
const handleVideoPlayback = (swiper) => {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const activeVideo = activeSlide?.querySelector('.hero-video');

  // Pause all videos except the active one
  swiper.slides.forEach((slide) => {
    const video = slide.querySelector('.hero-video');
    if (video && video !== activeVideo) {
      manageVideoPlayback(video, 'pause');
      video.currentTime = 0;
    }
  });

  // Load and play the active video
  if (activeVideo && swiper.autoplay.running) {
    loadVideo(activeVideo);
    manageVideoPlayback(activeVideo, 'play');
  }
};

const toggleSliderVideo = (videoPlayPauseBtn) => {
  const activeSlide = document.querySelector('.swiper-slide-active');
  let activeSlideProdName = document.querySelector('.swiper-slide-active .product-name')?.innerHTML;

  const activeVideo = activeSlide?.querySelector('video');
  const mediaControls = document.querySelector('.cmp-carousel__media-controls');
  if (activeSlide && activeVideo) {
    if (activeVideo.paused) {
      manageVideoPlayback(activeVideo, 'play');
      videoPlayPauseBtn?.setAttribute('aria-label', 'Pause ' + activeSlideProdName);
      videoPlayPauseBtn?.setAttribute('title', 'Pause ' + activeSlideProdName);
    } else {
      manageVideoPlayback(activeVideo, 'pause');
      videoPlayPauseBtn?.setAttribute('aria-label', 'Play ' + activeSlideProdName);
      videoPlayPauseBtn?.setAttribute('title', 'Play ' + activeSlideProdName);
    }
    mediaControls?.classList.toggle('paused');
  }
};

// Autoplay toggle handler
const toggleAutoplayHandler = (swiper) => {
  const isPaused = swiper.el.classList.contains('is-autoplay-paused');
  const activeSlide = document.querySelector('.swiper-slide-active');
  const activeVideo = activeSlide?.querySelector('video');
  const mediaControls = document.querySelector('.cmp-carousel__media-controls');
  const isVideoPaused = document.querySelector('.cmp-carousel__media-controls.paused');
  if (isPaused) {
    swiper.autoplay.resume();
    if (isVideoPaused) {
      manageVideoPlayback(activeVideo, 'pause');
      mediaControls?.classList.add('paused');
    }
  } else {
    swiper.autoplay.pause();
    swiper.el.classList.add('is-manual-autoplay');
    // To maintain the pause / play state of the video.
    if (isVideoPaused) {
      manageVideoPlayback(activeVideo, 'pause');
      mediaControls?.classList.add('paused');
    } else {
      manageVideoPlayback(activeVideo, 'play');
    }
  }
};

// Observes the swiper container to determine if it is in the viewport
const swiperAutoplayObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const swiperInstance = entry.target.swiperInstance;
      const isManualAutoplay = entry.target.classList.contains('is-manual-autoplay');

      // If autoplay is paused by user or swiper instance is not available, skip
      if (isManualAutoplay || !swiperInstance) {
        return;
      }

      if (entry.isIntersecting) {
        if (swiperInstance.autoplay.timeLeft > 0) {
          // Resume autoplay when in view
          swiperInstance.autoplay.resume();
        } else {
          // Start autoplay when in view and handle video playback on first active slide
          swiperInstance.autoplay.start();
          handleVideoPlayback(swiperInstance);
        }
      } else {
        swiperInstance.autoplay.pause(); // Stop autoplay when out of view
      }
    });
  },
  {
    threshold: 0.5,
  },
);

// Initialize Swiper on AEM Carousel
window.initializeSwiperOnAEMCarousel = (carousel) => {
  const carouselElement = carousel.querySelector('.cmp-carousel');
  const {
    slidesPerView = 1,
    spaceBetween = 8,
    slidesPerViewTablet = 1,
    slidesPerViewDesktop = 1,
    spaceBetweenTablet = 8,
    spaceBetweenDesktop = 20,
    loopSlides = false,
    carouselEffect = 'slide',
    cmpDelay: delay,
    prevSlideMessage = 'Previous slide',
    nextSlideMessage = 'Next slide',
  } = carouselElement.dataset;

  const parsedDelay = parseInt(delay, 10);
  const isAutoplayEnabled = parsedDelay > 0;
  const isCustomEffect = carouselEffect === CUSTOM_EFFECT_NAME;

  // DOM elements
  const contentContainer = carousel.querySelector('.cmp-carousel__content');
  const items = [...carousel.querySelectorAll('.cmp-carousel__item')];
  const indicators = carousel.querySelector('.cmp-carousel__indicators');
  const prevEl = carousel.querySelector('.cmp-carousel__action--previous');
  const nextEl = carousel.querySelector('.cmp-carousel__action--next');
  const actions = carouselElement.querySelector('.cmp-carousel__actions');
  const mediaControls = carouselElement.querySelector('.cmp-carousel__media-controls');
  const videoPlayPauseBtn = mediaControls?.querySelector(
    '.cmp-carousel__media-control--play-pause',
  );
  let playPauseBtn = null;

  // To check if bullet key activation is used
  // This is used to differentiate between slide changes via keyboard focus and other means
  let bulletKeyActivated = false;

  // Create Swiper structure
  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';

  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    item.classList.add('swiper-slide');
    fragment.appendChild(item);
  });
  swiperWrapper.appendChild(fragment);

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'swiper';
  swiperContainer.appendChild(swiperWrapper);

  contentContainer.replaceChildren(swiperContainer);

  // Render navigation buttons
  if (actions) {
    swiperContainer.appendChild(actions);
  }

  // Check if pagination elements are present and create carousel footer element
  const hasPagination = !!indicators;

  const carouselFooter = document.createElement('div');
  carouselFooter.className = 'cmp-carousel__footer';

  // Create indicators group which will hold the indicators and autoplay toggle button
  const indicatorsGroup = document.createElement('div');
  indicatorsGroup.className = 'cmp-carousel__indicators-group';

  if (hasPagination) {
    // Append footer to the carousel content element
    contentContainer.appendChild(carouselFooter);

    indicators.classList.add('swiper-pagination');
    indicatorsGroup.appendChild(indicators);

    carouselFooter.appendChild(indicatorsGroup);

    // Append media controls to carousel footer if available
    if (mediaControls) {
      carouselFooter.appendChild(mediaControls);
    }
  }

  // Autoplay configuration.
  // This will be used to initialize the autoplay feature post user interaction
  const autoplayConfig = {
    delay: parsedDelay,
    disableOnInteraction: false,
    waitForTransition: true,
  };

  // Base Swiper configuration
  const baseConfig = {
    slidesPerView,
    spaceBetween,
    watchSlidesProgress: true,
    loop: loopSlides !== 'false' && Boolean(loopSlides),
    navigation: { prevEl, nextEl, disabledClass: 'cmp-carousel__action--disabled' },
    pagination: {
      el: indicators,
      clickable: true,
      bulletClass: 'cmp-carousel__indicator',
      bulletActiveClass: 'cmp-carousel__indicator--active',

      renderBullet: (index, className) => {
        return `<li class="${className}" aria-label="Go to slide ${index + 1}" role="tab"></li>`;
      },
    },
    a11y: {
      enabled: true,
      slideLabelMessage: 'Slide {{index}} of {{slidesLength}}',
      paginationBulletMessage: 'Go to slide {{index}}',
      prevSlideMessage: prevSlideMessage,
      nextSlideMessage: nextSlideMessage,
    },
    autoplay: false,
    breakpoints: {
      768: {
        slidesPerView: slidesPerViewTablet,
        spaceBetween: spaceBetweenTablet,
      },
      1024: {
        slidesPerView: slidesPerViewDesktop,
        spaceBetween: spaceBetweenDesktop,
      },
    },
    on: {
      afterInit(swiper) {
        swiper.slides.forEach((slide) => {
          slide.setAttribute('tabindex', '-1');

          // Set autoplay delay for each slide based on video duration
          const slideVideo = slide?.querySelector('.hero-video');
          if (slideVideo) {
            if (slideVideo.readyState >= 1 && !isNaN(slideVideo.duration)) {
              // Metadata is already loaded
              slide.dataset.swiperAutoplay = (slideVideo.duration + 1) * 1000;
            } else {
              // Wait for metadata
              slideVideo.addEventListener('loadedmetadata', () => {
                slide.dataset.swiperAutoplay = (slideVideo.duration + 1) * 1000;
              });
            }
          }
        });

        // Set initial accessibility state for all slides
        if (isCustomEffect || isAutoplayEnabled) {
          swiper.slides.forEach((slide, index) => {
            updateSlideFocusability(slide, index === swiper.activeIndex);
          });
        }

        // A11Y: Add event listener for pagination bullets
        // Watch for keyboard activation on bullets
        indicators?.addEventListener('keydown', function (e) {
          const isBullet = e?.target?.classList.contains('swiper-pagination-bullet');
          const isActivationKey = e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar';

          if (isBullet && isActivationKey) {
            e.preventDefault();
            bulletKeyActivated = true;
          }
        });

        // Create autoplay toggle button if pagination is enabled
        if (hasPagination) {
          // Create autoplay toggle button
          let activeSlideProdName = document.querySelector(
            '.swiper-slide-active .product-name',
          )?.innerHTML;

          playPauseBtn = document.createElement('button');
          playPauseBtn.className = 'carousel-autoplay-toggle';
          playPauseBtn.setAttribute('aria-label', 'Play carousel auto-play');
          videoPlayPauseBtn?.setAttribute('aria-label', 'Play ' + activeSlideProdName);

          // Check if button already exists
          const existingBtn = indicatorsGroup.querySelector('.carousel-autoplay-toggle');
          if (existingBtn) {
            indicatorsGroup.replaceChild(playPauseBtn, existingBtn);
          } else {
            indicatorsGroup.appendChild(playPauseBtn);
          }

          playPauseBtn.addEventListener('click', () => toggleAutoplayHandler(swiper));
          videoPlayPauseBtn?.addEventListener('click', () => toggleSliderVideo(videoPlayPauseBtn));
        }

        // Remove aria-live from swiper wrapper

        swiperContainer.querySelector('.swiper-wrapper')?.setAttribute('aria-live', 'off');
        swiperContainer.closest('.cmp-carousel')?.setAttribute('aria-live', 'off');
      },
      autoplayTimeLeft(swiper, time, progress) {
        swiper.pagination.bullets.forEach((bullet, idx) => {
          bullet.style.setProperty('--slide-progress', idx === swiper.realIndex ? 1 - progress : 0);
        });
      },
      slideNextTransitionStart(swiper) {
        let activeSlideProdName = document.querySelector(
          '.swiper-slide-active .product-name',
        )?.innerHTML;
        videoPlayPauseBtn?.setAttribute('aria-label', 'Play ' + activeSlideProdName);
      },
      slideChange(swiper) {
        let activeSlideProdName = document.querySelector(
          '.swiper-slide-active .product-name',
        )?.innerHTML;
        videoPlayPauseBtn?.setAttribute('aria-label', 'Play ' + activeSlideProdName);
        mediaControls?.classList.remove('paused');
        // Reset bullet progress bars without animation
        swiper.pagination.bullets.forEach((bullet) => {
          const progressEl = bullet.querySelector('.bullet-progress');
          if (!progressEl) {
            return;
          }

          progressEl.style.transition = 'none';
          progressEl.style.transform = 'scaleX(0)';
        });
      },
      autoplayStart(swiper) {
        // Add autoplay class to swiper element
        swiper.el.classList.add('is-autoplay-enabled');
        swiper.el.classList.remove('is-autoplay-paused');
      },
      autoplayStop(swiper) {
        swiper.el.classList.remove('is-autoplay-enabled', 'is-autoplay-paused');
      },
      autoplayPause(swiper) {
        let activeSlideProdName = document.querySelector(
          '.swiper-slide-active .product-name',
        )?.innerHTML;
        playPauseBtn.setAttribute('aria-label', 'Play');
        videoPlayPauseBtn?.setAttribute('aria-label', 'Play ' + activeSlideProdName);

        swiper.el.classList.add('is-autoplay-paused');

        // Pause the video in the active slide
        const activeVideo = swiper.slides[swiper.activeIndex]?.querySelector('.hero-video');
        manageVideoPlayback(activeVideo, 'pause');
      },
      autoplayResume(swiper) {
        let activeSlideProdName = document.querySelector(
          '.swiper-slide-active .product-name',
        )?.innerHTML;
        playPauseBtn.setAttribute('aria-label', 'Pause carousel auto-play');
        videoPlayPauseBtn?.setAttribute('aria-label', 'Pause ' + activeSlideProdName);

        swiper.el.classList.remove('is-autoplay-paused', 'is-manual-autoplay');

        // Resume the video in the active slide
        const activeVideo = swiper.slides[swiper.activeIndex]?.querySelector('.hero-video');
        manageVideoPlayback(activeVideo, 'play');
      },
      slideChangeTransitionEnd: (swiper) => {
        // Handle video playback on slide change
        handleVideoPlayback(swiper);

        /**
         * A11Y: Slide change is triggered by pagination
         * Then remove aria-hidden attribute from the active slide and move focus on the active slide.
         * This will allow the screen reader to read the content of the active slide.
         */
        if (bulletKeyActivated) {
          swiper.slides[swiper.activeIndex].focus();
        }
        bulletKeyActivated = false; // Reset after each change

        // Update accessibility for the new and previous slides
        if (isCustomEffect || isAutoplayEnabled) {
          updateSlideFocusability(swiper.slides[swiper.previousIndex], false);
          updateSlideFocusability(swiper.slides[swiper.activeIndex], true);
        }
      },
    },
  };

  // Merge custom effect settings
  const finalConfig = isCustomEffect ? { ...baseConfig, ...customEffectSettings } : baseConfig;

  // Initialize Swiper
  const swiperInstance = new Swiper(swiperContainer, finalConfig);

  // Store reference for the observer to use
  swiperContainer.swiperInstance = swiperInstance;

  // Wait for first user interaction before starting autoplay & video
  waitForFirstUserInteraction().then(() => {
    // Handle autoplay observer
    // Start autoplay if enabled
    if (isAutoplayEnabled) {
      swiperInstance.params.autoplay = autoplayConfig;

      swiperAutoplayObserver.observe(swiperContainer);
    }
  });

  return swiperInstance;
};

document.addEventListener('eds-DOMContentLoaded', () => {
  // Initialize all carousels
  document.querySelectorAll(CAROUSEL_SELECTOR).forEach(initializeSwiperOnAEMCarousel);
  // Activate gradient animation
  // Added here as we need to delay until the user has interacted with page
  const gradientAnimation = document.querySelectorAll('.gradient-animation');
  if (gradientAnimation) {
    waitForFirstUserInteraction().then(() => {
      gradientAnimation.forEach((animation) => {
        animation.classList.add('gradient-animation--active');
      });
    });
  }
});
