$(document).ready(function(){
	let urlBase = 'https://liberduc.github.io/';
	// let urlBase = 'http://localhost/git/hub/liberduc/';
	let dataPost = $('body').attr('data-post');
	let dataTag = $('body').attr('data-tag');
	let dataColab = $('body').attr('data-colab');
	let postsFileJson = urlBase+'src/js/posts.json';
	let equipeFileJson = urlBase+'src/js/equipe.json';

	let path = {
		posts: urlBase+'posts/',
		tags: urlBase+'tags/',
		equipe: urlBase+'equipe/'
	}


	$('.menu-icon').click(function(){
		$('nav.menu').toggle('fast');
	});

	$(document).on('click', '.menu-icon.active', function(){
		$('nav.menu').addClass('hide');
	});

	if(dataColab != undefined){
		dataColab = 'colab'+dataColab;
		$.getJSON(equipeFileJson, function(itens){			
			let itemColab = itens[dataColab];
			$('title').html('Liberduc | '+itemColab.Nome);
			$('.post header').html('<h1><smal>Liberduc | </smal>'+itemColab.Nome+'</h1>');
			
			let colabInfo = '';
			if(itemColab.Email != undefined){
				colabInfo += '<span class="info"><em>'+itemColab.Email+'</em></span>';
			}
			if(itemColab.Facebook != undefined){
				colabInfo += '<span class="info"><a href="https://fb.com/'+itemColab.Facebook+'" target="_blanc"><em>Facebook</em></a></span>';
			}
			if(itemColab.Whatsapp != undefined){
				colabInfo += '<span class="info"><em>'+itemColab.Whatsapp+'</em></span>';
			}

			colabInfo += '';
			$('.post .post-info').html(colabInfo);

			$.getJSON(postsFileJson, function(itens){			
				let tags = '';
				$.each(itens, function(k,itemPost){
					if(itemPost.infoPost.Autor === itemColab.Nome){
						let href = path.posts+itemPost.url;
						tags += '<a href="'+href+'" title="'+itemPost.title+'">'+itemPost.title+'</a>';
					}
				});
				$('.posts-by-colab').html(tags);
			});
			
		});
		
	}
	
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
				tags += '<a href="'+path.posts+item.url+'" title="'+item.title+'">'+item.title+'</a>';
			});
			$('#articles').html(tags);
		});
	}
	else{

		$.getJSON(postsFileJson, function(itens){
			let i = 'post'+dataPost;
			let item = itens[i];
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
				if(k === 'Autor'){
					let href = ip.toLowerCase().replace(' ', '-');
					postInfo += '<span class="info">';
					postInfo += '<span>'+k+':<a href="'+path.equipe+href+exe+'"><em>'+ip+'</em></a></span>';
					postInfo += '</span>';	
				}
				else{
					postInfo += '<span class="info">';
					postInfo += '<span>'+k+': <em>'+ip+'</em></span>';
					postInfo += '</span>';	
				}
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
			$('.content-post').html(content);
			$('.tags').html('<em>Tags: </em>'+tagsLink);

			// let next = 'post'+(parseInt(dataPost)+1);
			// console.log(itens[next].title);
			// alert('Proximo post: '+itens[next].title);
		});
	}
});