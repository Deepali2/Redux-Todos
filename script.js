const initialState = {
  todos: [],
  id: 0
};
function rootReducer(state=initialState, action) {
  switch(action.type) {
    case "ADD_TODO":
    //add a todo
      var newState = {...state};
      newState.id++;      
      return {
        ...newState,
        todos:[...newState.todos, {task: action.task, id: newState.id}]
      };
    case "REMOVE_TODO":
    //remove a todo
    default:
      return state;
  }
}

const store = Redux.createStore(rootReducer);

$(document).ready(function() {
  $("form").on("submit", function(event) {
    event.preventDefault() //to make sure that the page does not refresh
    let newTask = $("#task").val();
    store.dispatch({
      type: "ADD_TODO",
      task: newTask
    });
    let currentState = store.getState();
    let $newLi = $("<li>", {
      text: newTask
    });
    $("#todos").append($newLi);
    $("form").trigger("reset"); //clear any form values
  });
});