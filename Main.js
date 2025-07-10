document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector(".addbutton");
  const overlay = document.getElementById("overlay");
  const popupMenu = document.getElementById("popupMenu");
  const cancelButton = document.querySelector(".cancel");
  const applyButton = document.querySelector(".apply");
  const noteContentInput = document.getElementById("noteContentInput");
  const notesContainer = document.getElementById("notesContainer");
  const emptyState = document.querySelector(".Detective-check-footprint");
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const searchInput = document.getElementById("searchInput");
  const editPopupMenu = document.getElementById("editPopupMenu");
  const editNoteContentInput = document.getElementById("editNoteContentInput");
  const cancelEditButton = document.querySelector(".cancel-edit");
  const saveEditButton = document.querySelector(".save-edit");
  const themeToggle = document.getElementById("themeToggle");
  const moonIcon = document.querySelector(".moon-icon");
  const sunIcon = document.querySelector(".sun-icon");
  const undo = document.getElementById("undo");
  const undoaction = document.getElementById("undoaction");
  const countdown = document.getElementById("countdown");
  const ring = document.querySelector(".ring");

  let currentEditingNote = null;
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let deletedNote = null;
  let undoTimeout;
  let countdownInterval;
  let currentFilter = localStorage.getItem("filter") || "all";

  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  ring.style.strokeDasharray = circumference;

  function updateRing(timeLeft = 5) {
    const offset = circumference - timeLeft * circumference;
    ring.style.strokeDashoffset = offset;
  }

  function saveNotesToStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function applyFilterToNotes() {
    document.querySelectorAll(".note-item").forEach((noteElement, i) => {
      const noteIndex = noteElement.dataset.index;
      const isChecked = notes[noteIndex].checked;
      noteElement.style.display =
        currentFilter === "all" ||
        (currentFilter === "completed" && isChecked) ||
        (currentFilter === "incomplete" && !isChecked)
          ? "flex"
          : "none";
    });

    const selectedItem = dropdownMenu.querySelector(
      `[data-value="${currentFilter}"]`
    );
    if (selectedItem) dropdownToggle.textContent = selectedItem.textContent;
  }

  function renderNotes() {
    notesContainer.innerHTML = "";
    emptyState.style.display = notes.length === 0 ? "flex" : "none";

    notes.forEach((note, index) => {
      const noteElement = document.createElement("div");
      noteElement.className = "note-item" + (note.checked ? " checked" : "");
      noteElement.dataset.index = index;
      noteElement.innerHTML = `
          <input type="checkbox" class="note-checkbox" ${
            note.checked ? "checked" : ""
          }>
          <div class="note-content">${note.content}</div>
          <div class="note-actions">
            <button class="note-action edit-note" title="Edit">
              <img src="./images/Edit.svg" alt="Edit" class="edit-icon" />
              <img src="./images/editblue.png" class="edit-hover-icon" alt="Edit">
            </button>
            <button class="note-action delete-note" title="Delete">
              <img src="./images/trash-svgrepo-com 1.svg" alt="Delete" class="delete-icon" />
              <img src="./images/trashred-svgrepo-com 1.png" class="delete-hover-icon" alt="Delete">
            </button>
          </div>`;

      notesContainer.appendChild(noteElement);

      const checkbox = noteElement.querySelector(".note-checkbox");
      checkbox.addEventListener("change", function () {
        notes[index].checked = this.checked;
        noteElement.classList.toggle("checked", this.checked);
        saveNotesToStorage();
        applyFilterToNotes();
      });

      const deleteBtn = noteElement.querySelector(".delete-note");
      deleteBtn.addEventListener("click", function () {
        deletedNote = { ...notes[index], index };
        notes.splice(index, 1);
        saveNotesToStorage();
        renderNotes();
        showUndoToast();
      });

      const editBtn = noteElement.querySelector(".edit-note");
      editBtn.addEventListener("click", function () {
        currentEditingNote = index;
        editNoteContentInput.value = notes[index].content;
        editPopupMenu.style.display = "block";
        overlay.style.display = "block";
      });
    });

    applyFilterToNotes();
  }

  function showUndoToast() {
    undo.classList.remove("hidden");

    let secondsLeft = 5;
    countdown.textContent = secondsLeft;
    updateRing(secondsLeft);

    clearTimeout(undoTimeout);
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
      secondsLeft--;
      countdown.textContent = secondsLeft;
      updateRing(secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(countdownInterval);
        undo.classList.add("hidden");
        deletedNote = null;
      }
    }, 1000);

    undoTimeout = setTimeout(() => {
      clearInterval(countdownInterval);
      deletedNote = null;
      undo.classList.add("hidden");
    }, 5000);
  }

  undoaction.addEventListener("click", () => {
    if (deletedNote) {
      notes.splice(deletedNote.index, 0, deletedNote);
      saveNotesToStorage();
      renderNotes();
      deletedNote = null;
    }
    undo.classList.add("hidden");
    clearTimeout(undoTimeout);
    clearInterval(countdownInterval);
    ring.style.strokeDashoffset = 0;
  });

  applyButton.addEventListener("click", function () {
    const content = noteContentInput.value.trim();
    if (!content) return alert("Please enter note content");
    notes.push({ content, checked: false });
    saveNotesToStorage();
    renderNotes();
    noteContentInput.value = "";
    popupMenu.style.display = "none";
    overlay.style.display = "none";
  });

  noteContentInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") applyButton.click();
  });

  editNoteContentInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") saveEditButton.click();
  });

  dropdownMenu.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      currentFilter = e.target.dataset.value;
      localStorage.setItem("filter", currentFilter);
      dropdownToggle.textContent = e.target.textContent;
      applyFilterToNotes();
    }
  });

  searchInput.addEventListener("input", function () {
    const term = this.value.toLowerCase();
    document.querySelectorAll(".note-item").forEach((noteElement) => {
      const content = noteElement
        .querySelector(".note-content")
        .textContent.toLowerCase();
      noteElement.style.display = content.includes(term) ? "flex" : "none";
    });
  });

  cancelButton.addEventListener("click", function () {
    popupMenu.style.display = "none";
    overlay.style.display = "none";
  });

  addButton.addEventListener("click", function (e) {
    e.stopPropagation();
    popupMenu.style.display = "block";
    overlay.style.display = "block";
    noteContentInput.focus();
  });

  saveEditButton.addEventListener("click", function () {
    const newContent = editNoteContentInput.value.trim();
    if (!newContent || currentEditingNote === null)
      return alert("Note cannot be empty");
    notes[currentEditingNote].content = newContent;
    saveNotesToStorage();
    renderNotes();
    editPopupMenu.style.display = "none";
    overlay.style.display = "none";
    currentEditingNote = null;
  });

  cancelEditButton.addEventListener("click", function () {
    editPopupMenu.style.display = "none";
    overlay.style.display = "none";
    currentEditingNote = null;
  });

  document.addEventListener("click", function (e) {
    if (!popupMenu.contains(e.target) && e.target !== addButton) {
      popupMenu.style.display = "none";
      overlay.style.display = "none";
    }
  });

  popupMenu.addEventListener("click", (e) => e.stopPropagation());

  function initTheme() {
    const userPref = localStorage.getItem("theme");
    const isDark =
      userPref === "dark" ||
      (!userPref && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    moonIcon.style.display = isDark ? "none" : "block";
    sunIcon.style.display = isDark ? "block" : "none";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      document.documentElement.setAttribute("data-theme", isDark ? "" : "dark");
      localStorage.setItem("theme", isDark ? "light" : "dark");
      moonIcon.style.display = isDark ? "block" : "none";
      sunIcon.style.display = isDark ? "none" : "block";
    });
  }

  initTheme();
  renderNotes();
});
