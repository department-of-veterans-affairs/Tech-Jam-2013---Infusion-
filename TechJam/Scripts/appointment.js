$(function () {

    var appointments = [
        {
            id: 1,
            date: 'March 7, 2014',
            time: '2:00 PM',
            doctor: 'Doogie Howser',
            type: 'Check Up',
            phoneNumber: '555-555-1234',
            mapUrl: 'http://nicenicejpg.com/220/220'
        },
        {
            id: 1,
            date: 'April 10, 2014',
            time: '7:00 PM',
            doctor: 'Dr. House',
            type: 'Surgery',
            phoneNumber: '555-555-1234',
            mapUrl: 'http://nicenicejpg.com/220/220'
        }];

    function ViewModel() {
        var that = this;
        this.appointments = ko.observableArray();
        this.currentAppointment = ko.observableArray();
        this.showModal = function (appointment) {
            that.currentAppointment(appointment);
            $('#appointment-modal').modal();
        };
    }

    function Appointment() {
        this.id = ko.observable();
        this.date = ko.observable();
        this.time = ko.observable();
        this.doctor = ko.observable();
        this.type = ko.observable();
        this.phoneNumber = ko.observable();
        this.mapUrl = ko.observable();
    }

    var vm = new ViewModel();
    for (var i = 0; i < appointments.length; i++) {
        var appointment = new Appointment();
        appointment.id(appointments[i].id);
        appointment.date(appointments[i].date);
        appointment.time(appointments[i].time);
        appointment.doctor(appointments[i].doctor);
        appointment.type(appointments[i].type);
        appointment.phoneNumber(appointments[i].phoneNumber);
        appointment.mapUrl(appointments[i].mapUrl);
        vm.appointments.push(appointment);
    }

    ko.applyBindings(vm);
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-host"), mapOptions);
    $('#appointment-modal').on('shown.bs.modal', function () {
        google.maps.event.trigger(map, "resize");
    });
});