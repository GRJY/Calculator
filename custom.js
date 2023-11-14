JS

let input = document.getElementById('inputbox');
let smallInput = document.getElementById('smallInput');
let string = "";

function appendCharacter(character) {
    // Sadece rakamları, operatörleri ve yüzdeyi kabul et
    if (/^[\d+\-*/%]$/.test(character)) {
        // Ardışık operatörleri engelle
        if (isOperator(character) && isOperator(string.charAt(string.length - 1))) {
            return;
        }

        string += character;
        input.value = string;
        smallInput.innerText = '';
    }
}

function calculateResult() {
    try {
        string = string.replace(/%/g, '*0.01*');
        input.value = eval(string);
        smallInput.innerText = `= ${input.value}`;
    } catch (error) {
        input.value = 'Error';
        smallInput.innerText = '';
    }
}

function clearAll() {
    string = "";
    input.value = string;
    smallInput.innerText = '';
}

function deleteLast() {
    string = string.substring(0, string.length - 1);
    input.value = string;
    smallInput.innerText = '';
}

// Operatör kontrolü
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

// Sayı girişi izin veren event listeye ekle
input.addEventListener('input', function (event) {
    let inputValue = event.data;
    if (/^\D$/.test(inputValue)) {
        // Eğer giriş rakam, operatör veya yüzde değilse, sadece önceki değeri göster
        input.value = string;
    } else {
        // Rakam, operatör veya yüzdense, string değerini güncelle
        string = input.value;
    }
});

