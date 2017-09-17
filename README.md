## Basic usage
```javascript
$('.sp-pagination').pagination({
  total_of_records: 60
  records_per_page: 10
})
```
The above example will result:  
![Pagination example 2 pages to display](https://i.imgur.com/t8sIABv.png)  

## Configurations

Below is the list of available options, with them default values.

```javascript
total_of_records: 60 // attention
records_per_page: 10 // attention
pages_to_display: 'all' // optional
param_name: 'page' // optional
position: 'center' // optional
ajax: false // optional
show_arrows: false // optional
previous_label: 'Previous' // optional
next_label: 'Next' // optional
list_class: 'sp-pagination' // optional
```
You don't need to override any of these options to use the plugin, but if you don't specify the right settings the plugin may doesn't work as expected.  
The options commented with 'attention' are those which you maybe need to set if the plugin isn't working properly.

#### Pages to display

Is the amount of pages that will be displayed, this is useful if you don't wanna show all pages at once.  
Can be **'all'** or the amount of pages to be displayed. The default value is **'all'**.  
If we use the below example
```javascript
$('.sp-pagination').pagination({
  total_of_records: 60 
  records_per_page: 10 
  pages_to_display: 4 
});
```
The result will be:  
![Pagination example 1: pages to display](https://i.imgur.com/px3rUMh.png)  
  
Now, if we set **pages_to_display** to **'all'** or a number greater than the pages that can be displayed (in this case, six) we will see:  
![Pagination example 2: pages to display](https://i.imgur.com/t8sIABv.png)  

#### Position

![Pagination example: position](https://i.imgur.com/xQj4iHB.png)

#### Previous and next label

For these options you can pass your own html. Can be useful if you want to add an icon instead of text, as below:
```javascript
$('.sp-pagination').pagination({
  next_label: '<i class="fa fa-chevron-right"></i>',
  previous_label: '<i class="fa fa-chevron-left"></i>'
})
```

## Ajax (not implemented yet)

The use of ajax is showed below.
```javascript
$('.sp-pagination').pagination({
    ajax: {
      url: '/cities', // required
      table_selector: '.my-table', // required
      method: 'post', // optional
      loader: false, // optional
      extra_data: false // optional
    }
  })
```

#### Options
- **url**: The url to get the data.
- **table_selector**: The table where the records will be placed.
- **method**: The method of request, **post** or **get**.
- **loader**: In some cases the request can take some time, if you want to display a loader while the data are loading, set this to **true** or add your own custom html, as below:
```javascript
$('.sp-pagination').pagination({
    ajax: {
      loader: '<div class='loader'></div>'
    }
  })
```
- **extra_data**: If you want to add more data in each row. In this case, you must pass an array with the extra data, as below:
```javascript
$('.sp-pagination').pagination({
    ajax: {
      extra_data: [
        '<td>Data 1</td>'
        ,
        '<td>Data 2</td>'
      ]
    }
  })
```
