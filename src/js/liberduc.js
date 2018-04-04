$(document).ready(function(){

	// let urlBase = 'https://liberduc.github.io/';
	let urlBase = 'http://localhost/git/hub/liberduc/';
	let dataPost = $('body').attr('data-post');
	let dataTag = $('body').attr('data-tag');
	let dataAllTag = $('body').attr('data-all-tags');
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
	if(dataAllTags != undefined){

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
			console.log(itens);
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
			let refPost = item.RefPost;
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

			let refLinks = '';
			if(refPost != "undefined" && refPost != undefined){
				console.log(refPost);
				$.each(refPost, function(k, rp){
					refLinks += '<h4><a href="'+rp+'" target="_blanc">'+k+'</a></h4><br>';
				});	
				refLinks = "<hr><br><div><h3>Referências</h3><br>"+refLinks+"</div><br><br>";
			}
			
			tagsLink = '<br><hr><div class="tags"><em></em>'+tagsLink+'</div>';
			$('title').html('Liberduc | '+title);
			$('.post header').html('<h1>'+title+'</h1>');
			$('.post-info').html(postInfo);
			$('.content-post').html(content+tagsLink+refLinks);
			// $('.post footer').html(ref);
			// $('.tags').html();
		});
	}
});