$(function () {
    var weightData = [
        [new Date('Jan 1, 2013').getTime(), 194],
        [new Date('Feb 2, 2013').getTime(), 196],
        [new Date('Mar 12, 2013').getTime(), 192],
        [new Date('Apr 3, 2013').getTime(), 184],
        [new Date('May 3, 2013').getTime(), 183],
        [new Date('Jun 1, 2013').getTime(), 179],
        [new Date('Jul 1, 2013').getTime(), 179],
        [new Date('Aug 5, 2013').getTime(), 181],
        [new Date('Sept 9, 2013').getTime(), 178],
        [new Date('Nov 4, 2013').getTime(), 177]
    ];
    var weightPlaceholder = $('#weight-chart');
    var weightPlot = $.plot('#weight-chart', [weightData], {
        xaxis: {
            mode: 'time',
            timeformat: "%Y/%m/%d"
        },
        grid: {
            markings: [{ yaxis: { from: 192, to: 192 }, color: "#bb0000" },
            { yaxis: { from: 178, to: 178 }, color: '#5EED26' }]
        }
    });
    var natAvgOffset = weightPlot.pointOffset({ y: 192, x: new Date('Jan 1, 2013').getTime() });
    weightPlaceholder.append("<div style='position:absolute;left:" + (natAvgOffset.left) + "px;top:" + natAvgOffset.top + "px;color:#666;font-size:smaller'>National Average</div>");
    var goalOffset = weightPlot.pointOffset({ y: 178, x: new Date('Jan 1, 2013').getTime() });
    weightPlaceholder.append("<div style='position:absolute;left:" + (goalOffset.left) + "px;top:" + goalOffset.top + "px;color:#666;font-size:smaller'>Your Goal</div>");



    var systolic = [
    [new Date('Jan 1, 2013').getTime(), 125],
    [new Date('Feb 2, 2013').getTime(), 121],
    [new Date('Mar 12, 2013').getTime(), 120],
    [new Date('Apr 3, 2013').getTime(), 124],
    [new Date('May 3, 2013').getTime(), 118],
    [new Date('Jun 1, 2013').getTime(), 120],
    [new Date('Jul 1, 2013').getTime(), 118],
    [new Date('Aug 5, 2013').getTime(), 117],
    [new Date('Sept 9, 2013').getTime(), 116],
    [new Date('Nov 4, 2013').getTime(), 115]
    ];
    var diastolic = [
[new Date('Jan 1, 2013').getTime(), 89],
[new Date('Feb 2, 2013').getTime(), 85],
[new Date('Mar 12, 2013').getTime(), 84],
[new Date('Apr 3, 2013').getTime(), 84],
[new Date('May 3, 2013').getTime(), 82],
[new Date('Jun 1, 2013').getTime(), 81],
[new Date('Jul 1, 2013').getTime(), 80],
[new Date('Aug 5, 2013').getTime(), 81],
[new Date('Sept 9, 2013').getTime(), 80],
[new Date('Nov 4, 2013').getTime(), 77]
    ];
    var bloodPressurePlotPlaceholder = $('#blood-pressure-chart');
    var bloodPressurePlot = $.plot(bloodPressurePlotPlaceholder, [systolic, diastolic], {
        xaxis: {
            mode: 'time',
            timeformat: "%Y/%m/%d"
        }
    });

});