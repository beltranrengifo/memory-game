!function () {
  function detectDevTool (allow) {
    if (isNaN(+allow)) allow = 100
    var start = +new Date()
    debugger
    var end = +new Date()
    if (isNaN(start) || isNaN(end) || end - start > allow) {
      document.write('<div class="pirates" style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; background: #3caea3; color: white; flex-direction: column; height: calc(100vh - 16px);"><h1>Dev tooling? uhm...</h1><p>Try again with devtools closed</p></div>')
    }
  }
  if (window.attachEvent) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      detectDevTool()
      window.attachEvent('onresize', detectDevTool)
      window.attachEvent('onmousemove', detectDevTool)
      window.attachEvent('onfocus', detectDevTool)
      window.attachEvent('onblur', detectDevTool)
    } else {
      setTimeout(argument.callee, 0)
    }
  } else {
    window.addEventListener('load', detectDevTool)
    window.addEventListener('resize', detectDevTool)
    window.addEventListener('mousemove', detectDevTool)
    window.addEventListener('focus', detectDevTool)
    window.addEventListener('blur', detectDevTool)
  }
}()