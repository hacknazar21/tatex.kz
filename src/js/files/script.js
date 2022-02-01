// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


document.addEventListener('click', (event) => {
    if (event.target.closest('[data-tabs]')) {
        event.preventDefault();
        const tabsBoxes = document.querySelectorAll('[data-tabsbox]');
        for (let tabsBox of tabsBoxes) {
            if (tabsBox.contains(event.target)) {
                const tabId = event.target.dataset.tabs ? event.target.dataset.tabs : null;
                const tab = tabsBox.querySelector(`[data-tab = "${tabId}"]`);
                if (tab) {
                    const activeBtn = tabsBox.querySelector('.active-btn');
                    const activeTab = tabsBox.querySelector('.active-tab');

                    if (activeBtn && activeBtn != event.target) {
                        activeBtn.classList.remove('active-btn');
                        activeTab.classList.remove('active-tab');
                    }
                    event.target.classList.add('active-btn');
                    tab.classList.add('active-tab');

                }
                else console.log("No Found :(");
            }
        }

    }
    else if (event.target.classList.contains('header-search__btn')) {
        const formInput = document.getElementsByClassName('header-search__form');
        if (!formInput[0].classList.contains('_action-mobile')) {
            event.preventDefault();
            formInput[0].classList.add('_action-mobile');
        }
    }
    else {
        const formInput = document.getElementsByClassName('header-search__form');
        if (formInput[0].classList.contains('_action-mobile') && !formInput[0].contains(event.target)) {
            formInput[0].classList.remove('_action-mobile');
        }
    }
});
/*

                        */