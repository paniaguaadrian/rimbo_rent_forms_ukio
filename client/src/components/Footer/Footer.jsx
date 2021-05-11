// React Components
import React from "react";

// Material Ui Icons
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

// Images
import RimboLogoWhite from "../../images/rimbo_logo_white.png";

// Styles imported
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.FooterContainer}>
      <a href="http://rimbo.rent" target="_blank" rel="noopener noreferrer">
        <div className={styles.FooterLogo}>
          <h2>Powered by</h2>
          <img src={RimboLogoWhite} alt="Rimbo Rent Logo" />
        </div>
      </a>

      <div>
        <div className={styles.FooterContact}>
          <EmailIcon className={styles.Icon} />
          <a href="mailto:info@rimbo.rent" target="_blank" rel="noreferrer">
            info@rimbo.rent
          </a>
        </div>
        <div className={styles.FooterContact}>
          <PhoneIcon className={styles.Icon} />
          <h2>623063769</h2>
        </div>
      </div>

      <div>
        <a
          className={styles.LinkToPage}
          href="https://rimbo.rent/"
          target="_blank"
          rel="noreferrer"
        >
          Discover the <span>Rimbo</span> Revolution
        </a>
      </div>
    </div>
  );
};

export default Footer;
