/** BUDGET CONTROLLER - Model module **/
const budgetController = (function() {
}());
/** UI CONTROLLER - View module **/
const uiController = (function() {

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
}(budgetController, uiController));
