$(function(){if(typeof initialTags!="undefined"&&initialTags instanceof Array){$("#tags").tagit({tagSource:SITE_URL+"tags",select:!0,initialTags:initialTags});$("#dependencies").tagit({tagSource:SITE_URL+"dependencies",select:!0,initialTags:initialDependenciesTags})}$("#submit-repo").click(function(){var a=$(this);a.html(a.data("loading-text"));a.attr("disabled","disabled");var b="",c="";if($("#manual_repo").val()!=""){var d=$("#manual_repo").val().split("/");c=d[1];b="user="+d[0]+"&repo="+d[1]}else{var d=$("#repo").find("option:selected").text();c=d;b="repo="+d}b&&$.ajax({beforeSend:function(){$(".bundle_extras").fadeOut()},type:"POST",url:SITE_URL+"bundle/repo",data:b,dataType:"json",success:function(a){$(".select-repo").fadeOut();$("#ajax-loader").fadeOut();$("#title").val(c);$("#path").val(c);$("#location").val(a.url);$("#summary").val(a.description);$("#description").val(a.readme);$("#website").val(a.homepage);$(".bundle_extras").fadeIn()}});return!1});$("#rate").click(function(){var a=$(this).attr("data-id"),b=$(this).attr("data-active");if(b=="notactive"){$("#modal-from-dom h3.title").html("Error");$(".modal-body").html("<p>You must be logged in to rate.</p>");$("#modal-from-dom").modal({show:!0,backdrop:!0});return!1}if(b=="rated"){$("#modal-from-dom h3.title").html("Error");$(".modal-body").html("<p>You have already rated this.</p>");$(".modal-footer").hide();$("#modal-from-dom").modal({show:!0,backdrop:!0});return!1}$.ajax({beforeSend:function(){$("#rate").attr("data-active","rated");$("#rate").addClass("rated")},type:"POST",url:SITE_URL+"rate",data:"id="+a,dataType:"json",success:function(a){console.log(a);if(a.success){$("#ratings").html(a.ratings+" likes");$("#msg_text").html("Thank you for rating.");$("#msg_box").addClass("alert-success").fadeIn()}else{$("#msg_text").html(a.error);$("#msg_box").addClass("alert-info").fadeIn()}}})});$("a[rel=dependency]").popover({offset:10});$("a.delete, a.remove").live("click",function(){var a=this,b=$(a).attr("data-id");removemsg="Are you sure you want to delete this record? \n It cannot be undone!";if(confirm(removemsg)&&a.href){$.ajax({type:"POST",url:a.href,data:"confirm=true",dataType:"json",success:function(b){b.success===!0&&$(a).closest("tr").fadeOut()}});return!1}return!1});$(".delete-cat").live("submit",function(){var a=$(this).serialize();$.ajax({type:"POST",url:SITE_URL+"admin/cats/delete",data:a,dataType:"json",success:function(a){if(a.success===!0){$(this).closest("tr").fadeOut();location.reload()}}});return!1})});$(function(){function a(a){return a.parent().parent()}function b(b){var c=a(b);c.removeClass("error success warning");$(".help-inline.error, .help-inline.success, .help-inline.warning",c).remove()}function c(b,c,d){var e=a(b);e.addClass(c);b.addClass(c);if(d){var f=$('<span class="help-inline"/>');f.addClass(c);f.text(d);b.after(f)}}function d(a){$(".help-inline.error, .help-inline.success, .help-inline.warning",a).remove();$(".error, .success, .warning",a).removeClass("error success warning")}$("form").each(function(){var a=$(this);a.validator({}).bind("reset.validator",function(){d(a)}).bind("onSuccess",function(a,c){$.each(c,function(){var a=$(this);b(a)})}).bind("onFail",function(a,d){$.each(d,function(){var a=this,d=$(a.input);b(d);c(d,"error",a.messages.join(" "))});return!1})})});