
/*Click Event to remove item from basket*/

const removeCartItemButtons = document.getElementsByClassName('btn-danger')


for(let i=0; i<removeCartItemButtons.length;i++) {
    let button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem);
}
    /*Function to remove item row from basket */
function removeCartItem (event) {
    let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
}


/*Change price based on quantity input */

let quantityInputs = document.getElementsByClassName('cart-quantity-input');
for(let i=0; i<quantityInputs.length;i++) {
    let input = quantityInputs[i]
    input.addEventListener('change', quantityChanges);
}

/*Function to change price based on quantity input*/

function quantityChanges (event) {
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}


/*Click event to Add item to basket */
let addToCartButtons = document.getElementsByClassName('shop-item-button');
for(let i=0; i<addToCartButtons.length;i++) {
    let button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}

/*Function click event to add item to basket */
function addToCartClicked(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}


/*Function to create and add item row details to basket */
function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(let i=0; i<cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert('This item is already added to the basket')
            return
        }
    }
    let cartRowContents = `
    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                        <span class="cart-item-title">${title}</span> 
                      </div>
                      <span class="cart-price cart-column">${price}</span>
                      <div class="cart-quantity cart-column">
                          <input class="cart-quantity-input" type="number"  value="1"> <button class="btn btn-danger" type="button">REMOVE</button>
                      </div>;`
    
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanges);
}



/*Function to update the total amount*/

function updateCartTotal () {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for(let i=0; i<cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        console.log(price * quantity);
        total += (price * quantity);
    }
    /*Round total amount to have only 2 decimals */
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('cart-total-price')[0].innerText = '$|' + total;
}


/*Click event Purchase button */
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

/*Function click event to Purchase items */
function purchaseClicked(event) {
    let cartItems = document.getElementsByClassName('cart-items')[0];
    alert('Thank you for your purchase');

    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();
}