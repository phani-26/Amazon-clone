export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.AddToBasket:
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case actions.RemoveFromBasket:
      let index = state.basket.findIndex((item) => item.id === action.item.id);
      console.log(JSON.stringify(state.basket));
      console.log(index);
      let newBasket = state.basket;
      console.log("helo ", newBasket);
      if (index >= 0) newBasket.splice(index, 1);
      else {
        console.warn(
          "Cannot remove because no element is present with id ",
          action.item.id
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    case actions.AddUser:
      return {
        ...state,
        user: action.user,
      };
    case actions.RemoveUser:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const actions = {
  AddToBasket: "ADD_TO_BASKET",
  RemoveFromBasket: "REMOVE_FROM_BASKET",
  AddUser: "ADD_USER",
  RemoveUser: "REMOVE_USER",
};

export default reducer;
