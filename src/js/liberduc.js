$(document).ready(function(){

/**
 * VARIABLES
 */
	let urlBase = 'https://liberduc.github.io/';
	let dataPost = $('body').attr('data-post');
	let dataTag = $('body').attr('data-tag');
	let dataAllTags = $('body').attr('data-all-tags');
	let dataColab = $('body').attr('data-colab');
	let dataMenu = $('[data-menu]').attr('data-menu');
	let exe = '.html';

/**
 * OBJECTS
 */
	let fileJson = {
		menu: urlBase+'src/js/menu.json',
		posts: urlBase+'src/js/posts.json',
		equipe: urlBase+'src/js/equipe.json'
	}
	let path = {
		posts: urlBase+'posts/',
		tags: urlBase+'tags/',
		equipe: urlBase+'equipe/'
	}

/**
 * MENU ICON
 */
	$('.menu-icon').click(function(){
		$('nav.menu').toggle('fast');
	});

/**
 * MENU
 */
 	if(dataMenu != undefined){
 		let dataMenuActive = $('[data-menu]').attr('data-menu-active');
 		let menuLinks = '';
 		$.getJSON(fileJson.menu, function(menus){
 			$.each(menus[dataMenu], function(k, menu){
 				let href = urlBase+menu;
 				if(k === dataMenuActive){
 					menuLinks += '<a href="'+href+'" class="btn-menu active">'+k+'</a>';
 				}
 				else{
 					menuLinks += '<a href="'+href+'" class="btn-menu">'+k+'</a>';
 				}
 			});
 			$('[data-menu]').html(menuLinks);
 		});
 	}

 /**
 * EQUIPE
 */
	if(dataColab != undefined){
		dataColab = 'colab'+dataColab;
		$.getJSON(fileJson.equipe, function(itens){			
			let itemColab = itens[dataColab];
			$('title').html('Liberduc | '+itemColab.Nome);
			$('.post header').html('<h1><smalL>Liberduc | </smalL>'+itemColab.Nome+'</h1>');
			
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

			$.getJSON(fileJson.posts, function(itens){			
				let tags = '';
				$.each(itens, function(k, itemPost){
					if(itemPost.infoPost.Autor === itemColab.Nome){
						let href = path.posts+itemPost.url;
						tags += '<a href="'+href+'" title="'+itemPost.title+'">'+itemPost.title+'</a>';
					}
				});
				$('#posts-by-colab').html(tags);
			});
			
		});
		
	}
	
	if(dataTag != undefined){

		$.getJSON(fileJson.posts, function(itens){			
			let tags = '';
			$.each(itens, function(k,item){
				$.each(item.tags, function(i,v){
					if(v === dataTag){
						let href = path.posts+item.url;
						tags += '<a href="'+href+'" title="'+item.title+'">'+item.title+'</a>';
					}
				});
			});
			$('#posts-by-tags').html(tags);
		});
	}
	if(dataAllTags != undefined){

		$.getJSON(fileJson.posts, function(itens){			
			let tags = '';
			let objTags = {};
			$.each(itens, function(k,item){
				$.each(item.tags, function(i,v){
					if($.inArray(i, objTags) === -1){
						objTags[i] = v;
					}
				});
			});
			
			$.each(objTags, function(k, v){
				tags += '<a class="tag" href="'+path.tags+v+exe+'">'+k+'</a>';
			});
			$('#all-tags').html(tags);
		});
	}

	if(dataPost == undefined){
		$.getJSON(fileJson.posts, function(itens){
			let posts = '';
			$.each(itens, function(k, item){
				posts += '<a href="'+path.posts+item.url+'" title="'+item.title+'">'+item.title+'</a>';
			});
			$('#all-posts').html(posts);
		});
	}
	else{

		$.getJSON(fileJson.posts, function(itens){
			let i = 'post'+dataPost;
			let item = itens[i];
			let title = item.title;
			let tags = item.tags;
			let infoPost = item.infoPost;
			let refPost = item.RefPost;
			let content = item.content.join('');
			let tagsLink = '';
			for(var k in tags){
				let href = path.tags+tags[k]+exe;
				tagsLink += '<a href="'+href+'" class="tag">'+k+'</a> '
			}

			let postInfo = '';
			$.each(infoPost, function(k, ip){
				if(k === 'Autor'){
					let href = ip.toLowerCase().replace(' ', '-');
					postInfo += '<span class="tag">'+k+':<a href="'+path.equipe+href+exe+'"><em>'+ip+'</em></a></span>';
				}
				else{
					postInfo += '<span class="tag">'+k+': <em>'+ip+'</em></span>';
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
					
			postInfo = '<span class="tags text-center">'+postInfo+'</span>';
			tagsLink = '<br><hr><div class="tags"><em></em>'+tagsLink+'</div>';
			$('title').html('Liberduc | '+title);
			$('.content-header').html('<h1 class="h2" title="'+title+'">'+title+'</h1>');
			$('.content-info').html(postInfo);
			$('.content-body').html(content+tagsLink+refLinks);
		});
	}
});