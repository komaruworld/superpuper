$(document).ready(function() {
    const instagramURL = "https://www.instagram.com/mugimeshi323/?hl=ru";

    $.ajax({
        url: instagramURL,
        success: function(response) {
            const html = response;
            const post = getRandomInstagramPost(html);

            if (post) {
                $("#post").html(post);
            } else {
                console.error("No Instagram post found.");
            }
        },
        error: function(error) {
            console.error("Error fetching Instagram post:", error);
        }
    });

    function getRandomInstagramPost(html) {
        const postElement = soup.find("div", class_="_aagcW");
        const imageURL = postElement.find("img").get("src");
        const caption = postElement.find("caption").text;

        return `<a href="${imageURL}" target="_blank"><img src="${imageURL}"></a>
                        <caption>${caption}</caption>`;
    }
});

