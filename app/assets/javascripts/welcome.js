$(document).ready(function() {
	var createButton = $('#show_create');
	var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';

	function loadProducts() {
		$('#products').empty();
		$.ajax({
			url: BASEURL + '/products',
			type: 'GET',
			dataType: 'JSON'
		}).done(function(data) {
			data.forEach(function(product) {
				debugger;
				$('#products').append('<div class="card col s6" >\n<div class="card-title"><li>' 
																		+ product.name
																		+ '<hr>'
																		+ '<div class="card-action data-product-id="'
																		+ product.id
																		+ '>'
																		+ product.description
																		+ '<hr>'
																		+ '<button class="delete_product">Delete</button>'
																		+ '<button class="edit_button">Edit</button></li>');
			});
		}).fail(function(data) {
			console.log(data);
		});
	}
	$('#load_products').click(function() {
		loadProducts();
	});
	$(document).on('click', '.delete_product', function() {
		var $productId = $(this).data('product-id');
		$.ajax({
			url: BASEURL + '/products/' + $productId,
			type: 'DELETE',
			dataType: 'JSON',
		}).done(function(data){
			loadProducts();
		}).fail(function(data){
			console.log(data);
		});
		alert('Delete this product!!');
	});
	createButton.click(function() {
		var createForm = $('#create_form');
		createForm.slideToggle(400, function() {
			if(createForm.is(':hidden')) {
				createButton.text('Add Product');
			} else {
				createButton.text('Hide Add Product');
			}
		});
	});
	$('#new_product').submit(function(e) {
		e.preventDefault();
		var form = this;
		var productName = $('#product_name');
		var productPrice = $('#product_base_price');
		var productDesc = $('#product_desc');
		var productQuantity = $('#product_quantity_on_hand');
		var productColor = $('#product_color');
		var productWeight = $('#product_weight');
		var productOther = $('#product_other_attributes');
		$.ajax({
			url: BASEURL + $(this).attr('action'),
			type: $(this).attr('method'),
			dataType: 'JSON',
			data: $(this).serializeArray()
		}).done(function(data) {
			alert('Product added Successfully!');
			form.reset();
			$productName.focus();
			loadProducts();
		}).fail(function(data) {
			console.log(data);
		});
	});
	$(document).on('click', '.edit_button', function() {
		var productId = $(this).parent().data('product-id');
		$.ajax({
			url: BASEURL + '/products/' + productId,
			type: 'GET',
			dataType: 'JSON'
		}).done(function(data) {
			var name = data.name;
			var price = data.base_price;
			var description = data.description;
			var quantity = data.quantity_on_hand;
			var color = data.color;
			var weight = data.weight;
			var other = data.other_attributes;
			$('#edit_product_name').val(name);
			$('#edit_product_price').val(price);
			$('#edit_product_desc').val(description);
			$('#edit_product_quantity_on_hand').val(quantity);
			$('#edit_product_color').val(color);
			$('#edit_product_weight').val(weight);
			$('#edit_product_other_attr').val(other);
			$('#product_id').val(productId);
			$('#edit_form').slideDown();
		}).fail(function(data) {
			console.log(data);
		});
	});
	$('#edit_product').submit(function(e) {
		e.preventDefault();
		var form = this;
		var productId = $('#product_id').val();
		$.ajax({
			url: BASEURL + '/products/' + productId,
			type: 'PUT',
			dataType: 'JSON',
			data: $(this).serializeArray()
		}).done(function(data){
			form.reset();
			$('#edit_form').slideUp();
			loadProducts();
		}).fail(function(data){
			console.log(data);
		})
	});
});