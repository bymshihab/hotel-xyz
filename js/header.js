function createHeader() {
  const headerHTML = `
    <header class="header">
        <div class="header__top">
          <div class="container">
            <div class="row">
              <div class="col-lg-7">
                <ul class="header__top__widget">
                  <li><span class="icon_pin_alt"></span> 96 Ernser Vista Suite 437, NY, US</li>
                  <li><span class="icon_phone"></span> (123) 456-78-910</li>
                </ul>
              </div>
              <div class="col-lg-5">
                <div class="header__top__right">
                  <div class="header__top__auth">
                    <ul>
                      <li><a href="#">Login</a></li>
                      <li><a href="#">Register</a></li>
                    </ul>
                  </div>
                  <div class="header__top__language">
                    <img src="img/lan.png" alt="language" />
                    <span>English</span>
                    <i class="fa fa-angle-down"></i>
                    <ul>
                      <li>English</li>
                      <li>Bangla</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="header__nav__option">
          <div class="container">
            <div class="row">
              <div class="col-lg-2">
                <div class="header__logo">
                  <a href="./index.html"><img src="img/logo.png" alt="logo" /></a>
                </div>
              </div>
              <div class="col-lg-10">
                <div class="header__nav">
                  <nav class="header__menu">
                    <ul class="menu__class">
                      <li class="active"><a href="./index.html">Home</a></li>
                      <li><a href="./rooms.html">Rooms</a></li>
                      <li><a href="./about.html">About Us</a></li>
                      <li>
                        <a href="#">Pages</a>
                        <ul class="dropdown">
                          <li><a href="./about.html">About Us</a></li>
                          <li><a href="./room-details.html">Room Details</a></li>
                          <li><a href="./blog-details.html">Blog Details</a></li>
                        </ul>
                      </li>
                      <li><a href="./blog.html">News</a></li>
                      <li><a href="./contact.html">Contact</a></li>
                    </ul>
                  </nav>
                  <div class="header__nav__widget">
                    <a href="#">Book Now <span class="arrow_right"></span></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="canvas__open">
              <span class="fa fa-bars"></span>
            </div>
          </div>
        </div>
      </header>
    `;

  // Inject the header HTML into the div with the ID of 'header'
  document.getElementById("header").innerHTML = headerHTML;
}

// Call the function to create the header on page load
createHeader();
