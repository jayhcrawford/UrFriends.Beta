import react from 'react'

function Header() {
  return (
    <>
      <header>
        <h1 id="header-logo-text">UrFriends</h1>
      </header>
      <button id="random-interact-btn" alt="Random Interaction Button" aria-label="Random Interaction Button">
        <i className="fa-solid fa-dice"></i>
      </button>
      <button id="main-menu-btn">
        <i className="fa-solid fa-bars"></i>
      </button>
    </>
  )
}

export default Header
