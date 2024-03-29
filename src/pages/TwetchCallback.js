import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  CircularProgress,
  OutlinedInput,
  Typography,
  useTheme
} from "@material-ui/core";

import { userData } from "../api/TwetchGraph";

const Twetch = require("@twetch/sdk");

export default function TwetchCallback() {
  const [loading, setLoading] = useState(false);
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [error, setError] = useState(false);
  const [errorDesc, setErrorDesc] = useState("");
  const history = useHistory();
  const theme = useTheme();
  let params = new URLSearchParams(document.location.search.substring(1));
  let tokenTwetch = params.get("token");
  localStorage.setItem("tokenTwetchAuth", tokenTwetch);
  const twetch = new Twetch();

  useEffect(() => {
    setLoading(true);
    console.log(localStorage.tokenTwetchAuth);
    twetch.me().then((resp) => {
      localStorage.setItem("userId", resp.me.id);
      localStorage.setItem("userName", resp.me.name);
    });
    setLoading(false);
  }, []);

  const handleChangeRecoveryPhrase = (e) => {
    e.preventDefault();
    setError(false);
    setRecoveryPhrase(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const pKey = twetch.crypto.privFromMnemonic(recoveryPhrase);
      twetch.wallet.restore(pKey);
      localStorage.setItem("mnemonic", recoveryPhrase);
      history.push("/");
    } catch (err) {
      setError(true);
      setErrorDesc(err.message);
    }
  };

  return loading ? (
    <div
      style={{
        display: "flex",
        marginTop: "16px",
        justifyContent: "center"
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <div
      style={{
        backgroundColor: theme.palette.primary.light,
        height: "100vh",
        display: "flex"
      }}
    >
      <div style={{ flexGrow: 1 }} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ flexGrow: 1 }} />
        <div
          style={{
            width: "100%",
            padding: "36px 44px",
            maxWidth: "600px",
            background: "white",
            boxShadow: "0px 0px 60px rgb(0 0 0 / 10%)",
            borderRadius: "6px"
          }}
        >
          <div style={{ margin: "0 auto", maxWidth: "100%" }}>
            <div style={{ position: "relative", marginBottom: "36px" }}>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: 669,
                  fontSize: "24px",
                  cursor: "pointer"
                }}
              >
                <span role="img" aria-label="the egg way">
                  (🥚,🐣)
                </span>
                <span style={{ fontSize: "18px", marginLeft: "3px" }}>
                  EggDao
                </span>
              </div>
            </div>
            <Typography
              variant="body1"
              style={{
                color: "#0A0A0B",
                fontSize: "29px",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "24px"
              }}
            >
              One Last Thing...
            </Typography>
            <Typography
              variant="body1"
              style={{ marginTop: "16px", textAlign: "center" }}
            >
              We need you to manually link your{" "}
              <a
                href="https://twetch.app/wallet"
                rel="noreferrer"
                target="_blank"
              >
                Twetch Wallet
              </a>{" "}
              to EggDao.
            </Typography>
            <Typography
              variant="body1"
              style={{ textAlign: "center", marginBottom: "36px" }}
            >
              <strong>We will never store your phrase.</strong>
            </Typography>
            <div
              style={{
                position: "relative",
                height: "175px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around"
              }}
            >
              <form
                style={{
                  margin: "24px auto",
                  maxWidth: "300px"
                }}
              >
                <OutlinedInput
                  style={{
                    padding: "18px 12px",
                    color: "#010101",
                    marginBottom: "9px",
                    backgroundColor: "#F0F0F6 !important"
                  }}
                  value={recoveryPhrase}
                  onChange={handleChangeRecoveryPhrase}
                  error={error}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Paste your Twetch Wallet Recovery Phrase here"
                />
                {error && (
                  <Typography
                    variant="body1"
                    style={{
                      color: theme.palette.error.main,
                      marginBottom: "9px"
                    }}
                  >
                    {errorDesc}
                  </Typography>
                )}
                <Button
                  color="primary"
                  variant="contained"
                  style={{ textTransform: "none" }}
                  fullWidth
                  disabled={false}
                  onClick={handleSubmit}
                >
                  <Typography variant="body1">
                    Link Twetch Wallet and start
                    <span
                      role="img"
                      aria-label="the egg way"
                      style={{ marginLeft: "3px" }}
                    >
                      (🥚,🐣)
                    </span>
                  </Typography>
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1 }} />
      </div>
      <div style={{ flexGrow: 1 }} />
    </div>
  );
}
