const capitalize = (value) => {
  if (!value) {
    return ''
  }
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const deKebabCase = (value) => {
  if (!value) {
    return ''
  }
  return value.replace(/-/g, ' ')
}

export {
  capitalize,
  deKebabCase
}
