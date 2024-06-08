function DisplayMultipleInput(num){
    var word;
    switch(num){
        case '1':
        case '2':
            word = '齢(%)'
            break;
        
        case '3':
        case '4':
            word = '齢(比)'
            break;
        
        default:
            word = 'エラーでっせ！'
            break;
    }
    var exportText = document.getElementById('rei-input');
    exportText.innerText = ''
    for (var i = 1;i <= 5;i++){
        var newElement = document.createElement('input');
        newElement.type = 'number'
        newElement.name = 'rei' + i
        newElement.class = 'ageInput'
        newElement.value = 0;
        var frameText = document.createElement('p')
        frameText.innerText = i + word
        frameText.appendChild(newElement)
        exportText.appendChild(frameText)
    }
}

function SelectOnChange(thisValue){
    switch(thisValue){
        case '1':

    }
}

DisplayMultipleInput('1')