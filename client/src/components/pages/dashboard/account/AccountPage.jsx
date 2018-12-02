import React from "react";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import { Link, Route, Switch } from "react-router-dom";
export default function AccountPage() {
  return (
    <div className="account-page">
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
      <div>
        <Route path="/account/eml" component={ChangeEmail} />
        <Route path="/account/pwd" component={ChangePassword} />
      </div>
    </div>
  );
}
