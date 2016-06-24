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