export const checkImage = (file) => {
    let err = ""
    if(!file) {
        return err = "File does not exist!"
    }
    if(file.size > 1024 * 1024) {
        return err = "File size must be less than 1mb!"
    }
    if(file.type !== "image/jpeg" && file.type !== "image/png") {
        return err = "Image must be jpeg or png!"
    }
    return err
}

export const imageUpload = async(images) => {
    let imgArr = []
    for (const item of images) {
        const formData = new FormData()
        if(item.camera) {
            formData.append("file", item.camera)
        } else {
            formData.append("file", item)
        }

        formData.append("upload_preset", "ADD VALUE HERE")
        formData.append("cloud_name", "ADD VALUE HERE")

        const res = await fetch("ADD CLOUDINARY IMAGE UPLOAD LINK HERE", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({ public_id: data.public_id, url: data.sucure_url })
    }
    return imgArr
}