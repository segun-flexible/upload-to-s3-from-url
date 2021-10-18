document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector("form").addEventListener("submit", e => {
        e.preventDefault();
        const submitBtn = e.currentTarget.querySelector("button");
        const result = document.querySelector(".result");

        const obj = {
            url: e.currentTarget.querySelector("input#url").value,
            title: e.currentTarget.querySelector("input#title").value,
            type: e.currentTarget.querySelector("select#type").value,
        }
        /* const data = new FormData();
        data.append("file", e.currentTarget.querySelector("input#file").files[0]); */
        
        submitBtn.innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;

        result.innerHTML = ""
        
        fetch("/", {
            method: "POST",
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(obj),
            headers: {
                "content-type":"application/json"
            }
            }).then(res => res.json())
            .then(res => {
                if (res.status) {
                    submitBtn.innerHTML = "Upload";
                    alert("File Uploaded Successfully")
                    result.innerHTML = `<hr><a target="_blank" href="${res.data.Location}" class="btn btn-primary text-center">View File</a>`
                } else {
                    alert("Unable To Upload File")
                }
        })

    })

})




