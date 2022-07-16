/**DECLARATIONS */
let url = "https://dev61942.service-now.com/api/now/table/incident";
var sla = "https://dev61942.service-now.com/api/now/table/task_sla";
// var user = "https://dev61942.service-now.com/api/now/table/task/";
const credentials = { username: "dolo.akougon", password: "zARLobcv3w8Dyb" };

var nb_item_by_page = 5;
var first = 0;
let current_page = 1;

var nex = document.getElementById("next");
var prev = document.getElementById("last");

const display = async () => {
  try {
    const res_inc = await axios.get(url, { auth: credentials });
    const incidents = res_inc.data.result;

    const number_tab = incidents.map((incident) => incident.number);

    const res_sla = await axios.get(sla, { auth: credentials });
    const task_sla = res_sla.data.result;

    for (let i = 0; i < task_sla.length; i++) {
      console.log(task_sla[i]);
      const res_tsk = await axios.get(task_sla[i].task.link, {
        auth: credentials,
      });
      // const tasks = res_tsk.data.result;

      // console.log(tasks.number);
      // if (number_tab.includes(`${tasks.number}`)) {
      //   const datas = task_sla[i];

      //   console.log(datas);
      // }
    }
  } catch (err) {}
};

display();
