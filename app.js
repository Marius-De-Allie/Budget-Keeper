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
    addItem: function(type, desc, val) { // public method used to create + add new item(exp or inc) to data strcuture.
      let newItem;
      let id = 0; // Declare variable to store item id.
      if (data.allItems[type].length > 0) {
        let lastIndexOfArray = data.allItems[type].length - 1; // save index of last element in exp or inc array to variable.
        id = data.allItems[type][lastIndexOfArray].id + 1; // Set id variable to the value of the id of the last element in the current array plus 1.
      }
      else  { // If no elements in array (exp or inc) set id variable to value of 0.
        id = 0;
      }
      if (type === 'exp') {
        // Instantiate new expense object.
        newItem = new Expense(id, desc, val);
      }
      else if (type === 'inc') {
        // Instantiate new income object.
        newItem = new Income(id, desc, val);
      }
      // Add new created item to either exp or inc array.
      data.allItems[type].push(newItem);
      return newItem;
    }
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
    addListItem: function(object, type) {
      let html; // Declare variable to hold html placeholder content.
      let parentElement; // Declare variable to store parent element node of item being added to DOM.
      /* CREATE HTML STRING WITH PLACEHOLDER CONTENT */
      if (type === 'inc') {
        parentElement = document.querySelector('.income__list');
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      else if (type === 'exp') { // if item is of type 'exp'.
        parentElement = document.querySelector('.expenses__list');
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      /* REPLACE PLACEHOLDER TEXT IN HTML STRING WITH ACTUAL DATA */
      let newHtml = html.replace('%id%', object.id); //replace place holder text %id% in html string with actual object.id value.
      newHtml = newHtml.replace('%description%', object.description); //replace place holder text %description% in html string with actual object.description value.
      newHtml = newHtml.replace('%value%', object.value); //replace place holder text %value% in html string with actual object.value value.
      /*INSERT THE HTML INTO THE DOM */
      parentElement.insertAdjacentHTML('beforeend', newHtml); // Add new item html element as the last child of the parent element.
    }
  };

}());
/** GLOBAL APP CONTROLLER - Controller Module. **/
const controller = (function(budgetCtrl, uiCtrl) {
  /* Private function to add new item to app. */
  const ctrlAddItem = function() {
    // 1. Get field input data. *This needs to be done in the uicontroller module.
    let input = uiCtrl.getInput(); // Call uiController getInput public method and assign returned obj to input var.
    // 2. Add the item to the budget controller.
    let newItem = budgetCtrl.addItem(input.type, input.description, input.value); // Call addItem passing in input properties as args and save returned object to newItem variable.
    console.log(newItem);
    // 3. Add the item to UI.
    uiCtrl.addListItem(newItem, input.type); // Call uiController addListItem method, to add newly instantiated item object to the DOM.
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
