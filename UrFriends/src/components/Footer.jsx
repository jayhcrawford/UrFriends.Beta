import React from "react";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          height: "10em",
          marginTop: "2em",
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
        }}
        className="footer-contents"
      >
        <p style={{ padding: "1em" }}>
          Jay Crawford - UrFriends - {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
export default Footer;
