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
let symbols = "_!@#$_%&(_)[_]{_}/?_\|"
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
    if(number.checked) {
        p.push(0);
    }
    if(uppercase.checked) {
        p.push(1);
    }
    if(lowercase.checked) {
        p.push(2);
    }
    if(symbol.checked) {
        p.push(3);
    }
    if(p.length == 0) return ;
    let password = "";
    let l = length.value;
    for(let i = l; i > 0; i--) {
        let opr = p[randomNumberBetween(0 , p.length)];
        let op = "";

        switch(opr) {
            case 0:
                op = randomDigit();
                password  = password + op;
                break;
            case 1:
                op = randomUpperCase();
                password = password + op;
                break;
            case 2:
                op = randomLowerCase();
                password = password + op;
                break;
            case 3:
                op =  randomSymbol()
                password = password + op;
        }
    }
    checkStrength(p);
    passwd.value = password;
}
