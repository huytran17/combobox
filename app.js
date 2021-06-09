class Combobox {
    constructor() {
        this.items = [{
                label: 'Nam',
                value: 0
            },
            {
                label: 'Nữ',
                value: 1
            },
            {
                label: 'Khác',
                value: 2
            }
        ];
    }
}

var boxObj = new Combobox(),
    wrapper = $('#Wrapper'),
    text = $('#Text'),
    toggler = $('#Toggler'),
    combobox = $('#Combobox');

$(document).ready(() => {
    $(boxObj.items).each((index, el) => {
        let item = $(`<div class="item" value="${el.value}">${el.label}</div>`);
        wrapper.append(item);
    });
});

$(document).on('click', '.item', function() {
    $('.item').removeClass('active');
    $(this).addClass('active');
    text.find('p').text($(this).text());
    wrapper.addClass('collapse');
});

toggler.click(() => {
    wrapper.toggleClass('collapse');
    if (!combobox.hasClass('focus')) addFocus();
});

text.on('focusin', () => {
    addFocus();
});

text.on('focusout', (e) => {
    removeFocus();
});

function addFocus() {
    combobox.addClass('focus');
    toggler.addClass('focus');
    toggler.find('span').addClass('focus');
}

function removeFocus() {
    combobox.removeClass('focus');
    toggler.removeClass('focus');
    toggler.find('span').removeClass('focus');
}