import { capitalize } from '@/js/utils/functions'

const finishGame = results => (`
  <div class="modal__body-wrap">
    <div class="modal__results">
      <h2 class="modal__title">
        Great game!
      </h2>
      <div class="modal__row">
        Attemps: <span class="modal__result">${results.attempts}</span>
      </div>
      <div class="modal__row">
        Time: <span class="modal__result">${results.time}</span>
      </div>
      <div class="modal__row">
        Level: <span class="modal__result">${results.level}</span>
      </div>
      <div class="modal__row modal__row--total">
        Total: <span class="modal__result modal__result--total">${results.total}</span>
      </div>
    </div>
    <div class="modal__ranking">
      <div class="modal__row modal__row--ranking">
        <h3 class="modal__ranking-title">Ranking</h3>
      </div>
    </div>
  </div>
`)

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
  getGameLevel
}
