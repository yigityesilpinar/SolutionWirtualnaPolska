(function (global) {

  // if the selector is end :eq(num) or :eq( num ) whitespaces are ignored
  var eqPattern = /^(.*:eq\(\s*\d\s*\)).*\s*$/i;
  //:not(div a)
  var notPattern = /^(.*:not\(.*\)).*\s*$/i;

  // Export $$$ as global function
  global.$$$ = function (selector) {

    if (isEqSelector(selector)) {
      return initEq(selector);
    } else {
      return document.querySelectorAll(selector);
    }

  }; // $$$ Function

  function initEq(selector) {

    var eqResult = dealEqOnce(selector);
    // console.log(eqResult);
    if (eqResult) {
      selector = selector.split(/(:eq\(\s*\d\s*\))/);
      selector = selector.filter(function (item, index) {
        return index > 1;
      });
      selector = selector.join("");
      if (!isEqSelector(selector)) {
        if (selector)
          return eqResult.querySelectorAll(selector);
        else
          return eqResult;
      } else {
        var result = dealEqWithElem(eqResult, selector);
        return result;
      }
    }

  } // function initEq

  function dealEqWithElem(elem, selector) {

    if (!isEqSelector(selector)) {
      return elem.querySelectorAll(selector);
    }
    var numPattern = /.*(\d).*/;
    var eqStatement = selector.split(":")[1];
    var index = (function getNumberFromEq(eqStr) {
      // Return the number inside the eqStr, the index
      return parseInt(numPattern.exec(eqStr)[1]);
    } (eqStatement));

    // remove the eq statement from selector
    var eqSelector = selector.split(":")[0];
    // console.log(elem)
    elem = elem.querySelectorAll(eqSelector)[index];



    selector = selector.split(/(:eq\(\s*\d\s*\))/);
    selector = selector.filter(function (item, index) {
      return index > 1;
    });
    selector = selector.join("");

    //console.log(selector);
    if (selector && elem)
      return dealEqWithElem(elem, selector);
    else {

      return elem;
    }


  } // function dealEqWithElem

  function dealEqOnce(eqSelector) {
    var numPattern = /.*(\d).*/;
    var eqStatement = eqSelector.split(":")[1];

    var index = (function getNumberFromEq(eqStr) {
      // Return the number inside the eqStr, the index
      return parseInt(numPattern.exec(eqStr)[1]);

    } (eqStatement));

    // remove the eq statement from selector
    eqSelector = eqSelector.split(":")[0];

    try {
      var elementList = document.querySelectorAll(eqSelector);

      var found = elementList[index];
      if (found === undefined) {
        alert("no element found at the index");
      } else {
        return found;
      }
    } catch (e) {
      alert("no element found");
      return false;
    }


  } // function dealEqOnce

  function isEqSelector(selector) {
    try {
      // exec the eqPattern regEx if the pattern does not found throw error
      if (eqPattern.exec(selector) === null) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }

  } // function isEqSelector

} (this)); // this indicate window object