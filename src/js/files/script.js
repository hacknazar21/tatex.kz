// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import datepicker from 'js-datepicker'


const inputs = document.querySelectorAll("[data-phone]");
const checkboxes = document.querySelectorAll(".checkbox");
const radiobuttons = document.querySelectorAll(".radio");
const datafor = document.querySelectorAll("[data-for]");
const calendares = document.querySelectorAll(".calendar");


let dataforList = {
    name: [],
    data: []
};
if (calendares.length != 0) {
    const picker = new datepicker('.calendar', {
        formatter: (input, date, instance) => {
            const value = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            input.value = value // => '1/1/2099'
        },
        customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        customDays: ['Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вос']


    });

    let today = new Date();
    today.setUTCHours(today.getUTCHours() + 6)
    let hours = today.getUTCHours();
    let minutes = today.getUTCMinutes();
    if (hours > 15 && minutes > 30) {
        today.setUTCDate(today.getUTCDate() + 1)
        picker.setMin(today);
    }
    else
        picker.setMin(today);

    setInterval(() => {
        today = new Date();
        today.setUTCHours(today.getUTCHours() + 6)
        hours = today.getUTCHours();
        minutes = today.getUTCMinutes();
        if (hours > 15 && minutes > 30) {
            today.setUTCDate(today.getUTCDate() + 1)
            picker.setMin(today);
        }
        else
            picker.setMin(today);

    }, 60000)

}
if (datafor.length != 0) {
    datafor.forEach(data => {
        dataforList.name.push(data.dataset.for);
        dataforList.data.push(data);
        data.remove();
    });
}
if (radiobuttons.length != 0) {
    radiobuttons.forEach(radiobutton => {
        if (radiobutton.checked) {
            radiobutton.classList.add('active');
            const index = dataforList.name.findIndex(el => el == radiobutton.value);
            document.querySelector(".order__type").insertAdjacentElement("afterend", dataforList.data[index]);
        }
        radiobutton.addEventListener('click', (event) => {
            if (event.target.checked) {
                document.querySelector('.radio.active').classList.remove('active');
                radiobutton.classList.add('active');
                const index = dataforList.name.findIndex(el => el == event.target.value);
                document.querySelector('.form-order__body').remove();

                document.querySelector(".order__type").insertAdjacentElement("afterend", dataforList.data[index]);
            }

        });
    });
}
if (checkboxes.length != 0) {
    checkboxes.forEach(checkbox => {

        checkbox.addEventListener('click', (event) => {
            console.log(event.target);
            if (event.target.checked) {
                event.target.classList.add('active');
            }
            else if (event.target.classList.contains('active')) {
                event.target.classList.remove('active');
            }
        });
    });
}
inputs.forEach(input => {
    var iti = intlTelInput(input, {
        initialCountry: "kz",
        autoPlaceholder: 'aggressive',
        preferredCountries: ['kz', 'ru'],
        separateDialCode: true
    });

    Inputmask({ "mask": `(999) 999-9999` }).mask(input);


});






let sortBy = 0;
const tableDataInit = document.querySelectorAll('.table-history__row-data');


function SortTable(data, filterId, direction, columns, rows) {
    let dataToSort = new Array();
    let sortedData = new Array();
    let indexData = 0;
    for (var i = 0; i < rows; i++) {
        dataToSort[i] = new Array();
        for (var j = 0; j < columns; j++) {
            dataToSort[i][j] = data[indexData++];
        }
    }

    let sortTablefcn = (a, b) => {
        if (direction == 'up' && a[filterId].innerHTML > b[filterId].innerHTML) return -1;
        else if (direction == 'up' && a[filterId].innerHTML < b[filterId].innerHTML) return 1;
        else if (direction == 'down' && a[filterId].innerHTML > b[filterId].innerHTML) return 1;
        else if (direction == 'down' && a[filterId].innerHTML < b[filterId].innerHTML) return -1;
    }

    dataToSort.sort(sortTablefcn);

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            sortedData.push(dataToSort[i][j]);
        }
    }
    return sortedData;
}

document.addEventListener('click', (event) => {
    if (event.target.closest('[data-tabs]')) {
        event.preventDefault();
        const formInput = document.getElementsByClassName('header-search__form');
        if (formInput[0].classList.contains('_action-mobile') && !formInput[0].contains(event.target)) {
            formInput[0].classList.remove('_action-mobile');
            document.documentElement.classList.remove('_action-search');
        }
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
    else if (event.target.classList.contains('header-search__btn') && (document.querySelector('._dynamic_adapt_') != null || window.innerWidth < 860)) {
        const formInput = document.getElementsByClassName('header-search__form');
        if (!formInput[0].classList.contains('_action-mobile')) {
            event.preventDefault();
            formInput[0].classList.add('_action-mobile');
            document.documentElement.classList.add('_action-search');
        }
    }
    else if (event.target.classList.contains('table-history__filter') || event.target.parentNode.classList.contains('table-history__filter')) {
        event.preventDefault();
        const targetEl = event.target.parentNode.classList.contains('table-history__filter') ? event.target.parentNode : event.target;
        const filters = document.querySelectorAll('.table-history__filter');
        const tableData = document.querySelectorAll('.table-history__row-data');
        const targetFilterId = Array.prototype.indexOf.call(filters, targetEl);
        const numberOfColumns = filters.length;
        const numberOfRows = tableData.length / numberOfColumns;
        const arrowUp = document.querySelector('._filter-arrow-up');
        const arrowDown = document.querySelector('._filter-arrow-down');

        let sortedData = null;


        (arrowUp != targetEl && arrowUp != null) ? (arrowUp.classList.remove('_filter-arrow-up'), sortBy = 0) : null;
        (arrowDown != targetEl && arrowDown != null) ? (arrowDown.classList.remove('_filter-arrow-down'), sortBy = 0) : null;
        sortBy++;

        switch (sortBy) {
            case 1:
                sortedData = SortTable(tableData, targetFilterId, 'down', numberOfColumns, numberOfRows);
                targetEl.classList.add('_filter-arrow-up');
                break;
            case 2:
                sortedData = SortTable(tableData, targetFilterId, 'up', numberOfColumns, numberOfRows);
                targetEl.classList.contains('_filter-arrow-up') ? targetEl.classList.remove('_filter-arrow-up') : null;
                targetEl.classList.add('_filter-arrow-down');
                break;
            default:
                targetEl.classList.contains('_filter-arrow-down') ? targetEl.classList.remove('_filter-arrow-down') : null;
                sortBy = 0;
                tableData.forEach(element => {
                    document.querySelector('.history__table').removeChild(element);
                });
                tableDataInit.forEach(element => {
                    document.querySelector('.history__table').appendChild(element);
                });
                break;
        }
        if (sortBy != 0) {
            tableData.forEach(element => {
                document.querySelector('.history__table').removeChild(element);

            });
            sortedData.forEach(element => {
                document.querySelector('.history__table').appendChild(element);
            });
        }
    }
    else {
        const formInput = document.getElementsByClassName('header-search__form');
        if (formInput[0].classList.contains('_action-mobile') && !formInput[0].contains(targetEl)) {
            formInput[0].classList.remove('_action-mobile');
            document.documentElement.classList.remove('_action-search');
        }
    }
});