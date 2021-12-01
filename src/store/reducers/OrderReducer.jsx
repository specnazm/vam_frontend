import { ADD_TO_ORDER, DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_PRODUCT } from '../actions/ActionTypes';

const initialState = {
    products : JSON.parse(localStorage.getItem('order'))?.products || [],
    total:  JSON.parse(localStorage.getItem('order'))?.products.reduce((res,item) => res + item.price * item.quantity ,0)  || 0
  };

const orderReducer = (state = initialState, action) => {
  let newState = null;
  let productsChanged = [];

  switch (action.type) {
    case ADD_TO_ORDER:
      newState = {
        ...state, 
        products: [...state.products, action.payload], 
        total: state.total + (action.payload.price * action.payload.quantity) 
      }
      saveOrder(newState)

      return newState;
    case INCREASE_QUANTITY:
      productsChanged = state.products.reduce((result, product) => {
        if (product.id === action.payload)
          product = {...product, quantity : product.quantity + 1};
        result.push(product);
        return result;
      }, [])
      newState = {products: productsChanged, total: calcTotal(productsChanged) };
      saveOrder(newState)

      return newState;
    case DECREASE_QUANTITY:
        productsChanged = state.products.reduce((result, product) => {
          if (product.id === action.payload)
            product = {...product, quantity : product.quantity - 1};
          result.push(product);
          return result;
        }, [])
        newState = {products: productsChanged, total: calcTotal(productsChanged) };
        saveOrder(newState)
  
        return newState;
    case REMOVE_PRODUCT:
        productsChanged = state.products.filter(el => el.id !== action.payload);
        newState = { products: productsChanged, total: calcTotal(productsChanged)}
        saveOrder(newState)

        return newState;

    default:
      return state;
  }
};

const calcTotal = products => {
  return products.reduce((res,item) => res + item.price * item.quantity ,0)
}

const saveOrder = order => {
  localStorage.setItem('order', JSON.stringify(order));
}

const discardOrder = () => {
  localStorage.removeItem('order');
}


export default orderReducer;

