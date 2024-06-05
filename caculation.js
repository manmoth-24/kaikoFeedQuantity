function MakeElementOfP(inner){
    var newElem = document.createElement('p')
    newElem.innerText = inner;
    return newElem;
}

//百頭あたり(g)
var feedForKaiko = [
    10,
    20,
    80,
    550,
    3200
]
//蚕のその齢でいる日数（眠は除く）
var kaikoDays = [
    3,
    3,
    3,
    4,
    9
]
function Caculation(){
    var form = document.mainForm
    var caculationMode = form.mode.value;
    var dayNumber = form.days.value
    var allKaikoCount = form.count.value
    var kaikoAges = [
        form.rei1.value,
        form.rei2.value,
        form.rei3.value,
        form.rei4.value,
        form.rei5.value,
    ];
    
    
    var kaikoCount = [];
    kaikoAges.forEach((kaikoAge)=>{
        kaikoCount.push(kaikoAge * 0.01 * allKaikoCount)
    })

    var feedQuantityAge = [];
    var forEachCount = 0
    kaikoCount.forEach((kaikoCount)=>{
        feedQuantityAge.push(kaikoCount * feedForKaiko[forEachCount] * 0.01 * dayNumber / kaikoDays[forEachCount])
        forEachCount ++;
    })

    var result = [];
    switch(caculationMode){
        case '1':
        case '3':
        case '4':
            result = ['error']
            break;
        case '2':
            result = feedQuantityAge;
            break;
        case '5':
            
            break;
        default:
            result = ['none']
            break;
    }

    console.log(kaikoAges)
    console.log(kaikoCount)
    console.log(feedQuantityAge)
    console.log(result)

    var totalFeed = 0;
    var exportPlace = document.getElementById('exportDiv');

    exportPlace.innerHTML = ''
    for (var i = 1;i <= result.length;i++){
        var exportText = MakeElementOfP(i + '齢： ' + result[i-1] + 'g')
        exportPlace.appendChild(exportText);
        
        totalFeed += result[i-1]
    }
    exportPlace.appendChild(document.createElement('hr'))
    var totalFeedExportText = MakeElementOfP('計' + totalFeed + 'g ――  ' + (totalFeed / 25) + 'cm')
    exportPlace.appendChild(totalFeedExportText)
}