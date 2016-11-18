var app = new Vue({
  el: '#app',
  data: {
    editmode: false,
    memos: [],

    title: '',
    message: '',

    edititle: '',
    editmessage: ''
  },
  methods: {
    getAllMemos: function() {
      axios.get('http://localhost:3000/api/memo', {})
      .then(function (response) {
        app.memos = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    postNewMemo: function() {
      axios.post('http://localhost:3000/api/memo', {
        title: app.title,
        message: app.message
      })
      .then(function(response) {
        app.memos.push(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    editMemo: function() {
      app.editmode = true;
    },
    updateMemo: function(id) {
      axios.put('http://localhost:3000/api/memo'+id, {
        title: app.title,
        message: app.message
      })
      .then(function(response) {
        app.getAllMemos()
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    deleteMemo: function(id) {
      axios.delete('http://localhost:3000/api/memo'+id, {})
      .then(function(response) {
        app.getAllMemos()
      })
      .catch(function(error) {
        console.log(error);
      })
    }
  }
})
app.getAllMemos()
