$(document).ready(function () {
  //Add new node: only one add form. When button insert button fired, this function send a post query to server which receive in index.js
  $("#addNewForm").submit(function () {
    console.log($("#addDate").val());
    if (validNewNote()) {
      $.ajax({
        type: "POST",
        url: "http://localhost:3003/addNewNote",
        data: {
          created_date: $("#addDate").val(),
          title: $("#addTitle").val(),
          content: $("#addContent").val(),
        },
        success: function (result) {
          console.log(result);
          console.log("Success");
          $("#addNewForm")[0].reset();
          $("#addingNotifications").css({ display: "none" });
          alert("Data inserted!");
          window.location.reload(true);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#addingNotifications").css({
            display: "inline-block",
            color: "salmon",
          });
          console.log(jqXHR, textStatus, errorThrown);
          //   $("#addingNotifications").html(xhr.responseJSON.error);
          //   console.log(xhr.responseJSON);
        },
      });
    }
    // event.preventDefault();
  });

  //Because many cards fire a same modal, then onclick+ID need to be add to the update modal
  $("#editModal").on("show.bs.modal", function (event) {
    console.log("edited");
    var id = $(event.relatedTarget).context.dataset.id;
    var content = $(event.relatedTarget).context.dataset.content;
    var title = $(event.relatedTarget).context.dataset.title;
    var created_date = $(event.relatedTarget).context.dataset.created_date;
    var onFucn = `updateNote(${id})`;
    console.log(onFucn);
    var modal = $(this);
    modal.find("#update-date").attr("value", created_date);
    modal.find("#update-title").attr("value", title);
    modal.find("#update-content").attr("value", content);
    modal.find(".modal-footer .btn-primary").attr("onclick", onFucn);
  });
});

// validate all the fields and if not valid, no post request is to be sent
function validNewNote() {
  var newDate = $("#addDate").val();
  var newTitle = $("#addTitle").val();
  var newContent = $("#addContent").val();
  if (newDate == "" || newContent == "" || newTitle == "") {
    $("#addingNotifications").css({ display: "inline-block", color: "salmon" });
    return false;
  }
  return true;
}

//Delete Note: when button delete on each card fired, this function send a delete query to server which receive in index.js
function deleteNote(id) {
  console.log("Hii");
  $.ajax({
    type: "DELETE",
    url: "http://localhost:3003/deleteNote?id=" + id, //address we want to get stuff from or send stuff
    data: {
      ID: id,
    },
    success: function () {
      alert("Deleted");
      window.location.reload(true);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.error);
      console.log(jqXHR);
    },
  });
}

// Update node: when button update on each card fired, this function send an update query to server which receive in index.js
function updateNote(id) {
  console.log("Hi");
  console.log(id);
  if (id) {
    $.ajax({
      type: "PUT",
      url: "http://localhost:3003/updateNote",
      data: {
        ID: id,
        created_date: $("#update-date").val(),
        title: $("#update-title").val(),
        content: $("#update-content").val(),
      },
      success: function (result) {
        alert("Updated");

        $("#addingNotifications").css({ display: "none" });
        window.location.reload(true);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#addingNotifications").css({
          display: "inline-block",
          color: "salmon",
        });
        $("#addingNotifications").html(jqXHR.responseJSON.error);
        console.log(jqXHR.responseJSON);
      },
    });
  }
}
