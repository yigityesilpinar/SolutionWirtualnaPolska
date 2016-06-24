// Code goes here

var MyLoader = (function Module() {

  var resultTarget =document.getElementById("loaderResult");
  var _this = Module.prototype;

  _this.previousLibs;
  /**
   * callback function after all libs loaded successfully.
   * @param {object} data The JavaScript object which contains url-responseText
   *                      pairs.
   */
  var callbackMulti = function(data, cb) {


    if (typeof _this.previousLibs === 'undefined')
      _this.previousLibs = [];

    // data[libName] is the responseText (Js code from library)
    for (var libName in data) {
      if (_this.previousLibs.indexOf(libName) === -1) {
        _this.previousLibs.push(libName);
        resultTarget.value+=(libName)+"loaded successfully\n\n";
        eval(data[libName]);
      } else {
            resultTarget.value+=(libName + " is loaded previously, can not load again")+" \n\n";
      }

    }

    cb();

  };

  /**
   * callback function if one of library loading fails.
   * @param {string} libName the name of the library loading fails
   */
  var failCallbackMulti = function(libName) {
    console.log(libName + ' failed');
  };

  /**
   * Cross-Browser AJAX request (XMLHttpRequest)
   *
   * @param {string} libName name of the library to load
   * @param {function} callback The callback function if the loading library succeeds.
   * @param {function} failCallback The callback function if loading library fails.
   */
  var loadSingle = function(libName, callback, failCallback) {

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          callback(xmlhttp.responseText, libName);
        } else
          failCallback(libName);
      }
    };
    // true for async
    xmlhttp.open("GET", libName, true);
    xmlhttp.send();
  };

  /**
   * Load multiple libraries, and a single callback is called
   * after all libraries are loaded successfully.
   *
   * @param {Array} libs The libs to load.
   * @param {function} callbackMulti The callback function to be run after all
   *                                 libraries loaded successfully.
   *                                 The callbackMulti takes one argument, which
   *                                 is data object of libName-responseText pairs.
   * @param {function} failCallbackMulti The callback function to be run if one of
   *                                     the library loadings fails.
   */
  var loadMulti = function(libs, callbackMulti, failCallbackMulti, cb) {
    var baseLib="testlib/";
    var isAllCallsCompleted = false;
    var isCallFailed = false;
    var data = {};
    for (var i = 0; i < libs.length; i++) {
      var callback = function(responseText, libName) {
        if (isCallFailed) return;

        data[libName] = responseText;

        // get size of data
        var size = 0;
        for (var index in data) {
          if (data.hasOwnProperty(index))
            size++;
        }

        if (size == libs.length)
        // all AJAX requests are completed successfully
          callbackMulti(data, cb);
      };

      var failCallback = function(libName) {
        isCallFailed = true;
        failCallbackMulti(libName);
      };
      loadSingle(baseLib+libs[i], callback, failCallback);
    }
  };

  var makeDistinct = function(arr) {
    var temp = {};
    for (var i = 0; i < arr.length; i++)
      temp[arr[i]] = true;
    return Object.keys(temp);
  }
  _this.loadLibs = function(options) {
    options.libs = makeDistinct(options.libs);
    //var libCount = _this.libsToLoad.length;
    loadMulti(options.libs, callbackMulti, failCallbackMulti, options.cb);
    // _this.callback = options.cb;


  };


  _this.publicAPI = {
    go: _this.loadLibs
  };

  return _this.publicAPI;
})();



