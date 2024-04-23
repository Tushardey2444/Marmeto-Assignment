let company_name = document.querySelector('.company-name');
let product_name = document.querySelector('.product-name');
let discount_price = document.querySelector('.discount-price');
let actual_price = document.querySelector('.actual-price');
let discount_percentage = document.querySelector('.discount-percentage');

let select_images = document.querySelectorAll('.select-images img');
let image1 = document.querySelector('.image1');
let image2 = document.querySelector('.image2');
let image3 = document.querySelector('.image3');
let image4 = document.querySelector('.image4');
let main_image = document.querySelector('.main-image');



let colors1 = document.querySelector('.colors1');
let colors2 = document.querySelector('.colors2');
let colors3 = document.querySelector('.colors3');
let colors4 = document.querySelector('.colors4');
let color1 = document.querySelector('.color1');
let color2 = document.querySelector('.color2');
let color3 = document.querySelector('.color3');
let color4 = document.querySelector('.color4');


let labels = document.querySelectorAll('.select-size-container label');
let inputs = document.querySelectorAll('.select-size-container input')


let input1 = document.querySelector('.input1');
let input2 = document.querySelector('.input2');
let input3 = document.querySelector('.input3');
let input4 = document.querySelector('.input4');
let input5 = document.querySelector('.input5');


let minus = document.querySelector('.minus');
let number = document.querySelector('.number');
let plus = document.querySelector('.plus');


let button = document.querySelector('.cart-button');


let desc = document.querySelector('.description');


let message_container = document.querySelector('.message-container');
let message = document.querySelector('.message');


let colorsPicker;
let selectedColor;

async function loadData() {
    let ele = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json");
    let res = await ele.json();
    company_name.textContent = res.product.vendor;
    product_name.textContent = res.product.title;
    discount_price.textContent = res.product.price + ".00";
    actual_price.textContent = res.product.compare_at_price + ".00";
    let price = parseInt(res.product.price.slice(1));
    let actual = parseInt(res.product.compare_at_price.slice(1));
    discount_percentage.textContent = Math.round(((actual - price) / actual) * 100) + "% Off";

    image1.classList.add("active-image");

    colors1.style.cssText = `border: 3px solid #ECDECC`;
    selectedColor = window.getComputedStyle(colors1).borderColor;

    let sizes = res.product.options[1].values;
    for (let i = 0; i < sizes.length; i++) {
        labels[i].textContent = sizes[i];
    }

    inputs[0].parentElement.classList.add('active-size-background')
    inputs[0].classList.add('active-input');
    labels[0].classList.add('active-label');
    inputs[0].checked = true;


    minus.textContent = '-';
    number.textContent = 1;
    plus.textContent = '+';

    colorsPicker = res.product.options[0].values;

    let description = res.product.description;
    desc.innerHTML = description;
}
document.addEventListener('DOMContentLoaded', loadData);

function activeImage(imageSelected) {
    imageSelected.classList.add('active-image');
    for (let images of select_images) {
        if (images != imageSelected) {
            images.classList.remove('active-image');
        }
    }
    main_image.src = imageSelected.src;
}

image1.addEventListener('click', (event) => {
    activeImage(event.target);
});
image2.addEventListener('click', (event) => {
    activeImage(event.target);
});
image3.addEventListener('click', (event) => {
    activeImage(event.target);
});
image4.addEventListener('click', (event) => {
    activeImage(event.target);
});

color1.addEventListener('click', function() {
    colors1.style.cssText = `border: 3px solid #ECDECC`;
    colors2.style.cssText = 'border:none';
    colors3.style.cssText = 'border:none';
    colors4.style.cssText = 'border:none';
    selectedColor = window.getComputedStyle(colors1).borderColor;
})
color2.addEventListener('click', function() {
    colors1.style.cssText = `border:none`;
    colors2.style.cssText = 'border: 3px solid #BBD278';
    colors3.style.cssText = 'border:none';
    colors4.style.cssText = 'border:none';
    selectedColor = window.getComputedStyle(colors2).borderColor;
})
color3.addEventListener('click', function() {
    colors1.style.cssText = `border: none`;
    colors2.style.cssText = 'border:none';
    colors3.style.cssText = 'border:3px solid #BBC1F8';
    colors4.style.cssText = 'border:none';
    selectedColor = window.getComputedStyle(colors3).borderColor;
})
color4.addEventListener('click', function() {
    colors1.style.cssText = `border: none`;
    colors2.style.cssText = 'border:none';
    colors3.style.cssText = 'border:none';
    colors4.style.cssText = 'border:3px solid #FFD3F8';
    selectedColor = window.getComputedStyle(colors4).borderColor;
})

function updateInput(inputEle) {
    for (let i = 0; inputs.length; i++) {
        if (inputEle == inputs[i]) {
            inputs[i].parentElement.classList.add('active-size-background');
            inputs[i].classList.add('active-input');
            labels[i].classList.add('active-label');
        } else {
            inputs[i].parentElement.classList.remove('active-size-background');
            inputs[i].classList.remove('active-input');
            labels[i].classList.remove('active-label');
        }
    }
}
input1.addEventListener('click', function(event) {
    updateInput(event.target);
});
input2.addEventListener('click', function(event) {
    updateInput(event.target);
});
input3.addEventListener('click', function(event) {
    updateInput(event.target);
});
input4.addEventListener('click', function(event) {
    updateInput(event.target);
});
input5.addEventListener('click', function(event) {
    updateInput(event.target);
});

minus.addEventListener('click', function() {
    let content = parseInt(number.textContent);
    if (content > 1) {
        number.textContent = content - 1;
    }
    if ((content - 1) == 1) {
        minus.classList.remove('active-minus');
    }
});

plus.addEventListener('click', function() {
    let content = parseInt(number.textContent);
    number.textContent = content + 1;
    minus.classList.add('active-minus');
});

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return { r, g, b };
}

button.addEventListener('click', function() {
    let productSelected = product_name.textContent;
    let colorSelected;
    let sizeSelected;

    let selectColor = selectedColor.slice(4, selectedColor.length - 1);

    selectColor = selectColor.split(',');
    let flag = false;
    for (let colorPicked of colorsPicker) {
        for (let key in colorPicked) {

            let rgb = hexToRgb(colorPicked[key]);
            if (selectColor[0] == rgb.r && selectColor[1] == rgb.g && selectColor[2] == rgb.b) {
                flag = true;
                colorSelected = key;
                break;
            }

        }
        if (flag == true) {
            break;
        }
    }
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            sizeSelected = labels[i].textContent;
            break;
        }
    }
    message.textContent = `${productSelected} with Color ${colorSelected} and Size ${sizeSelected} added to cart`;
    message_container.classList.add('active-message');
    setTimeout(function() {
        message_container.classList.remove('active-message');
    }, 3000);
});