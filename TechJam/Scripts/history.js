$(function() {

    var historyEntries = [
        {
            id: 1,
            vitalsRecorded: [
                {
                    vital: 'heartrate',
                    measurement: '24'
                },
                {
                    vital: 'blood pressure',
                    measurement: 'nine'
                },
                {
                    vital: 'weight',
                    measurement: '180lb'
                }
            ],
            diagnosis: 'good',
            insuranceInfo: 'something else ya',
            files: 'something?',
            title: 'General Appt',
            imgUrl: 'http://nicenicejpg.com/220/220',
            date: 'January 4, 2014',
            month: 'January',
            day: '4',
            year: '2014',
            doctorId: '1'
        },
        {
            id: 2,
            vitalsRecorded: [
                {
                    vital: 'heartrate',
                    measurement: 'up'
                },
                {
                    vital: 'weight',
                    measurement: '200lb'
                }
            ],
            diagnosis: 'also good',
            insuranceInfo: 'something else',
            files: 'something?',
            title: 'General Appt',
            imgUrl: 'http://nicenicejpg.com/220/220',
            date: 'December 21, 2014',
            month: 'December',
            day: '21',
            year: '2014',
            doctorId: '2'
        }];

    function ViewModel() {
        var that = this;
        this.historyEntries = ko.observableArray();
        this.currentHistoryEntry = ko.observableArray();
        this.dates = new Array();
        this.scrollToPosition = function(position) {
            $('html, body').animate({
                scrollTop: $('month_' + position).offset().top
            }, 2000);
        };
        this.showModal = function(historyEntry) {
            that.currentHistoryEntry(historyEntry);
            $('#history-entry-modal').modal();
        };
    }
    
    function AddDate(dates, year, month) {
        var toAdd = true;
        
        for (var i = 0; i < dates.length; i++)
        {
            if (dates[i].year == year) {
                toAdd = false;
            }
        }
        
        if (toAdd) {
            var monthsArray = new Array();
            monthsArray.push({ monthVisit: month, scrollToPosition : function(position) {
                $('html, body').animate({
                    scrollTop: $('.month_' + position).offset().top
                }, 2000);
            } });
            dates.push({ year: year, months: monthsArray });
        } else {
            toAdd = true;
            
            for (i = 0; i < dates.length; i++) {
                if (dates[i].year == year) {
                    for (var j = 0; j < dates[i].months.length; j++)
                    {
                        if (dates[i].months[j] == month) {
                            toAdd = false;
                        }
                    }

                    if (toAdd) {
                        dates[i].months.push({ monthVisit: month });
                    }
                }
            }
        }

        return dates;
    }

    function HistoryEntry() {
        this.id = ko.observable();
        
        this.vitalsRecorded = new Array();

        this.diagnosis = ko.observable();
        this.insuranceInfo = ko.observable();
        this.files = ko.observable();
        this.title = ko.observable();
        this.imgUrl = ko.observable();
        this.date = ko.observable();
        this.month = ko.observable();
        this.day = ko.observable();
        this.year = ko.observable();
        this.doctorId = ko.observable();
    }
    
    function vitalEntry() {
        this.vital = ko.observable();
        this.measurement = ko.observable();
    }

    var vm = new ViewModel();
    for (var i = 0; i < historyEntries.length; i++) {
        var historyEntry = new HistoryEntry();
        historyEntry.id(historyEntries[i].id);

        for (var j = 0; j < historyEntries[i].vitalsRecorded.length; j++) {
            historyEntry.vitalsRecorded.push({ vital: historyEntries[i].vitalsRecorded[j].vital, measurement: historyEntries[i].vitalsRecorded[j].measurement });
        }
        
        historyEntry.diagnosis(historyEntries[i].diagnosis);
        historyEntry.files(historyEntries[i].files);
        historyEntry.title(historyEntries[i].title);
        historyEntry.imgUrl(historyEntries[i].imgUrl);
        historyEntry.date(historyEntries[i].date);
        historyEntry.month(historyEntries[i].month);
        historyEntry.day(historyEntries[i].day);
        historyEntry.year(historyEntries[i].year);
        historyEntry.insuranceInfo(historyEntries[i].insuranceInfo);
        historyEntry.doctorId(historyEntries[i].doctorId);
        vm.historyEntries.push(historyEntry);

        vm.dates = AddDate(vm.dates, historyEntries[i].year, historyEntries[i].month);
    }

    ko.applyBindings(vm);
    
    $('.collapsible').collapsible({
    });
    
    $('.collapsible-dates').collapsible({
        cssClose: 'dateClosed',
        cssOpen: 'dateOpened'
    });

    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-host"), mapOptions);
    $('#history-entry-modal').on('shown.bs.modal', function () {
        google.maps.event.trigger(map, "resize");
    });
});