const CallFetchData = async (url) => {
    fetch(url)
        .then(res=>res.json())
}
