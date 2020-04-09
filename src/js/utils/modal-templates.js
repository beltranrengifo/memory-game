import { capitalize } from '@/js/utils/functions'

const finishGame = results => (`
  <div class="modal__body-wrap">
    <div class="modal__results">
      <h2 class="modal__title">
        Great game!
        <span id="play-again" class="button">Play again</span>
      </h2>
      <div class="modal__row">
        Attemps: <span class="modal__result">${results.attempts}</span>
      </div>
      <div class="modal__row">
        Time: <span class="modal__result">${results.time}</span>
      </div>
      <div class="modal__row">
        Level: <span class="modal__result">${capitalize(results.level)}</span>
      </div>
      <div class="modal__row modal__row--total">
        Total: <span class="modal__result modal__result--total">${results.total}</span>
      </div>
    </div>
    <div class="modal__ranking">
      <div class="modal__row modal__row--ranking">
        <h3 class="modal__ranking-title">Ranking</h3>
        <table class="table table--ranking">
          ${results.ranking}
        </table>
      </div>
    </div>
  </div>
`)

const getRankingTable = (list, levels) => {
  console.log(list)
  const header = `
    <tr>
      <th>User</th>
      <th>Location</th>
      <th>Level</th>
      <th>Attempts</th>
      <th>Time</th>
      <th>Total</th>
    </tr>
  `

  const rows = list.reduce((str, item, i, a) => {
    let el = `<tr class="table__row ${i < 5 ? 'top-five' : i >= a.length - 5 ? 'last-five' : ''}">`
    el += `<td class="table__item table__item--user"><span class="table__item-position">${i + 1}. </span>${capitalize(item.user)}</td>`
    el += `<td class="table__item table__item--location">${item.userLocation && item.userLocation.geocode.address.city}</td>`
    el += `<td class="table__item table__item--level">${capitalize(levels[item.level])}</td>`
    el += `<td class="table__item table__item--attempts">${item.attempts}</td>`
    el += `<td class="table__item table__item--time">${item.time}</td>`
    el += `<td class="table__item table__item--total">${item.total}</td>`
    el += '</tr>'
    str += el
    return str
  }, '')

  /* const rows = list.reduce((str, item, i, a) => {
    let el = `<li class="modal__ranking-list-item ${i < 5 ? 'top-five' : i >= a.length - 5 ? 'last-five' : ''}">`
    el += `<span class="list-item list-item--user">${item.user}</span>`
    el += `<span class="list-item list-item--location">${item.userLocation && item.userLocation.geocode.address.city}</span>`
    el += `<span class="list-item list-item--level">${capitalize(levels[item.level])}</span>`
    el += `<span class="list-item list-item--attempts">${item.attempts}</span>`
    el += `<span class="list-item list-item--time">${item.time}</span>`
    el += `<span class="list-item list-item--total">${item.total}</span>`
    el += '</li>'
    str += el
    return str
  }, '') */

  return `
    <thead class="table__header">
      ${header}
    </thead>
    <tbody class="table__body">
      ${rows}
    </tbody>
  `
}

const getUser = () => (`
  <div
    id="user-modal"
    class="modal__body-wrap">
    <h2 class="modal__title">
      Hi there!
    </h2>
    <div class="modal__row">
      <input
        class="input"
        name="user"
        id="input-user"
        placeholder="Your name">
    </div>
    <div class="modal__footer">
      <button
        class="button">
        Next
      </button>
    </div>
  </div>
`)

const getLocation = () => (`
  <div
    id="location-modal"
    class="modal__body-wrap">
    <h2 class="modal__title">
      Geolocation API!
    </h2>
    <div class="modal__row">
      We collect your location, just for educational purposes
    </div>
    <div class="modal__footer">
      <button
        value="true"
        class="button">
        Ok
      </button>
      <button
        value="true"
        class="button">
        No
      </button>
    </div>
  </div>
`)

const getGameLevel = (user, city) => (`
  <div
    id="level-modal"
    class="modal__body-wrap">
    <h2 class="modal__title">
      Hi, ${capitalize(user)} ${city ? 'from ' + city + ',' : ''} please choose your level!
    </h2>
    <div class="modal__row">
      Higher levels give higher ranks!
    </div>
    <div class="modal__row">
      <div class="modal__levels">
        <button class="levels__level levels__level--easier" value="2">Easier</button>
        <button class="levels__level levels__level--easy" value="3">Easy</button>
        <button class="levels__level levels__level--medium" value="4">Medium</button>
        <button class="levels__level levels__level--hard" value="5">Hard</button>
        <button class="levels__level levels__level--hardest" value="6">Hardest</button>
      </div>
    </div>
  </div>
`)

export {
  finishGame,
  getUser,
  getLocation,
  getGameLevel,
  getRankingTable
}
