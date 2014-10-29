function load_reservation_status (kobe_id,f)
{
    $.ajax({
	url: "/opac/opacs/find_detailbook?kobeid="+kobe_id+"&pvolid="+kobe_id+"&type=CtlgBook",
	success: function(res){
	    var result = $(res).find("div.book_detail_data.clearfix span.clearfix")[0];
	    var status = $(result).text();
	    console.log(status);
	    f(status);
	}});

}

$(
    function (){
	if( location.pathname == "/opac/opacs/cart_display"){
	    console.log(location.pathname);
	    var booklist = [];
	    $("div.table_wrapper tr").each(function(){
		var kobe_id = $(this).find("label.cover").attr("for");
		var x = this;
		console.log($(x).children().length)

		if(kobe_id == undefined){
		    kobe_id = "";
		    $($(x).children()[1]).after("<td></td>");
		}else{
		    kobe_id = kobe_id.replace("cartbooks_","");
		    load_reservation_status(kobe_id,function(status){
			$($(x).children()[1]).after("<td>"+status+"</td>");
		    });
		    console.log(kobe_id);
		    var detail_url = "/opac/opacs/find_detailbook?kobeid="+ kobe_id + "&mode=one_line&pvolid="+ kobe_id +"&type=CtlgBook";
		    $($(x).children()[0]).after("<a href=\""+ detail_url +"\">"+ $($(x).children()[1]).text() + "</a>");
		    // $.ajax({
		    // 	url: "/opac/opacs/find_detailbook?kobeid="+kobe_id+"&pvolid="+kobe_id+"&type=CtlgBook",
		    // 	success: function(res){
		    // 	    var result = $(res).find("div.book_detail_data.clearfix span.clearfix")[0]
		    // 	    var description = $(result).text();
		    // 	    console.log(description);
		    // 	    $($(x).children()[1]).after("<td>"+description+"</td>");
		    // 	}});
		}

	    });
	}
	else if(location.pathname == "/opac/opacs/reservation_display"){
	    console.log(location.pathname);
	    var pattern = /(PV\:[0-9]+)/
	    $("div#main div#tabmain form div.table_wrapper.reservation table tbody tr.page_1").each(
		function(){
		    var thiz = this;
		    var td = $(thiz).find("td.reserved_date");
		    var kobe_id = $(td).text();
		    kobe_id = kobe_id.match(pattern)[1];
		    console.log("kobe_id="+kobe_id );
		    if(kobe_id == undefined){
			kobe_id = "";
			//$($(x).children()[1]).after("<td></td>");
		    }else{
			kobe_id = kobe_id.replace("cartbooks_","");
			load_reservation_status(kobe_id,function(status){
			    $(td).text(status);
			});
			// $.ajax({
			//     url: "/opac/opacs/find_detailbook?kobeid="+kobe_id+"&pvolid="+kobe_id+"&type=CtlgBook",
			//     success: function(res){
			// 	var result = $(res).find("div.book_detail_data.clearfix span.clearfix")[0]
			// 	var description = $(result).text();
			// 	console.log(description);
			// 	$(td).text(description);
			//     }});
		    }
		}
	    );

	}else{
	    console.log(location.pathname);
	}
    });


