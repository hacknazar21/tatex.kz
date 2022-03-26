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
const tips = document.querySelectorAll("[data-tip]");
let deliveryPrice = '', deliveryDate = '';
const templatePrice = `
                <div class="first-screen-calc__info">
                    <div class="first-screen-calc__info-box doc-summ">
                        <div class="doc-summ__title">Стоимость <br>доставки</div>
                        <div class="doc-summ__value">${deliveryPrice}</div>
                        <div class="doc-summ__text"> Тенге</div>
                    </div>
                    <div class="first-screen-calc__info-box doc-date">
                        <div class="doc-date__title">Ориентировочная <br> дата доставки</div>
                        <div class="doc-date__value">${deliveryDate}</div>
                    </div>
                </div>
`;




let dataforList = {
    name: [],
    data: []
};
if (calendares.length != 0) {
    const picker = new datepicker('.calendar', {
        startDay: 1,
        formatter: (input, date, instance) => {
            const value = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            input.value = value // => '1/1/2099'
        },
        customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        customDays: ['Вос', 'Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

    });

    let today = new Date();

    let hours = today.getUTCHours();
    let minutes = today.getUTCMinutes();

    if (hours > 9) {
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
            document.querySelector('form [class*="__type"]').insertAdjacentElement("afterend", dataforList.data[index]);
        }
        radiobutton.addEventListener('click', (event) => {
            if (event.target.checked) {
                document.querySelector('.radio.active').classList.remove('active');
                radiobutton.classList.add('active');
                const index = dataforList.name.findIndex(el => el == event.target.value);
                document.querySelector('[data-for]').remove();

                document.querySelector('form [class*="__type"]').insertAdjacentElement("afterend", dataforList.data[index]);
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


function validateInput(input) {
    if (input.dataset.inputcity != null) return /^([a-zA-Zа-яА-ЯёЁ]+[-]?[a-zA-Zа-яА-ЯёЁ]*[-]?[a-zA-Zа-яА-ЯёЁ]*[-]?[a-zA-Zа-яА-ЯёЁ]*)$/.test(input.value);
    else if (input.dataset.inputnumber != null) return /^[0-9]+/.test(input.value);
}

function calculatePrice(form) {
    let data = {
        from: '',
        where: '',
        weight: '',
        height: '',
        length: '',
        width: '',
    }
    form.querySelectorAll('input[type="radio"]').forEach(radio => {
        if (radio.checked && radio.value == "document") {
            const from = form.querySelector('[name="from"]'), //получаем поле from
                where = form.querySelector('[name="where"]'), //получаем поле where
                weight = form.querySelector('[name="weight"]'); //получаем поле weight
            data.from = from.value;
            data.where = where.value;
            data.weight = weight.value;
        }
        else if (radio.checked && radio.value == "package") {
            const from = form.querySelector('[name="from"]'), //получаем поле from
                where = form.querySelector('[name="where"]'), //получаем поле where
                height = form.querySelector('[name="height"]'), //получаем поле height
                length = form.querySelector('[name="length"]'), //получаем поле length
                width = form.querySelector('[name="width"]'), //получаем поле width
                weight = form.querySelector('[name="weight"]'); //получаем поле weight
            data.from = from.value;
            data.where = where.value;
            data.height = height.value;
            data.length = length.value;
            data.width = width.value;
            data.weight = weight.value;
        }
    });
    console.log(data);
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

function calculateForm() {
    const formcalc = document.querySelector('[data-formcalc]');
    if (formcalc != null) {
        const error = document.createElement('span');
        error.classList.add('error');
        error.innerHTML = "Поле заполнено неверно!";
        formcalc.addEventListener('submit', (event) => {
            event.preventDefault();
            let badValidate = false;
            for (let index = 0; index < event.target.querySelectorAll('input[required]').length; index++) {
                const input = event.target.querySelectorAll('input[required]')[index];
                input.addEventListener('focusout', () => {
                    if (formcalc.querySelector('.error') != null)
                        formcalc.querySelector('.error').remove();
                });
                if (!validateInput(input)) {
                    input.focus();
                    input.insertAdjacentElement('afterend', error);
                    badValidate = true;
                    break;
                }
            }
            if (!badValidate) {
                calculatePrice(formcalc);
                formcalc.querySelector('[data-btncalc]').innerHTML = "Оформить";
            }

        });
    }
}

window.onload = () => {
    tips.forEach(tip => {
        tip.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector(`#${tip.dataset.tip}`).value = tip.innerHTML.split('(')[0];
        });
    });
    calculateForm();

}