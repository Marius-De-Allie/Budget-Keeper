/** BUDGET CONTROLLER - Model module **/
const budgetController = (function() {
  const Expense = function(id, description, value) { // Expense constructor function to instantiate new expense objects.
    this.id = id;
    this.description = description;
    this.value = value;
  };
  /* Expense constructor function prototype methods */
  Expense.prototype.calculatePercentages = function(totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.value / totalInc) * 100);
    }
    else {
      this.percentage = -1;
    }
  };
  /* Income constrcutor function for instantiating new income objects */
  const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  const calculateTotal = function(type) { // Declare function to calculate total expense and total income.
    let sum = 0; // Declare sum variable and assign value of 0.
    data.allItems[type].forEach(function(element) {
      sum += element.value;
    });
    data.totals[type] = sum; // Assign value of sum to data.totals.exp or data.totals.inc property.
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
    },
    budget: 0, // budget property to hold budget calculation value.
    percentage: -1 // percentage property to hold percentage of income spent.
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
    },
    calculateBudget: function() { //public method used to calculate the available budget.
      // 1. Calculate total income and expenes.
      calculateTotal('inc'); // Calculate Total income.
      calculateTotal('exp'); // Calculate Total expenses.
      // 2. Calculate budget (totals.inc - totals.exp).
      data.budget = data['totals']['inc'] - data['totals']['exp']; // Calcuate budget and store in data.budget property.
      // 3. Calculate percentage of income spent.
      if (data.totals.inc > 0) { //Check whether total income is greater than 0.
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100); //Calculate perct value and store in data.percentage property.
      }
      else { // If total income is less than 0 set data.percentage to -1.
        data.percentage = -1;
      }
    },
    calculatePercentages: function() {

    },
    getBudget: function() { // return the the budget values from data object.
      return {
        budget: data['budget'],
        totalIncome: data['totals']['inc'],
        totalExpenses: data['totals']['exp'],
        percentage: data['percentage']
      }
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
    },
    clearInputFields: function() { // Public method to clear input fields after new item is added.
        const inputFields = document.querySelectorAll('input'); // Store value of DOM element nodes 'input' in nodeList.
        const inputFieldsArray = Array.from(inputFields); // Convert inputFields nodelist to an array.
        inputFieldsArray.forEach(function(element) { // Loop through array of input fields and set value property to blank string on each array element.
          element.value = '';
        });
        inputFieldsArray[0].focus(); // Set focus to first input field.
    },
    displayBudget: function(budgetObject) { // Public method to display budget values in UI.
      document.querySelector('.budget__value').textContent = budgetObject['budget']; // Set '.budget__value' DOM element node textContent value to value stored in budgetController.data.budget.
      document.querySelector('.budget__income--value').textContent = budgetObject['totalIncome']; // Set '.budget__income--value' DOM element node textContent value to value stored in budgetController.data.totals.inc.
      document.querySelector('.budget__expenses--value').textContent = budgetObject['totalExpenses']; // Set '.budget__expenses--value' DOM element node textContent value to value stored in budgetController.data.totals.exp.
      document.querySelector('.budget__expenses--percentage').textContent = budgetObject['percentage']; // Set '.budget__expenses--percetage' DOM element node textContent value to value stored in budgetController.data.percentage.
      if (budgetObject.percentage > 0) { // Check if budgetController.data.percentage is greater than 0.
        document.querySelector('.budget__expenses--percentage').textContent = `${budgetObject['percentage']}%`; // Set '.budget__expenses--percetage' DOM element node textContent value to value stored in budgetController.data.percentage.
      }
      else { //If budgetController.data.percentage is not > 0.
        document.querySelector('.budget__expenses--percentage').textContent = '---'; // set expense percentage DOM element textContent to '---'.
      }
    }
  };

}());
/** GLOBAL APP CONTROLLER - Controller Module. **/
const controller = (function(budgetCtrl, uiCtrl) {
  /* Function that will calculate and display budget when and item is added or removed. */
  const updateBudget = function() {
    // 1. Calculate the budget.
    budgetCtrl.calculateBudget(); // Calculate budget values.
    // 2. Return the budget.
    let budget = budgetCtrl.getBudget(); // return budget, totals and percentage of income spent.
    console.log(budget);
    // 3. Display the budget in UI.
    uiCtrl.displayBudget(budget) // Call displayBudget method passing in budget object return from budgetController.getBudget method to add updated budget data to UI.
  };


  /* Private function to add new item to app. */
  const ctrlAddItem = function() {
    // 1. Get field input data. *This needs to be done in the uicontroller module.
    let input = uiCtrl.getInput(); // Call uiController getInput public method and assign returned obj to input var.
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) { // check whether the value in the description iput field is not an empty string and the value in the 'value' field is a # and greater than 0.
      /* ADD ITEM TO DATA STRUCTURE AND UI. */
      // 2. Add the item to the budget controller.
      let newItem = budgetCtrl.addItem(input.type, input.description, input.value); // Call addItem passing in input properties as args and save returned object to newItem variable.
      console.log(newItem);
      // 3. Add the item to UI.
      uiCtrl.addListItem(newItem, input.type); // Call uiController addListItem method, to add newly instantiated item object to the DOM.
      // 4. Clear input fields.
      uiCtrl.clearInputFields(); // Call uiController.clearInputFields method to clear fields and return focus to description field.
      // 5. Calculate and update budget in UI.
      updateBudget();
      /* Alternatively */
      // budgetCtrl.calculateBudget(); // Calculate budget values.
      // let budget = budgetCtrl.getBudget(); // return budget, totals and percentage of income spent.
      // 6. Calculate and update percentages in UI
    }
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
