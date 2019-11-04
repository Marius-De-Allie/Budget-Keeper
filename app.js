/** BUDGET CONTROLLER - Model module **/
const budgetController = (function() {
  const Expense = function(id, description, value) { // Expense constructor function to instantiate new expense objects.
    this.id = id;
    this.description = description;
    this.value = value;
  };
  /* Income constrcutor function for instantiating new income objects */
  const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  /* DATA STRUCTURE TO STORE ALL EXPENSE/INCOME OBJECTS AS WELL AS EXPENSE/INCOME TOTALS */
  const data = {
    allItems: {
      exp: [], // Array to store all expense objects.
      inc: [] // Array to store all income objects.
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  /* PUBLIC METHODS */
  return {

  };

}());
/** UI CONTROLLER - View module **/
const uiController = (function() {
  // Public methods.
  return {
    getInput: function() { // Will be called at step 1 in controller.ctrlAddItem.
      return { //have getInput public method return an object with 3 properties for input field values.
        type: document.querySelector('.add__type').value, // Retrieve value of type select element - Value is iether 'inc' or 'exp'.
        description: document.querySelector('.add__description').value, // Retrieve value in description input field.
        value: parseFloat(document.querySelector('.add__value').value) // Retrieve current value in the item value input field.
      };
    },
  };

}());
/** GLOBAL APP CONTROLLER - Controller Module. **/
const controller = (function(budgetCtrl, uiCtrl) {
  /* Private function to add new item to app. */
  const ctrlAddItem = function() {
    // 1. Get field input data. *This needs to be done in the uicontroller module.
    let input = uiCtrl.getInput(); // Call uiController getInput public method and assign returned obj to input var.
    // 2. Add the item to the budget controller.

    // 3. Add the item to UI.

    // 4. Calculate the budget.

    // 5. Display the budget in UI.

  };

  /* Click event handler on add button */
  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
  /* Enter keypress event handler on document object. */
  document.addEventListener('keypress', function(evt) {
    console.log('key pressed.');
    if (evt.keyCode === 13) { // Check whether key pressed is enter key.
      console.log('Enter key pressed.');
      ctrlAddItem();
    }
  });
}(budgetController, uiController));
