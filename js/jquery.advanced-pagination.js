(function($) {
	
	$.fn.pagination = function(options) {
		let settings = $.extend({
			total_of_records: 60,
			records_per_page: 10,
			pages_to_display: 'all',
			param_name: 'page',
			position: 'center',
			ajax: false,
			show_arrows: false,
			previous_label: 'Previous',
			next_label: 'Next',
			list_class: 'sp-pagination'
			// add_more_params: false //if true, follow this example: add_more_params: '&param1=value&param2=value2'
			// total_record and records_per_page is needed to discover amount of pages
			/*
				Acceptable structure for ajax

				ajax: {
					url: '/cidades', // required
					table: '.my-table', // required
					method: 'post',
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

		if(settings.show_arrows) {
			settings.next_label = '>';
			settings.previous_label = '<';
		}

		return this.each(function() {
			let $this = $(this);

			let total_of_pages = Math.ceil(settings.total_of_records / settings.records_per_page)
			if(settings.pages_to_display > total_of_pages || settings.pages_to_display === 'all')
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


			let middle_of_list = Math.ceil(settings.pages_to_display / 2) + 1;

			let start_page = 0;
			let end_page = settings.pages_to_display;

			if(active_page >= middle_of_list && settings.pages_to_display !== total_of_pages) {
				console.log(active_page);
				if(((total_of_pages - active_page) - Math.floor(settings.pages_to_display / 2)) <= 0) {
					start_page = total_of_pages - Math.ceil(settings.pages_to_display / 2) - middle_of_list;
					end_page = total_of_pages;

					if(settings.pages_to_display % 2 !== 0)
						start_page += 1;
				} else {
					start_page = active_page - Math.ceil(settings.pages_to_display / 2);
					if(settings.pages_to_display % 2 === 0)
						start_page -= 1;

					end_page = start_page + settings.pages_to_display;
				}

			}

			for(let i = start_page; i <= end_page + 1; i++) {

				if(has_more_than_one_page) {
					console.log(start_page);
					if((start_page + 1) > 1 && (start_page + 1) === i) {
						body_ul_pagination.append(getPaginationItem({
							label: 1,
							page: 1
						}));

						body_ul_pagination.append(getPaginationItem({
							label: '...',
							class: 'disabled'
						}));

					}

					if(i === start_page) {
						let there_is_no_back = false;
						if (active_page === 1) 
							there_is_no_back = true;

						body_ul_pagination.append(getPaginationItem({
							label: settings.previous_label,
							page: active_page - 1,
							class: there_is_no_back === true ? ' disabled' : 'prev'
						}));

					} else if(i === (end_page + 1)) {
						let there_is_no_front = false;
						if (active_page === total_of_pages)  
							there_is_no_front = true;

						if((total_of_pages - end_page) > 1) {
							body_ul_pagination.append(getPaginationItem({
								label: '...',
								class: 'disabled'
							}));
						}

						if((total_of_pages - end_page) >= 1) {
							body_ul_pagination.append(getPaginationItem({
								label: total_of_pages,
								page: total_of_pages,
								class: i === active_page ? 'active' : ''
							}));
						}

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

					if(i !== 0 && i !== (end_page + 1)) {
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
			options.page = typeof options.page === 'undefined' ? '' : `${getCurrentPageUrl()}?${settings.param_name}=${options.page}`;

			return `
				<li class='item ${options.class}'>
					<a href='${options.page}'>${options.label}</a>
				</li>`;
		}
	};
})(jQuery);