$(function () {

    var appointments = [
        {
            id: 1,
            date: 'March 7, 2014',
            time: '2:00 PM',
            doctor: 'Doogie Howser',
            type: 'Check Up',
            phoneNumber: '555-555-1234',
            address: '201 East 10th Street, New York, New York'
        },
        {
            id: 2,
            date: 'April 10, 2014',
            time: '7:00 PM',
            doctor: 'Dr. House',
            type: 'Surgery',
            phoneNumber: '555-555-1234',
            address: '599 Broadway, New York, New York'
        },
        {
            id: 3,
            date: 'April 10, 2014',
            time: '7:00 PM',
            doctor: 'Dr. House',
            type: 'Surgery',
            phoneNumber: '555-555-1234',
            address: '599 Broadway, New York, New York'
        },
        {
            id: 4,
            date: 'April 10, 2014',
            time: '7:00 PM',
            doctor: 'Dr. House',
            type: 'Surgery',
            phoneNumber: '555-555-1234',
            address: '599 Broadway, New York, New York'
        },
        {
            id: 5,
            date: 'April 10, 2014',
            time: '7:00 PM',
            doctor: 'Dr. House',
            type: 'Surgery',
            phoneNumber: '555-555-1234',
            address: '599 Broadway, New York, New York'
        },
        {
            id: 6,
            date: 'April 10, 2014',
            time: '7:00 PM',
            doctor: 'Dr. House',
            type: 'Surgery',
            phoneNumber: '555-555-1234',
            address: '599 Broadway, New York, New York'
        },
        {
            id: 7,
            date: 'April 10, 2014',
            time: '7:00 PM',
            doctor: 'Dr. House',
            type: 'Surgery',
            phoneNumber: '555-555-1234',
            address: '599 Broadway, New York, New York'
        },
        {
            id: 8,
            date: 'April 10, 2014',
            time: '7:00 PM',
            doctor: 'Dr. House',
            type: 'Surgery',
            phoneNumber: '555-555-1234',
            address: '599 Broadway, New York, New York'
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
        this.address = ko.observable();
        this.addressUrl = ko.observable();
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
        appointment.address(appointments[i].address);
        appointment.addressUrl("http://maps.apple.com/?daddr=" + appointments[i].address.replace(" ", "+"));
        vm.appointments.push(appointment);
    }

    ko.applyBindings(vm);
});