(function($) {

	var splaceApp = $('#splaceApp');

	var loaded = {};

	var loadFN = function() {
		var folder = splaceApp.data('folder');
		var name = splaceApp.data('name');

		if(loaded[name]) {
			return;
		}

		$.ajax({
			url: folder + '/' + name + '.html', 
			async: false,
			success: function(content) {
				var app = $(content).filter('#splaceApp');
				splaceApp.append(app);
			}
		});

		var buf = [];
		buf.push('<script id="appscript" src="');
		buf.push(folder);
		buf.push('/');
		buf.push(name);
		buf.push('.js');
		buf.push('"></script>');

		$('body').append(buf.join(''));

		buf = [];
		buf.push('<link id="appstyle" rel="stylesheet" href="');
		buf.push(folder);
		buf.push('/');
		buf.push(name);
		buf.push('.css');
		buf.push('">');

		$('head').append(buf.join(''));

		window[name + '_startup']();
		loaded[name] = true;
	}


	var rmvFN = function() {
		var name = splaceApp.data('name');

		if(loaded[name]) {
			$('#appstyle').remove();
			$('#appscript').remove();
			$('#splaceApp').html('');
			window[name + '_teardown']();
			loaded[name] = false;
		}
	}

	$('#btnload').on('click', loadFN);
	$('#btnRmv').on('click', rmvFN);

})(jQuery)