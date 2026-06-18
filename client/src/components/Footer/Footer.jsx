import { Link } from "react-router-dom";
import { CiInstagram, CiFacebook, CiTwitter } from "react-icons/ci";
import "./Footer.scss";
import Logo from "../../assets/images/logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerList = [
    {
      title: "Main Menu",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Shop", href: "/shop" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Discover",
      links: [
        { name: "Articles", href: "/articles" },
        { name: "History", href: "/history" },
        { name: "Brand", href: "/brand" },
      ],
    },
  ];

  const socialLinks = [
    {
      url: "https://www.facebook.com",
      icon: <CiFacebook size={30} />,
    },
    {
      url: "https://www.twitter.com",
      icon: <CiTwitter size={30} />,
    },
    {
      url: "https://www.instagram.com",
      icon: <CiInstagram size={30} />,
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__brand">
          <div className="footer__brand__logo">
            <img src={Logo} alt="Logo" />
          </div>
          <p className="footer__brand__address">Vilnius, Lithuania</p>
          <p className="footer__brand__copy">
            &copy; {currentYear} Coffee by Vitalijus
          </p>
        </div>

        {footerList.map((list) => (
          <div className="footer__col" key={list.title}>
            <h4 className="footer__col__title">{list.title}</h4>
            <ul className="footer__col__links">
              {list.links.map((link) => (
                <li key={link.name}>
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer__col">
          <h4 className="footer__col__title">Find Us On</h4>
          <ul className="footer__col__social">
            {socialLinks.map((social) => (
              <li key={social.url}>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
