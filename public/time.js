// server side
let now = Date.now();
let interval = 5000;
let dest = document.getElementById("place");

function fetchImages() {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ after: now })
    }

    fetch("/latest", postOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.images);
            // if (data.ok) {
            //     return response.json();
            // } else {
            //     throw new Error("Oh No!");
            // }
            for(let i in data.images){
                let img = document.createElement('img')
                let pic = data.images[i]
                img.src = pic;
                dest.appendChild(img)
            }
        })
        // .then(data => {
        //     console.log(data);
        // }).catch(err => {
        //     console.err(error);
        // })
}
setInterval(fetchImages, interval);