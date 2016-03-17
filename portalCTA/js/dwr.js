/* global dwr */

var dwrCallCount = 0;
$(document).ready(function() {
    dwr.engine.setTextHtmlHandler(function() {
        alert("Sua sessão provavelmente expirou.\nFaça login novamente.");
        location.reload(true);
    });
    dwr.engine.setErrorHandler(function(errorString, exception) {
        alert(errorString);
    });
});
