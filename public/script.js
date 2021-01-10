var dataList = new Map();
var likeCounterList = new Map();
var tileId = 0,
  tileOneId = 0,
  tileTwoId = 0,
  tileThreeId = 0;

function addCard(tileId) {
  //displayPanel
  document.getElementById("panel-container").style.display = "block";
  //addCard
  deleteCard();
  triggerEventToInsertCard(tileId);
}

function updateCard(cardId, data) {
  //display panel with text
  document.getElementById("myText").value = data;
  document.getElementById("panel-container").style.display = "block";
  // update old card
  deleteCard(cardId);
  triggerEventToUpdateCard(cardId);
}

function deleteCard(cardId) {
  document.getElementById("del").onclick = function () {
    if (isNaN(cardId) && cardId) {
      dataList.delete(cardId);
      document.getElementById(cardId).remove();
    }
    clearPanel();
  };
}

function triggerEventToInsertCard(tileId) {
  document.getElementById("panel-container").onclick = function (e) {
    if (e.target == document.getElementById("panel-container")) {
      var data = document.getElementById("myText").value;
      saveData(tileId, data);
      clearPanel();
    }
  };
}

function triggerEventToUpdateCard(cardId) {
  document.getElementById("panel-container").onclick = function (e) {
    if (e.target == document.getElementById("panel-container")) {
      var data = document.getElementById("myText").value;
      updateData(cardId, data);
      clearPanel();
    }
  };
}

function saveData(tileId, data) {
  var cardId = getCardId(tileId);
  if (data) {
    insertNewCard(tileId, cardId, data);
  }
}

function updateData(cardId, data) {
  if (data) {
    updateOldCard(cardId, data);
  }
}

function getCardId(tileId) {
  let cardIdPrefix = "tile" + tileId + "-card";
  if (tileId == 1) {
    return cardIdPrefix + (tileOneId += 1);
  } else if (tileId == 2) {
    return cardIdPrefix + (tileTwoId += 1);
  } else if (tileId == 3) {
    return cardIdPrefix + (tileThreeId += 1);
  }
}

function insertNewCard(tileId, cardId, data) {
  var cardDiv = document.createElement("div");
  cardDiv.className = "card" + tileId;
  cardDiv.id = cardId;

  var textDiv = document.createElement("div");
  textDiv.className = "card-content";
  textDiv.innerText = data;
  dataList.set(cardId, data);

  var likesDiv = document.createElement("div");
  likesDiv.className = "card-likes";
  likesDiv.innerText = "0";
  likeCounterList.set(cardId, 0);

  cardDiv.appendChild(textDiv);
  cardDiv.appendChild(likesDiv);

  document.getElementById("tile" + tileId + "-body").appendChild(cardDiv);
  //bindUpdateLikeEvent(cardId);
  bindUpdateCardEvent(cardId);
}

function updateOldCard(cardId, data) {
  var cardDiv = document.getElementById(cardId);

  var textDiv = cardDiv.children[0];
  textDiv.innerText = data;
  dataList.set(cardId, data);
  // updateLike(cardId);
  //  bindUpdateLikeEvent(cardId);
}

function bindUpdateCardEvent(cardId) {
  document.getElementById(cardId).onclick = () => {
    updateCard(cardId, dataList.get(cardId));
  };
}

function bindUpdateLikeEvent(cardId) {
  //update likes
  document.getElementById(like).onclick = () => {
    let likesCount = likeCounterList.get(cardId);
    likeCounterList.set(cardId, likesCount + 1);
    document.getElementById("counter").innerText = likesCount + 1;
    updateLike(cardId);
  };
}

function updateLike(cardId) {
  var cardDiv = document.getElementById(cardId);
  var likesDiv = cardDiv.children[1];
  likesDiv.innerText = likeCounterList.get(cardId);
}

function clearPanel() {
  document.getElementById("myText").value = "";
  document.getElementById("panel-container").style.display = "none";
}
