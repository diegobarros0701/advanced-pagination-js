## Usage
```javascript
$('.sp-pagination').pagination();
```

## Configurations

Below is the list of available options, with them default values.

```javascript
total_of_record: 30 // required
records_per_page: 10 // required
pages_to_display: 4 // required
param_name: 'page' // required
position: 'center' // optional
ajax: false // optional
showrrows: false // optional
previous_label: 'Previous' // optional
next_label: 'Next' // optional
list_class: 'sp-pagination-wrapper' // optional
```
You don't need to override any of these options to use the plugin, but if you don't specify the right settings the plugin may doesn't work as expected.  
The 'required' options are those which you maybe need to set if the plugin isn't working properly.

## Ajax
