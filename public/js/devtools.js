var checkStatus;
var element = new Image();
Object.defineProperty(element, 'id', {
  get: function() {
    checkStatus = true;
    throw new Error("Dev tools checker");
  }
});

var body = document.querySelector('body')
var bodyHtml = body.innerHTML

requestAnimationFrame(function check () {
    checkStatus = false;
    console.dir(element);
    if (checkStatus) {
      body.innerHTML = '<div class="pirates" style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; background: #3caea3; color: white; flex-direction: column; height: 100vh;"><h1>Dev tooling? uhm...</h1><p>Try again with devtools closed</p></div>'
    }
    requestAnimationFrame(check);
});
