let copybtn = document.querySelector('[copy]');
let passwd = document.querySelector('[password]');
let circle = document.querySelector('.circle');

let number = document.querySelector('#numbers');
let uppercase = document.querySelector('#uppercase');
let lowercase = document.querySelector('#lowercase');
let symbol = document.querySelector('#symbols');

let length = document.querySelector('[pass-len]');


copybtn.addEventListener('click' , (event) => { 
    if(passwd.value)
    navigator.clipboard.writeText(passwd.value)
    .then(res => {        
        copybtn.classList.add('copied');
        setTimeout(() => {
            copybtn.classList.remove('copied');
        } , 2000);
    })
    .catch(err => {
        alert('there is some error and copy failed!!!')
    })
})




function randomNumberBetween(min , max) {
    return min + Math.floor(Math.random() * (max - min));
}
function randomDigit() {
    return randomNumberBetween(0 , 10);
}
function randomUpperCase() {
    return String.fromCharCode(randomNumberBetween(65 , 91));
}
function randomLowerCase() {
    return String.fromCharCode(randomNumberBetween(97 , 123));
}
let symbols = "_!@#$%&()[]{}/?\|"
function randomSymbol() {
    return symbols[randomNumberBetween(0 , symbols.length)];
}


function checkStrength(p) {
    if((number.checked & symbol.checked & lowercase.checked & uppercase.checked) | (symbol.checked & lowercase.checked & uppercase.checked) | (length.value >= 10 && p.length > 2) | (length.value >= 18 && p.length > 1)) {
        circle.classList.remove('weak');
        circle.classList.remove('good');
        circle.classList.add('strong');
    }
    else if((number.checked & lowercase.checked & uppercase.checked) | (symbol.checked & number.checked & uppercase.checked) | ((symbol.checked & number.checked & lowercase.checked))| (length.value >= 10 && p.length > 1 & symbol.checked) | (length.value >= 15 && p.length > 1 )) {
        circle.classList.remove('weak');
        circle.classList.remove('strong');
        circle.classList.add('good');
    }
    else {
        circle.classList.remove('good');
        circle.classList.remove('strong');
        circle.classList.add('weak');
    }
}

length.addEventListener('input' , (event) => {
    length.style.backgroundSize = `${((length.value-0) * 100 / 20)}% 100%`
    document.querySelector('[display-len]').innerText = length.value;
})

document.querySelector('[generate]').addEventListener('click' , randomPass)
function randomPass() {
    let p = [];
    
    if(uppercase.checked) {
        p.push(randomUpperCase);
    }
    if(lowercase.checked) {
        p.push(randomLowerCase);
    }
    if(number.checked) {
        p.push(randomDigit);
    }
    if(symbol.checked) {
        p.push(randomSymbol);
    }
    if(p.length == 0) return ;
    let password = "";

    for(let i = 0; i < p.length; i++) {
        password += p[i]();
    }
    let l = length.value;
    for(let i = p.length; i < l; i++) {
        password += p[randomNumberBetween(0 , p.length)]();
    }
        checkStrength(p);

        passwd.value = sufflePassword(Array.from(password));
}


function sufflePassword(arr) {
    let str = "";
    for(let i = 1; i < arr.length; i++) {
        let j = Math.floor(Math.random() * (i+1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    for(let c of arr)    str += c;
    return str;
}