           ----Frontend Greek Trust challenge ---- 
           ----------Admin UI project --------------

Requirements Expected from the project :

1.Column titles must stand out from the entries.
2.There should be a search bar that can filter on any property.
3.You should be able to edit or delete rows in place.(There is no expectation of persistence. Edit and delete are expected to only happen in memory.)
4.You need to implement pagination: Each page contains 10 rows. Buttons at the bottom allow you to jump to any page 5.including special buttons for first page, previous page, next page and last page. Pagination must update based on search/filtering. If there are 25 records for example that match a search query, then pagination buttons should only go till 3.
6.You should be able to select one or more rows. A selected row is highlighted with a grayish background color. Multiple 7.selected rows can be deleted at once using the 'Delete Selected' button at the bottom left.
8.Checkbox on the top left is a shortcut to select or deselect all displayed rows. This should only apply to the ten rows displayed in the current page, and not all 50 rows.


implementation strategy :

1. divided the project into 3 portions 
   1. App.jsx : where the main logic of display of the entire components  are implemented and it is the parent component 
                of SearchBar.jsx, Geek.jsx,Footer.jsx        

   2. Footer.jsx : the implementation of Delete selected and pagenation is implemented in the Footer.jsx

   3. geek.jsx : the implementation of SearchBar and Entries component implementation are implemented


2. styling : for styling i classified according to the main components
             1. App.css --- styling of App.jsx elements
             2. geek.css --- styling of Geek.jsx elements
             3. Footer.css --- styling of Footer.jsx elements


3. functionalities are explained as comments on each of the functions in the above  jsx files.  

 FrameWork used : React.js version 18.2.0
 IDE : replit
 external-libraries : used icons from the "react-icons" library




