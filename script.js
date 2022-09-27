// handle new items to list
const itemUL = document.getElementById("mainUl");

const itemsList = [];
//document.getElementsByClassName("remove").addEventListener("click", removeItem);
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addItem);
const itemAdded = document.getElementById("inputListItem");
let currentEdit = null;

/*if input is entered by enter key*/
itemAdded.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addBtn.click();
  }
});

/** Add item to list */

function addItem() {
  const newItem = itemAdded.value;
  if (newItem == "") {
    /* TO-DO: throw an error message and let user know there needs to be an input */
  } else {
    itemsList.push(newItem);
    const currLi = document.createElement("li");
    currLi.className = "itemBox";
    /*create text*/
    const currLiPara = document.createElement("p");
    currLiPara.className = "itemName";
    currLiPara.textContent += newItem;
    /*create options child*/
    const currLiOptions = document.createElement("div");
    currLiOptions.className = "options";
    /*options items */
    const currDone = document.createElement("button");
    currDone.addEventListener("click", doneItem);
    const currEdit = document.createElement("button");
    currEdit.addEventListener("click", editItem);
    const currRemove = document.createElement("button");
    currRemove.addEventListener("click", removeItem);
    currDone.className = "done";
    currDone.textContent += "Done";
    currEdit.className = "edit";
    currEdit.textContent += "Edit";
    currRemove.className = "remove";
    currRemove.textContent += "Remove";
    /* Append children */
    currLiOptions.appendChild(currDone);
    currLiOptions.appendChild(currEdit);
    currLiOptions.appendChild(currRemove);

    currLi.appendChild(currLiPara);
    currLi.appendChild(currLiOptions);

    itemAdded.value = "";
    itemAdded.focus();

    //console.log(itemsList);

    return itemUL.appendChild(currLi);
  }
}

/** remove item from list */

function removeItem(event) {
  const targetLi = event.currentTarget.parentNode.parentNode;
  const currItem = targetLi.querySelector(".itemName").textContent;
  const targetIndex = itemsList.indexOf(currItem);
  //console.log(targetIndex);
  itemsList.splice(targetIndex, 1);
  //console.log(itemsList);
  itemAdded.focus();

  return targetLi.remove();
}

/** item done */

function doneItem(event) {
  const targetLi = event.currentTarget.parentNode.parentNode;
  const currItem = targetLi.querySelector(".itemName");
  if (currItem.style.textDecoration === "line-through") {
    event.currentTarget.textContent = "Done";
    currItem.style.textDecoration = "none";
  } else {
    event.currentTarget.textContent = "Not Done";
    currItem.style.textDecoration = "line-through";
  }
  return;
}

function editItem(event) {
  const targetLi = event.currentTarget.parentNode.parentNode;
  //global edit li
  currentEdit = targetLi;
  const currItem = targetLi.querySelector(".itemName").textContent;
  const editInput = document.getElementById("editItem");
  //console.log(currItem);
  editInput.textContent = currItem;
  const editPopup = document.getElementById("editPopup");
  editPopup.style.display = "block";
  editInput.focus();
}

function updateEdit(event) {
  const targetEditBox =
    document.getElementById("updateBtn").parentNode.parentNode;
  const itemUpdate = targetEditBox.querySelector("#editItem").textContent;
  //update name in list
  const oldName = currentEdit.querySelector(".itemName").textContent;
  const i = itemsList.indexOf(oldName);
  itemsList[i] = itemUpdate;
  currentEdit.querySelector(".itemName").textContent = itemUpdate;

  console.log("update is being clicked");

  //close out popup
  return cancel();
}

function cancel(event) {
  console.log("cancel is being clicked");
  const popUpBox = document.getElementById("editPopup");
  popUpBox.style.display = "none";
}

//set focus on input box
itemAdded.focus();
