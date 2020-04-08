const token = '31a0aa2ee4220c'
const geolocationUrl = (lat, long) => (
  `https://eu1.locationiq.com/v1/reverse.php?key=${token}&lat=${lat}&lon=${long}&format=json`
)

export {
  geolocationUrl
}
