class Combobox {
    constructor() {
        this.items = [{
                label: "Nam",
                value: 0,
                ignore: false,
                active: false
            },
            {
                label: "Nữ",
                value: 1,
                ignore: false,
                active: false
            },
            {
                label: "Khác",
                value: 2,
                ignore: false,
                active: false
            },
        ];
    }
}

var boxObj = new Combobox(),
    wrapper = $("#Wrapper"),
    text = $("#Text"),
    toggler = $("#Toggler"),
    combobox = $("#Combobox");

$(document).ready(() => {
    wrapper.addClass("collapse");
    renderItems();
});

$(document).on("click", ".item", function() {
    $(".item").removeClass("active");
    $(this).addClass("active");
    var currentItemVal = parseInt($(this).attr('value'));
    boxObj.items.map(function(el, i) {
        if (i === currentItemVal) el.active = true;
        else el.active = false;
    });
    text.find("p").text($(this).text());
    wrapper.addClass("collapse");
});

toggler.click(() => {
    resetBox();
    wrapper.toggleClass("collapse");
    if (!combobox.hasClass("focus")) addFocus();
});

text.on("focusin", addFocus);
text.on("focusout", removeFocus);

function addFocus() {
    combobox.addClass("focus");
    toggler.addClass("focus");
    toggler.find("span").addClass("focus");
}

function removeFocus() {
    combobox.removeClass("focus");
    toggler.removeClass("focus");
    toggler.find("span").removeClass("focus");
}

$(document).on("keydown", function(e) {
    var itemsLength = $(".item").length;
    var itemIndex = parseInt($(".selected").attr("value"));
    var itemActive = parseInt($(".active").attr("value"));

    $(".item").removeClass("selected");

    if (isNaN(itemIndex)) {
        itemIndex = -1;
    }

    if (e.keyCode === 40) {
        //down
        itemIndex += 1;
        itemIndex = itemIndex == itemsLength ? 0 : itemIndex;
        if (itemIndex === itemActive) itemIndex += 1;
        itemIndex = itemIndex == itemsLength ? 0 : itemIndex;
    } else if (e.keyCode === 38) {
        //up
        itemIndex -= 1;
        itemIndex = itemIndex < 0 ? itemsLength - 1 : itemIndex;
        if (itemIndex === itemActive) itemIndex -= 1;
    } else itemIndex = itemIndex;

    toggler.css({
        outline: "none",
    });

    if (e.keyCode === 38 || e.keyCode === 40) {
        text.find("p").text($(".item").eq(itemIndex).text());
        $(".item").eq(itemIndex).addClass("selected");
        text.find('p').blur();
    }

    if (e.keyCode === 13) {
        $(".item").removeClass("active");
        $(".item").eq(itemIndex).addClass("active");
    }
});

text.find("p").on("input", function(e) {
    if (e.keyCode === 13) e.preventDefault();
    var val = $(this).text();
    $(boxObj.items).each((i, el) => {
        if (el.label.startsWith(val)) el.ignore = false;
        else el.ignore = true;
    });
    wrapper.empty();
    renderItems();
    if (wrapper.hasChild())
});

function renderItems() {
    $(boxObj.items).each((index, el) => {
        if (el.ignore === false) {
            let item = $(
                `<div class="item" tabindex="0" value="${el.value}">${el.label}</div>`
            );
            if (el.active === true) item.addClass('active');
            item.on("focusout", removeFocus);
            wrapper.append(item);
        }
    });
}

function resetBox() {
    wrapper.empty();
    boxObj.items.map((el, i) => {
        return el.ignore = false;
    });
    renderItems();
}