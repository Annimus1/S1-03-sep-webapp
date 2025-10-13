import { Logo } from "../../../../globals/components/atomos/Logo";
import { LogoutButton } from "../atomos/LogoutButton";
import { UserIconSmall } from "../atomos/UserIconSmall";

export const Header = ({ onLogout }) => (
  <header style={{
    background: 'white',
    padding: '16px 0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
  }}>
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <Logo />
        <div className="d-flex align-items-center gap-3">
          <UserIconSmall />
          <LogoutButton onClick={onLogout} />
        </div>
      </div>
    </div>
  </header>
);