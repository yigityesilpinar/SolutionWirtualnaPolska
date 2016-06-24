
(function () {


    window.onload = function () {
        var loaderContent = document.getElementById("loaderContent");
        var execButton = document.getElementById("execButton");
        var loaderResult = document.getElementById("loaderResult");
        var selectorQuery = document.getElementById("selectorQuery");
        var execQuery = document.getElementById("execQuery");
        if (execButton) {
            execButton.addEventListener("click", function (event) {
                loaderResult.value = "<--- PLEASE CHECK ALSO CONSOLE for DETAILS --> \n\n";
                eval(loaderContent.value);
            });
        }
        if (execQuery) {
            execQuery.addEventListener("click", function (event) {
                eval(selectorQuery.value);
            });
        }

        var client = new XMLHttpRequest();
        client.onload = function (progress) {
            if (this.status == 200) {
                if (loaderContent)
                    loaderContent.value = this.responseText;
            }

        };
        client.open("GET", "loadertest.js", true);
        client.send();

        client = new XMLHttpRequest();
        client.onload = function (progress) {
            if (this.status == 200) {
                if (selectorQuery)
                    selectorQuery.value = this.responseText;
            }

        };
        client.open("GET", "selectortest.js", true);
        client.send();



    };

})();