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
            date: 'January 4, 2014'
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
            date: 'December 21, 2014'
        }];

    function ViewModel() {
        var that = this;
        this.historyEntries = ko.observableArray();
        this.currentHistoryEntry = ko.observableArray();
        this.showModal = function(historyEntry) {
            that.currentHistoryEntry(historyEntry);
            $('#history-entry-modal').modal();
        };
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
        historyEntry.insuranceInfo(historyEntries[i].insuranceInfo);
        vm.historyEntries.push(historyEntry);
    }

    ko.applyBindings(vm);
    
    $('.collapsible').collapsible({
        //defaultOpen: 'section1'
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