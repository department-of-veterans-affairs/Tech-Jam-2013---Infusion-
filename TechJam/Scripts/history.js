$(function() {

    var historyEntries = [
        {
            id: 1,
            vitalsRecorded: [
                {
                    vital: 'Heartrate',
                    measurement: '70bpm'
                },
                {
                    vital: 'Blood Pressure',
                    measurement: '117 over 76'
                },
                {
                    vital: 'Weight',
                    measurement: '180lb'
                }
            ],
            diagnosis: 'Good',
            insuranceInfo: 'Partial Coverage',
            files: 'Prescription History',
            title: 'General Appt',
            imgUrl: '/images/dr7.jpg',
            date: 'January 4, 2010',
            month: 'January',
            day: '4',
            year: '2010',
            doctorId: '7'
        },
        {
            id: 2,
            vitalsRecorded: [
                {
                    vital: 'Heartrate',
                    measurement: '80bpm'
                },
                {
                    vital: 'Weight',
                    measurement: '200lb'
                }
            ],
            diagnosis: 'Good',
            insuranceInfo: 'Full Coverage',
            files: 'Prescription History',
            title: 'General Appt',
            imgUrl: '/images/dr1.jpg',
            date: 'February 21, 2011',
            month: 'February',
            day: '21',
            year: '2011',
            doctorId: '1'
        },
        {
            id: 3,
            vitalsRecorded: [
                {
                    vital: 'Heartrate',
                    measurement: '70bpm'
                },
                {
                    vital: 'Blood Pressure',
                    measurement: '117 over 76'
                },
                {
                    vital: 'Weight',
                    measurement: '180lb'
                }
            ],
            diagnosis: 'Great',
            insuranceInfo: 'Partial Coverage',
            files: 'Medical History',
            title: 'General Appt',
            imgUrl: '/images/dr3.jpg',
            date: 'April 21, 2012',
            month: 'April',
            day: '21',
            year: '2012',
            doctorId: '3'
        },
        {
            id: 4,
            vitalsRecorded: [
                {
                    vital: 'Heartrate',
                    measurement: '80bpm'
                },
                {
                    vital: 'Weight',
                    measurement: '200lb'
                }
            ],
            diagnosis: 'Good',
            insuranceInfo: 'Full Coverage',
            files: 'Prescription History',
            title: 'General Appt',
            imgUrl: '/images/dr2.jpg',
            date: 'June 21, 2013',
            month: 'June',
            day: '21',
            year: '2013',
            doctorId: '2'
        },
        {
            id: 5,
            vitalsRecorded: [
                {
                    vital: 'Heartrate',
                    measurement: '70bpm'
                },
                {
                    vital: 'Blood Pressure',
                    measurement: '117 over 76'
                },
                {
                    vital: 'Weight',
                    measurement: '180lb'
                }
            ],
            diagnosis: 'Great',
            insuranceInfo: 'Partial Coverage',
            files: 'Surgery History',
            title: 'General Appt',
            imgUrl: '/images/dr5.jpg',
            date: 'September 21, 2013',
            month: 'September',
            day: '21',
            year: '2013',
            doctorId: '5'
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
                }, 500);
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
                        dates[i].months.push({
                            monthVisit: month, scrollToPosition: function (position) {
                                $('html, body').animate({
                                    scrollTop: $('.month_' + position).offset().top - 65
                                }, 500);
                            }
                        });
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
    
    function fixDiv() {
        var $cache = $('#years');
        if ($(window).scrollTop() > 90)
            $cache.css({ 'position': 'fixed', 'top': '70px' });
        else
            $cache.css({ 'position': 'relative', 'top': 'auto' });
    }
    
    $(window).scroll(fixDiv);
    fixDiv();
    
    $('.collapsible').collapsible({
        speed: 200
    });
    
    $('.collapsible-dates').collapsible({
        cssClose: 'dateClosed',
        cssOpen: 'dateOpened',
        speed: 200
    });
});