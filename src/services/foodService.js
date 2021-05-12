import environments from "../environments";

import userService from "./userService";

const initialCart = {
	products:[],
	totalPrice:0
};

function objectsEqual(o1 = {}, o2 = {}){
	return typeof o1 === 'object' && Object.keys(o1).length > 0
		? Object.keys(o1).length === Object.keys(o2).length
		&& Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
		: o1 === o2;
}


// function arraysEqual(arr1,arr2){
//     const sortedArr1 = arr1.sort((a,b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]));
//     const sortedArr2 = arr2.sort((a,b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]));
//     return sortedArr1.length === sortedArr2.length
//         && sortedArr1.every((o, idx) => objectsEqual(o, sortedArr2[idx]))
// }



function calculateCartTotalPrice(cart){
	cart.totalPrice = 0;
	cart.products.forEach((product) => {
		cart.totalPrice += product.quantity * product.price;
	});
	return cart.totalPrice;
}

const foodService = {
	getDailyMenu: function() {
		const fullPath = environments.apiURL + "dishes/";
		return fetch(fullPath).then((dishes) => dishes.json()).catch((err) => console.error(err));
	},
	addToCart: function (user,item,addOrSubtract) {
		const cart = user.cart;
		const exist = cart.products?.find((prod) =>
			(prod.name === item.name)
			&& (prod.price === item.price)
			&& (prod.selected_options ? objectsEqual(prod.selected_options, item.selected_options) : true));
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
        console.log(item.selected_options);
		const index = user.cart?.products?.findIndex(prod =>
			prod.name === item.name
			&& prod.price === item.price
			&& objectsEqual(prod.selected_options, item.selected_options)
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
