const ITEMS_CONTAINER = document.getElementById("items");
const ITEM_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");

//page loads up for first time
let items = getItems()

//local storage, saving work even when refreshed
function getItems(){
    //"todo" is the key value pair.. can be named what you want
    const value = localStorage.getItem("todo-final") || "[]";

    //convert text.. string... to json object
    return JSON.parse(value);

    
}

function setItems(items) {
    const itemsJson = JSON.stringify(items)

    //refresh the page... add the item
    localStorage.setItem("todo-final", itemsJson)
    //passing the object to string again... resetting
}

//adding a new item
function addItem(){
    //adding item to the start of list
    items.unshift({
        description:"",  //default values
        completed: false
    });

    setItems(items) //save to local storage
    refreshList();
}

//how to make it save to local storage 
function updateItem(item,key,value){
    item[key] = value; //from template
    setItems(items); //from top div, 
    //save to local storage
    refreshList();
}

function refreshList(){
    //todo: sorting items
    //completed goes to the bottom of list
    items.sort((a,b) => {
        if (a.completed){
            return 1;
        }
        if (b.completed){
            return -1;
        }

        return a.description < b.description ? -1: 1;
    });


    ITEMS_CONTAINER.innerHTML = "";

    //new elements because we are clonning 
    for (const item of items){
        //using template everytime we add or change input/checkbox
        const itemElement = ITEM_TEMPLATE.content.cloneNode(true);
        //text you type in input is updated
        const descriptionInput = itemElement.querySelector(".item-description");
        //also updated 
        const completedInput = itemElement.querySelector(".item-completed");

        //updates automatically with new info
        descriptionInput.value= item.description; //new description typed
        completedInput.checked= item.completed; //checkbox
        //make sure its .checked/// boolean default for checkbox


        //user changes text input
        descriptionInput.addEventListener("change", () => {
            updateItem(item,"description", descriptionInput.value)
                        //key is description, value is descriptionInput.value
        })

        //user checks or unchecksbox
        completedInput.addEventListener("change", () => {
            updateItem(item,"completed", completedInput.checked)
                        //key is completed, value is completedInput.checked
                        localStorage.removeItem(todo-final)
        })


        ITEMS_CONTAINER.append(itemElement);
        //grab new clone and update template
    }
}
//make list render... or add new to do
ADD_BUTTON.addEventListener("click", () => {
    addItem();
    
})

refreshList();