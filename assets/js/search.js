const searchbar = document.getElementById('search');

searchbar.addEventListener('input', function() {
    var search = searchbar.value.toLowerCase();
    if ((search) && (search.length >= 3)) {
        getRecettes(search);
    } else {
        getRecettes('');
    }
})