export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  let index=-1, newBasket =[];
  switch (action.type) {
    case actions.AddToBasket:
       index = state.basket.findIndex((item)=> item.id===action.item.id);
       newBasket = state.basket;
       
      if(index>=0){newBasket[index].qty+=action.item.qty;}
      else newBasket = [...newBasket,action.item];
      
      return {
        ...state,
        basket: newBasket,
      };
    case actions.ReduceQuantityBy1:
       index = state.basket.findIndex((item)=> item.id===action.item.id);
       newBasket = state.basket;
       if(index>=0){
        let quantity = newBasket[index].qty;
        if(quantity<=1)newBasket.splice(index,1);
        else newBasket[index].qty -=1;
       }
       else {
        console.warn(
          "Cannot remove because no element is present with id ",
          action.item.id
        );
      }console.log("reduce ",state, newBasket);
      return {
        ...state,
        basket: newBasket,
      };

    case actions.RemoveFromBasket:
       index = state.basket.findIndex((item) => item.id === action.item.id);
       newBasket = state.basket;
      if (index >= 0) newBasket.splice(index, 1);
      else {
        console.warn(
          "Cannot remove because no element is present with id ",
          action.item.id
        );
      } console.log("remove ",state, newBasket);
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
  ReduceQuantityBy1: "REDUCE_QTY_BY_1",
  AddUser: "ADD_USER",
  RemoveUser: "REMOVE_USER",
};

export default reducer;
