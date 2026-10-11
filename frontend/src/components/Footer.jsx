const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} Travel Booking. All rights reserved.
      </p>
      <p style={{ margin: 0, fontSize: "14px" }}>
        Travel smart. Travel easy.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    background: "#0B3C5D",
    color: "#FFFFF0",
    textAlign: "center",
    padding: "20px",
    marginTop: "40px",
  },
};

export default Footer;