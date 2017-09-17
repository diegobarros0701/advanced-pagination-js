(function($) {
	
	$.fn.pagination = function(options) {
		let settings = $.extend({
			total_of_record: 30,
			records_per_page: 10,
			pages_to_display: 4,
			param_name: 'page',
			position: 'center',
			ajax: false,
			show_arrows: false,
			previous_label: 'Previous',
			next_label: 'Next',
			list_class: 'sp-pagination-wrapper'
			// add_more_params: false //if true, follow this example: add_more_params: '&param1=value&param2=value2'
			// total_record and records_per_page is needed to discover amount of pages
			/*
				Acceptable structure for ajax

				ajax: {
					url: '/cidades', // required
					table: '.my-table', // required
					amount_records: 10, // required
					loader: `
						<div class='loader'></div>
					`, // optional
					complete_data: [
						'<td>My td 1</td>'
						,
						'<td>My td 2</td>'
					] // optional
				}
			*/
		}, options);


		return this.each(function() {
			let $this = $(this);

			let total_of_pages = Math.ceil(settings.total_of_record / settings.records_per_page)
			if(settings.pages_to_display > total_of_pages)
				settings.pages_to_display = total_of_pages;

			getPaginationList($this, total_of_pages, getCurrentPageNumber());

			let pagination_link = $this.find('li a');
			
			// For now, the event below will only check if already is in the current page
			// This avoid an unecessary reload
			pagination_link.click(function(event) {
				let target_link = $(event.target);
				if(changePage($this, total_of_pages, target_link) === false)
					return false;
			});

		});

		function getCurrentPageNumber() {
			let page = window.location.href;
			let current_page = page.split('?')[1];

			if (typeof current_page === 'undefined')
				return 1;

			current_page = current_page.split(/[&=]/);

			for(let i = 0; i < current_page.length; i+=2) {
				if(current_page[i] === settings.param_name)
					return parseInt(current_page[i + 1]);
			}
		}


		function changePage(element_list, total_of_pages, target_link) {
			let current_page = getCurrentPageNumber();

			if(target_link.parent().hasClass('active')) {
				return false;
			} else { // The else works only with ajax request
				// getPaginationList(element_list, total_of_pages, current_page);
			}
		}

		function getPaginationList(element_list, total_of_pages, active_page = 1) {
			let body_ul_pagination = $(`<ul class='${settings.list_class}' style='text-align: ${settings.position}'></ul>`);
			let has_more_than_one_page = total_of_pages > 1;

			for(let i = 0; i <= settings.pages_to_display + 1; i++) {

				if(has_more_than_one_page) {
					if(i === 0) {
						let there_is_no_back = false;
						if (active_page === 1) 
							there_is_no_back = true;

						body_ul_pagination.append(getPaginationItem({
							label: settings.previous_label,
							page: active_page - 1,
							class: there_is_no_back === true ? ' disabled' : 'prev'
						}));

					} else if(i === (settings.pages_to_display + 1)) {
						let there_is_no_front = false;
						if (active_page === settings.pages_to_display) 
							there_is_no_front = true;

						body_ul_pagination.append(getPaginationItem({
							label: settings.next_label,
							page: active_page + 1,
							class: there_is_no_front === true ? ' disabled' : 'next'
						}));

					} else {
						body_ul_pagination.append(getPaginationItem({
							label: i,
							page: i,
							class: i === active_page ? 'active' : ''
						}));
					}
				} else {

					if(i !== 0 && i !== (total_of_pages + 1)) {
						body_ul_pagination.append(getPaginationItem({
							label: i,
							page: i,
							class: i === active_page ? 'active' : ''
						}));
					}

				}

			}

			element_list.html(body_ul_pagination);
		}

		function getCurrentPageUrl() {
			return window.location.href.split('?')[0];
		}

		function getPaginationItem(options) {
			options.class = typeof options.class === 'undefined' ? '' : options.class;
			options.page = typeof options.page === 'undefined' ? '' : `${getCurrentPageUrl()}?page=${options.page}`;

			return `
				<li class='item ${options.class}'>
					<a href='${options.page}'>${options.label}</a>
				</li>`;
		}
	};
})(jQuery);