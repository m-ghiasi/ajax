$(document).ready(function(){

	var tokenid ='';
	$('.button').on('click',function(){
		var username = $(".uname").val();
       	var password = $(".pass").val();



		$.ajax({
			url:'https://dev.map.ir/auth/authenticate',
			type:'post',
			data:{
				user:username,
				pass:password,
			}
		}).done(function(data){
			window.location.replace('index.html');
			


			tokenid = data.tokenId;

			// console.log(tokenid);



		}).fail(function(){
			alert( "error" );
		})
	})



			//
			// 	$.ajax({
			// 		url: 'https://dev.map.ir/tbt/tickets',
			// 		type: 'get',
			// 		headers:{
			// 			"token":tokenid,
			// 		}
			//
			// 	}).done(function(data){
			//
			//
			// 		console.log(data);
			// 		var statusicon ='';
			//
			//
			// 		var trs = '';
			// 		// console.log(data);
			// 		$.each(data, function(index,item){
			//
			// 			if(item.status  === 'open'){
			// 				statusicon = 'fas fa-lock-open';
			// 			}
			// 				else if (item.status  === 'close'){
			// 				statusicon = 'fas fa-lock';
			// 			}
			// 				else{
			// 				statusicon = 'fas fa-spinner';
			// 			}
			//
			// 			trs +=
			// 			`<tr>
			// 			<td>${item.id}</td>
			// 			<td>${item.description}</td>
			// 			<td class="geom" data-lat="${item.geom.coordinates[0]}" data-lon="${item.geom.coordinates[1]}"></td>
			// 			<td class="status ${statusicon}"><div class="change-icon"><div class="icon"><div class="iconopen"></div><div <div class="iconopen">></div><div <div class="iconopen">></div></div></div></td>
			// 			</tr>`
			// 		});
			// 		window.location.assign('index.html');
			//
			// 	$('table tbody').html(trs);
			//
			// 	$('.geom').on('click', function(){
			// 		window.open(`https://map.ir/lat/${$(this).attr('data-lat')}/lng/${$(this).attr('data-lon')}/z/17`);
			//
			// 	});
			//
			//
			//
			//
			// });






});
