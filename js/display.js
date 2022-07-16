/**DECLARATIONS */
let url = "https://dev61942.service-now.com/api/now/table/incident";
var sla = "https://dev61942.service-now.com/api/now/table/task_sla";
const credentials = { username: "dolo.akougon", password: "zARLobcv3w8Dyb" };

/**FUNCTIONS */

//recuperation des données a travers url avec api get
const get = async (url) => {
  try {
    const res = await axios.get(url, { auth: credentials });
    return res.data.result;
  } catch (err) {
    console.log("erreur: ", err);
  }
};

get(url)
  .then((datas) => {
    let numbers = datas.map((nb) => nb.number);
    let _list = [];

    get(sla)
      .then((task_sla) => {
        for (let i = 0; i < task_sla.length; i++) {
          get(`${task_sla[i].task?.link}`)
            .then((task) => {
              let _task = task;

              if (numbers?.includes(`${_task?.number}`)) {
                let _task_sla = task_sla[i];

                get(`${task_sla[i].sla.link}`)
                  .then((sla_def) => {
                    let _sla = sla_def;

                    var list = { ..._task, ..._sla, ..._task_sla };
                    _list.push(list);

                    table(_list);
                  })
                  .catch((err) => console.log("erreur: ", err));
              }
            })
            .catch((err) => console.log("erreur: ", err));
        }
      })
      .catch((err) => console.log("erreur: ", err));
  })
  .catch((err) => console.log("erreur: ", err));

//creation du tableau
const table = (list) => {
  let tableList = "";
  for (let i = 0; i < list.length; i++) {
    tableList += `<tr>
                    <td>${list[i].number}</td>
                    <td>${list[i].name}</td>
                    <td>${list[i].type}</td>
                    <td>${list[i].target}</td>
                    <td>${list[i].stage}</td>
                    <td>${list[i].business_time_left}</td>
                    <td>${list[i].business_duration}</td>
                    <td>${list[i].business_percentage}</td>
                    <td>${list[i].start_time}</td>
                    <td>${list[i].end_time}</td>
                  </tr>`;
  }
  document.getElementById("list").innerHTML = tableList;
};
