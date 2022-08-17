import React from "react";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="up-footer">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget text-widget">
                <a href="#CPET/index.html" className="footer-logo">
                  <img src="/logo-light.png" alt />
                </a>
                <p>
                  Centre for Public Education and Training is an extension of
                  the University devised for providing socio-educational
                  empowerment programs for the public. CPET plans, designs and
                  implements awareness programs aimed at different age groups of
                  the public.
                </p>
                <ul>
                  <li>
                    <div className="contact-info-icon">
                      <i className="material-icons">location_on</i>
                    </div>
                    <div className="contact-info-value">
                      Darul Huda Islamic University
                    </div>
                  </li>
                  <li>
                    <div className="contact-info-icon">
                      <i className="material-icons">phone_android</i>
                    </div>
                    <div className="contact-info-value">+91 9746229547</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget quick-widget">
                <h2>Quick Links</h2>
                <ul className="quick-list">
                  <li>
                    <a href="#">Darul Huda</a>
                  </li>
                  <li>
                    <a href="#">Mahdiyya Portal</a>
                  </li>
                  <li>
                    <a href="#">Result Portal</a>
                  </li>
                  <li>
                    <a href="#">Academic Calendar</a>
                  </li>
                  <li>
                    <a href="#">E-Brochure</a>
                  </li>
                  <li>
                    <a href="#">Gallery</a>
                  </li>
                  <li>
                    <a href="#">Get In Touch</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget subscribe-widget">
                <h2>Subscribe Us</h2>
                <p>
                  Don't miss anything, Subscribe and keep informed about our
                  updates.
                </p>
                <div className="newsletter-form">
                  <input
                    className="form-control"
                    type="email"
                    name="EMAIL"
                    placeholder="Enter Your E-mail"
                    required
                  />
                  <input type="submit" defaultValue="Subscribe" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright copyrights-layout-default">
        <div className="container">
          <div className="copyright-inner">
            <div className="copyright-cell">
              {" "}
              © 2022 <span className="highlight">CPET</span> (Center for Public
              Education and Training)
            </div>
            <div className="copyright-cell">
              developed by {'   '}
              <a href="https://digitio-stack-portfolio-25lbq91wi-janishnehyan03.vercel.app/">
                <span className="highlight">Ditio Stack</span>
              </a>
            </div>
            <div className="copyright-cell">
              <ul className="CPET-social-links">
                <li>
                  <a href="#" className="facebook">
                    <i className="fa fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#" className="twitter">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#" className="google">
                    <i className="fa fa-google-plus" />
                  </a>
                </li>
                <li>
                  <a href="#" className="linkedin">
                    <i className="fa fa-linkedin" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
