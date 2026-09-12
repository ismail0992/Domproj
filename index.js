document.addEventListener("DOMContentLoaded", () => {
	const productList = document.querySelector(".list-products");
	const total = document.querySelector(".total");

	const updateTotal = () => {
		let totalPrice = 0;

		productList.querySelectorAll(":scope > .card-body").forEach((product) => {
			const price = Number.parseFloat(
				product.querySelector(".unit-price").textContent
			);
			const quantity = Number.parseInt(
				product.querySelector(".quantity").textContent,
				10
			);

			totalPrice += price * quantity;
		});

		total.textContent = `${totalPrice} $`;
	};

	productList.addEventListener("click", (event) => {
		const action = event.target.closest("i");

		if (!action) {
			return;
		}

		const product = action.closest(":scope > .card-body") || action.closest(".list-products > .card-body");
		if (!product) {
			return;
		}

		if (action.classList.contains("fa-plus-circle")) {
			const quantity = product.querySelector(".quantity");
			quantity.textContent = Number.parseInt(quantity.textContent, 10) + 1;
		}

		if (action.classList.contains("fa-minus-circle")) {
			const quantity = product.querySelector(".quantity");
			const currentQuantity = Number.parseInt(quantity.textContent, 10);
			quantity.textContent = Math.max(0, currentQuantity - 1);
		}

		if (action.classList.contains("fa-trash-alt")) {
			product.remove();
		}

		if (action.classList.contains("fa-heart")) {
			action.classList.toggle("liked");
		}

		updateTotal();
	});

	updateTotal();
});
