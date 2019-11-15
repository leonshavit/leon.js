var container = document.getElementById("container");
var popup = document.getElementById("popup");
var cancel = document.getElementById("cancel");
var clicked = document.getElementsByClassName("clicked");
function ajax(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);

        xhr.onload = function () {
            resolve(xhr.responseText);
        }
        xhr.onerror = function () {
            reject("Unexpexted error :)");
        }
        xhr.send();
    })
}
ajax('https://jsonplaceholder.typicode.com/photos/').then(function (response) {
    var data = JSON.parse(response);
    for (var row of data) {
        var title = document.createElement("div");
        var thumbnail = document.createElement("img");
        title.setAttribute("data-id", row.id)
        title.setAttribute("class", "clicked");
        container.appendChild(thumbnail);
        thumbnail.src = row.thumbnailUrl;
        container.appendChild(title);
        title.innerText = row.title;
    }
}).then(function () {
    for (var i = 0; i < clicked.length; i++) {
        clicked[i].addEventListener("click", function (event) {
            popup.classList.add("active");
            var details = document.getElementById("details");
            var id = event.target.getAttribute("data-id")
            ajax('https://jsonplaceholder.typicode.com/photos/' + id).then(function (response) {
                var data = JSON.parse(response);
                var photo = document.createElement("img");
                details.appendChild(photo);
                photo.src = data.thumbnailUrl;
                var info = document.createElement("div");
                details.appendChild(info)
                info.innerText = "\nAlbum id: " + data.albumId + "\nID: " + data.id + "\nTitle: " + data.title + "\nUrl: " + data.url;
            })
        })
        cancel.addEventListener("click", function (event) {
            popup.classList.remove("active");
            details.innerText = "";
        })
    }
})
