import environments from "../environments";
import {fetchWithCredentials} from '../helpers'

import userService from "./userService";
const path = environments.apiURL;
const initialCart = {
	products:[],
	totalPrice:0
}

function objectsEqual(o1, o2){
	return typeof o1 === 'object' && Object.keys(o1).length > 0
		? Object.keys(o1).length === Object.keys(o2).length
		&& Object.keys(o1).every(p => this.objectsEqual(o1[p], o2[p]))
		: o1 === o2;
}
function arraysEqual(arr1, arr2){
	return arr1.length === arr2.length && arr1.every((o, idx) => objectsEqual(o, arr2[idx]));
}
function calculateCartTotalPrice(cart){
	cart.totalPrice = 0;
	cart.products.forEach((product) => {
		cart.totalPrice += product.quantity * product.price;
	});
	return cart.totalPrice;
}

const foodService = {
	getDailyMenu: function() {
		const fullPath = path + "dishes/";
		return fetchWithCredentials(fullPath).then((dishes) => dishes.json()).then(console.log).catch((err) => console.error(err));
	},
	addToCart: function (user,item,addOrSubtract) {
		const cart = user.cart;
		const exist = cart.products?.find((prod) =>
			prod.name === item.name
			&& prod.price === item.price
			&& arraysEqual(prod.selected_options, item.selected_options));
		if (exist) {
			if(!addOrSubtract) {
				exist.quantity += 1;
			}else {
				if(exist.quantity === 0) {
					exist.quantity ++;
				}
			}
		} else {
			item.quantity = 1;
			cart.products = cart.products ? cart.products.concat(item) : [item];
		}
		cart.totalPrice = calculateCartTotalPrice(cart);
		return userService.editUserData({cart});
	},
	removeItemFromCart: function (user,item) {
		const index = user.cart?.products?.findIndex(prod =>
			prod.name === item.name
			&& prod.price === item.price
			&& arraysEqual(prod.selected_options, item.selected_options)
		)
		user.cart?.products?.splice(index,1);
		user.cart.totalPrice = calculateCartTotalPrice(user.cart)
		return userService.editUserData({cart: user.cart});
	},
	clearCart: () => {
		return userService.editUserData({cart: initialCart})
	},
};

export default foodService;
