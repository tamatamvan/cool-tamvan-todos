$(document).ready(function() {
  getAll();
})

function getAll() {
  //GET ALL DATA ITEM
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/todo",
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded',
    success: function(data) {
      console.log(data);
      var todos ='';
      var deleteModals = '';
      for (var i = 0; i < data.length; i++) {
        todos += `
        <div id="todo${data[i]._id}" class="list-group">
          <a data-toggle="collapse" href="#collapseExample${data[i]._id}" aria-expanded="false" aria-controls="collapseExample" class="list-group-item" id="title${data[i]._id}">${data[i].title}</a>
          <div id="collapseExample${data[i]._id}" class="panel panel-defaul collapse">
            <div class="panel-body">
              <p id="message${data[i]._id}">${data[i].message}</p>
            </div>
            <div class="panel-footer">
              <div class="btn-group btn-group-justified"><a onclick="editTodo('${data[i]._id}')" class="btn btn-xs btn-success"><i class="glyphicon glyphicon-edit"></i> Edit</a>
              <a data-toggle="modal" data-target="#modalDelete${data[i]._id}" class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-trash"></i> Delete</a></div>
            </div>
          </div>
        </div>`
        deleteModals +=  `<div id="modalDelete${data[i]._id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal fade">
          <div role="document" class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                <h4 id="myModalLabel" class="modal-title">Delete Todo</h4>
              </div>
              <div class="modal-body">Are you sure want to delete this '${data[i].title}' todo?</div>
              <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-default">Close</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteTodo('${data[i]._id}')">Delete</button>
              </div>
            </div>
          </div>
        </div>`
      }
      $('#todolist').append(todos)
      $('body').append(deleteModals)
    }
  })
}

function postNewTodo() {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/api/todo",
    dataType: "json",
    data: {
      title: $('#TodoTitle').val(),
      message: $('#TodoContent').val()
    },
    contentType: "application/x-www-form-urlencoded",
    success: function(data){
      var todo = `<div id="todo${data._id}" class="list-group"><a data-toggle="collapse" href="#collapseExample${data._id}" aria-expanded="false" aria-controls="collapseExample" class="list-group-item" id="title${data._id}">${data.title}</a>
        <div id="collapseExample${data._id}" class="panel panel-defaul collapse">
          <div class="panel-body">
            <p id="message${data._id}">${data.message}</p>
          </div>
          <div class="panel-footer">
            <div class="btn-group btn-group-justified">
            <a onclick="editTodo('${data._id}')" class="btn btn-xs btn-success"><i class="glyphicon glyphicon-edit"></i> Edit</a>
            <a data-toggle="modal" data-target="#modalDelete${data._id}" class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-trash"></i> Delete</a></div>
          </div>
        </div>
      </div>`;
      var deletemodal = `<div id="modalDelete${data._id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal fade">
        <div role="document" class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
              <h4 id="myModalLabel" class="modal-title">Delete Todo</h4>
            </div>
            <div class="modal-body">Are you sure want to delete this '${data.title}' todo?</div>
            <div class="modal-footer">
              <button type="button" data-dismiss="modal" class="btn btn-default">Close</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteTodo('${data._id}')">Delete</button>
            </div>
          </div>
        </div>
      </div>`;
      $('#todolist').append(todo);
      clearForm();
    }
  })
}

function editTodo(id) {
  // $('#TodoId').show();
  $('#submitTodo').hide();
  $('#updateTodo').show();
  var titlenya = document.getElementById(`title${id}`).innerHTML;
  var messagenya = document.getElementById(`message${id}`).innerHTML;
  document.getElementById('TodoTitle').innerHTML = titlenya;
  document.getElementById('TodoContent').innerHTML = messagenya;
  document.getElementById('TodoID').innerHTML = id;
  // console.log(titlenya);
  // $('#submitTodo').hide();
  // $('#updateTodo').show();
}

function updateTodo() {
  console.log();
  $.ajax({
    url         : 'http://localhost:3000/api/todo/'+ $('#TodoID').val(),
    type        : 'PUT',
    dataType    : 'json',
    data        : {
      title: $('#TodoTitle').val(),
      message: $('#TodoContent').val()
    },
    contentType : 'application/x-www-form-urlencoded',
    success     : function(data) {
      console.log(data);
      var newtitle = data.title;
      var newmessage = data.message;
      document.getElementById(`title${data._id}`).innerHTML = newtitle;
      document.getElementById(`message${data._id}`).innerHTML = newmessage;
      $('#submitTodo').show();
      $('#updateTodo').hide();
      clearForm();
    }
  })
}

function deleteTodo(id) {
  $.ajax({
    url         : 'http://localhost:3000/api/todo/'+id,
    type        : 'DELETE',
    dataType    : 'json',
    contentType : 'application/x-www-form-urlencoded',
    success     : function() {
      console.log(id);
      $(`#todo${id}`).remove();
    }
  })
}

function clearForm() {
  $('TodoID').val('');
  $('#TodoTitle').val('');
  $('#TodoContent').val('');
}
// getAll()
