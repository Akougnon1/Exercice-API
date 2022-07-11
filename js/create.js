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
  let err = validation(data);

  /*
   * si le tableau d'erreur est vide creer l'incident puis renvoyez dans la console le msg du succes
   *sinon afficher un msg d'erreur dans la console
   */
  if (err.length == 0)
    axios
      .post(url, data, {
        auth: credentials,
      })
      .then((res) => {
        console.log("successful", res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
});

/**
 * Formulaire validation
 *:Verifier que tout les champs obligatoire sont renseignés sinon retourner
 *un tableau d'erreur.
 * @param {data} data object of mandatories fields
 * @returns error[]: tableau d'erreur
 */
let validation = (data) => {
  let error = [];
  let { impact, short_description, description } = data;

  if (!impact || impact == "none") {
    error[0] = "error";
    return (document.getElementById("impact_err").innerHTML =
      "veuillez choisir une valeur differente de none");
  } else document.getElementById("impact_err").innerHTML = "";

  if (!short_description) {
    error[0] = "error";
    return (document.getElementById("short_err").innerHTML =
      "veuillez renseigner la short description");
  } else document.getElementById("short_err").innerHTML = "";

  if (!description) {
    error[0] = "error";
    return (document.getElementById("desc_err").innerHTML =
      "veuillez renseigner une description.");
  } else document.getElementById("desc_err").innerHTML = "";

  return error;
};
