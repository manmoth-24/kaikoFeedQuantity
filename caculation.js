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

//百頭当たりのくわ量(枚)
var KuwaFeedForKaiko = [
    1.727115717,
    3.454231434,
    13.81692573,
    71.24352332,
    184.2256765
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

    function CaculationRate(ages){
        allOfAge = 0
        ages.forEach((element)=>{
            allOfAge += parseInt(element)
        })
        var returnAge = []
        ages.forEach((element)=>{
            console.log(allOfAge)
            console.log('element: ' + element)
            returnAge.push(element / allOfAge * 100)
        })

        console.log('rate: ' + returnAge)
        return returnAge
    }
    
    function KaikoQuantity(criterionFeed,ThisKaikoAges){
        var kaikoCount = [];
        ThisKaikoAges.forEach((kaikoAge)=>{
            kaikoCount.push(kaikoAge * 0.01 * allKaikoCount)
        })

        var feedQuantityAge = [];
        for (var i = 0;i < kaikoCount.length;i++){
            feedQuantityAge.push(kaikoCount[i] * criterionFeed[i] * 0.01 * dayNumber / kaikoDays[i])
        }
        console.log(kaikoCount)
        console.log(feedQuantityAge)

        return feedQuantityAge
    }

    function ExportFeedOnDiv(feedResult,unit){
        var exportPlace = document.getElementById('exportDiv');

        exportPlace.innerHTML = ''
        for (var i = 1;i <= feedResult.length;i++){
            var exportText = MakeElementOfP(i + '齢： ' + feedResult[i-1] + unit)
            exportPlace.appendChild(exportText);
        }
    }

    function GetTotalFeed(allFeed){
        var totalFeed = 0;
    
        allFeed.forEach((feed)=>{
            totalFeed += feed
        })
        return totalFeed
    }

    function ExportTotalFeedMakeNew(totalFeed){
        var exportPlace = document.getElementById('exportDiv');
        switch(caculationMode){
            case '1':
            case '3':
                exportPlace.appendChild(document.createElement('hr'))
                var totalFeedExportText = MakeElementOfP('計' + totalFeed + '枚')
                exportPlace.appendChild(totalFeedExportText)
                break;

            case '2':
            case '4':
                exportPlace.appendChild(document.createElement('hr'))
                var totalFeedExportText = MakeElementOfP('計' + totalFeed + 'g ――  ' + (totalFeed / 25) + 'cm')
                var totalFeedExportText2 = MakeElementOfP('　⇀' + (totalFeed / 25 / 20) + '本')
                exportPlace.appendChild(totalFeedExportText)
                exportPlace.appendChild(totalFeedExportText2)

                break;

            default:

                break;
        }
    } 
    

    //非関数ー実行部分
    var result = [];
    switch(caculationMode){
        case '1':
            result = KaikoQuantity(KuwaFeedForKaiko,kaikoAges);
            ExportFeedOnDiv(result,'枚')
            ExportTotalFeedMakeNew(GetTotalFeed(result))

            break;
        case '2':
            result = KaikoQuantity(feedForKaiko,kaikoAges);
            ExportFeedOnDiv(result,'g')
            ExportTotalFeedMakeNew(GetTotalFeed(result))

            break;
        case '3':
            var agesOfRate = CaculationRate(kaikoAges)
            result = KaikoQuantity(KuwaFeedForKaiko,agesOfRate);
            ExportFeedOnDiv(result,'枚')
            ExportTotalFeedMakeNew(GetTotalFeed(result))

            break;
        case '4':
            var agesOfRate = CaculationRate(kaikoAges)
            result = KaikoQuantity(feedForKaiko,agesOfRate);
            ExportFeedOnDiv(result,'g')
            ExportTotalFeedMakeNew(GetTotalFeed(result))
            
            break;
        default:
            result = ['none']
            break;
    }

    console.log(kaikoAges)
    console.log(result)

    
}
