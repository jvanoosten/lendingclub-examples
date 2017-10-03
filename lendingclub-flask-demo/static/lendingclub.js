// 091117 v1.0 DV Fixed missing negative sign in logistic issue
pulldown_var = "debt_consolidation"

$( document ).ready(function() {
  console.log("ready");

  // This needs to be fixed right ???
  $('.Slider').on('change', function(slideEvt) {
      //console.log("New Value =" + slideEvt.value);
      getProbabilityWrapper(pulldown_var)

  });

  // Home / Away drop down code here -- This took a while....
 $('.dropdown-select').on( 'click', '.dropdown-menu li', function() {
     var target = $(this).html();

     //Adds active class to selected item
     $(this).parents('.dropdown-menu').find('li').removeClass('active');
     $(this).parent('li').addClass('active');

     //Displays selected text on dropdown-toggle button
     $(this).parents('.dropdown-select').find('.dropdown-toggle').html(target + ' <span class="caret"></span>');
     pulldown_var = $(this).text()
     //console.log(pulldown_var)
     getProbabilityWrapper($(this).text())

  });


 // Example morris line graph
 dchart_lr = Morris.Donut({
   // ID of the element in which to draw the chart.
   element: 'mydonutchart_lr',
   data: [
     { label: 'Full Payment %', value: 50 },
     { label: 'Default %', value: 50 }
   ],
   colors : ['#428bca', '#5bc0de'],
   resize: ['true']
 });

 dchart_rf = Morris.Donut({
   // ID of the element in which to draw the chart.
   element: 'mydonutchart_rf',
   data: [
     { label: 'Full Payment %', value: 50 },
     { label: 'Default %', value: 50 }
   ],
   colors : ['#428bca', '#5bc0de'],
   resize: ['true']
 });



 getProbabilityWrapper("debt_consolidation")
 $('#mydonutchart_lr').show()
 $('#mydonutchart_rf').show()

 $('#resultbox0').show()
 $('#resultbox1').show()

});

// Wrapper function that gets slider vals, and calls
// the getProbability function
function getProbabilityWrapper(reason) {
    //console.log("reason passed = " + reason)

    var data = {
      loan_amount : 0,
      annual_inc : 0,
      dti : 0,
      reason : reason
    }
    data.loan_amount = $('#loanAmountSlider').slider('getValue');
    data.annual_inc = $('#annualIncomeSlider').slider('getValue');
    data.dti = $('#dtiSlider').slider('getValue');
    data.reason = reason

    //console.log("reason infer= " + data.reason)

    var prob = getProbability(data, "LR");
    var prob = getProbability(data, "RF");

}



/////////////////////////////////////////////////////
// This function just queries the probabilty and score service and
// returns the probability, and final score predictions between 0 - 100
// It then call updateChart to render results on the screen
function getProbability(data_in, model_type) {

  var prob = 0.0
  //app.get('/scorepredictionv2/:scorea/:scoreh/:timeleft/:overunder/:teamaspread',
  var parser = location;
  //var hostname = $('<a>').prop('href', url).prop('hostname');
  //parser.href = "http://example.com:3000/pathname/?search=test#hash";
  //parser.protocol; // => "http:"

  console.log('hostname =  '+ parser.host  )

  if( parser.host.search("localhost") == -1) {
    http_s = 'https://'
  } else {
    http_s = 'http://'
  }

  console.log('http_s =  '+ http_s  )


  console.log(http_s+parser.host+'/callwlm/' + model_type + '/' + data_in.loan_amount + '/' + data_in.annual_inc + '/' + data_in.dti.toFixed(2) + '/' + data_in.reason )
  //console.log('http://'+parser.host+'/callwlm/' + data_in.loan_amount + '/' + mpt.toFixed(2) + '/' + avgsp.toFixed(2) + '/' + gt80pt.toFixed(2) + '/' + pwkd.toFixed(2) + '/' + pln.toFixed(2) + '/' + prh.toFixed(2) + '/' + nept )

  var mytestquery = jQuery.ajax({
     url: http_s+parser.host+'/callwlm/' + model_type + '/' + data_in.loan_amount + '/' + data_in.annual_inc + '/' + data_in.dti.toFixed(2) + '/' + data_in.reason  ,
     //url: 'http://'+parser.host+'/callwlm/' + trips + '/' + mpt.toFixed(2) + '/' + avgsp.toFixed(2) + '/' + gt80pt.toFixed(2) + '/' + pwkd.toFixed(2) + '/' + pln.toFixed(2) + '/' + prh.toFixed(2) + '/' + nept  ,
     //url: 'http://169.55.24.28:6001/scorepredictionv2/' + scorea + '/' + scoreh + '/' + timeleft + '/' + overunder + '/' + teamaspread  ,
    success: function (data){
        //console.log("output =" + $.data)
        //console.log("data = "+ JSON.stringify(data));
        updateChart(data.probability, model_type);
      },
      error: function (data) {
         console.log("Error in lendingclub.js getProbability")
      }
   });

  return 0;
}



// Invoked as a callback from getProbability
// This function will modify the charts ...
function updateChart (raw_prob, model_type) {
  raw_prob = raw_prob*100
  raw_probn = 100 - raw_prob;
  //console.log(" prob lr= " + raw_prob + " " + raw_probn);
  //console.log(" model_type= " + model_type + " " + raw_probn);


  if(model_type == "LR") {
  // Logisitic Regression Chart
    dchart_lr.setData([
      { label: "Full Payment %", value:  raw_prob.toFixed(1)},
      { label: "Default %", value: raw_probn.toFixed(1)  }
    ]);
  } else {
  // Random Forest Chart
    dchart_rf.setData([
      { label: "Full Payment %", value:  raw_prob.toFixed(1)},
      { label: "Default %", value: raw_probn.toFixed(1)  }
    ]);

  }
  
  $('#mydonutchart_lr').show()
  $('#mydonutchart_rf').show()

  //$('#mydonutchart2').show()
  // $('#mybarchart2').show()

  $('#resultbox0').show()
  $('#resultbox1').show()

}

