// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

function calcBtn() {
    const calc_btn = document.getElementsByClassName('active-btn-calc');
    const input_calc = document.getElementsByClassName('first-screen-calc__params');
    const calc_btns = document.getElementsByClassName('calc-button');

    for (let btn of calc_btns) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            let el = event.target;
            if (!el.classList.contains('active-btn-calc')) {
                document.getElementsByClassName('active-btn-calc')[0].classList.remove('active-btn-calc');
                el.classList.add('active-btn-calc');
            }
            switch (calc_btn[0].textContent) {
                case 'Документ':
                    for (let el of input_calc) {
                        if (el.classList.contains('doc-params') && el.classList.contains('_hide')) {
                            el.classList.remove('_hide');
                        }
                        else if (el.classList.contains('package-params') && !el.classList.contains('_hide')) {
                            el.classList.add('_hide');
                        }
                    }
                    break;
                case 'Посылка':
                    for (let el of input_calc) {
                        if (el.classList.contains('package-params') && el.classList.contains('_hide')) {
                            el.classList.remove('_hide');
                        }
                        else if (el.classList.contains('doc-params') && !el.classList.contains('_hide')) {
                            el.classList.add('_hide');
                        }
                    }
                    break;
                default:
                    break;
            }
        })
    }



}
calcBtn();

/*

                        */