window.addEventListener("DOMContentLoaded", (event) => {
  const newTask = document.getElementById("addTask");
  const input_btn = document.getElementById("addTaskBtn");
  const listTodo = document.getElementById("lista");
  const listDone = document.getElementById("listaDone");

  let task_id_counter = 0;

  input_btn.addEventListener("click", () => {
    if (newTask.value !== "") {
      listTodo.appendChild(createTaskTodo(newTask.value));
    }
  });

  listTodo.addEventListener("click", (e) => {
    console.log(e.target.id);
    listDone.appendChild(deleteTaskAndCreateNew(e.target.id));
  });

  listDone.addEventListener("click", (e) => {
    listTodo.appendChild(deleteTaskAndCreateNew(e.target.id));
  });

  function createTaskTodo(value) {
    const task = document.createElement("li");
    task.setAttribute("id", task_id_counter);
    task_id_counter++;
    task.innerHTML = value.trim();
    return task;
  }

  function deleteTaskAndCreateNew(id) {
    const task = document.getElementById(id);
    const value = task.innerHTML;
    task.remove();

    const new_task = document.createElement("li");
    new_task.setAttribute("id", task_id_counter);
    task_id_counter++;
    new_task.innerHTML = value.trim();
    return new_task;
  }
});
