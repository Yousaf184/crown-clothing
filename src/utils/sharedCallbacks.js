// shared by 'CollectionPreview' and 'Collection' component
export function addToCart(event, dispatch, addItemToCart) {
  const clickedBtn = event.target;

  // change the text of the button to indicate
  // that item has been added to the cart
  clickedBtn.textContent = "Done";

  const itemToAdd = JSON.parse(clickedBtn.dataset.item);
  dispatch(addItemToCart(itemToAdd));

  // change the text of the button back to original value
  setTimeout(() => {
    clickedBtn.textContent = "Add To Cart";
  }, 1500);
}
