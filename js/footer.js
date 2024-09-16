// Footer Content Generation
function createFooter() {
  const footer = document.getElementById("footer");

  footer.innerHTML = `
      <div class="container">
          <div class="row">
              <div class="col-lg-12">
                  <div class="logo__carousel owl-carousel">
                      ${generateLogos([
                        "logo-1.png",
                        "logo-2.png",
                        "logo-3.png",
                        "logo-4.png",
                        "logo-5.png",
                      ])}
                  </div>
              </div>
          </div>
      </div>
      <div class="container">
          <div class="footer__content">
              <div class="row">
                  <div class="col-lg-3 col-md-6 col-sm-6">
                      <div class="footer__about">
                          <div class="footer__logo">
                              <a href="#"><img src="img/logo.png" alt="Logo"></a>
                          </div>
                          <h4>(123) 456-78-91096</h4>
                          <ul>
                              <li>Ernser Vista Suite 437, NY</li>
                              <li>Info.colorlib@gmail.com</li>
                          </ul>
                          <div class="footer__social">
                              <a href="#"><i class="fa fa-facebook"></i></a>
                              <a href="#"><i class="fa fa-twitter"></i></a>
                              <a href="#"><i class="fa fa-linkedin"></i></a>
                              <a href="#"><i class="fa fa-youtube-play"></i></a>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-3 offset-lg-1 col-md-5 offset-md-1 col-sm-6">
                      <div class="footer__widget">
                          <h4>Quick Link</h4>
                          ${generateLinks([
                            { name: "Home", href: "#" },
                            { name: "Booking", href: "#" },
                            { name: "About Us", href: "#" },
                            { name: "Review", href: "#" },
                            { name: "Contact", href: "#" },
                            { name: "Services", href: "#" },
                            { name: "Our Room", href: "#" },
                            { name: "Restaurants", href: "#" },
                            { name: "Payments", href: "#" },
                            { name: "Events", href: "#" },
                          ])}
                      </div>
                  </div>
                  <div class="col-lg-5 col-md-8 col-sm-12">
                      <div class="footer__newslatter">
                          <h4>Subscribe our newsletter</h4>
                          <form action="#">
                              <input type="text" placeholder="Your E-mail Address">
                              <button type="submit">Subscribe</button>
                          </form>
                          <div class="footer__newslatter__find">
                              <h5>Find Us:</h5>
                              <div class="footer__newslatter__find__links">
                                  <a href="#"><i class="fa fa-tripadvisor"></i></a>
                                  <a href="#"><i class="fa fa-map-o"></i></a>
                                  <a href="#"><i class="fa fa-dribbble"></i></a>
                                  <a href="#"><i class="fa fa-forumbee"></i></a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="footer__copyright">
              <div class="row">
                  <div class="col-lg-7 col-md-7">
                      <div class="footer__copyright__text">
                          <p>&copy; <script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
                      </div>
                  </div>
                  <div class="col-lg-5 col-md-5">
                      <ul class="footer__copyright__links">
                          <li><a href="#">Terms Of Use</a></li>
                          <li><a href="#">Privacy Policy</a></li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      `;
}

// Helper function to generate logo items
function generateLogos(logos) {
  return logos
    .map(
      (logo) => `
          <div class="logo__carousel__item">
              <a href="#"><img src="img/logo/${logo}" alt="Logo"></a>
          </div>
      `
    )
    .join("");
}

// Helper function to generate quick links
function generateLinks(links) {
  const half = Math.ceil(links.length / 2);
  const firstHalf = links.slice(0, half);
  const secondHalf = links.slice(half);

  return `
          <ul>
              ${firstHalf
                .map(
                  (link) => `<li><a href="${link.href}">${link.name}</a></li>`
                )
                .join("")}
          </ul>
          <ul>
              ${secondHalf
                .map(
                  (link) => `<li><a href="${link.href}">${link.name}</a></li>`
                )
                .join("")}
          </ul>
      `;
}

document.addEventListener("DOMContentLoaded", function () {
  createFooter();

  /*--------------------------
        Logo Slider
    ----------------------------*/
  // Initialize the carousel
  $(".logo__carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 5,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
});

// function createFooter() {
//   const footer = document.getElementById("footer");

//   footer.innerHTML = `
//         <div class="container">
//             <div class="row">
//                 <div class="col-lg-12">
//                     <div class="logo__carousel owl-carousel">
//                         ${generateLogos([
//                           "logo-1.png",
//                           "logo-2.png",
//                           "logo-3.png",
//                           "logo-4.png",
//                           "logo-5.png",
//                         ])}
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <!-- Other footer content -->
//       `;
// }

// // Helper function to generate logo items
// function generateLogos(logos) {
//   return logos
//     .map(
//       (logo) => `
//             <div class="logo__carousel__item">
//                 <a href="#"><img src="img/logo/${logo}" alt="Logo"></a>
//             </div>
//         `
//     )
//     .join("");
// }
