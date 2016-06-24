## Motivation

This project is a solution provided for the Frontend Developer Task given by Wirtualna Polska

## Installation

Clone the git repository to your local
```
git clone https://github.com/yigityesilpinar/SolutionWirtualnaPolska.git
```

Change directory to SolutionWirtualnaPolska and npm install for dependencies
```
cd SolutionWirtualnaPolska
npm install
```

npm start command to run the lite server and test the application
```
npm start
```

## API Reference

$$$ Query Selector Global Functon supporting :eq(n) and :not(XXX)
```
var found = $$$(".top:eq( 1) .sub:not(div)")[0];
found.style.backgroundColor = "#AFA";
```

MyLoader Asynchronous lib loader (myloader.js)
```
MyLoader.go({
  libs: ['mylib1.js', 'mylib1.js', 'mylib1.js'],
  cb: function () {
    console.log("Hello! I'm number #1");
  }
});


MyLoader.go({
  libs: ['mylib2.js', 'mylib3.js', 'mylib4.js'],
  cb: function () {
    console.log("Hello! I'm number #2");
  }
});

MyLoader.go({
  libs: ['mylib1.js', 'mylib3.js', 'mylib5.js'],
  cb: function () {
    console.log("Hello! I'm number #3");
  }
});
```

## Contributors

Yigit Yesilpinar