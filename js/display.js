/**DECLARATIONS */
var url = "https://dev61942.service-now.com/api/now/table/incident";
const credentials = { username: "dolo.akougon", password: "zARLobcv3w8Dyb" };

var nb_item_by_page = 5;
var first = 0;
let current_page = 1;

var nex = document.getElementById("next");
var prev = document.getElementById("last");

/**FUNCTIONS */

//recuperation des données a travers url avec api get
const get = async () => {
  const res = await axios.get(url, { auth: credentials });
  console.log(res.data.result);
  return res.data;
};

//insertion des données recuperées dans la fonction pagination
get().then((res) => {
  pagination(res);
});

// fonction d'affichage de la liste des données et la gestion de pagination
const pagination = (res) => {
  let datas = res.result;
  let datas_length = datas?.length;
  console.log(datas_length);
  let nb_page = Math.ceil(datas_length / nb_item_by_page);

  table(datas);
  display_pagination(current_page, nb_item_by_page, nb_page);

  nex.addEventListener("click", () => next(datas, nb_page));
  prev.addEventListener("click", () => last(datas, nb_page));
};

//creation du tableau
const table = (list) => {
  let tableList = "";
  for (let i = first; i < first + nb_item_by_page; i++) {
    if (i < list.length) {
      tableList += `<tr>
                      <td>${list[i].number}</td>
                      <td>${list[i].sys_class_name}</td>
                      <td>${list[i].category}</td>
                      <td>${list[i].sys_created_by}</td>
                      <td>${list[i].state}</td>
                      <td>${list[i].business_duration}</td>
                      <td>${list[i].upon_approval}</td>
                      <td>${list[i].upon_reject}</td>
                      <td>${list[i].work_start}</td>
                      <td>${list[i].work_end}</td>
                    </tr>`;
    }
  }
  document.getElementById("list").innerHTML = tableList;
};

//fonction de control du button previous de la pagination du tableau
let last = (list, nb_page) => {
  if (first - nb_item_by_page >= 0) {
    first -= nb_item_by_page;
    current_page--;

    display_pagination(current_page, nb_item_by_page, nb_page);
    table(list);
  }
};

//fonction de control du button next de la pagination du tableau
let next = (list, nb_page) => {
  if (first + nb_item_by_page < list.length) {
    first += nb_item_by_page;
    current_page++;

    display_pagination(current_page, nb_item_by_page, nb_page);
    table(list);
  }
};

//affichage des infos de la pagination
let display_pagination = (current_page, nb_item_by_page, nb_page) => {
  document.getElementById("actual_page").innerHTML = current_page;
  document.getElementById("nb_item").innerHTML = nb_item_by_page;
  document.getElementById("nb_page").innerHTML =
    nb_page + " " + `${nb_page > 1 ? " pages" : " page"}`;
};
