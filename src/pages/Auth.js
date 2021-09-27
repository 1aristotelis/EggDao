import React from "react";
import { useTheme } from "@material-ui/styles";
import { Button, Typography } from "@material-ui/core";

export default function Auth() {
  const theme = useTheme();
  const host = window.location.host;

  const TwetchLogin = (e) => {
    // config
    let redirectUrl = `https://${host}/auth/callback/twetch`;
    let appName = "EggDao";
    e.preventDefault();
    window.location.href = `https://twetch.app/auth/authorize?appName=${appName}&redirectUrl=${redirectUrl}`;
  };

  return (
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
              Sign In
            </Typography>
            <div
              style={{
                marginTop: "24px",
                position: "relative",
                height: "128px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around"
              }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ textTransform: "none" }}
                onClick={TwetchLogin}
              >
                Sign In with Twetch
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                style={{ textTransform: "none", textAlign: "center" }}
                href="https://twet.ch/inv/eggdao"
                target="_blank"
              >
                But ser, I don't have a Twetch acount
              </Button>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1 }} />
      </div>
      <div style={{ flexGrow: 1 }} />
    </div>
  );
}
