// 051806 v1.0 DV Fixed missing negative sign in logistic issue

$( document ).ready(function() {
  console.log("ready");

 
//  $('.Slider').on('change', function(slideEvt) {
//      console.log("New Value =" + slideEvt.value);
//      getProbabilityWrapper()
//
//  });

// // Example morris line graph
// dchart1 = Morris.Donut({
//   // ID of the element in which to draw the chart.
//   element: 'mydonutchart1',
//   data: [
//     { label: 'a', value: 0.5 },
//     { label: 'b', value: 0.5 }
//   ],
//   colors : ['#428bca', '#5bc0de'],
//   resize: ['true']
// });


// // Example morris line graph
// dchart2 = Morris.Donut({
//   // ID of the element in which to draw the chart.
//   element: 'mydonutchart2',
//   data: [
//     { label: 'a', value: 0.5 },
//     { label: 'b', value: 0.5 }
//   ],
//   colors : ['#428bca', '#5bc0de'],
//   resize: ['true']
// });



//  //getProbabilityWrapper()
// $('#mydonutchart1').show()
// $('#mydonutchart2').show()
// $('#resultbox0').show()
// $('#resultbox1').show()
// $('#predictedHomeScore').show()
// $('#predictedAwayScore').show()

});

// Wrapper function that gets slider vals, and calls
// the getProbability function
//function getProbabilityWrapper() {
//    var trips = $('#tripsSlider').slider('getValue');
//    var mpt   = $('#mptSlider').slider('getValue');
//    var minpt = $('#minptSlider').slider('getValue');
//    var pgt80 = $('#pgt80Slider').slider('getValue');
//    var pwkd  = $('#pwkdSlider').slider('getValue');
//    var pln   = $('#plnSlider').slider('getValue');
//    var prh   = $('#prhSlider').slider('getValue');
//    var ne    = $('#neSlider').slider('getValue');
//
//    //var prob = getProbability(trips,mpt,minpt,pgt80,pwkd,pln,prh,ne);
//
//    //var prob = getProbability(trips,miles,duration_min,gt80,wkd,ln,rh,cnr,accdec,cnr_pmin,accdec_pmin);
//    console.log("Prob = " + prob)
//}



/////////////////////////////////////////////////////
// This function just queries the probabilty and score service and
// returns the probability, and final score predictions between 0 - 100
// It then call updateChart to render results on the screen
//  function getProbability(trips,mpt,minpt,pgt80,pwkd,pln,prh,ne) {
//  
//    var prob = 0.0
//    //app.get('/scorepredictionv2/:scorea/:scoreh/:timeleft/:overunder/:teamaspread',
//    var hostname = $('<a>').prop('href', url).prop('hostname');
//    console.log('hostname =  '+ hostname  )
//    console.log('http://localhost:6001/callwlm/' + trips + '/' + mpt + '/' + minpt + '/' + pgt80 + '/' + pwkd + '/' + pln + '/' + prh + '/' + ne)
//  
//    var mytestquery = jQuery.ajax({
//       url: 'http://localhost:6001/callwlm/' + trips + '/' + mpt + '/' + minpt + '/' + pgt80 + '/' + pwkd + '/' + pln + '/' + prh + '/' + ne  ,
//       //url: 'http://169.55.24.28:6001/scorepredictionv2/' + scorea + '/' + scoreh + '/' + timeleft + '/' + overunder + '/' + teamaspread  ,
//      success: function (data){
//          //console.log("output =" + $.data)
//          console.log("data = "+ JSON.stringify(data));
//  
//          console.log("Number of hits returned = "+ data.length);
//            console.log(" prob = " + data.prob);
//            console.log(" ranking = " + data.ranking);
//            updateChart(data.prob,data.ranking);
//  
//  
//  
//        },
//        error: function (data) {
//           console.log("Error")
//        }
//     });
//  
//    return 0;
//  }



//  function updateChart (prob, ranking) {
//    probn = 100 - prob;
//    dchart1.setData([
//      { label: "Collision", value: prob },
//      { label: "blah", value: probn }
//    ]);
//    dchart2.setData([
//      { label: "Collision", value: prob },
//      { label: "blah", value: probn }
//    ]);  
//    console.log('abcd')
//  
//    //var scoreHomeString =  "<h4>" + sprintf("%-15s", teamh) + "\t" + pscoreh.toString().substring(0,5) + "</h4>" ;
//    //v/ar scoreAwayString =  "<h4>" + sprintf("%-15s", teama) + "\t" + pscorea.toString().substring(0,5) + "</h4>" ;
//    // console.log(scoreString)
//    //$('#predictedHomeScore').html(scoreHomeString);
//    //$('#predictedAwayScore').html(scoreAwayString);
//  
//  
//    $('#mydonutchart1').show()
//    $('#mydonutchart2').show()
//    $('#resultbox0').show()
//    $('#resultbox1').show()
//  
//  }

