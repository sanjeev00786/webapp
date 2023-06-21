import { Link } from "react-router-dom";

const Logo = ({ width = 10 }) => {
  return (
    <Link to="/admin">
      <img
        className={`w-${width} h-auto`}
        src="https://raw.githubusercontent.com/kamona-ui/dashboard-alpine/main/public/assets/images/logo.png"
        alt="K-UI"
      />
    </Link>
  );
};

export default Logo;
