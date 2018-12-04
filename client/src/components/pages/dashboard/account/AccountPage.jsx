import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Icon } from "antd";
import apiAuth from "../../../../api/auth";
import { Route, Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";

export default function AccountPage() {
  function handleLogoutClick(e) {
    apiAuth.logout();
  }
  return (
    <div className="account-page">
      <div className="form-container">
        <div className="form-buttons">
          <Link to="/account/eml">
            <button type="submit" className="button-form">
              Change Email <Icon type="mail" />
            </button>
          </Link>
          <Link to="/account/pwd">
            <button type="submit" className="button-form">
              Change Password <Icon type="lock" />
            </button>
          </Link>
          <StripeCheckout email="hello">
            <button type="submit" className="button-form">
              Buy New Earthie <Icon type="credit-card" />
            </button>
          </StripeCheckout>
          <Link to="/">
            <button
              type="submit"
              onClick={handleLogoutClick}
              className="button-form"
            >
              Log Out <Icon type="logout" />
            </button>
          </Link>
          <div className="image">
            <img src="/images/micro_temp.png" alt="" />
          </div>
        </div>
      </div>
      <Route path="/account/eml" component={ChangeEmail} />
      <Route path="/account/pwd" component={ChangePassword} />
    </div>
  );
}
