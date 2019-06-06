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
    todos = state.todos.filter(todo => todo.id !== Number(action.id)); //filter is a pure function as it always returns a new array
    return {...state, todos}  //todos:todos
    default:
      return state;
  }
}

const store = Redux.createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

$(document).ready(function() {
  $("ul").on("click", "button", function(event) {
    store.dispatch({
      type: "REMOVE_TODO",
      id: $(event.target).attr("id")
    });
    $(event.target).parent().remove();  //the parent is the list item
  })
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
    let $newBtn = $("<button>", {
      text: "X",
      id: currentState.id
    });
    $newLi.append($newBtn);
    $("#todos").append($newLi);
    $("form").trigger("reset"); //clear any form values
  });
});