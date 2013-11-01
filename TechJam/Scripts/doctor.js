$(function() {

    var doctors = [
        {
            id: 1,
            name: 'Peter Newhook MD',
            address: '330 Hudson st',
            specialty: 'Surgery',
            phoneNumber: '555-555-1234',
            pictureUrl: 'http://nicenicejpg.com/220/220'
        },
        {
            id: 2,
            name: 'Dr. Stephen Jakisa',
            address: '1303 Yonge St, Toronto, Ontario',
            specialty: 'Internal Medecine',
            phoneNumber: '555-555-4321',
            pictureUrl: 'http://nicenicejpg.com/220/220',
        }];

    function ViewModel() {
        var that = this;
        this.doctors = ko.observableArray();
        this.currentDoctor = ko.observableArray();
        this.showModal = function(doctor) {
            that.currentDoctor(doctor);
            $('#doctor-modal').modal();
        };
    }

    function Doctor() {
        this.id = ko.observable();
        this.name = ko.observable();
        this.address = ko.observable();
        this.specialty = ko.observable();
        this.pictureUrl = ko.observable();
        this.phoneNumber = ko.observable();
    }

    var vm = new ViewModel();
    for (var i = 0; i < doctors.length; i++) {
        var doctor = new Doctor();
        doctor.id(doctors[i].id);
        doctor.name(doctors[i].name);
        doctor.address(doctors[i].address);
        doctor.specialty(doctors[i].specialty);
        doctor.pictureUrl(doctors[i].pictureUrl);
        doctor.phoneNumber(doctors[i].phoneNumber);
        vm.doctors.push(doctor);
    }

    ko.applyBindings(vm);
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(32.314647, -110.915595),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-host"), mapOptions);
    $('#doctor-modal').on('shown.bs.modal', function () {
        google.maps.event.trigger(map, "resize");
    });
});