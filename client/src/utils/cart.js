export function addItemToCart(cartItemsArr, itemToAdd) {
  let exists = false;

  const updatedCartItems = cartItemsArr.map((item) => {
    if (item.id === itemToAdd.id) {
      exists = true;
      return { ...item, quantity: item.quantity + 1 };
    } else {
      return item;
    }
  });

  if (!exists) {
    itemToAdd.quantity = 1;
    updatedCartItems.push(itemToAdd);
  }

  return updatedCartItems;
}

export function decreaseItemQuantity(cartItemsArr, item) {
  if (item.quantity === 1) {
    return removeItemFromCart(cartItemsArr, item);
  }

  const updatedCartItems = cartItemsArr.map((cartItem) => {
    if (cartItem.id === item.id) {
      return { ...cartItem, quantity: cartItem.quantity - 1 };
    } else {
      return cartItem;
    }
  });

  return updatedCartItems;
}

export function removeItemFromCart(cartItemsArr, itemToRemove) {
  const updatedCartItems = cartItemsArr.filter(
    (item) => item.id !== itemToRemove.id
  );

  return updatedCartItems;
}
