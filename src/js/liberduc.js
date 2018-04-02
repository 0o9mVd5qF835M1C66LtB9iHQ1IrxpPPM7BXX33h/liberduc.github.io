$(document).ready(function(){
	let urlBase = 'https://liberduc.github.io/';
	let dataPost = $('body').attr('data-post');
	let dataTag = $('body').attr('data-tag');
	let postsFileJson = urlBase+'src/js/posts.json';
	console.log(postsFileJson);
	let path = {
		posts: urlBase+'post/',
		tags: urlBase+'tags/'
	}

	$('.menu-icon').click(function(){
		$('nav.menu').toggle('fast');
	});

	$(document).on('click', '.menu-icon.active', function(){
		$('nav.menu').addClass('hide');
	});
	
	if(dataTag != undefined){

		$.getJSON(postsFileJson, function(itens){			
			let tags = '';
			$.each(itens, function(k,item){
				$.each(item.tags, function(i,v){
					if(v === dataTag){
						let href = path.posts+item.url;
						tags += '<a href="'+href+'" title="'+item.title+'">'+item.title+'</a>';
					}
				});
			});
			$('.posts-by-tags').html(tags);
		});
	}

	if(dataPost == undefined){
		$.getJSON(postsFileJson, function(itens){
			let tags = '';
			$.each(itens, function(k, item){
				tags += '<a href="'+urlBase+'article/'+item.url+'" title="'+item.title+'">'+item.title+'</a>';
			});
			$('#articles').html(tags);
		});
	}
	else{

		$.getJSON(postsFileJson, function(itens){
			let i = 'post'+dataPost;
			let item = itens[i];
			console.log(item, i);
			let title = item.title;
			let tags = item.tags;
			let infoPost = item.infoPost;
			let infoAutor = item.infoAutor;
			let content = item.content.join('');
			let exe = '.html';
			let tagsLink = '';
			for(var k in tags){
				let href = path.tags+tags[k]+exe;
				tagsLink += '<a href="'+href+'" class="tag">'+k+'</a> '
			}

			let postInfo = '';
			$.each(infoPost, function(k, ip){
				postInfo += '<span class="info">';
				postInfo += '<span>'+k+': <em>'+ip+'</em></span>';
				postInfo += '</span>';
				// postInfo += '';
			});

			let autorInfo = '';
			$.each(infoAutor, function(k, ia){
				autorInfo += '<span class="info">';
				if(k == 'Facebook'){
					let href = 'https://fb.com/'+ia;
					autorInfo += '<span><a href="'+href+'" target="_blanc">'+k+'</a></span>';
				}
				else{
					autorInfo += '<span>'+k+': <em>'+ia+'</em></span>';
				}
				autorInfo += '</span>';
			});

			autorInfo = '<div class="autor-info jc-center">'+autorInfo+'</div';
			$('title').html('Liberduc | '+title);
			$('.post header').html('<h1>'+title+'</h1>');
			$('.post-info').html(postInfo);
			$('.content-post').html(content+autorInfo);
			$('.tags').html('<em>Tags: </em>'+tagsLink);

			// let next = 'post'+(parseInt(dataPost)+1);
			// console.log(itens[next].title);
			// alert('Proximo post: '+itens[next].title);
		});
	}
});