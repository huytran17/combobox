class Combobox {
    //Khởi tạo
    constructor() {
        //Danh sách tùy chọn trong combobox
        this.items = [{
                label: "Nam",
                value: 0,
                ignore: false,
                active: false,
            },
            {
                label: "Nữ",
                value: 1,
                ignore: false,
                active: false,
            },
            {
                label: "Khác",
                value: 2,
                ignore: false,
                active: false,
            },
        ];
    }
}

var boxObj = new Combobox(), //Khởi tạo đối tượng Combobox
    wrapper = $("#Wrapper"),
    cbxGender = $("#cbxGender"),
    toggler = $("#Toggler"),
    combobox = $("#Combobox");

//Thực hiện ngay khi DOM được load xong
$(document).ready(() => {
    wrapper.addClass("collapse");
    renderItems();
});

//Sự kiện nhấn chuột vào các tùy chọn trong combobox
$(document).on("click", ".item", function() {
    $(".item").removeClass("active"); //Bỏ hết lớp active khỏi các item trong combobox
    $(this).addClass("active"); //Thêm lớp active vào tùy chọn hiện tại
    var currentItemVal = parseInt($(this).attr("value")); //Lấy thuộc tính value của item đuọc chọn
    boxObj.items.map(function(el) {
        //Duyệt qua tất cả các tùy chọn
        //Nếu thuộc tính value của phần tử đang lặp bằng với thuộc tính value của phần tử vừa chọn
        if (el.value === currentItemVal) el.active = true;
        //Đặt thuộc tính active của phần tử đang lặp thánh true
        else el.active = false; //Đặt thuộc tính active của phần tử đang lặp thánh false
    });
    cbxGender.text($(this).text()); //Gán text của phần tử được chọn cho phần hiển thị của combobox
    wrapper.addClass("collapse"); //Ẩn trình đơn các lựa chọn
});

//Sự kiện nhấn nút mũi tên
toggler.click(() => {
    resetBox();
    wrapper.toggleClass("collapse");
    if (!combobox.hasClass("focus")) addFocus();
});

//Sự kiện focus khi nhập liệu trên combobox
cbxGender.on("focusin", addFocus);
cbxGender.on("focusout", removeFocus);

//Thêm viền cho combobox
function addFocus() {
    combobox.addClass("focus");
    toggler.addClass("focus");
    toggler.find("span").addClass("focus");
}
//Bỏ viền khỏi combobox
function removeFocus() {
    combobox.removeClass("focus");
    toggler.removeClass("focus");
    toggler.find("span").removeClass("focus");
}

//Sự kiện nhấn phím mũi tên
$(document).on("keydown", function(e) {
    var itemsLength = $(".item").length; //Tổng số tùy chọn của combobox
    var itemIndex = parseInt($(".selected").attr("value")); //Vị trí của phần tử đang được trỏ tới
    var itemActive = parseInt($(".active").attr("value")); //Vị trí của phần tử đang được chọn

    $(".item").removeClass("selected");

    //Nếu không có phần tử nào được trỏ tới
    if (isNaN(itemIndex)) {
        itemIndex = -1;
    }

    //Phím mũi tên lên
    if (e.keyCode === 40) {
        itemIndex += 1;
        itemIndex = itemIndex == itemsLength ? 0 : itemIndex; //Nếu vượt quá index của phần tử cuối cùng (2) thì đưa về phần tử đầu tiên (0)
        if (itemIndex === itemActive) itemIndex += 1;
        itemIndex = itemIndex == itemsLength ? 0 : itemIndex;
    }
    //Phím mũi tên xuống
    else if (e.keyCode === 38) {
        itemIndex -= 1;
        itemIndex = itemIndex < 0 ? itemsLength - 1 : itemIndex; //Nếu nhỏ hơn phần tử đầu tiên (0) thì đưa về phàn tử cuối cúng (2)
        if (itemIndex === itemActive) itemIndex -= 1;
    } else itemIndex = itemIndex;

    if (e.keyCode === 38 || e.keyCode === 40) {
        cbxGender.text($(".item").eq(itemIndex).text()); //Đặt giá trị của combobox bằng với phần tử đang đc trỏ tới
        $(".item").eq(itemIndex).addClass("selected");
        cbxGender.blur(); //Bỏ focus khỏi vùng nhập liệu trên combobox
    }

    //Nhấn phím enter
    if (e.keyCode === 13) {
        $(".item").removeClass("active");
        $(".item").eq(itemIndex).addClass("active");
        $(".item").eq(itemIndex).click();
    }
    //Bỏ phần viền mặc định của nút mũi tên
    toggler.css({
        outline: "none",
    });
});

//Sự kiện nhập liệu trên combobox
cbxGender.on("input", function(e) {
    if (e.keyCode === 13) e.preventDefault(); //Hủy hành động xuống dòng khi nhấn enter
    var val = $(this).text();
    $(boxObj.items).each((i, el) => {
        //Nếu văn bản đc nhập khớp với nhãn của các lựa chọn
        if (el.label.startsWith(val)) el.ignore = false;
        //Đưa phần tử ra khỏi danh sách bỏ qua
        else el.ignore = true;
    });
    wrapper.empty();
    renderItems();

    if (wrapper.hasClass("collapse")) wrapper.removeClass("collapse");
});

//Thực hiện render các phần tử trong combobox
function renderItems() {
    $(boxObj.items).each((index, el) => {
        //Nếu phần tử không trong danh sách bị bỏ qua
        if (el.ignore === false) {
            //Tạo phần tử cho combobox
            let item = $(
                `<div class="item" tabindex="0" value="${el.value}">${el.label}</div>`
            );
            //Nếu là phần tử đang được chọn
            if (el.active === true) item.addClass("active"); //Thêm lớp active
            item.on("focusout", removeFocus);
            wrapper.append(item);
        }
    });
}

//Đặt lại và hiển thị tất cả phần tử của combobox
function resetBox() {
    wrapper.empty();
    boxObj.items.map((el, i) => {
        return (el.ignore = false);
    });
    renderItems();
}

//Lấy text hiển thị của item được chọn hiện tại
$.fn.getText = function() {
    console.log($(".active").eq(0).text());
};
//Lấy giá trị của item được chọn hiện tại
$.fn.getValue = function() {
    console.log(parseInt($(".active").eq(0).attr("value")));
};
//Lấy dữ liệu combobox
$.fn.getData = function() {
    console.log(boxObj.items);
};