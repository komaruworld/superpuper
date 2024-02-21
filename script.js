$(document).ready(() => {
  $("#get-post").click(() => {
    $.ajax({
      url: "https://api.telegram.org/7136932957:AAH0KoDyAbOmuz-GVWSSmTxGej7XXB2Rjew/getUpdates",
      method: "GET",
      data: {
        offset: 0,
        limit: 1,
      },
      success: (response) => {
        const post = response.result[0].message;
        $("#post").html(post.text);
      },
      error: (error) => {
        console.log(error);
      },
    });
  });
});
