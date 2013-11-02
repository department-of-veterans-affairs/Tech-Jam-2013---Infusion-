var final_transcript = '';

if (!('webkitSpeechRecognition' in window)) {
    // Do nothing to not piss off other devs ;)
} else {
    var recognition = new webkitSpeechRecognition();

    recognition.onresult = function(event) {
        var interim_transcript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
    };
    recognition.onerror = function () {
        alert("An error occurred during speech processing");
    };

    recognition.onend = function () {
        if (final_transcript == "") { alert("Could not understand you!"); }
        if (final_transcript.indexOf("news") >= 0) { window.location.href = "/News/Index"; }
        if (final_transcript.indexOf("history") >= 0) { window.location.href = "/Home/History"; }
        if (final_transcript.indexOf("doctor") >= 0) { window.location.href = "/Doctor"; }
        if (final_transcript.indexOf("appointment") >= 0) { window.location.href = "/Appointments"; }
        if (final_transcript.indexOf("goal") >= 0 || final_transcript.indexOf("roll") >= 0) { window.location.href = "/Home/Goals"; }
        if (final_transcript.indexOf("documents") >= 0) { window.location.href = "/Home/Documents"; }
    };
    }

        function startRecognition() {
            final_transcript = '';
            recognition.lang = 'en-US';
            recognition.start();
        }