const setBrowserInDom = () => {
  const classes = []
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    classes.push('firefox')
  }
  document.querySelector('body').classList.add(...classes)
}

export {
  setBrowserInDom
}
