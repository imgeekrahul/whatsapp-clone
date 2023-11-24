

export const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes}`
}

export const downloadMedia = (e, originalImage) => {
    e.preventDefault();

    try {
        fetch(originalImage)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;


            // Save the file with a name
            const newSplit = originalImage.split('/');
            const duplicateName = newSplit.pop();
             
            a.download = "" + duplicateName + "";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(err => {
            console.log("Error While downloading the image ", err.message);
        })
    } catch(err) {
        console.log("Error While downloading the image ", err.message);
    }
}