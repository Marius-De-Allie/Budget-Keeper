/** BUDGET CONTROLLER - Model module **/
const budgetController = (function() {
}());
/** UI CONTROLLER - View module **/
const uiController = (function() {
  // Public methods.
  return {
    getInput: function() {
      return { //have getInput public method return an object with 3 properties for input field values.
        type: document.querySelector('.add__type').value, // Retrieve value of type select element - Value is iether 'inc' or 'exp'.
        description: document.querySelector('.add__description').value, // Retrieve value in description input field.
        value: 
      };
    },
  };

}());
/** GLOBAL APP CONTROLLER - Controller Module. **/
const controller = (function(budgetCtrl, uiCtrl) {
/* Click event handler on add button */
document.querySelector('.add__btn').addEventListener('click', function() {
  console.log('add button clicked.');
});
/* Enter keypress event handler on document object. */
document.addEventListener('keypress', function(evt) {
  console.log('key pressed.');
  if (evt.keyCode === 13) { // Check whether key pressed is enter key.
    console.log('Enter key pressed.');
  }
});
/* Private function to add new item to app. */
const ctrlAddItem = function() {
  // 1. Get field input data. *This needs to be done in the uicontroller module

  // 2. Add the item to the budget controller.

  // 3. Add the item to UI.

  // 4. Calculate the budget.

  // 5. Display the budget in UI.

};
}(budgetController, uiController));
