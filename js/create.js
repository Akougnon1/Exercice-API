//declarations
const form = document.getElementById("form");
var url = "https://dev61942.service-now.com/api/now/table/incident";
const credentials = { username: "dolo.akougon", password: "zARLobcv3w8Dyb" };

// fonction de creation d'incident
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //recuperation des valeur des données dans le formalaire html
  let impact = document.getElementById("impact").value;
  let short_description = document.getElementById("short_description").value;
  let description = document.getElementById("description").value;
  let configuration = document.getElementById("configuration_item").value;
  let service = document.getElementById("service").value;

  //donnée à créée
  var data = {
    impact,
    short_description,
    description,
    cmdb_ci: configuration,
    business_service: service,
  };

  //appel à la fonction de validation
  let errs = validation(data);

  /*
   * si le tableau d'erreur est vide creer l'incident puis renvoyez dans la console le msg du succes
   *sinon afficher un msg d'erreur dans la console
   */

  if (!errs || errs === "undefined") {
    axios
      .post(url, data, {
        auth: credentials,
      })
      .then((res) => {
        console.log("successful", res.data);
        document.getElementById("inf").style.background = "rgb(89, 236, 89)";
        document.getElementById("inf").style.color = "white";
        document.getElementById("info").style.display = "block";
        document.getElementById("msg").innerHTML = "Enregistrer avec succes";
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  } else {
    document.getElementById("info").style.display = "block";
    document.getElementById("inf").style.background = "tomato";
    document.getElementById("inf").style.color = "black";

    document.getElementById("msg").innerHTML = errs;
  }
});

/**
 * Formulaire validation
 *:Verifier que tout les champs obligatoire sont renseignés sinon retourner
 *un tableau d'erreur.
 * @param {data} data object of mandatories fields
 * @returns error[]: tableau d'erreur
 */
var validation = (data) => {
  let erreur;
  let { impact, short_description, description } = data;

  if (!impact || impact == "none") {
    erreur = "veuillez choisir une valeur differente de none";
    return (document.getElementById("impact_err").innerHTML =
      "veuillez choisir une valeur differente de none");
  } else document.getElementById("impact_err").innerHTML = "";

  if (!short_description) {
    erreur = "veuillez renseigner la short description";
    return (document.getElementById("short_err").innerHTML =
      "veuillez renseigner la short description");
  } else document.getElementById("short_err").innerHTML = "";

  if (!description) {
    erreur = "veuillez renseigner une description.";
    return (document.getElementById("desc_err").innerHTML =
      "veuillez renseigner une description.");
  } else document.getElementById("desc_err").innerHTML = "";

  return erreur;
};

var close = document.getElementById("close");
close.addEventListener("click", () => {
  document.getElementById("info").style.display = "none";
});
