# globalconnect
Global-Connect
Transporting goods across the globe with ease.

Run the app:
1) git clone https://github.com/Prady69/globalconnect.git
2) goto project directory
3) npm start
4) Open "http://localhost:8000" in the browser

Tech stack:
AngularJS 1.7
Bootstrap 3.3
Angular Material 1.1
HTML 5
CSS 3
SASS
Referred & used angular-phonecat github repo for folder structuring.


Workflow & Features:
1) Delivery
- This is for logging in new delivery info.
- Using "Countries" api service data from typeahead for distance and fare calculations.
- Used Angular material components
- Use of appropriate validations

2) Current Orders
- Shows the current orders being placed.
- Used local storage for the purpose of demo.
- "Cancel Order" to delete any orders.


Assumptions & limitations:
1) An User can only select countries to transport goods 
2) Calculates location distance based on lattitude and longitudes
3) Calculates fare with 3.3 euros per km. Can be further improved with enough data and facts.
4) Time slot to be selected only between 7am to 7pm with a timeframe of 1 hour for pickup and delivery

Further Improvements/Scope:
1) More modules to be introduced for an efficient workflow. i.e. History, login etc
2) Localstorage to be changed to RDMS or NoSQL.
3) Responsive design for mobile/ipad devices with Angular Material/Bootstrap/Media Queries.
4) Code refactoring/optimization.
5) Integration with maps for different country locations for accurate pickup and drop. 
6) Using code minification and other build tools for deployment.
7) UI Animations and designs optimization.
