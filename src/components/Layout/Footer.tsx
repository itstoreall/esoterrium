import Container from '@/src/components/Container';
import Link from 'next/link';

const Copyright = () => {
  return (
    <div className="copyright">
      <div className="copyright-content-block">
        <span className="copyright-title">
          <Link href={'/'} target="_blank">
            Esoterrium
          </Link>
        </span>
        <span className="copyright-symbol">&copy;</span>
        <time className="copyright-time">{new Date().getFullYear()}</time>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="footer-content-block-container">
        <div className="footer-content-block">
          <Copyright />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
