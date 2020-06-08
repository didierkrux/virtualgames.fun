let name_list = ['Matt', 'Michelle + Xavier', 'Julie', 'Didier', 'Karen'];
[...document.getElementsByClassName('name')].forEach((e, i) => e.innerHTML = name_list[i]);
