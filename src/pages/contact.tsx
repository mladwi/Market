import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgMail } from "react-icons/cg";

const Contact = () => {
  return (
    <>
      <div className="container">
        <div className="contact_cards">
          <div className="contact_card">
            <div className="icon_box">
              <FaTelegram className="telegram_icon"/>
              <h2>Write To Telegram</h2>
            </div>
            <Link to="https://t.me/ravshan_141" target="Error :(">
              admin: @ravshan_141
            </Link>
          </div>
          <div className="contact_card">
            <div className="icon_box">
              <FaInstagram className="instagram_icon" />
              <h2>Write To Instagram</h2>
            </div>
            <Link to="https://instagram.com/_ravshan_141" target="_blank">
              admin: _ravshan_141
            </Link>
          </div>
          <div className="contact_card">
            <div className="icon_box">
              <CgMail  className="email_icon"/>
              <h2>Write To Email</h2>
            </div>
            <Link to="mailto:rshokirov@862gmail.com" target="_blank">
              admin: rshokirov@862gmail.com
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
