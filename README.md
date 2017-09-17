## Usage
```javascript
$('.sp-pagination').pagination()
```

## Configurations

Below is the list of available options, with them default values.

```javascript
total_of_record: 30 // attention
records_per_page: 10 // attention
pages_to_display: 4 // attention
param_name: 'page' // attention
position: 'center' // optional
ajax: false // optional
show_arrows: false // optional
previous_label: 'Previous' // optional
next_label: 'Next' // optional
list_class: 'sp-pagination-wrapper' // optional
```
You don't need to override any of these options to use the plugin, but if you don't specify the right settings the plugin may doesn't work as expected.  
The options commented with 'attention' are those which you maybe need to set if the plugin isn't working properly.

#### Previous and next label

For these options you can pass your own html. Can be useful you want to add an icon instead of text, as below:
```javascript
  $('.sp-pagination').pagination({
    next_label: '<i class="fa fa-chevron-right"></i>',
    previous_label: '<i class="fa fa-chevron-left"></i>'
  })
```

## Ajax

The use of ajax is showed below.
```javascript
$('.sp-pagionation').pagination({
    ajax: {
      url: '/cities', // required
      table: '.my-table', // required
      method: 'post', // optional
      loader: false, // optional
      extra_data: false // optional
    }
  })
```

#### Options
- **url**: The url to get the data.
- **table**: The table where the records will be placed.
- **method**: The method of request, **post** or **get**.
- **loader**: In some cases the request can take some time, if you want to display a loader while the data is requested, set this to **true** or add your own custom html, as below:
```javascript
$('.sp-pagionation').pagination({
    ajax: {
      loader: '<div class='loader'></div>'
    }
  })
```
- **extra_data**: If you want to add more data in each row. In this case, you must to pass an array with the extra data, as below:
```javascript
$('.sp-pagionation').pagination({
    ajax: {
      extra_data: [
        '<td>Data 1</td>'
        ,
        '<td>Data 2</td>'
      ]
    }
  })
```
