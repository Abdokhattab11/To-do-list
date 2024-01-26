const activeTasksList = document.querySelector(".active-tasks__list");
const addTaskContainer = document.querySelector(".add-task-cnt");
const addTaskBtn = addTaskContainer.querySelector("button");
const completeTasksList = document.querySelector(".completed-tasks__list");
let globalTaskCounter = 0;

const randColors = ["#22c55e", "#f97316", "#06b6d4", "#6366f1", "#ec4899"];
let colorCnt = 0;

function handelEmptyTaskCnt(cnt) {
  const el = cnt.querySelector(".default-text");
  if (cnt.children.length === 1) {
    el.classList.remove("hidden");
  } else {
    el.classList.add("hidden");
  }
}

class Task {
  constructor(title, tags) {
    this.title = title;
    this.tags = tags.split(/\s|,/);
  }
  deleteTaskHandler(domObject) {
    domObject.remove();
    handelEmptyTaskCnt(completeTasksList);
    handelEmptyTaskCnt(activeTasksList);
  }
  completeTaskHandler(domObject) {
    const parent = domObject.parentElement;
    const taskTitle = domObject.querySelector(".task-title p");
    domObject.remove();
    if (parent.classList.contains("active-tasks__list")) {
      completeTasksList.append(domObject);
      const label = domObject.querySelector(".checkbox-cnt label span");
      label.innerHTML = "&#10003;";
      taskTitle.style.textDecoration = "line-through"; //    text-decoration: line-through
      handelEmptyTaskCnt(completeTasksList);
      handelEmptyTaskCnt(activeTasksList);
    } else {
      activeTasksList.append(domObject);
      const label = domObject.querySelector(".checkbox-cnt label span");
      label.innerHTML = "";
      taskTitle.style.textDecoration = "";
      handelEmptyTaskCnt(activeTasksList);
      handelEmptyTaskCnt(completeTasksList);
    }
  }
  getTaskDom() {
    const el = document.createElement("li");
    el.className = "task-item";
    let tagsHTML = ``;
    for (const tag of this.tags) {
      if (!tag.trim()) continue;
      tagsHTML += `<span style="background-color:${
        randColors[colorCnt++ % randColors.length]
      };">${tag}</span>`;
    }
    el.innerHTML = `
    <span class="task-color" style="background-color:${
      randColors[colorCnt++ % randColors.length]
    };"></span>
    <div class="checkbox-cnt">
      <input type="checkbox" id="task${globalTaskCounter}" />
      <label for="task${globalTaskCounter++}">
        <span></span>
      </label>
    </div>
    <div class="task-title">
      <p>${this.title}</p>
      <div class="tags">
        ${tagsHTML}
      </div>
    </div>
    <button class="task-delete">
      <ion-icon name="trash-outline" class="icon"></ion-icon>
    </button>
    `;
    console.log();
    const deleteBtn = el.querySelector("button");
    deleteBtn.addEventListener("click", this.deleteTaskHandler.bind(null, el));
    const completeBtn = el.querySelector("label span");
    completeBtn.addEventListener(
      "click",
      this.completeTaskHandler.bind(null, el)
    );
    return el;
  }
}

function addTaskHandeler() {
  const taskNameEl = document.getElementById("task-name");
  const taskTagsEl = document.getElementById("task-tags");

  if (!taskNameEl.value.trim()) return;
  const newTask = new Task(taskNameEl.value, taskTagsEl.value);
  activeTasksList.append(newTask.getTaskDom());
  handelEmptyTaskCnt(activeTasksList);
  taskNameEl.value = "";
  taskTagsEl.value = "";
}

addTaskBtn.addEventListener("click", addTaskHandeler);
