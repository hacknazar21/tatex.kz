/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Autoplay, Pagination } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/
function updateClasses({ $el, slides, activeIndex }) {
	$el.find('.swiper-slide-prev-prev').removeClass('swiper-slide-prev-prev');
	slides.eq(activeIndex).prev().prev().addClass('swiper-slide-prev-prev');

	$el.find('.swiper-slide-next-next').removeClass('swiper-slide-next-next');
	slides.eq(activeIndex).next().next().addClass('swiper-slide-next-next');
}
// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';
// Инициализация слайдеров

async function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.swiper')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		await new Swiper('.swiper', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая

			observer: true,
			observeParents: true,
			slidesPerView: 4.5,
			spaceBetween: 32,
			autoHeight: true,
			speed: 800,
			modules: [Navigation, Autoplay, Pagination],

			//touchRatio: 0,
			//simulateTouch: false,
			loop: false,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},*/


			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3.5,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4.5,
					spaceBetween: 32,
				},
			},

			// События
			on: {

			}
		});
	}
	if (document.querySelector('.swiper-first-screen')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		await new Swiper('.swiper-first-screen', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая


			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 800,
			modules: [Autoplay, Pagination],

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			preloadImages: true,


			// Эффект

			/* autoplay: {
				delay: 5000,
				disableOnInteraction: false
			}, */


			// Пагинация

			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},



			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			/*navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},*/

			// Брейкпоинты

			/*	breakpoints: {
					320: {
						slidesPerView: 1,
						spaceBetween: 20,
						autoHeight: true,
					},
					768: {
						slidesPerView: 2.5,
						spaceBetween: 20,
					},
					992: {
						slidesPerView: 3.5,
						spaceBetween: 20,
					},
					1268: {
						slidesPerView: 4.5,
						spaceBetween: 32,
					},
				},
	*/
			// События
			on: {

			}
		});
	}
	if (document.querySelector('.swiper-reviews')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		await new Swiper('.swiper-reviews', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая


			slidesPerView: 1,
			spaceBetween: 20,
			autoHeight: false,
			speed: 1000,
			modules: [Autoplay, Pagination],

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			preloadImages: true,
			loopAdditionalSlides: 2,

			// Эффект

			autoplay: {
				delay: 2000,
				disableOnInteraction: false
			},


			// Пагинация

			pagination: {
				el: '.swiper-reviews .swiper-pagination',
				clickable: true
			},



			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			/*navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},*/

			// Брейкпоинты

			/*	breakpoints: {
					320: {
						slidesPerView: 1,
						spaceBetween: 20,
						autoHeight: true,
					},
					768: {
						slidesPerView: 2.5,
						spaceBetween: 20,
					},
					992: {
						slidesPerView: 3.5,
						spaceBetween: 20,
					},
					1268: {
						slidesPerView: 4.5,
						spaceBetween: 32,
					},
				},
	*/
			// События
			on: {
				init() {
					updateClasses(this);
				},
				slideChange() {
					updateClasses(this);
				},
			},
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});