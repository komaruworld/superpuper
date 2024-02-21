$(document).ready(() => {
  $("#get-post").click(() => {
    $.ajax({
      url: "https://api.telegram.org/bot5646546456:AAHjhjhjhjhjhjhjhjhjhj/getUpdates",
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
