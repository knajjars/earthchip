import React from "react";
import { Link } from "react-router-dom";
export default function AccountPage() {
  return (
    <div className="account-page ">
      <div>
        <Link to="/account/eml">
          <button type="submit" className="button-form">
            Change Email
          </button>
        </Link>
        <Link to="/account/pwd">
          <button type="submit" className="button-form">
            Change Password
          </button>
        </Link>
      </div>
    </div>
  );
}
