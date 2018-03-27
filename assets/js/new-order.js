$(document).ready(function() {
    $("#orderCategory").change(function() {
    html = '';
    for (index = 0; index < services[$("#orderCategory").val()].length; index++) {
      html = html + '<option value="'+services[$("#orderCategory").val()][index]['key']+'">'+services[$("#orderCategory").val()][index]['name']+'</option>';
    }
    $("#OrderService").html(html);
    $("#order_quantity").show();
    switch (serviceArray[$("#OrderService").val()]) {
      case 1:
        $("#orders_keywords").show();
        $("#order_count").prop('disabled', false);
        $("#orders_comments").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();

        $("#orders_type_order_9").hide();
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
      break;
      case 2:
        $("#orders_comments").show();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', true);

        $("#orders_type_order_9").hide();
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
      break;
      case 3:
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").show();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);

        $("#orders_type_order_9").hide();
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
      break;
      case 4:
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").show();
        $("#order_count").prop('disabled', true);

        $("#orders_type_order_9").hide();
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
      break;
      case 6:
        $("#orders_type_order_6").show();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);

        $("#orders_type_order_9").hide();
      break;
      case 7:
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").show();
        $("#orders_type_order_8").hide();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);

        $("#orders_type_order_9").hide();
      break;
      case 8:
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").show();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);
        
        $("#orders_type_order_9").hide();
      break;
      case 9:
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);

        $("#orders_type_order_9").show();
      break;
      case 10:
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
        $("#orders_type_order_9").hide();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_quantity").hide();
      break;
      default:
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);

        $("#orders_type_order_9").hide();
      break;
    }
  });

  $("#orders_comment_text").keydown(function () {
    str = $("#orders_comment_text").val();
    lines = str.split(/\n/),
    count = lines.length;
    $("#order_count").val(count);
  });
  $("#orders_comment_text").change(function () {
    str = $("#orders_comment_text").val();
    lines = str.split(/\n/),
    count = lines.length;
    $("#order_count").val(count);
  });
  
  $("#orders_mentions_custom_text").keydown(function () {
    str = $("#orders_mentions_custom_text").val();
    lines = str.split(/\n/),
    count = lines.length;
    $("#order_count").val(count);
  });
  $("#orders_mentions_custom_text").change(function () {
    str = $("#orders_mentions_custom_text").val();
    lines = str.split(/\n/),
    count = lines.length;
    $("#order_count").val(count);
  });
  
  $("#OrderService").change(function () {
    $("#order_quantity").show();
    switch (serviceArray[$("#OrderService").val()]) {
      case 1:
        $("#orders_keywords").show();
        $("#order_count").prop('disabled', false);
        $("#orders_comments").hide();
        $("#orders_mentions").hide();
        $("#orders_type_order_9").hide();
        $("#orders_mentions_custom").hide();
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
      break;
      case 2:
        $("#orders_comments").show();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_type_order_9").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', true);
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
      break;
      case 3:
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").show();
        $("#orders_type_order_9").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
      break;
      case 4:
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_type_order_9").hide();
        $("#orders_mentions_custom").show();
        $("#order_count").prop('disabled', true);
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
      break;
      case 6:
        $("#orders_type_order_6").show();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
        $("#orders_type_order_9").hide();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);
      break;
      case 7:
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").show();
        $("#orders_type_order_8").hide();
        $("#orders_type_order_9").hide();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);
      break;
      case 8:
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").show();
        $("#orders_type_order_9").hide();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);
      break;
      case 9:
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
        $("#orders_type_order_9").show();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);
      break;
      case 10:
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
        $("#orders_type_order_9").hide();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_quantity").hide();
      break;
      default:
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
        $("#orders_type_order_9").hide();
        $("#orders_comments").hide();
        $("#orders_keywords").hide();
        $("#orders_mentions").hide();
        $("#orders_mentions_custom").hide();
        $("#order_count").prop('disabled', false);
      break;
    }
  });

});

function starts() {
  $("#order_quantity").show();
  switch (serviceArray[$("#OrderService").val()]) {
    case 1:
      $("#orders_keywords").show();
      $("#order_count").prop('disabled', false);
      $("#orders_comments").hide();
      $("#orders_mentions").hide();
      $("#orders_mentions_custom").hide();
        $("#orders_type_order_9").hide();
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
    break;
    case 2:
      $("#orders_comments").show();
      $("#orders_keywords").hide();
      $("#orders_mentions").hide();
      $("#orders_mentions_custom").hide();
      $("#order_count").prop('disabled', true);
        $("#orders_type_order_9").hide();
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
    break;
    case 3:
      $("#orders_comments").hide();
      $("#orders_keywords").hide();
      $("#orders_mentions").show();
      $("#orders_mentions_custom").hide();
      $("#order_count").prop('disabled', false);
        $("#orders_type_order_9").hide();
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
    break;
    case 4:
      $("#orders_comments").hide();
      $("#orders_keywords").hide();
      $("#orders_mentions").hide();
      $("#orders_mentions_custom").show();
      $("#order_count").prop('disabled', true);
        $("#orders_type_order_9").hide();
        $("#orders_type_order_6").hide();
        $("#orders_type_order_7").hide();
        $("#orders_type_order_8").hide();
    break;
    case 6:
      $("#orders_type_order_6").show();
      $("#orders_type_order_7").hide();
      $("#orders_type_order_8").hide();
      $("#orders_comments").hide();
      $("#orders_keywords").hide();
      $("#orders_mentions").hide();
      $("#orders_mentions_custom").hide();
      $("#order_count").prop('disabled', false);
    break;
    case 7:
      $("#orders_type_order_6").hide();
      $("#orders_type_order_7").show();
      $("#orders_type_order_8").hide();
      $("#orders_comments").hide();
      $("#orders_keywords").hide();
      $("#orders_mentions").hide();
      $("#orders_mentions_custom").hide();
      $("#order_count").prop('disabled', false);
        $("#orders_type_order_9").hide();
    break;
    case 8:
      $("#orders_type_order_6").hide();
      $("#orders_type_order_7").hide();
      $("#orders_type_order_8").show();
      $("#orders_comments").hide();
      $("#orders_keywords").hide();
      $("#orders_mentions").hide();
      $("#orders_mentions_custom").hide();
      $("#order_count").prop('disabled', false);
        $("#orders_type_order_9").hide();
    break;
    case 9:
      $("#orders_type_order_6").hide();
      $("#orders_type_order_7").hide();
      $("#orders_type_order_8").hide();
      $("#orders_comments").hide();
      $("#orders_keywords").hide();
      $("#orders_mentions").hide();
      $("#orders_mentions_custom").hide();
      $("#order_count").prop('disabled', false);
      $("#orders_type_order_9").show();
    break;
    case 10:
      $("#orders_type_order_6").hide();
      $("#orders_type_order_7").hide();
      $("#orders_type_order_8").hide();
      $("#orders_type_order_9").hide();
      $("#orders_comments").hide();
      $("#orders_keywords").hide();
      $("#orders_mentions").hide();
      $("#orders_mentions_custom").hide();
      $("#order_quantity").hide();
    break;
    default:
      $("#orders_type_order_6").hide();
      $("#orders_type_order_7").hide();
      $("#orders_type_order_8").hide();
      $("#orders_comments").hide();
      $("#orders_keywords").hide();
      $("#orders_mentions").hide();
      $("#orders_mentions_custom").hide();
      $("#order_count").prop('disabled', false);
        $("#orders_type_order_9").hide();
    break;
  }
}

starts();