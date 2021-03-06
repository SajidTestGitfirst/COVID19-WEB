
//Loading effect
$(window).on('load',function() {
    $("body").removeClass("preload");
  });

//Table sort button  
$(document).ready(function(){
    $('table').addClass('tablesorter');
    $('table').tablesorter({
        // theme: 'blue',
        headers: {
            // set initial sort order by column, this headers option setting overrides the sortInitialOrder option
            1: { sortInitialOrder: 'asc' }
          },
        headerTemplate: '{content}{icon}',
        widgets: ['zebra','columns']
    });
  });

//Switch between cumulative and daily cases  
document.querySelector("#option1").addEventListener("click",()=>{
    $(".disptotal").removeClass("hide");
    $(".disptotal").removeClass("hide");
    $(".disp").addClass("hide");
    $(".disp").addClass("hide");
})
document.querySelector("#option2").addEventListener("click",()=>{
  $(".disp").removeClass("hide");
  $(".disp").removeClass("hide");
  $(".disptotal").addClass("hide");
  $(".disptotal").addClass("hide");
})

//daily data for charts
var daily = JSON.parse(document.querySelector("#json").textContent); 

//line chart function
function drawChart(chrtTitle,chrtName,colValues) {
    // Define the chart to be drawn.
    var data = new google.visualization.DataTable();
    
    // var daily = []  ;
    data.addColumn('string', '');
    data.addColumn('number', 'Cnfrmd');
    data.addColumn('number', 'Rcvrd');
    data.addColumn('number', 'Death');
    rows=[];
    // daily.forEach((day)=>{
    //     // if(day["date"].substring(0,2)=="15")
    //     // rows.push([day["date"].substring(0,2),Number(day["dailyconfirmed"])]);
    //     // else
    //     rows.push(["",day[colValues[0]],day[colValues[1]],day[colValues[2]]]);
    // })
    for(i=daily.length-30;i<daily.length;i++)
    {
      rows.push(["",daily[i][colValues[0]],daily[i][colValues[1]],daily[i][colValues[2]]]);
    }
    data.addRows(rows);
    
    // Set chart options
    var options = {
        legend: { position: 'bottom'},
        chart: {
            title: chrtTitle,
            subtitle: 'Last 30 days'
        },
           
        hAxis: {
            title: '',         
        },
        vAxis: {
            title: 'Cases',        
        }, 
        colors: [   
            'rgb(0, 51, 102)','green','red'
        ]
        //  'width':auto,
        //  'height':60%      
    };

    // Instantiate and draw the chart.
    var chart = new google.charts.Line(document.getElementById(chrtName));
    chart.draw(data, options);
    }

google.charts.setOnLoadCallback(()=>{ drawChart('GROWTH - INDIA','chart1',['confirmed','recovered','deaths'])});

google.charts.setOnLoadCallback(barChart);

//barchart function
function barChart() {
  rows=[['', 'Death', 'Rcvrd', 'Cnfrmd']];
  for(i=daily.length-30;i<daily.length;i++)
  {
    rows.push(["  ",daily[i]['dailydeaths'],daily[i]['dailyrecovered'],daily[i]['dailyconfirmed']]);
  }
  var data = google.visualization.arrayToDataTable(rows);

  var options = {  
    chart: {
      title: 'DAILY TRENDS - INDIA',
      subtitle: 'Last 30 days',
    },
    legend: { position: 'top', alignment: 'start' },
  //   legend: { position: 'top', maxLines: 3 },
  isStacked: true,
    colors: [   
      'red'
      ],
      
  };

  var chart = new google.charts.Bar(document.getElementById('chart2'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}

  