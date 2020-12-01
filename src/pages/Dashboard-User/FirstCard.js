import React, { useContext } from "react";
import jwtdecode from "jwt-decode";
import { Candidature } from "../../contexts/CandidatureContext";
import { LoginContext } from "../../contexts/LoginContext";
import { Typography, Paper, Divider, Button } from "@material-ui/core";
import Routes from "../../Routes";
import { Link } from "react-router-dom";

export default props => {
  // const { loginState } = useContext(LoginContext);
  const { dossier } = useContext(Candidature);
  const { firstName } = jwtdecode(localStorage.getItem("token"));
  const uncompletedStep = 4 - dossier.step.filter(step => step.done).length;
  //console.log("dashboard", loginState);
  const greetings = () => {
    const today = new Date();
    const currentHour = today.getHours();
    if (currentHour < 19) {
      return "Bonjour";
    } else {
      return "Bonsoir";
    }
  };
  return (
    <Paper
      style={{
        padding: 30,
        backgroundColor: "#1875F0",
        boxShadow: "0px 10px 18px -2px rgba(0,0,0,0.18)",
        borderRadius: 10,
        height: "auto"
      }}
    >
      <Typography variant="h5" style={{ color: "white", fontWeight: "bold" }}>
        {greetings()} {`${firstName}`}
      </Typography>
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      <Typography style={{ marginTop: 20, color: "white" }}>
        Nous vous souhaitons la bienvenue {`${firstName}`},
        {uncompletedStep
          ? " vous avez la possibilité de reprendre, et voir l'avancement de votre dossier d'admission."
          : " votre dossier a bien été envoyé, il ne vous reste plus qu'à attendre et consulter l'avancement de votre dossier d'admission. "}
      </Typography>
      {uncompletedStep ? (
        <Link to={Routes.DASHBOARD_TASKS} style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            style={{ color: "white", marginTop: 15, borderColor: "white" }}
          >
            Continuer l'inscription
          </Button>
        </Link>
      ) : (
        ""
      )}
    </Paper>
  );
};
